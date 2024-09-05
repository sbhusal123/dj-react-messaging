import { Routes, Route, BrowserRouter } from 'react-router-dom';

import Login from './pages/Login';
import ChatRoom from './pages/ChatRoom';
import Register from './pages/Register';

import PrivateRoutes from './utils/PrivateRoutes';

import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';


const MainRoutes = () => {
  return (
    <>
      <ToastContainer draggable autoClose/>
      <BrowserRouter>
          <Routes>
            <Route path="" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/chat" element={<PrivateRoutes Component={ChatRoom} />} />
          </Routes>
      </BrowserRouter>
    </>
  );
};

export default MainRoutes;
