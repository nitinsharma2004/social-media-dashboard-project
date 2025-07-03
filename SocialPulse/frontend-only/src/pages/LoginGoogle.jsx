// LoginGoogle.jsx
import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const LoginGoogle = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { setGoogletoken, setGoogleusername ,setGoogleRefresToken} = useAuth();

  useEffect(() => {
    const access_token = searchParams.get('access_token');
    const refresh_token = searchParams.get('refresh_token');
    const name = searchParams.get('name');

    if (access_token &&refresh_token&& name) {
      setGoogletoken(access_token);
      setGoogleRefresToken(refresh_token);
      setGoogleusername(name);
      localStorage.setItem('googletoken', access_token);
      localStorage.setItem('googleusername', name);
      localStorage.setItem('googlerefrestoken', refresh_token);
      navigate('/analytics');
    } else {
      navigate('/');
    }
  }, []);

  return <p>Logging you in...</p>;
};

export default LoginGoogle;
