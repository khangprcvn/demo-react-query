import axios from 'axios';

const URL = 'http://localhost:3004';

function sleep(time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}
export const fetchPosts = async () => {
  await sleep(1000);
  return axios.get(`${URL}/posts`);
};
