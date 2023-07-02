import { Link, Outlet } from 'react-router-dom';

export function MainPage() {
  return (
    <div className='bg-[#202b38] h-full w-full flex'>
      <div className='w-[200px] text-white p-6  border-r-2 border-slate-500'>
        <Sidebar />
      </div>
      <div className='p-6 w-full'>
        <Outlet />
      </div>
    </div>
  );
}

function Sidebar() {
  return (
    <div>
      <ul>
        <li className='hover:underline text-lg'>
          <Link to='/'>Home</Link>
        </li>
        <li className='hover:underline text-lg'>
          <Link to='/blog'>Blog</Link>
        </li>
        <hr className='mt-2 mb-2 text-lg' />
        <li className='hover:underline'>
          <Link to='/admin'>Admin</Link>
        </li>
      </ul>
    </div>
  );
}

export function Home() {
  return <div className='text-white text-3xl font-bold'>Welcome RIVIR!</div>;
}
