import { TextField } from "@mui/material";
import { ChangeEvent } from "react";
import Grid from '@mui/material/Grid';
import SectionTitle from '../typography/SectionTitle';

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
  title: string,
  label: string;
  value?: number;
  index: number;
  onChange: (index: number, newVal: number) => void
}
const InputGroup = (props: Props) => {
  const { title, option, value, index, onChange } = props;

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    onChange(index, +e.target.value);
  }

  return (
    <>
      <SectionTitle>{title}</SectionTitle>
      <Grid container spacing={2}>
        {option.map((val, idx) => (
          <Grid item xs={6}>
            <InputGroup
              label={`Payday ${idx + 1}`}
              index={idx}
              value={val}
              onChange={handlePaydayChange}
            />
          </Grid>
        ))}
      </Grid>
    </>

  )
}

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

export default InputGroup;