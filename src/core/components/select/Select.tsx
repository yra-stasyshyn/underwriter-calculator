import React from "react";

interface Props {
  label: string;
  value: number | undefined;
  setValue?: React.Dispatch<React.SetStateAction<number>>;
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
        <option disabled={true}></option>
        {options.map((option, idx) => (
          <option key={`${label}-${idx}`} value={option.value}>{option.title}</option>
        ))}
      </select>
    </div>
  );
}

export default Select;