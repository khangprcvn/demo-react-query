import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deletePost } from './server';
import { useNavigate } from 'react-router';

export default function useDeletePost() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (postId) => deletePost(postId).then((resp) => resp.data),
    onSuccess: () => {
      queryClient.invalidateQueries(['posts']);
      navigate('/admin');
    },
  });
}
