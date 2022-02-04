import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Todo {
  title: string;
  description: string | number | undefined;
  statusDone: boolean;
  executionDate: string;
  executionTime: string;
  id: string | number;
}

export type Todos = {
  todos: Todo[];
};

interface DoneTodoPayload {
  id: string | number;
  status: boolean;
}

type RemoveTodoPayload = string | number;

const initialState: Todos = {
  todos: [
    {
      title: 'Morning run',
      description: 'Do every day',
      statusDone: true,
      executionDate: 'empty',
      executionTime: 'empty',
      id: Math.random().toString(),
    },
    {
      title: 'Read book',
      description: 'Continue reading my favorite',
      statusDone: false,
      executionDate: 'empty',
      executionTime: 'empty',
      id: Math.random().toString(),
    },
    {
      title: 'Take a walk',
      description: 'Invite friends for a walk',
      statusDone: false,
      executionDate: 'empty',
      executionTime: 'empty',
      id: Math.random().toString(),
    },
    {
      title: 'Call friends',
      description: 'Every time I assure you that I appreciate them',
      statusDone: false,
      executionDate: 'empty',
      executionTime: 'empty',
      id: Math.random().toString(),
    },
  ],
};

export const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTodo(state, action: PayloadAction<Todo>) {
      state.todos.push(action.payload);
    },
    doneTodo(state, action: PayloadAction<DoneTodoPayload>) {
      state.todos = state.todos.map((todo) => {
        if (todo.id === action.payload.id) {
          return { ...todo, statusDone: action.payload.status };
        }
        return todo;
      });
    },
    removeTodo(state, action: PayloadAction<RemoveTodoPayload>) {
      state.todos = state.todos.filter((todo) => {
        return todo.id !== action.payload;
      });
    },
    removeAllTodos(state) {
      state.todos = [];
    },
  },
});

export default todosSlice.reducer;
