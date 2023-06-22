import client from './client';
import { type Todo } from 'interfaces';


export const getTodos = async (): Promise<Todo[]> => {
  const response = await client.get<Todo[]>('/todos');
  return response.data;
}

export const getTodo = async (id: number): Promise<Todo> => {
  const response = await client.get<Todo>(`/todos/${id}`);
  return response.data;
}


export const createTodo = async (title:string, userId: number): Promise<Todo | null> => {
  try {
    const response = await client.post<Todo>('/todos', {
      title,
      user_id: userId,
    });
    return response.data;
  } catch(error) {
    console.log(error)
    return null;
  }
}

export const updateTodo = async (id: number, updates: Partial<Todo>): Promise<Todo> => {
  try {
    const response = await client.put<Todo>(`/todos/${id}`, updates);
    if (!response.data) {
      throw new Error('Failed to update todo');
    }
      console.log(response.data)
      return response.data;
  } catch(error) {
    console.log('Failed to update todo in API.', error)
    throw error;
  }
}

export const deleteTodo = async (id: number): Promise<void> => {
  try {
    await client.delete(`/todos/${id}`);
  } catch(error) {
    console.log(error)
  }
}