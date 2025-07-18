import { Select } from "radix-ui";
import classnames from "classnames";
import { CheckIcon, ChevronDownIcon } from "@radix-ui/react-icons";
import type { FC, Ref } from "react";

interface SelectItemProps {
  children: React.ReactNode;
  className?: string;
  value: string;
  ref?: Ref<HTMLDivElement>;
  disabled?: boolean;
}

interface AppSelectProps {
  ref?: Ref<HTMLDivElement>;
  value: string;
  onChange: (value: string) => void;
  items: {
    label: string;
    value: string;
  }[];
}

const SelectItem: FC<SelectItemProps> = ({
  children,
  className,
  ref,
  ...props
}) => {
  return (
    <Select.Item
      className={classnames(
        "flex items-center justify-between hover:outline-none focus:outline-none hover:bg-gray-100 rounded px-2 py-1 cursor-pointer",
        className
      )}
      {...props}
      ref={ref}
    >
      <Select.ItemText>{children}</Select.ItemText>
      <Select.ItemIndicator className="SelectItemIndicator">
        <CheckIcon />
      </Select.ItemIndicator>
    </Select.Item>
  );
};

export const AppSelect: FC<AppSelectProps> = (props) => {
  const { value, onChange, items } = props;
  return (
    <Select.Root value={value} onValueChange={onChange}>
      <Select.Trigger className="flex items-center outline-none hover:outline-none focus:outline-none justify-between w-full border border-gray-300 rounded-md px-2 py-1 cursor-pointer">
        <Select.Value />
        <Select.Icon>
          <ChevronDownIcon />
        </Select.Icon>
      </Select.Trigger>
      <Select.Portal>
        <Select.Content className="bg-white p-2 rounded shadow-md">
          <Select.Viewport className="SelectViewport">
            {items.map((item) => (
              <SelectItem key={item.value} value={item.value}>
                {item.label}
              </SelectItem>
            ))}
          </Select.Viewport>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  );
};
