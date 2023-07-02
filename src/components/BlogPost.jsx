import { useParams } from 'react-router-dom';
import { usePost } from '../hooks';

export default function Post() {
  const { postId } = useParams();
  const postQuery = usePost(postId);

  return (
    <>
      {postQuery.isLoading ? (
        <span className='text-gray-300'>Loading...</span>
      ) : postQuery.isError ? (
        postQuery.error.message
      ) : (
        <div>
          <h2 className='text-white'>{postQuery.data.title}</h2>
          <p className='text-slate-300 mt-2'>{postQuery.data.body}</p>
        </div>
      )}
    </>
  );
}
