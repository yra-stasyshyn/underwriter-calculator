import * as React from 'react';
import { styled } from '@mui/material';
import ToggleButton from '@mui/material/ToggleButton';
import MUIToggleButtonGroup from '@mui/material/ToggleButtonGroup';

interface Props {
  label: string;
  value: number | undefined;
  setValue: (val: number) => void;
  options: Array<{
    title: string;
    value: number;
  }>;
  gridAutoFlow: "row" | "column";
  gridTemplate: string; // 1 ~ 12
}
export default function ToggleButtonGroup(props: Props) {
  const { label, value, options, setValue, gridAutoFlow, gridTemplate } = props;

  const handleChange = (
    _event: React.MouseEvent<HTMLElement>,
    newValue: number,
  ) => {
    setValue(newValue);
  };

  return (
    <StyledMUIToggleButtonGroup
      color="success"
      value={value}
      exclusive
      onChange={handleChange}
      aria-label={label}
      sx={{ gridAutoFlow, gridTemplate }}
    >
      {options.map((option, idx) => (
        <StyledToggleButton key={`${option.title}-${idx}`} value={option.value}>{option.title}</StyledToggleButton>
      ))}
    </StyledMUIToggleButtonGroup >
  );
}

const StyledMUIToggleButtonGroup = styled(MUIToggleButtonGroup)`
  display: grid;
  gap: 8px;
`;
const StyledToggleButton = styled(ToggleButton)`
  border-radius: 4px !important;
  border: 1px solid rgba(0, 0, 0, 0.12) !important;
`;