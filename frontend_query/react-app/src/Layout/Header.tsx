import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import LogOutButton from '../components/auth/Logout';

const Header = () => {
  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Sample
          </Typography>
          <Button component={Link} to="/login" color="inherit">
            Login
          </Button>
          <LogOutButton />
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Header;
