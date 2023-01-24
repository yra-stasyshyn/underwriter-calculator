import { Container, Stack, Typography } from "@mui/material";
import { Box } from '@mui/system';

import logoSrc from "../../assets/images/logo.png";
import phoneSrc from "../../assets/images/phone.svg";

const Header = () => (
  <Box sx={{ backgroundColor: "#ccc", padding: "10px 0px", marginBottom: "20px" }}>
    <Container maxWidth="lg">
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <a href="/">
          <img src={logoSrc} style={{ cursor: "pointer" }} alt="logo" />
        </a>
        <Stack direction="row" alignItems="center" sx={{ gap: "8px" }}>
          <img src={phoneSrc} width={40} alt="phone" />
          <Stack direction="column">
            <Typography variant="body2">Contact Us</Typography>
            <Typography variant='h5' fontFamily="BlinkMacSystemFont" fontWeight="bold">1-866-478-4119</Typography>
          </Stack>
        </Stack>
      </Stack>
      <Typography variant='h4' align='left' sx={{ fontWeight: "bold", m: "auto", marginBottom: 6, marginTop: 4, zIndex: 2 }}>Underwriter Calculator</Typography>
    </Container>
  </Box>
);

export default Header;