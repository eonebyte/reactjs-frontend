import './App.css'
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import Navbar from './components/Layouts/Navbar'
import Register from './pages/Register'
import { useRecoilState } from 'recoil'
import { isAuthState } from './recoil/atoms/isAuthState'

function App() {

  const navigate = useNavigate();

  const [isAuth, setIsAuth] = useRecoilState(isAuthState);
  

  const handleLogin = () => {
    navigate('/login');
  }

  const handleLogout = () => {
    //hapus token
    localStorage.removeItem('accessToken');
    //set isAuth false 
    setIsAuth(false)

    //arahkan ke route login
    navigate('/login')
  }

  return (
    <div>
      <header>
        <Navbar onLogin={handleLogin} onLogout={handleLogout} isAuth={isAuth} />
      </header>
      <main>
        <Routes>
          <Route path='/' element={isAuth ? <Dashboard /> : <Navigate to="/login" replace={true} />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
