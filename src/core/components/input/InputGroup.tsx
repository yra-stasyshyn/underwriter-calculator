import { Box } from '@mui/material';
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
    <Box>
      <SectionTitle>{label}</SectionTitle>
      <Grid container rowSpacing="8px" columnSpacing="16px">
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
    </Box>

  )
}

export default InputGroup;