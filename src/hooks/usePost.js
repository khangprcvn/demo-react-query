import { fetchPost } from './server';
import { useQuery } from '@tanstack/react-query';

export default function usePost(postId) {
  return useQuery({
    queryKey: ['post', postId],
    queryFn: () => fetchPost(postId).then((res) => res.data),
    staleTime: 10 * 1000,
  });
}
