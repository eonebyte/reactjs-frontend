import { useRecoilState } from "recoil";
import LoginForm from "../components/LoginForm"
import api from "../utils/api"
import { isAuthState } from "../recoil/atoms/isAuthState";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import SpinnerLoading from "../components/SpinnerLoading";
import { userProfileState } from "../recoil/atoms/userProfileState";

export default function Login() {

  const navigate = useNavigate();

  const [, setIsAuth] = useRecoilState(isAuthState)
  const [, setUserProfil] = useRecoilState(userProfileState);
  const [isLoading, setIsLoading] = useState(false);

  const onLogin = async ({ email, password }) => {
    try {
      setIsLoading(true);
      const response = await fetch(`${api.BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({email, password})
      });
      const responseJson = await response.json();
      const { status, message } = responseJson;
      if (status !== 'success') {
        throw new Error(message);
      }

      const { token } = responseJson;
      api.putAccessToken(token);
      setIsAuth(true);

      // get profil user
      const profilResponse = await api.getOwnProfil();
      setUserProfil(profilResponse);

      // Hapus loading dan arahkan ke halaman dashboard setelah proses login selesai
      setIsLoading(false)
      navigate('/')
    } catch (error) {
      alert(error);
      setIsLoading(false);
    }
  }

  return (
    <div>
      {isLoading ? <SpinnerLoading /> : <LoginForm login={onLogin} />}
    </div>
  )
}
