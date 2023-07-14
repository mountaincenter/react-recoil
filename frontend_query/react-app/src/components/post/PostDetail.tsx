import { useParams, useNavigate } from 'react-router-dom';
import { usePost } from 'hooks/post/usePost';
import LoadingAndErrorComponent from 'components/utils/LoadingAndErrorComponent';
import {
  Box,
  Grid,
  Divider,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Typography,
  IconButton,
} from '@mui/material';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';

import format from 'date-fns/format';
import { ja } from 'date-fns/locale';

import { UserAvatar } from 'components/common/UserAvatar';

import Like from './Like';
import CarouselImage from './CarouselImage';
import PostBox from '../common/PostBox';
import PostList from './PostList';

import { useCurrentUser } from 'hooks/currentUser/useCurrentUser';

const PostDetail = () => {
  const navigate = useNavigate();
  const { publicId, username } = useParams();
  const { post, isLoading, error } = usePost(publicId ? publicId : '');
  const { currentUser } = useCurrentUser();

  console.log(publicId);
  console.log(username);
  console.log(post);

  const goBack = () => {
    navigate(-1);
  };

  return (
    <LoadingAndErrorComponent isLoading={isLoading} error={error}>
      <Grid container direction="column" spacing={2}>
        <Grid item>
          <Box display="flex" alignItems="center">
            <IconButton onClick={goBack}>
              <ArrowBackIcon />
            </IconButton>
            <Typography>Post</Typography>
          </Box>
        </Grid>
        <Grid item>
          <Card sx={{ width: '400px', boxShadow: 'none' }}>
            <CardHeader
              avatar={
                <UserAvatar
                  name={post?.user.name ? post?.user.name : ''}
                  avatar={post?.user.avatar ? post?.user.avatar : { url: '' }}
                  pathname={post?.user.username ? post?.user.username : ''}
                />
              }
              title={post?.user.name}
              subheader={<>@{post?.user.username}</>}
            />
            <CardContent>
              <Typography
                variant="body2"
                color="textSecondary"
                component="span"
              >
                {post?.content
                  .split('\n')
                  .map((content: string, index: number) => {
                    return <p key={index}>{content}</p>;
                  })}
              </Typography>
            </CardContent>
            {post && post?.images.length !== 0 && <CarouselImage post={post} />}
            <CardContent>
              <Typography variant="body2" color="textSecondary">
                {post &&
                  post.createdAt &&
                  format(new Date(post.createdAt), 'a H:mm・yyyy年MM月dd日', {
                    locale: ja,
                  })}
              </Typography>
            </CardContent>
            {post?.likes.length !== 0 && (
              <>
                <Divider />
                <CardContent>
                  <Typography variant="body2" color="textSecondary">
                    <strong>{post?.likes.length}</strong> 件のいいね
                  </Typography>
                </CardContent>
              </>
            )}
            <Divider />
            <CardActions>
              <ChatBubbleOutlineOutlinedIcon sx={{ color: 'text.secondary' }} />
              <Like
                publicId={post?.publicId ? post?.publicId : ''}
                showCount={false}
              />
            </CardActions>
          </Card>
        </Grid>
        <Divider />
      </Grid>
      {currentUser && (
        <PostBox
          text={'返信をツイートしよう'}
          parentId={post?.id}
          parentUsername={post?.user.username}
        />
      )}
      {post?.replies && <PostList posts={post.replies} />}
    </LoadingAndErrorComponent>
  );
};

export default PostDetail;
