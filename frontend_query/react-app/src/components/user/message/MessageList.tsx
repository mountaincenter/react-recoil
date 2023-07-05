import { useAllMessages } from 'hooks/message/useAllMessage';
import {
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Divider,
  Box,
} from '@mui/material';
import { type User } from 'interfaces';
import { Link } from 'react-router-dom';
import { UserAvatar } from '../../common/UserAvatar';
const MessageList = () => {
  const { messages, isLoading, error } = useAllMessages();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>error</div>;
  }

  console.log(messages);

  return (
    <>
      <Box
        sx={{
          overflow: 'auto',
          maxHeight: '100svh',
        }}
      >
        {messages?.map((message: User) => (
          <List key={message.id}>
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                <Link
                  to={`/messages/${message.publicId}`}
                  style={{ textDecoration: 'none', color: 'inherit' }}
                >
                  <UserAvatar
                    pathname={message.username}
                    name={message.name}
                    avatar={message.avatar}
                  />
                </Link>
              </ListItemAvatar>
              <ListItemText
                primary={
                  <>
                    <Link
                      to={`/messages/${message.publicId}`}
                      style={{ textDecoration: 'none', color: 'inherit' }}
                    >
                      {message.name} <small>@{message.username}</small>
                    </Link>
                  </>
                }
              />
            </ListItem>
            <Divider variant="inset" component="li" />
          </List>
        ))}
      </Box>
    </>
  );
};

export default MessageList;
