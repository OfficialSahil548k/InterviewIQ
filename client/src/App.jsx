import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Auth from './pages/Auth'
import { useEffect } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setUserData } from './redux/userSlice';

export const ServerURL = "http://localhost:8000";

const App = () => {

  const dispatch = useDispatch();

  useEffect(() => {
  const getUser = async () => {
    try {
      const { data } = await axios.get(
        `${ServerURL}/api/user/current-user`,
        { withCredentials: true }
      );
      console.log(data);
      dispatch(setUserData(data));
    } catch (error) {
      dispatch(setUserData(null));
      console.error(error);
    }
  };

  getUser();
}, [dispatch]);
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<Auth />} />
      </Routes>
    </div>
  )
}

export default App
