import { Route, Routes } from 'react-router-dom';

import Blog from './components/Blog';
import { Home, MainPage } from './components/MainPage';

import './App.css';
import Admin from './components/Admin';

function App() {
  return (
    <Routes>
      <Route path='/' element={<MainPage />}>
        <Route index element={<Home />} />
        <Route path='blog' element={<Blog />} />
        <Route path='admin' element={<Admin />} />
      </Route>
    </Routes>
  );
}

export default App;
