import { Stack, TextField } from "@mui/material";
import { ChangeEvent } from "react";
import InputAdornment from '@mui/material/InputAdornment';

interface Props {
  label: string;
  value?: number;
  setValue: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}
const Input = (props: Props) => {
  const { label, value, setValue } = props;

  return (
    <Stack direction="row" alignItems="center" spacing={2}>
      <TextField
        fullWidth
        InputProps={{
            startAdornment: <InputAdornment position="start">$</InputAdornment>,
          }}
        type="number"
        variant="outlined"
        placeholder={label}
        size="medium"
        value={value}
        onChange={setValue}
      />
    </Stack>
  )
}

export default Input;