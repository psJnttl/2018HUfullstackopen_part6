import anecdoteService from '../services/anecdotes';
import { displayNotification } from '../reducers/notificationReducer';

const reducer = (store = [], action) => {
  if (action.type==='VOTE') {
    const rest = store.filter(a => a.id !== action.content.id);
    return [...rest, action.content];
  }
  else if (action.type === 'CREATE') {
    return [...store, action.content];
  }
  else if (action.type === 'INIT_STORE') {
    return action.data;
  }

  return store;
};

export const createAnecdote = (text) => {
  return {
    type: 'CREATE',
    content: text
  };
};

export const voteAnecdote = (content) => {
  return {
    type: 'VOTE',
    content: content
  };
};

export const initAnecdotes = (data) => {
  return {
    type: 'INIT_STORE',
    data: data
  };
};

export const loadAllAnecdotes = () => {
  return async (dispatch) => {
    try {
      const response = await anecdoteService.getAll();
      dispatch( {
        type: 'INIT_STORE',
        data: response
      } );
    } catch (error) {
      if (error.message === 'Network Error') {
        dispatch(displayNotification('Please check server connection.', -1));
      }
      else {
        throw error;
      }
    }
  };
};

export const createNewAnecdote = (text) => {
  return async (dispatch) => {
    try {
      const response = await anecdoteService.create(text);
      dispatch(createAnecdote(response));
    } catch (error) {
      if (error.message === 'Network Error') {
        dispatch(displayNotification('Please check server connection.', -1));
      }
      else {
        throw error;
      }
    }
  };
};

export const voteAnAnecdote = (anecdote) => {
  return async (dispatch) => {
    try {
      const voted = await anecdoteService.modify(anecdote);
      dispatch(voteAnecdote(voted));
    } catch (error) {
      if (error.message === 'Network Error') {
        dispatch(displayNotification('Please check server connection.', -1));
      }
      else {
        throw error;
      }
    }
  };
};

export default reducer;
