const filterReducer = (state='', action) => {
  if (action.type === 'SET_FILTER') {
    return action.data;
  }
  else if (action.type === 'RESET_FILTER') {
    return '';
  }
  return state;
};

export const setFilter = (value) => {
  return {
    type: 'SET_FILTER',
    data: value
  };
};

export const resetFilter = () => {
  return {
    type: 'RESET_FILTER'
  };
};

export default filterReducer;
