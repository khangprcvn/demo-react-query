import { createPost } from './server';

import { useMutation, useQueryClient } from '@tanstack/react-query';

export default function useCreatePost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (values) => createPost(values).then((resp) => resp.data),
    onMutate: async (post) => {
      await queryClient.cancelQueries({
        queryKey: ['posts'],
      });

      const previousPosts = queryClient.getQueryData(['posts']);

      queryClient.setQueryData(['posts'], (oldPosts) => [
        ...oldPosts,
        {
          ...post,
          id: oldPosts?.length,
        },
      ]);

      return {
        previousPosts,
      };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['posts'],
      });
    },
    onError: (error, newTodo, context) => {
      queryClient.setQueryData(['posts'], context.previousPosts);
    },
  });
}
