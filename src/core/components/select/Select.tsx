import { FormControl, Typography } from "@mui/material";
import MenuItem from '@mui/material/MenuItem';
import MUISelect, { SelectChangeEvent } from '@mui/material/Select';

interface Props {
  label?: string;
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

  const strValue = typeof value === "undefined" ? "" : value.toString();

  const handleChange = (e: SelectChangeEvent) => setValue && setValue(+e.target.value);

  return (
    <FormControl variant="outlined" sx={{ display: "flex", flexDirection: "row", alignItems: "left", gap: 2, minWidth: 200 }} size="small">
      <Typography sx={{ fontWeight: "bold" }}>{label}</Typography>
      <MUISelect
        value={strValue}
        onChange={handleChange}
        displayEmpty
        disabled={!!disabled}
      >
        {!disabled && <MenuItem disabled hidden value="">{`- select -`}</MenuItem>}
        {options.map((option, idx) => (
          <MenuItem key={`${label}-${idx}`} value={option.value.toString()}>{option.title}</MenuItem>
        ))}
      </MUISelect>
    </FormControl>
  );
}

export default Select;