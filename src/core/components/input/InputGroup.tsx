import Grid from '@mui/material/Grid';

import SectionTitle from '../typography/SectionTitle';
import InputPayday from "./InputPayday";

interface Props {
  label: string;
  subject: "Payday" | "Monthly loan";
  values: Array<number | undefined>;
  onChange: (index: number, newVal: number) => void;
}
const InputGroup = (props: Props) => {
  const { label, subject, values, onChange } = props;

  return (
    <>
      <SectionTitle>{label}</SectionTitle>
      <Grid container spacing={2}>
        {values.map((val, idx) => (
          <Grid item xs={6} key={idx}>
            <InputPayday
              label={`${subject} ${idx + 1}`}
              index={idx}
              value={val}
              onChange={onChange}
            />
          </Grid>
        ))}
      </Grid>
    </>

  )
}

export default InputGroup;