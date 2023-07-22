import { Grid, Divider, useMediaQuery } from '@mui/material';
import MessageList from './MessageList';
import MessageDetails from './MessageDetails';
import { useLocation } from 'react-router-dom';
import theme from 'theme';

const Messages = () => {
  const location = useLocation();
  const isMobile = useMediaQuery(theme.breakpoints.down('tablet'));
  console.log(location.pathname);
  return (
    <>
      <Grid container alignItems="stretch">
        <Grid item mobile={4}>
          <MessageList />
        </Grid>
        <Grid item mobile={1}>
          <Divider orientation="vertical" flexItem />
        </Grid>
        {location.pathname === '/messages' ? (
          <Grid item mobile={7}>
            <div>メッセージがここに表示されます</div>
          </Grid>
        ) : (
          <Grid item mobile={7}>
            <MessageDetails />
          </Grid>
        )}
      </Grid>
    </>
  );
};

export default Messages;
