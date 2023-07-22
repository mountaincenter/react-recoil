import { type User } from 'interfaces';
import {
  List,
  ListItem,
  Divider,
  ListItemAvatar,
  ListItemText,
  Typography,
} from '@mui/material';

import { UserAvatar } from 'components/common/UserAvatar';

import { Link } from 'react-router-dom';

interface UserListProps {
  users: User[];
}

const UserList = ({ users }: UserListProps) => {
  return (
    <>
      {users?.map((user: User) => (
        <List key={user.id} sx={{ width: '700px' }}>
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
    </>
  );
};

export default UserList;
