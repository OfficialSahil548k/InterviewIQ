import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Auth from './pages/Auth'
import InterviewPage from'./pages/InterviewPage'
import { useEffect } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setUserData } from './redux/userSlice';
import InterviewHistory from './pages/InterviewHistory';
import Pricing from './pages/Pricing';
import InterviewReport from './pages/InterviewReport';

// Use Vite env var `VITE_SERVER_URL` if provided, otherwise fallback to deployed URL
export const ServerURL = import.meta.env.VITE_API_URL;

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
        <Route path="/interview" element={<InterviewPage />} />
        <Route path="/history" element={<InterviewHistory />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/report/:id" element={<InterviewReport />} />
      </Routes>
    </div>
  )
}

export default App
