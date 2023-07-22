import { useState } from 'react';
import { useCurrentUser } from '../hooks/currentUser/useCurrentUser';
import PostList from '../components/post/PostList';
import PostBox from '../components/common/PostBox';
import {
  Grid,
  Divider,
  Typography,
  useMediaQuery,
  Box,
  SwipeableDrawer,
} from '@mui/material';
import { usePosts } from 'hooks/post/usePosts';
import LoadingAndErrorComponent from '../components/utils/LoadingAndErrorComponent';
import theme from '../theme';

import DrawerUserDetail from 'components/user/DrawerUserDetail';
import { UserAvatar } from '../components/common/UserAvatar';

const Home = () => {
  const { currentUser, error, isLoading } = useCurrentUser();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { posts } = usePosts();
  const isMobile = useMediaQuery(theme.breakpoints.down('tablet'));

  const handleDrawerOpen = () => {
    setIsDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setIsDrawerOpen(false);
  };

  return (
    <>
      <LoadingAndErrorComponent isLoading={isLoading} error={error}>
        <Grid container spacing={0}>
          <Grid item mobile={12}>
            <Grid item sx={{ ml: 2, mb: 3 }}>
              <Box display="flex" sx={{ pl: { mobile: 2 } }}>
                {isMobile && (
                  <UserAvatar
                    name={currentUser?.name ? currentUser?.name : ''}
                    avatar={
                      currentUser?.avatar ? currentUser?.avatar : { url: '' }
                    }
                    onClick={handleDrawerOpen}
                    component="button"
                  />
                )}
                <SwipeableDrawer
                  anchor="left"
                  open={isDrawerOpen}
                  onClose={handleDrawerClose}
                  onOpen={handleDrawerOpen}
                  sx={{
                    '& .MuiDrawer-paper': {
                      boxSizing: 'border-box',
                      width: '300px',
                    },
                  }}
                >
                  {currentUser && (
                    <DrawerUserDetail
                      currentUser={currentUser}
                      handleDrawerClose={handleDrawerClose}
                    />
                  )}
                </SwipeableDrawer>
                <Typography variant="h6" sx={{ ml: { mobile: 2 } }}>
                  ホーム
                </Typography>
              </Box>
            </Grid>
            <Grid>
              <Divider />
            </Grid>
            {currentUser && !isMobile && <PostBox />}
            {posts && <PostList posts={posts} />}
          </Grid>
        </Grid>
      </LoadingAndErrorComponent>
    </>
  );
};

export default Home;
