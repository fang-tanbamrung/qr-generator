import QRCode from "qrcode";
import { useCallback, useRef, useState } from "react";
import { AppSelect } from "./components/Select";

const sizes = Array.from({ length: 9 }, (_, i) => ({
  label: `${(i + 1) * 100}px`,
  value: `${(i + 1) * 100}`,
}));

function App() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isGenerated, setIsGenerated] = useState(false);
  const [size, setSize] = useState(sizes[2].value);
  const [url, setUrl] = useState("");

  const handleGenerateQRCode = useCallback(async () => {
    if (canvasRef.current && url) {
      try {
        await QRCode.toCanvas(canvasRef.current, url, {
          width: 200,
          margin: 2,
        });
        setIsGenerated(true);
      } catch (err) {
        console.error(err);
      }
    }
  }, [url]);

  const downloadQRCode = useCallback(async () => {
    if (canvasRef.current) {
      const canvas = document.createElement("canvas");
      canvas.width = 200;
      canvas.height = 200;
      await QRCode.toCanvas(canvas, url, {
        width: Number(size),
        margin: 2,
      });
      const link = document.createElement("a");
      link.href = canvas.toDataURL();
      link.download = `${url}-${size}x${size}px.png`;
      link.click();
    }
  }, [url, size]);

  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      handleGenerateQRCode();
    },
    [handleGenerateQRCode]
  );

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col gap-2">
          <input
            type="text"
            placeholder="Enter URL"
            value={url}
            className="border border-gray-300 rounded-md px-2 py-1"
            onChange={(e) => setUrl(e.target.value)}
          />
        </div>
        <button
          className="rounded w-full mt-2 bg-green-600 text-white cursor-pointer px-2 py-1"
          type="submit"
        >
          Generate
        </button>
      </form>
      <div>
        <canvas ref={canvasRef} hidden={!isGenerated} />
        {isGenerated ? (
          <>
            <AppSelect items={sizes} value={size} onChange={setSize} />
            <button
              className="rounded w-full mt-2 text-white bg-blue-400 cursor-pointer px-2 py-1"
              onClick={downloadQRCode}
            >
              Download
            </button>
          </>
        ) : (
          <img src="/qr.svg" alt="QR Code" className=" w-[200px] h-[200px]" />
        )}
      </div>
    </div>
  );
}

export default App;
