
const reducer = (store = [], action) => {
  if (action.type==='VOTE') {
    const old = store.filter(a => a.id !==action.id);
    const voted = store.find(a => a.id === action.id);
    return [...old, { ...voted, votes: voted.votes+1 } ];
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

export const voteAnecdote = (id) => {
  return {
    type: 'VOTE',
    id: id
  };
};

export const initAnecdotes = (data) => {
  return {
    type: 'INIT_STORE',
    data: data
  };
};

export default reducer;
