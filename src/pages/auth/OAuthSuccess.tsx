import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { config } from '../../config';

const OAuthSuccess = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get('token');
    const isNewUser = params.get('isNewUser') === 'true';

    if (!token) {
      navigate('/login?error=oauth_failed', { replace: true });
      return;
    }

    Cookies.set(config.auth.tokenKey, token, {
      expires: 7,
      secure: true,
      sameSite: 'strict',
    });

    window.history.replaceState({}, '', '/oauth/success');

    navigate(isNewUser ? '/onboarding' : '/dashboard', { replace: true });
  }, [navigate]);

  return <p>Signing you in...</p>;
};

export default OAuthSuccess;
