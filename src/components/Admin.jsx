import { Link } from 'react-router-dom';
import usePosts from '../hooks/usePosts';

import { ImSpinner2 } from 'react-icons/im';

export default function Admin() {
  const postsQuery = usePosts();

  return (
    <section className='text-white'>
      <div className='inline-flex border-b w-full pb-2'>
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
                  >
                    {post.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div className='mt-2'>
        <h3 className='text-xl mb-2'>Create New Post</h3>
        <form>
          <label htmlFor='title'>Title</label>
          <div>
            <input
              className='bg-[#161f27] p-[10px] mt-[2px] rounded-sm w-96'
              type='text'
              name='title'
              required
            />
          </div>
          <br />
          <label htmlFor='body'>Body</label>
          <div>
            <textarea
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
          >
            Submit
          </button>
        </form>
      </div>
    </section>
  );
}

export function Loader(props) {
  return <ImSpinner2 className='animate-spin text-xl' {...props} />;
}
