import QRCode from "qrcode";
import { useCallback, useRef, useState } from "react";

function App() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isGenerated, setIsGenerated] = useState(false);
  const [url, setUrl] = useState("");

  const handleGenerateQRCode = useCallback(async () => {
    if (canvasRef.current) {
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

  const downloadQRCode = useCallback(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const link = document.createElement("a");
      link.href = canvas.toDataURL();
      link.download = `${url}.png`;
      link.click();
    }
  }, [url]);

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
        <canvas ref={canvasRef} />
        {isGenerated && (
          <>
            <button
              className="rounded w-full mt-2 text-white bg-blue-400 cursor-pointer px-2 py-1"
              onClick={downloadQRCode}
            >
              Download
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
