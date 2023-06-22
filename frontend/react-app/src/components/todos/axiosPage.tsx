import { useRecoilValue } from 'recoil';
import { Container, Grid } from '@mui/material';
import TodoListByDate from './ListItem';
import Graph from './Graph';
import StatsTodo from './StatsTodo';
import SelectTodo from './SelectTodo';
import CreateTodo from './CreateTodo';
import UserBox from 'components/utils/users/UserBox';

import CookieTest from 'components/todos/Cookies';

import { isSignedInState } from 'components/recoil/States/AuthState';

import AuthAppBar from 'components/auth/AuthAppBar';

const Page = () => {
  const isSignedIn = useRecoilValue(isSignedInState);

  return (
    <Container
      maxWidth="sm"
      sx={{ overflow: 'auto', maxHeight: 'calc(100vh - 64px)', pb: 3 }}
    >
      <Grid container justifyContent="center" spacing={2}>
        <Grid item xs={12}>
          <CookieTest />
        </Grid>
        <Grid item xs={12}>
          <UserBox theme={'Todo List'} />
        </Grid>
        <Graph />
        <Grid item xs={12}>
          <StatsTodo />
        </Grid>
        <Grid item xs={12}>
          <SelectTodo />
        </Grid>
        {isSignedIn && (
          <Grid item xs={12}>
            <CreateTodo />
          </Grid>
        )}
        <Grid item xs={12}>
          <TodoListByDate />
        </Grid>
      </Grid>
      <AuthAppBar />
    </Container>
  );
};

export default Page;
