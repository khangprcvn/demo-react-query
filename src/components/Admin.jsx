import { useState } from 'react';

import { Link } from 'react-router-dom';

import { ImSpinner2 } from 'react-icons/im';
import { useCreatePost, usePosts } from '../hooks';
import { useQueryClient } from '@tanstack/react-query';
import { fetchPost, sleep } from '../hooks/server';

export default function Admin() {
  const postsQuery = usePosts();
  const postMutation = useCreatePost();

  const [values, setValues] = useState({});

  const queryClient = useQueryClient();

  const setValue = (field, value) =>
    setValues((old) => ({ ...old, [field]: value }));

  const onSubmit = () => {
    postMutation.mutate(values);
    // await sleep(5000);
    setValues({});
  };

  return (
    <section className='text-white'>
      <div className='inline-flex border-b w-full pb-2 '>
        {postsQuery.isLoading ? (
          <>
            <Loader />
            <span className='ml-2'>Loading...</span>
          </>
        ) : (
          <div className='mb-6'>
            <h3 className='text-2xl mb-2'>All Posts</h3>
            <ul>
              {postsQuery.data.map((post) => (
                <li key={post.id}>
                  <Link
                    className='text-slate-300 hover:underline'
                    to={`./${post.id}`}
                    onMouseEnter={async () => {
                      await queryClient.prefetchQuery({
                        queryKey: ['post', post.id.toString()],
                        queryFn: () =>
                          fetchPost(post.id.toString()).then(
                            (resp) => resp.data
                          ),
                        staleTime: 10 * 1000,
                      });
                    }}
                  >
                    {post.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div className='mt-2' key={postsQuery?.data?.length}>
        <h3 className='text-xl mb-2'>Create New Post</h3>
        <form>
          <label htmlFor='title'>Title</label>
          <div>
            <input
              className='bg-[#161f27] p-[10px] mt-[2px] rounded-sm w-96'
              type='text'
              name='title'
              required
              onChange={(e) => setValue('title', e.target.value)}
            />
          </div>
          <br />
          <label htmlFor='body'>Body</label>
          <div>
            <textarea
              onChange={(e) => setValue('body', e.target.value)}
              className='bg-[#161f27] p-[10px] mt-[2px] rounded-sm w-96'
              type='text'
              name='body'
              required
              rows='10'
            />
          </div>
          <br />
          <button
            type='submit'
            className='py-2 px-6 bg-[#161f27] hover:bg-slate-500 '
            onClick={(event) => {
              event.preventDefault();
              onSubmit();
            }}
          >
            {postMutation?.isLoading
              ? 'Saving...'
              : postMutation?.isError
              ? 'Error!'
              : postMutation?.isSuccess
              ? 'Saved!'
              : 'Create Post'}
          </button>
        </form>
      </div>
    </section>
  );
}

export function Loader(props) {
  // eslint-disable-next-line react/prop-types
  const { className, ...rest } = props;

  return (
    <ImSpinner2 className={`animate-spin text-xl ${className}`} {...rest} />
  );
}
