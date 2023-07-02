import { Link } from 'react-router-dom';
import usePosts from '../hooks/usePosts';

export default function Blog() {
  const postsQuery = usePosts();

  let element = null;

  console.log('App  query:', postsQuery);

  if (postsQuery.isLoading) {
    element = <span className='text-slate-200 mt-4 block'>Loading...</span>;
  } else if (postsQuery.isError) {
    element = (
      <span className='text-red-400 mt-4-block'>
        {postsQuery.error.message}
      </span>
    );
  } else {
    element = (
      <div className='grid grid-cols-2 gap-4 pt-4'>
        {postsQuery.data.map((post) => (
          <div key={post.id} className='inline-block border p-2'>
            <Link
              to={`/blog/${post.id}`}
              className='text-white hover:underline'
            >
              {post.title}
            </Link>
            <p className='text-slate-400'>{post.body}</p>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div>
      <h1 className='text-white text-3xl'>Blog</h1>
      {element}
    </div>
  );
}
