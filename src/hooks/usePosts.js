import { fetchPosts } from './server';

import { useQuery } from '@tanstack/react-query';

export default function usePosts() {
  return useQuery({
    queryKey: ['posts'],
    queryFn: () => fetchPosts().then((res) => res.data),
    staleTime: 10 * 1000,
  });
}
