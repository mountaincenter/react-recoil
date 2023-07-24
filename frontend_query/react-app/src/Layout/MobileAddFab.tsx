import { Fab } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import theme from 'theme';
import { useNavigate } from 'react-router-dom';

const MobileAddFab = (): JSX.Element => {
  const navigate = useNavigate();

  const handleFabClick = () => {
    navigate('/post');
  };

  return (
    <Fab
      color="primary"
      aria-label="add"
      sx={{
        position: 'fixed',
        bottom: theme.spacing(10),
        right: theme.spacing(3),
        zIndex: 100,
      }}
      onClick={handleFabClick}
    >
      <AddIcon />
    </Fab>
  );
};

export default MobileAddFab;
