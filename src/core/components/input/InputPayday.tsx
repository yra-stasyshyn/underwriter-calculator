import { TextField } from "@mui/material";
import { ChangeEvent } from "react";
import InputAdornment from '@mui/material/InputAdornment';

import { styled } from '@mui/material/styles';

const ValidationTextField = styled(TextField)({
  '& input:valid + fieldset': {
    borderWidth: 1,
  },
  '& input:invalid + fieldset': {
    borderColor: 'red',
    borderWidth: 1,
  },
  '& input:valid:focus + fieldset': {
    borderBottomWidth: 6,
    padding: '4px !important', // override inline-style
  },
});

interface Props {
  label: string;
  value?: number;
  index: number;
  onChange: (index: number, newVal: number) => void
}
const InputPayday = (props: Props) => {
  const { label, value, index, onChange } = props;

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    onChange(index, +e.target.value);
  }

  return (
    <ValidationTextField
      fullWidth
      InputProps={{
        startAdornment: <InputAdornment position="start">$</InputAdornment>,
      }}
      variant="outlined"
      placeholder={label}
      size="medium"
      value={value || ""}
      color="success"
      onChange={handleChange}
      sx={{ fontWeight: 'bold' }}
    />
  )
}

export default InputPayday;