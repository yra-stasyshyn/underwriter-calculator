import { Typography } from "@mui/material";
import logoSrc from "../../../assets/images/logo.png";
import { Container, styled } from '@mui/material';
import CallIcon from '@mui/icons-material/Call';

const Row = styled(Container)`
  display: flex;
  flex-direction: row;
`;

const Col = styled(Container)`
  display: flex;
  flex-direction: column;
`;

const Header = ({ children }: any) => (
  <>
    <Row>
      <img src={logoSrc} style={{ paddingTop: 1, paddingBottom: 2 }} alt="logo" />
      <CallIcon sx={{right: 0}}/>
      <Col>
        <Typography variant='h6' align='right' sx={{ }}>Contact Us</Typography>
        <Typography variant='h5' align='right' sx={{ }}>1-866-478-4119</Typography>
      </Col>
    </Row>
    <Typography variant='h4' align='left' sx={{ fontWeight: "bold", m: "auto", marginBottom: 6, marginTop: 4 }}>Underwriter Calculator</Typography>
  </>


);

export default Header;