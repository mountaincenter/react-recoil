import React, { useState } from 'react';
import { type PostFormData, type PostData } from 'interfaces';
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
import InsertPhotoOutlinedIcon from '@mui/icons-material/InsertPhotoOutlined';
import CancelIcon from '@mui/icons-material/Cancel';
import { useCreatePost } from 'hooks/post/useCreatePost';
import { useCurrentUser } from 'hooks/currentUser/useCurrentUser';

interface PostBoxProps {
  text: string;
  parentId?: number;
  parentUsername?: string;
}

const PostBox = ({
  text,
  parentId,
  parentUsername,
}: PostBoxProps): JSX.Element => {
  const { currentUser } = useCurrentUser();
  const { mutate } = useCreatePost().postMutation;
  const [content, setContent] = useState('');
  const [images, setImages] = useState<File[]>([]);
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  console.log(parentId);
  console.log(parentUsername);
  const createFormData = (postData: PostData): PostFormData => {
    const formData = new FormData();

    if (postData.images !== null) {
      postData.images.forEach((image) => {
        formData.append('images[]', image);
      });
    }

    formData.append('content', postData.content);

    if (postData.parentId) {
      formData.append('parentId', postData.parentId.toString());
    }

    return formData as PostFormData;
  };

  const handlePost = () => {
    const formData = createFormData({ content, images, parentId });
    mutate(formData);
    setContent('');
    setImages([]);
    setSelectedImages([]);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      setImages(files);

      const readers = files.map((file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        return new Promise<string>((resolve) => {
          reader.onload = () => resolve(reader.result as string);
        });
      });
      Promise.all(readers).then(setSelectedImages);
    }
  };

  const handleOnRemoveImage = (index: number): void => {
    console.log(`handleOnRemoveImage called with index: ${index}`);
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
    setSelectedImages((prevSelectedImages) =>
      prevSelectedImages.filter((_, i) => i !== index)
    );
  };

  return (
    <>
      <Box
        sx={{ textDecoration: 'none', color: 'inherit', mt: 2, ml: 2, mb: 2 }}
      >
        <Card sx={{ boxShadow: 'none' }}>
          <Grid container>
            <Grid item>
              <Avatar src={currentUser?.avatar.url}></Avatar>
            </Grid>
            <Grid item xs={8} sx={{ pl: 1 }}>
              <>
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
                  <div key={i}>
                    <Box>
                      <IconButton onClick={() => handleOnRemoveImage(i)}>
                        <CancelIcon />
                      </IconButton>
                    </Box>
                    <img
                      src={image}
                      alt="preview img"
                      style={{ width: '100%' }}
                    />
                  </div>
                ))}
              </>
              <Box display="flex" justifyContent="space-between">
                <label htmlFor="raised-button-file">
                  <IconButton component="span">
                    <InsertPhotoOutlinedIcon color="primary" />
                  </IconButton>
                </label>
                <input
                  accept="image/*"
                  type="file"
                  style={{ display: 'none' }}
                  id="raised-button-file"
                  multiple
                  onChange={handleImageChange}
                />
                <Button
                  variant="contained"
                  sx={{
                    borderRadius: '9999px',
                  }}
                  onClick={handlePost}
                  size="small"
                  disabled={content === '' || content.length > 140}
                >
                  ツイートする
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Card>
      </Box>
      <Divider />
    </>
  );
};

export default PostBox;
