import { type User } from 'interfaces';
import {
  List,
  ListItem,
  Divider,
  ListItemAvatar,
  ListItemText,
  Typography,
} from '@mui/material';
import { useUsers } from 'hooks/user/useUsers';
import LoadingAndErrorComponent from 'components/utils/LoadingAndErrorComponent';

import { UserAvatar } from 'components/common/UserAvatar';

import { Link } from 'react-router-dom';

const UsersList = () => {
  const { users, isLoading, error } = useUsers();

  return (
    <LoadingAndErrorComponent isLoading={isLoading} error={error}>
      <h4>User List</h4>
      {users?.map((user: User) => (
        <List key={user.id}>
          <ListItem alignItems="flex-start">
            <ListItemAvatar>
              <UserAvatar
                pathname={user.username}
                name={user.name}
                avatar={user.avatar}
              />
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
    </LoadingAndErrorComponent>
  );
};

export default UsersList;
