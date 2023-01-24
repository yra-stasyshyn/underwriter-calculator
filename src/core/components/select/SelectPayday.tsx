import { FormControl, Typography } from "@mui/material";
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

import { styled } from '@mui/material/styles';

const StyledToggleButtonGroup = styled(ToggleButtonGroup)({
  '& input:valid': {
    borderWidth: 2,
  },
  '& input:invalid + fieldset': {
    borderColor: 'red',
    borderWidth: 2,
  },
  '& input:valid:focus + fieldset': {
    borderBottomWidth: 6,
    padding: '4px !important', // override inline-style
  },
});

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
const SelectPayday = (props: Props) => {
  const { label, value, setValue, options} = props;

  const strValue = typeof value === "undefined" ? "" : value.toString();

  const handleChange = (e: any) => setValue && setValue(+e.target.value);

  return (
    <FormControl variant="outlined" sx={{ display: "flex", flexDirection: "column", alignItems: "left", gap: 2, minWidth: 200 }} size="small">
      <Typography sx={{ fontWeight: "bold" }}>{label}</Typography>
        {options.map((option, idx) => (
        <StyledToggleButtonGroup
              value={strValue}
              color= 'success'
              exclusive
              key={`${label}-${idx}`}
              onChange={handleChange}
            >
          <ToggleButton value={option.value.toString()}>{option.title}</ToggleButton>
        </StyledToggleButtonGroup>
        ))}
    </FormControl>
  );
}

export default SelectPayday;