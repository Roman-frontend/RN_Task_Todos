import { createAction, createReducer } from '@reduxjs/toolkit';
import { dateCreator } from '../components/Helpers/DateCreator';

const initialState = {
  todos: [
    {
      title: '1',
      description: 'some todo',
      executionDate: dateCreator(),
      id: Math.random().toString(),
    },
    {
      title: '2',
      description: 'some todo',
      executionDate: dateCreator(),
      id: Math.random().toString(),
    },
    {
      title: '3',
      description: 'some todo',
      executionDate: dateCreator(),
      id: Math.random().toString(),
    },
    {
      title: '4',
      description: 'some todo',
      executionDate: dateCreator(),
      id: Math.random().toString(),
    },
    {
      title: '5',
      description: 'some todo',
      executionDate: dateCreator(),
      id: Math.random().toString(),
    },
  ],
};

export const addTodo = createAction('ADD_TODO');

export default createReducer(initialState, {
  [addTodo]: function (state, action) {
    state.todos.push({
      ...action.payload,
      id: Date.now().toString(),
    });
  },
});
