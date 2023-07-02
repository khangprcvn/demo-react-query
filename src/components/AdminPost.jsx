import { Link, useNavigate, useParams } from 'react-router-dom';

import { useDeletePost, usePost, useSavePost } from '../hooks';
import { Loader } from './Admin';
import { useEffect, useState } from 'react';

export default function Post() {
  const { postId } = useParams();
  const navigate = useNavigate();

  const postQuery = usePost(postId);
  const [savePost, savePostInfo] = useSavePost();
  const [deletePost, deletePostInfo] = useDeletePost();

  const [values, setValues] = useState({});

  useEffect(() => {
    if (postQuery?.data) {
      setValues(postQuery?.data);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [postQuery?.data]);

  const setValue = (field, value) =>
    setValues((old) => ({ ...old, [field]: value }));

  const onSubmit = async (values) => {
    await savePost(values);
    postQuery.fetch();
  };

  const onDelete = async () => {
    await deletePost(postId);
    navigate('/admin');
  };

  return (
    <div className='text-white'>
      {postQuery.isLoading ? (
        <div className='inline-flex'>
          <Loader />
          <span className='ml-2'>Loading...</span>
        </div>
      ) : (
        <div>
          <h3 className='text-2xl'>{postQuery.data.title}</h3>
          <p>
            <Link className='text-blue-500' to={`/blog/${postQuery.data.id}`}>
              View Post
            </Link>
          </p>
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
                  value={values.title}
                  onChange={(e) => setValue('title', e.target.value)}
                />
              </div>
              <br />
              <label htmlFor='body'>Body</label>
              <div>
                <textarea
                  value={values.body}
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
                  onSubmit(values);
                }}
              >
                {savePostInfo?.isLoading
                  ? 'Saving...'
                  : savePostInfo?.isError
                  ? 'Error!'
                  : savePostInfo?.isSuccess
                  ? 'Saved!'
                  : 'Create Post'}
              </button>
            </form>
          </div>

          <button
            type='submit'
            className='mt-4 py-2 px-6 bg-[#161f27] hover:bg-slate-500 '
            onClick={onDelete}
          >
            {deletePostInfo?.isLoading
              ? 'Saving...'
              : deletePostInfo?.isError
              ? 'Error!'
              : deletePostInfo?.isSuccess
              ? 'Saved!'
              : 'Delete Post'}
          </button>
        </div>
      )}
    </div>
  );
}
