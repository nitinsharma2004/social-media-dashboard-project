import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const LoginFacebook = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { setFacebooktoken} = useAuth();

  useEffect(() => {
    const access_token = searchParams.get('access_token');

    if (access_token) {
      setFacebooktoken(access_token);
      localStorage.setItem('facebooktoken', access_token);
      navigate('/analytics');
    } else {
      navigate('/');
    }
  }, []);

  return <p>Logging you in...</p>;
};

export default LoginFacebook;
