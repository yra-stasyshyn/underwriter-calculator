import React from "react";

interface Props {
  label: string;
  value: number | undefined;
  setValue?: (val: number) => void;
  options: Array<{
    title: string;
    value: number;
  }>;
  disabled?: boolean;
}
const Select = (props: Props) => {
  const { label, value, setValue, options, disabled } = props;

  const handleChange = (e: any) => setValue && setValue(+e.target.value);

  return (
    <div>
      <label>{label}</label>
      <select value={value} onChange={handleChange} disabled={!!disabled}>
        <option></option>
        {options.map((option, idx) => (
          <option key={`${label}-${idx}`} value={option.value}>{option.title}</option>
        ))}
      </select>
    </div>
  );
}

export default Select;