import { Stack, TextField } from "@mui/material";
import { ChangeEvent } from "react";
import InputAdornment from '@mui/material/InputAdornment';

import { styled } from '@mui/material/styles';

const ValidationTextField = styled(TextField)({
  '& input:valid + fieldset': {
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
  label: string;
  value?: number;
  setValue: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}
const InputPayday = (props: Props) => {
  const { label, value, setValue } = props;

  return (
    <Stack direction="row" alignItems="center" spacing={2}>
      <ValidationTextField
        fullWidth
        InputProps={{
            startAdornment: <InputAdornment position="start">$</InputAdornment>,
          }}
        type="number"
        variant="outlined"
        placeholder={label}
        size="medium"
        value={value}
        color="success"
        onChange={setValue}
        sx={{fontWeight: 'bold'}}
      />
    </Stack>
  )
}

export default InputPayday;