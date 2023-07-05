import { AppBar, Toolbar, Typography, Container } from '@mui/material';
import { Link } from 'react-router-dom';
import AuthButton from './AuthButton';

const Footer: React.FC = () => {
  return (
    <>
      <Container maxWidth="xl" sx={{ position: 'relative' }}>
        <AppBar
          position="static"
          sx={{ position: 'absolute', width: '100%', bottom: 0 }}
        >
          <Toolbar>
            <Typography
              variant="h6"
              component={Link}
              to="/"
              sx={{ flexGrow: 1, textDecoration: 'none', color: 'inherit' }}
            >
              Sample
            </Typography>
            <AuthButton />
          </Toolbar>
        </AppBar>
      </Container>
    </>
  );
};

export default Footer;
