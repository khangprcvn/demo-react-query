import React from 'react';
import { fetchPost } from './server';

export default function usePost(postId) {
  const [state, setState] = React.useReducer((_, action) => action, {
    isLoading: true,
  });

  const fetch = React.useCallback(async () => {
    setState({ isLoading: true });
    try {
      const data = await fetchPost(postId).then((res) => res.data);
      setState({ isSuccess: true, data });
    } catch (error) {
      setState({ isError: true, error });
    }
  }, [postId]);

  React.useEffect(() => {
    fetch();
  }, [fetch]);

  return {
    ...state,
    fetch,
  };
}
