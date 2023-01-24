import * as React from 'react';
import { Box, styled } from '@mui/material';
import ToggleButton from '@mui/material/ToggleButton';
import MUIToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import SectionTitle from '../typography/SectionTitle';

interface Props {
  label?: string;
  value: number | undefined;
  setValue: (val: number) => void;
  options: Array<{
    title: string;
    value: number;
  }>;
  gridAutoFlow?: "row" | "column";
  gridTemplate?: string;
  disabled?: boolean;
}
export default function StyledToggleButtonGroup(props: Props) {
  const { label, value, options, setValue, gridAutoFlow, gridTemplate } = props;

  const handleChange = (
    _event: React.MouseEvent<HTMLElement>,
    newValue: number,
  ) => {
    setValue(newValue);
  };

  return (
    <Box>
      <SectionTitle>{label}</SectionTitle>
      <StyledMUIToggleButtonGroup
        color="success"
        value={value}
        exclusive
        onChange={handleChange}
        aria-label={label}
        sx={{ gridAutoFlow, gridTemplate }}
      >
        {options.map((option, idx) => (
          <StyledToggleButton
            key={`${option.title}-${idx}`}
            value={option.value}
            sx={{ textTransform: "none" }}
          >
            {option.title}
          </StyledToggleButton>
        ))}
      </StyledMUIToggleButtonGroup >
    </Box>
  );
}

const StyledMUIToggleButtonGroup = styled(MUIToggleButtonGroup)`
  display: grid;
  grid-row-gap: 8px;
  grid-column-gap: 16px;
`;
const StyledToggleButton = styled(ToggleButton)`
  border-radius: 4px !important;
  border: 1px solid rgba(0, 0, 0, 0.12) !important;
`;