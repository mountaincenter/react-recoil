import { type Post } from 'interfaces';
import {
  Card,
  Typography,
  CardActions,
  Box,
  Tooltip,
  Grid,
  Divider,
} from '@mui/material';

import { Link } from 'react-router-dom';

import Like from './Like';
import Reply from './Reply';
import Bookmark from 'components/user/bookmark/Bookmark';
import TooltipTime from './TooltipTime';
import CarouselImage from './CarouselImage';

import { formatDistance } from 'date-fns';
import { ja } from 'date-fns/locale';
import { UserAvatar } from 'components/common/UserAvatar';

interface PostListProps {
  posts: Post[];
}

const PostList = ({ posts }: PostListProps): JSX.Element => {
  return (
    <>
      {posts.map((post: Post) => (
        <>
          <Box
            sx={{
              textDecoration: 'none',
              color: 'inherit',
              mt: 2,
              ml: 2,
            }}
          >
            <Card sx={{ boxShadow: 'none' }} key={post.id}>
              <Grid container>
                <Grid item mobile="auto">
                  <UserAvatar
                    name={post.user.name}
                    avatar={post.user.avatar}
                    to={post.user.username}
                    component="Link"
                  />
                </Grid>
                <Grid item mobile="auto" sx={{ pl: 1 }}>
                  <Link
                    to={`/${post.user.username}/status/${post.publicId}`}
                    style={{ textDecoration: 'none', color: 'inherit' }}
                  >
                    <Box
                      display="flex"
                      flexDirection="row"
                      width="100%"
                      flexWrap="nowrap"
                    >
                      <Typography variant="body1" component="span">
                        {post.user.name}
                      </Typography>
                      <Typography
                        color="textSecondary"
                        variant="body2"
                        component="span"
                        sx={{ pl: 1 }}
                      >
                        @{post.user.username}
                      </Typography>
                      <Tooltip title={<TooltipTime post={post} />}>
                        <Typography
                          color="textSecondary"
                          variant="body2"
                          component="span"
                          sx={{ pl: 1 }}
                        >
                          {formatDistance(
                            new Date(post.createdAt),
                            new Date(),
                            {
                              addSuffix: true,
                              locale: ja,
                            }
                          )}
                        </Typography>
                      </Tooltip>
                    </Box>
                    {post.parent && (
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        component="span"
                      >
                        返信先:{' '}
                        <Link to={`/${post.parent.user.username}`}>
                          @{post.parent.user.username}
                        </Link>{' '}
                        さん
                      </Typography>
                    )}
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="span"
                    >
                      {post.content
                        .split('\n')
                        .map((content: string, index: number) => {
                          return <p key={index}>{content}</p>;
                        })}
                    </Typography>
                    <CarouselImage post={post} />
                  </Link>
                  <CardActions>
                    <Reply publicId={post.publicId} />
                    <Like publicId={post.publicId} />
                    <Bookmark publicId={post.publicId} />
                  </CardActions>
                </Grid>
              </Grid>
            </Card>
          </Box>
          <Divider />
        </>
      ))}
    </>
  );
};

export default PostList;
