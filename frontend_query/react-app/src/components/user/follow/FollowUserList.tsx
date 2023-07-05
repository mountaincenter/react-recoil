import { type User } from 'interfaces';
import {
  ListItem,
  ListItemAvatar,
  Divider,
  Box,
  Typography,
  Grid,
} from '@mui/material';

import { Link } from 'react-router-dom';

import FollowButton from './FollowButton';

import { useCurrentUser } from '../../../hooks/currentUser/useCurrentUser';

import { UserAvatar } from '../../common/UserAvatar';

interface FollowUserListProps {
  follow: User;
}
const FollowUserList: React.FC<FollowUserListProps> = ({
  follow,
}: FollowUserListProps) => {
  const { currentUser } = useCurrentUser();
  return (
    <>
      <ListItem>
        <Grid container>
          <Grid item xs={1}>
            <ListItemAvatar>
              <UserAvatar
                pathname={follow.username}
                name={follow.name}
                avatar={follow.avatar}
              />
            </ListItemAvatar>
          </Grid>
          <Grid item xs={9}>
            <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
              <Typography
                variant="body1"
                component={Link}
                to={`/${follow.username}`}
                sx={{ mr: 1, textDecoration: 'none', color: 'inherit' }}
              >
                {follow.name}
              </Typography>
              <Typography
                variant="body2"
                color="textSecondary"
                component={Link}
                to={`/${follow.username}`}
                sx={{ textDecoration: 'none' }}
              >
                @{follow.username}
              </Typography>
            </Box>
            <Typography variant="subtitle2">
              {follow.profile ? follow.profile : 'よろしくお願いします'}
            </Typography>
          </Grid>
          <Grid item xs={2}>
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              height="100%"
            >
              {currentUser.id !== follow.id && (
                <FollowButton
                  initialIsFollowing={follow.followed ? follow.followed : false}
                  username={follow.username}
                  id={follow.id}
                />
              )}
            </Box>
          </Grid>
        </Grid>
      </ListItem>
      <Divider />
    </>
  );
};

export default FollowUserList;
