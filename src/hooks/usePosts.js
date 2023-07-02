import React from 'react';

import * as server from './server';

export default function usePosts() {
  const [state, setState] = React.useReducer((_, action) => action, {
    isLoading: true,
  });

  const fetch = async () => {
    setState({ isLoading: true });
    try {
      const data = await server.fetchPosts().then((res) => res.data);
      setState({ isSuccess: true, data });
    } catch (error) {
      setState({ isError: true, error });
    }
  };

  React.useEffect(() => {
    fetch();
  }, []);

  return {
    ...state,
    fetch,
  };
}
