import axios from 'axios';
const url = 'http://localhost:3001/anecdotes';

const getAll = async () => {
  const response = await axios.get(url);
  return response.data;
};

const create = async(text) => {
  const obj = { content: text, votes: 0 };
  const response = await axios.post(url, obj);
  return response.data;
};

export default { getAll, create };
