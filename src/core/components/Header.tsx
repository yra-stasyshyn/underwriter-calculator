import { Stack, Typography } from "@mui/material";
import { Box } from '@mui/system';

import logoSrc from "../../assets/images/logo.png";
import PhoneIcon from "../../assets/images/phone.png";

const Header = () => (
  <Box sx={{ position: "relative" }}>
    <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ zIndex: 2 }}>
      <img src={logoSrc} style={{ paddingTop: 1, paddingBottom: 2 }} alt="logo" />
      <Stack direction="row" alignItems="center">
      <img src={PhoneIcon} style={{ right: 0, height: '50px', width: '50px'}} alt="phone" />
        <Stack direction="column" alignItems="flex-start" sx={{marginLeft: 2}}>
          <Typography variant='h6' align='right' sx={{color: 'grey'}}>Contact Us</Typography>
          <Typography variant='h5' align='right' sx={{fontWeight: 'bold'}}>1-866-478-4119</Typography>
        </Stack>
      </Stack>
    </Stack>
    <Typography variant='h4' align='left' sx={{ fontWeight: "bold", m: "auto", marginBottom: 6, marginTop: 4, zIndex: 2 }}>Underwriter Calculator</Typography>
  </Box>
);

export default Header;