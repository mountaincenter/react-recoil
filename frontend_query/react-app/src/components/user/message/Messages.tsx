import { Grid, Divider } from '@mui/material';
import MessageList from './MessageList';
import MessageDetails from './MessageDetails';
import { useLocation } from 'react-router-dom';

const Messages = () => {
  const location = useLocation();
  console.log(location.pathname);
  return (
    <>
      <Grid container alignItems="stretch">
        <Grid item xs={4}>
          <MessageList />
        </Grid>
        <Grid item xs={1}>
          <Divider orientation="vertical" flexItem />
        </Grid>
        {location.pathname === '/messages' ? (
          <Grid item xs={7}>
            <div>メッセージがここに表示されます</div>
          </Grid>
        ) : (
          <Grid item xs={7}>
            <MessageDetails />
          </Grid>
        )}
      </Grid>
    </>
  );
};

export default Messages;
