import React, { useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useMessages } from 'hooks/message/useMessages';
import { useCurrentUser } from 'hooks/currentUser/useCurrentUser';

import { Message as MessageType } from 'interfaces';
import { Grid, Typography, Box, Divider } from '@mui/material';
import { UserAvatar } from 'components/common/UserAvatar';
import MessageForm from './MessageForm';

const MessageDetails = () => {
  const { publicId } = useParams();
  const { messages, isLoading, error } = useMessages(publicId ? publicId : '');
  const { currentUser } = useCurrentUser();

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  if (isLoading) {
    return <div>loading...</div>;
  }

  if (error) {
    return <div>Error</div>;
  }

  console.log(messages);

  const iso8601ToDateTime = (iso8601: string): string => {
    const date = new Date(Date.parse(iso8601));
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hour = date.getHours();
    const minute = date.getMinutes();

    return `${year}年${month}月${day}日${hour}時${minute}分`;
  };

  const otherUser =
    messages &&
    messages.length > 0 &&
    (messages[0].sender.publicId === currentUser?.publicId
      ? messages[0].recipient
      : messages[0].sender);

  return (
    <React.Fragment>
      {otherUser && (
        <>
          <Grid
            container
            display="flex"
            justifyContent="center"
            alignItems="center"
            direction="column"
            sx={{ maxWidth: '50%', margin: 'auto' }}
          >
            <UserAvatar
              pathname={otherUser.username}
              name={otherUser.name}
              avatar={otherUser.avatar}
              sx={{ width: 60, height: 60, mb: 1 }}
            />
            <Typography variant="body2" color="textPrimary" component="span">
              {otherUser.name}
            </Typography>
            <Typography variant="body2" color="textPrimary" component="span">
              @{otherUser.username}
            </Typography>
            <Typography variant="body2" color="textPrimary" component="span">
              {otherUser.profile}
            </Typography>
          </Grid>
          <Divider />
        </>
      )}
      <Box
        sx={{
          overflow: 'auto',
          height: 'calc(100dvh - 300px)',
        }}
      >
        {messages?.map((message: MessageType, index: number) => (
          <React.Fragment key={index}>
            <Grid
              key={index}
              container
              direction="column"
              justifyContent={
                message.sender.publicId === publicId ? 'flex-start' : 'flex-end'
              }
            >
              <Grid item>
                <Grid
                  container
                  justifyContent={
                    message.sender.publicId === publicId
                      ? 'flex-start'
                      : 'flex-end'
                  }
                >
                  <Box
                    borderRadius={9999}
                    bgcolor={
                      message.sender.publicId === publicId
                        ? '#d3d3d3'
                        : '#ffb6c1'
                    }
                    color={
                      message.sender.publicId === publicId
                        ? '#000000'
                        : '#ffffff'
                    }
                    m={1}
                    border={0}
                    boxShadow={1}
                    p={2}
                    sx={{ maxWidth: '100%' }}
                  >
                    <Typography variant="body1" component="p">
                      {message.body}
                    </Typography>
                  </Box>
                </Grid>
                <Typography
                  variant="caption"
                  component="p"
                  color="textSecondary"
                  style={{
                    textAlign:
                      message.sender.publicId === publicId ? 'left' : 'right',
                  }}
                >
                  {iso8601ToDateTime(
                    message.createdAt?.toString() ?? '100000000'
                  )}
                </Typography>
              </Grid>
            </Grid>
          </React.Fragment>
        ))}
        <div ref={messagesEndRef} />
      </Box>
      <MessageForm publicId={publicId ? publicId : ''} />
    </React.Fragment>
  );
};

export default MessageDetails;
