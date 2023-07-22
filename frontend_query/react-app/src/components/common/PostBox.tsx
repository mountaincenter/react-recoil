import React, { useEffect, useState } from 'react';
import {
  Avatar,
  Card,
  Box,
  Grid,
  Divider,
  TextField,
  Button,
  IconButton,
  Typography,
} from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';
import { useCreatePost } from 'hooks/post/useCreatePost';
import { useCurrentUser } from 'hooks/currentUser/useCurrentUser';
import { useSetRecoilState } from 'recoil';
import { dialogState } from 'atoms/dialogState';
import { imageState } from 'atoms/imageState';
import ImageUploader from 'components/common/ImageUploader';

interface PostBoxProps {
  text?: string;
  parentId?: number;
  parentUsername?: string;
}

const PostBox: React.FC<PostBoxProps> = ({
  text = 'いまどうしてる?',
  parentId,
  parentUsername,
}) => {
  const { currentUser } = useCurrentUser();
  const { mutate } = useCreatePost().postMutation;
  const [content, setContent] = useState('');
  const setImages = useSetRecoilState(imageState);
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const setDialogOpen = useSetRecoilState(dialogState);

  useEffect(() => {
    setSelectedImages([]);
  }, [selectedImages]);

  const handlePost = () => {
    const formData = new FormData();
    selectedImages.forEach((image: string) => {
      formData.append('images[]', image);
    });
    formData.append('content', content);
    if (parentId) {
      formData.append('parentId', parentId.toString());
    }
    mutate(formData);
    setContent('');
    setImages([]);
    setDialogOpen({ isOpen: false, type: null });
  };

  const handleOnRemoveImage = (index: number): void => {
    setSelectedImages((prev: string[]) =>
      prev.filter((_, i: number) => i !== index)
    );
  };

  return (
    <Box
      sx={{
        textDecoration: 'none',
        color: 'inherit',
        mt: 2,
        ml: 2,
        mb: 2,
      }}
      width="100%"
    >
      <Card sx={{ boxShadow: 'none' }}>
        <Grid container>
          <Grid item>
            <Avatar src={currentUser?.avatar.url}></Avatar>
          </Grid>
          <Grid item mobile={8} sx={{ pl: 1 }}>
            {parentUsername && (
              <Typography>返信先:@{parentUsername}さん</Typography>
            )}
            <TextField
              variant="standard"
              placeholder={text}
              InputProps={{
                disableUnderline: true,
              }}
              fullWidth
              sx={{ fontSize: '15px' }}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              multiline
            />
            {selectedImages.map((image, i) => (
              <div key={i} style={{ maxWidth: '100%', maxHeight: '100%' }}>
                <IconButton onClick={() => handleOnRemoveImage(i)}>
                  <CancelIcon />
                </IconButton>
                <img
                  src={image}
                  alt="preview img"
                  style={{ width: '100%', height: '100%' }}
                />
              </div>
            ))}
            <ImageUploader onUpload={setImages} />
            <Button
              variant="contained"
              sx={{ borderRadius: '9999px' }}
              onClick={handlePost}
              size="small"
              disabled={content === '' || content.length > 140}
            >
              ツイートする
            </Button>
          </Grid>
        </Grid>
      </Card>
      <Divider />
    </Box>
  );
};

export default PostBox;
