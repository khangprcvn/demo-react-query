import { Link, Outlet } from 'react-router-dom';
import { Loader } from './Admin';

import { useIsFetching } from '@tanstack/react-query';
import { usePosts } from '../hooks';

export function MainPage() {
  return (
    <div className='bg-[#202b38] h-full w-full flex overflow-y-scroll overflow-x-hidden'>
      <div className='w-[200px] text-white p-6  border-r-2 border-slate-500'>
        <GlobalLoader />
        <Sidebar />
      </div>
      <div className='p-6 w-full'>
        <Outlet />
      </div>
    </div>
  );
}

function Sidebar() {
  const totalBlog = usePosts()?.data?.length;

  return (
    <div>
      <ul>
        <li className='hover:underline text-lg'>
          <Link to='/'>Home</Link>
        </li>
        <li className='hover:underline text-lg'>
          <Link to='/blog'>Blog ({totalBlog})</Link>
        </li>
        <hr className='mt-2 mb-2 text-lg' />
        <li className='hover:underline'>
          <Link to='/admin'>Admin</Link>
        </li>
      </ul>
    </div>
  );
}

function GlobalLoader() {
  const isFetching = useIsFetching();

  return (
    <Loader
      className={`fixed right-8 top-4 ${
        isFetching ? 'opacity-1' : 'opacity-0'
      }`}
    />
  );
}

export function Home() {
  return <div className='text-white text-3xl font-bold'>Welcome RIVIR!</div>;
}
