import axios from 'axios';

const URL = 'http://localhost:3004';

export function sleep(time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

export const fetchPosts = async () => {
  await sleep(1000);
  return axios.get(`${URL}/posts`);
};

export const fetchPost = async (id) => {
  await sleep(500);
  return axios.get(`${URL}/posts/${id}`);
};

export const createPost = (values) => {
  return axios.post(`${URL}/posts`, values);
};

export const updatePost = (id, values) => {
  return axios.patch(`${URL}/posts/${id}`, values);
};

export const deletePost = (id) => {
  return axios.delete(`${URL}/posts/${id}`);
};
