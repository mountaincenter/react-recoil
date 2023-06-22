import { atom, selector, selectorFamily } from 'recoil';
import client from 'lib/api/client';
import { type Todo } from 'interfaces';
import { updateTodo } from 'lib/api/todos';


export const todoListState = atom({
  key: 'todoListState',
  default: selector({
    key: 'todoListState/default',
    get: async () => {
      const response = await client.get('/todos');
      return response.data;
    },
  }),
});

export const updateTodoState = selectorFamily<Todo | null, Partial<Todo> & { id: number }>({
  key: 'updateTodoState',
  get: () => async () => null,
  set: ({ id, ...updates}) => async ({ set }, _newValue) => {
    try {
      const updatedTodo = await updateTodo(id, updates);  // updateTodo関数を呼び出します
      set(todoListState, (prevTodos: Todo[]) => {
        return prevTodos.map((todo: Todo) =>
          todo.id === id ? { ...todo, ...updates} : todo
        );
      });
      console.log(updatedTodo);
      return updatedTodo;
    } catch(error) {
      console.log('Failed to update todo in updateTodoState', error);
      return null
    }
  },
});

export const todoListStatsState = selector({
  key: 'todoListStatsState',
  get: ({ get }) => {
    const todoList = get(todoListState);
    const totalNum = todoList.length;
    const totalCompletedNum = todoList.filter((todo: Todo) => todo.isComplete).length;
    const totalUncompletedNum = totalNum - totalCompletedNum;
    const percentCompleted = totalNum === 0 ? 0 : parseFloat((totalCompletedNum / totalNum).toFixed(3));

    return {
      totalNum,
      totalCompletedNum,
      totalUncompletedNum,
      percentCompleted,
    };
  }
});


export const todoListFilterState = atom({
  key: 'todoListFilterState',
  default: 'All',
});

export const filteredTodoListState = selector({
  key: 'filteredTodoListState',
  get: ({ get }) => {
    const filter = get(todoListFilterState);
    const list = get(todoListState);

    switch (filter) {
      case 'Completed':
        return list.filter((item: Todo) => item.isComplete);
      case 'Uncompleted':
        return list.filter((item: Todo) => !item.isComplete);
      default:
        return list;
    }
  }
});
