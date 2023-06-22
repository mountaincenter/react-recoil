import { format } from 'date-fns';
import { Typography, Divider, Paper, List } from '@mui/material';
import { type Todo, type User } from 'interfaces';
import TodoItem from './TodoItem';

import { updateTodo, deleteTodo } from 'lib/api/todos';

import { useRecoilValue, useSetRecoilState } from 'recoil';
import {
  filteredTodoListState,
  todoListState,
} from 'components/recoil/States/todoState';

import { currentUserState } from 'components/recoil/States/AuthState';

interface TodoListByDateProps {
  todos?: Todo[];
  makeTodoLink?: (todo: Todo) => string;
  isProfile?: boolean;
  userName?: string;
  userId?: number;
  makeIsCurrentUser?: any;
}

const TodoListByDate: React.FC<TodoListByDateProps> = ({
  todos: todosProps,
  makeTodoLink,
  isProfile,
  userName,
  userId,
  makeIsCurrentUser,
}) => {
  const todoState: Todo[] = useRecoilValue(filteredTodoListState);
  const todos = todosProps ?? todoState;
  const setTodos = useSetRecoilState(todoListState);

  const currentUser = useRecoilValue(currentUserState);

  const defaultMakeTodoLink = (todo: Todo) =>
    `/${todo.user.username}/status/${todo.id}`;
  const actualMakeTodoLink = makeTodoLink ?? defaultMakeTodoLink;

  const defaultIsCurrentUser = (todo: Todo): boolean => {
    return todo.user.id === currentUser?.id;
  };

  const actualMakeIsCurrentUser = makeIsCurrentUser ?? defaultIsCurrentUser;

  const todosByDate = todos.reduce(
    (acc: { [date: string]: Todo[] }, todo: Todo) => {
      const date = format(new Date(todo.createdAt), 'M月d日');
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(todo);
      return acc;
    },
    {}
  );

  const handleToggleComplete = async (id: number, isComplete: boolean) => {
    // `updateTodo`関数を使ってサーバー側に更新を送信
    await updateTodo(id, { isComplete: isComplete });

    // `setTodos`を使ってローカルのステートを更新
    setTodos((prevTodos: Todo[]) => {
      return prevTodos.map((todo: Todo) => {
        if (todo.id === id) {
          // `isComplete`を反転させた新しいオブジェクトを返す
          return { ...todo, isComplete: !todo.isComplete };
        }
        return todo;
      });
    });
  };

  const handleDeleteTodo = async (id: number) => {
    await deleteTodo(id);
    setTodos((prevTodos: Todo[]) => {
      prevTodos.filter((todo: Todo) => todo.id !== id);
    });
  };

  const handleUpdateTodo = async (id: number, title: string) => {
    await updateTodo(id, { title });
    setTodos((prevTodos: Todo[]) =>
      prevTodos.map((todo: Todo) =>
        todo.id === id ? { ...todo, title } : todo
      )
    );
  };

  return (
    <>
      <Paper elevation={3}>
        <List>
          {Object.entries(todosByDate).map(([date, todos]) => (
            <div key={date}>
              <Divider>
                <Typography variant="body1">{date}</Typography>
              </Divider>
              {todos.map((todo: Todo) => (
                <TodoItem
                  key={todo.id}
                  todo={todo}
                  onDelete={handleDeleteTodo}
                  onToggleComplete={handleToggleComplete}
                  onUpdate={handleUpdateTodo}
                  isProfile={isProfile}
                  userId={userId}
                  actualMakeTodoLink={actualMakeTodoLink}
                  isCurrentUser={actualMakeIsCurrentUser(todo)}
                />
              ))}
            </div>
          ))}
        </List>
      </Paper>
    </>
  );
};

export default TodoListByDate;
