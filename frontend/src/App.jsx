import { Routes, Route, BrowserRouter } from 'react-router-dom';

import Login from './pages/Login';
import Register from './pages/Register';
import ChatRoom from './pages/ChatRoom';
import SocketTest from './pages/SocketTest'

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
            <Route path="/chat" element={<PrivateRoutes Component={ChatRoom} />} />
            <Route path="/test" element={<SocketTest />}/>
          </Routes>
      </BrowserRouter>
    </>
  );
};

export default MainRoutes;
