import { createPost } from './server';

import { useMutation, useQueryClient } from '@tanstack/react-query';

export default function useCreatePost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (values) => createPost(values).then((resp) => resp.data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['posts'],
      });
    },
  });
}
