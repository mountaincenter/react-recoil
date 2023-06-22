import { useState } from 'react';
import {
  ListItem,
  ListItemText,
  Checkbox,
  IconButton,
  TextField,
} from '@mui/material';

import { Link } from 'react-router-dom';

import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

import { type Todo } from 'interfaces';

interface TodoItemProps {
  todo: Todo;
  isCurrentUser: boolean;
  onDelete: (id: number) => void;
  onToggleComplete: (id: number, isComplete: boolean) => void;
  onUpdate: (id: number, title: string) => void;
  isProfile?: boolean;
  userName?: string;
  userId?: number;
  actualMakeTodoLink?: (todo: Todo) => string;
}

const TodoItem: React.FC<TodoItemProps> = ({
  todo,
  isCurrentUser,
  onDelete,
  onToggleComplete,
  onUpdate,
  isProfile,
  userName,
  userId,
  actualMakeTodoLink,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(todo.title);

  const handleEdit = () => setIsEditing(true);
  const handleSave = () => {
    onUpdate(todo.id, title);
    setIsEditing(false);
  };

  return (
    <ListItem>
      {isCurrentUser && (
        <Checkbox
          checked={todo.isComplete}
          onChange={() => onToggleComplete(todo.id, !todo.isComplete)}
        />
      )}
      {isEditing ? (
        <TextField
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onBlur={handleSave}
          onKeyPress={(e) => e.key === 'Enter' && handleSave()}
        />
      ) : (
        <Link
          to={actualMakeTodoLink!(todo)}
          style={{
            textDecoration: 'none',
            color: 'black',
            flexGrow: 1,
          }}
        >
          <ListItemText>{todo.title}</ListItemText>
        </Link>
      )}
      {isProfile ? (
        <ListItemText sx={{ textAlign: 'right', mr: 3 }}>
          {userName}
        </ListItemText>
      ) : (
        <Link
          to={`/${todo.user.username}`}
          style={{ textDecoration: 'none', color: 'black' }}
        >
          <ListItemText sx={{ textAlign: 'right', mr: 3 }}>
            {todo.user.name}
          </ListItemText>
        </Link>
      )}

      {isCurrentUser && (
        <>
          <IconButton onClick={handleEdit}>
            <EditIcon />
          </IconButton>
          <IconButton onClick={() => onDelete(todo.id)}>
            <DeleteIcon />
          </IconButton>
        </>
      )}
    </ListItem>
  );
};

export default TodoItem;
