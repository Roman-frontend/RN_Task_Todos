import { createAction, createReducer } from '@reduxjs/toolkit';
import { dateCreator } from '../components/Helpers/DateCreator';

const ADD_TODO = 'ADD_TODO';
const DONE_TODO = 'DONE_TODO';
const REMOVE_TODO = 'REMOVE_TODO';
const REMOVE_ALL_TODOS = 'REMOVE_ALL_TODOS';

const initialState = {
  todos: [
    {
      title: '1',
      description: 'some todo',
      statusDone: false,
      ...dateCreator(),
      id: Math.random().toString(),
    },
    {
      title: '2',
      description: 'some todo',
      statusDone: false,
      ...dateCreator(),
      id: Math.random().toString(),
    },
    {
      title: '3',
      description: 'some todo',
      statusDone: false,
      ...dateCreator(),
      id: Math.random().toString(),
    },
    {
      title: '4',
      description: 'some todo',
      statusDone: false,
      ...dateCreator(),
      id: Math.random().toString(),
    },
    {
      title: '5',
      description: 'some todo',
      statusDone: false,
      ...dateCreator(),
      id: Math.random().toString(),
    },
  ],
};

export const addTodo = createAction(ADD_TODO);
export const doneTodo = createAction(DONE_TODO);
export const removeTodo = createAction(REMOVE_TODO);
export const removeAllTodos = createAction(REMOVE_ALL_TODOS);

export default createReducer(initialState, {
  [addTodo]: function (state, action) {
    state.todos.push({
      ...action.payload,
      id: Date.now().toString(),
    });
  },
  [doneTodo]: function (state, action) {
    state.todos = state.todos.map((todo) => {
      if (todo.id === action.payload.id) {
        return { ...todo, statusDone: action.payload.status };
      }
      return todo;
    });
  },
  [removeTodo]: function (state, action) {
    state.todos = state.todos.filter((todo) => {
      return todo.id !== action.payload;
    });
  },
  [removeAllTodos]: function (state, action) {
    state.todos = [];
  },
});
