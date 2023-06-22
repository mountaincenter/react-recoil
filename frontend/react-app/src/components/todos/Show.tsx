import React, { useEffect } from 'react';
import {
  atom,
  selectorFamily,
  useRecoilState,
  useRecoilCallback,
} from 'recoil';
import { useParams } from 'react-router-dom';
import client from 'lib/api/client';
import { type Todo } from 'interfaces';

import {
  Container,
  Grid,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  IconButton,
  Avatar,
  Box,
  Typography,
} from '@mui/material';

import FavoriteIcon from '@mui/icons-material/Favorite';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import { formatDistance } from 'date-fns';
import { ja } from 'date-fns/locale';

export const todoDetailState = atom<Todo | null>({
  key: 'todoDetailState',
  default: null,
});

export const todoDetailQuery = selectorFamily<Todo, number>({
  key: 'todoDetailQuery',
  get:
    (id: number) =>
    async ({ get }) => {
      const response = await client.get(`todos/${id}`);
      console.log(response);
      return response.data;
    },
});

const Show = () => {
  console.log(todoDetailState);
  const { id } = useParams();
  const idAsNumber = id ? parseInt(id, 10) : 0;

  const [todo, setTodo] = useRecoilState(todoDetailState);

  const getTodoDetail = useRecoilCallback(({ snapshot }) => async () => {
    const todoDetail = await snapshot.getPromise(todoDetailQuery(idAsNumber));
    setTodo(todoDetail);
  });

  useEffect(() => {
    getTodoDetail();
  }, []);

  console.log(todo);

  return (
    <>
      {todo && (
        <>
          <Container maxWidth="xl">
            <Grid container justifyContent="center">
              <Card sx={{ width: 600 }}>
                <CardHeader
                  avatar={
                    <>
                      {todo?.user.avatar.url ? (
                        <Avatar
                          alt={todo?.user.name}
                          src={todo?.user.avatar.url}
                        />
                      ) : (
                        <Avatar>
                          {todo?.user.username} {''}
                          {todo?.user.name[0]}
                        </Avatar>
                      )}
                    </>
                  }
                  title={<Typography>{todo?.user.name}</Typography>}
                  subheader={
                    <>
                      <Typography color="textSecondary">
                        @{todo?.user.username}{' '}
                      </Typography>
                      <Typography color="textSecondary">
                        {formatDistance(new Date(todo?.createdAt), new Date(), {
                          locale: ja,
                          addSuffix: true,
                        })}
                      </Typography>
                    </>
                  }
                />
                <CardContent>
                  <Typography>{todo?.title}</Typography>
                </CardContent>
                <CardActions>
                  <IconButton aria-label="add to favorites">
                    <FavoriteIcon></FavoriteIcon>
                  </IconButton>
                  <IconButton aria-label="add to bookmarks">
                    <BookmarkIcon></BookmarkIcon>
                  </IconButton>
                  <IconButton aria-label="edit">
                    <EditIcon></EditIcon>
                  </IconButton>
                  <IconButton aria-label="delete">
                    <DeleteIcon></DeleteIcon>
                  </IconButton>
                </CardActions>
              </Card>
            </Grid>
          </Container>
        </>
      )}
    </>
  );
};

export default Show;
