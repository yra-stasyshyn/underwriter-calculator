import FormControl from '@mui/material/FormControl';
import SelectUI from '@mui/material/Select';
import { InputLabel } from '@mui/material';

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
    <FormControl color='secondary' fullWidth variant='filled' sx={{backgroundColor: '#fff', borderRadius: '4px', color: '#000'}} >
      <InputLabel>{`${label} (${value}) `}</InputLabel>
      <SelectUI value={value} onChange={handleChange} disabled={!!disabled}>
        <option disabled={!!disabled} hidden={true} selected={typeof value === "undefined"}>
          {!!disabled ? "" : "- select -"}
        </option>
        {options.map((option, idx) => (
          <option key={`${label}-${idx}`} value={option.value}>{option.title}</option>
        ))}
      </SelectUI>
    </FormControl>
  );
}

export default Select;