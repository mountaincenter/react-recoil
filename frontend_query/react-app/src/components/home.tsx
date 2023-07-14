import { useCurrentUser } from '../hooks/currentUser/useCurrentUser';
import PostList from './post/PostList';
import PostBox from '../components/common/PostBox';
import { Grid, Divider, Typography } from '@mui/material';
import { usePosts } from 'hooks/post/usePosts';
import LoadingAndErrorComponent from './utils/LoadingAndErrorComponent';

const Home = () => {
  const { currentUser, error, isLoading } = useCurrentUser();
  const { posts } = usePosts();
  // console.log(currentUser);
  return (
    <>
      <LoadingAndErrorComponent isLoading={isLoading} error={error}>
        <Grid container spacing={0}>
          <Grid item>
            <Divider orientation="vertical" />
          </Grid>
          <Grid item mobile={11}>
            <Grid item sx={{ ml: 2, mb: 3 }}>
              <Typography variant="h6">ホーム</Typography>
            </Grid>
            <Grid>
              <Divider />
            </Grid>
            {currentUser && <PostBox text={'いまどうしている?'} />}
            {posts && <PostList posts={posts} />}
          </Grid>
          <Grid item>
            <Divider orientation="vertical" />
          </Grid>
        </Grid>
      </LoadingAndErrorComponent>
    </>
  );
};

export default Home;
