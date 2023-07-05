import { type User } from 'interfaces';
import {
  List,
  ListItem,
  Divider,
  ListItemAvatar,
  ListItemText,
  Typography,
} from '@mui/material';
import { useUsers } from '../../../hooks/user/useUsers';

import { UserAvatar } from '../../common/UserAvatar';

import { Link } from 'react-router-dom';

const UsersList = () => {
  const { users, isLoading, error } = useUsers();

  if (isLoading) {
    return <>Loading...</>;
  }

  if (error) {
    return <>Error: {error.message}</>;
  }

  return (
    <>
      <h4>User List</h4>
      {users?.map((user: User) => (
        <List key={user.id}>
          <ListItem alignItems="flex-start">
            <ListItemAvatar>
              <Link
                to={`/${user.username}`}
                style={{ textDecoration: 'none', color: 'inherit' }}
              >
                <UserAvatar
                  pathname={user.username}
                  name={user.name}
                  avatar={user.avatar}
                />
              </Link>
            </ListItemAvatar>
            <ListItemText
              primary={
                <>
                  <Link
                    to={`/${user.username}`}
                    style={{ textDecoration: 'none', color: 'inherit' }}
                  >
                    {user.name} <small>@{user.username}</small>
                  </Link>
                </>
              }
              secondary={
                <Typography
                  sx={{ display: 'inline' }}
                  component="span"
                  variant="body2"
                  color="text.primary"
                >
                  {user.profile ? user.profile : 'よろしくお願いします'}
                </Typography>
              }
            />
          </ListItem>
          <Divider variant="inset" component="li" />
        </List>
      ))}
    </>
  );
};

export default UsersList;
