import React, { useState } from "react";
import { InputNumber, InputNumberProps } from "antd";

type NumberFormatCustomProps = Omit<InputNumberProps, "onChange"> & {
  value?: number;
  onChange?: (value: number | undefined) => void;
};

export const NumberFormatCustom: React.FC<NumberFormatCustomProps> = (
  props
) => {
  const { onChange } = props;
  const handleValueChange = (value: any) => {
    let numberValue = typeof value === "string" ? parseFloat(value) : value;
    // Gọi onChange với giá trị số hoặc undefined nếu không phải là số
    onChange && onChange(numberValue || undefined);
  };

  return (
    <InputNumber
      min={0}
      {...props}
      // value={props.value}
      formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
      parser={(value: any) => value && value.replace(/\$\s?|(,*)/g, "")}
      onChange={handleValueChange}
    />
  );
};
