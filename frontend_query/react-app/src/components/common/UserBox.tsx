import {
  Box,
  Grid,
  Tooltip,
  Typography,
  IconButton,
  Divider,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { type User } from 'interfaces';

interface UserBoxProps {
  user: User | undefined;
}

export const UserBox = ({ user }: UserBoxProps) => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(`/${user?.username}`);
  };

  return (
    <>
      <Grid container>
        <Grid item xs={2}>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="100%"
          >
            <Tooltip title="戻る">
              <IconButton onClick={goBack}>
                <ArrowBackIcon />
              </IconButton>
            </Tooltip>
          </Box>
        </Grid>
        <Grid item xs={10}>
          <Box>
            <Typography variant="h6">{user?.name}</Typography>
            <Typography variant="body2" color="textSecondary">
              @{user?.username}
            </Typography>
          </Box>
        </Grid>
      </Grid>
      <Divider sx={{ mb: 2, pt: 1 }} />
    </>
  );
};
