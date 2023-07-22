import { Divider, Grid } from '@mui/material';

import PostList from 'components/post/PostList';
import UserList from 'components/user/profile/UserList';
import { type Post, type User } from 'interfaces';

interface SearchListProps {
  users: User[];
  posts: Post[];
}

const SearchList = ({ users, posts }: SearchListProps) => {
  // console.log(users);
  // console.log(posts);

  return (
    <>
      <Grid container direction="column" sx={{ mt: 2 }}>
        <Grid item mobile={12}>
          <Divider />
        </Grid>
        <Grid item mobile={12}>
          {users && users.length > 0 && <UserList users={users as User[]} />}
        </Grid>
        <Grid item mobile={12}>
          <Divider />
        </Grid>
        <Grid item mobile={12}>
          {posts && posts.length > 0 && <PostList posts={posts as Post[]} />}
        </Grid>
      </Grid>
    </>
  );
};

export default SearchList;
