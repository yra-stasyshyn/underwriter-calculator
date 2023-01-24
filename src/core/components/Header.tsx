import { Stack, Typography } from "@mui/material";
import { Box } from '@mui/system';

import logoSrc from "../../assets/images/logo.png";
import phoneSrc from "../../assets/images/phone.svg";

const Header = () => (
  <Box sx={{ backgroundColor: "#ccc", padding: "10px 135px", marginBottom: "20px" }}>
    <Stack direction="row" justifyContent="space-between" alignItems="center">
      <a href="/">
        <img src={logoSrc} style={{ cursor: "pointer" }} alt="logo" />
      </a>
      <Stack direction="row" alignItems="center" sx={{ gap: "8px" }}>
        <img src={phoneSrc} width={40} />
        <Stack direction="column">
          <Typography variant="body2">Contact Us</Typography>
          <Typography variant='h5' fontFamily="BlinkMacSystemFont" fontWeight="bold">1-866-478-4119</Typography>
        </Stack>
      </Stack>
    </Stack>
    <Typography variant='h4' align='left' sx={{ fontWeight: "bold", m: "auto", marginBottom: 6, marginTop: 4, zIndex: 2 }}>Underwriter Calculator</Typography>
  </Box>
);

export default Header;