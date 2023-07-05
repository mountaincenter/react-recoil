import React, { useState } from 'react';
import { Grid, TextField, Button, Box } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { useMessage } from '../../../hooks/message/useMessage';

interface MessageFormProps {
  publicId: string;
}

const MessageForm: React.FC<MessageFormProps> = ({ publicId }) => {
  const { messageMutation } = useMessage(publicId);
  const [body, setBody] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBody(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    messageMutation.mutate(body);
    setBody('');
  };
  return (
    <>
      <Grid container justifyContent="center" sx={{ marginTop: '2rem' }}></Grid>
      <Box
        component="form"
        display="flex"
        alignItems="center"
        sx={{ padding: '2px 4px' }}
        onSubmit={handleSubmit}
      >
        <TextField
          required
          multiline
          sx={{ width: '100%' }}
          value={body}
          onChange={handleInputChange}
        />
        <Button
          variant="contained"
          color="primary"
          sx={{ marginLeft: '0.5rem' }}
          type="submit"
          disabled={body === '' || messageMutation.isLoading}
        >
          <SendIcon />
        </Button>
      </Box>
    </>
  );
};

export default MessageForm;
