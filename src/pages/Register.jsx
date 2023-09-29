import { useNavigate } from 'react-router-dom'
import RegisterForm from '../components/RegisterForm'
import api from '../utils/api';

export default function Register() {


    const navigate = useNavigate();

    const onRegister = async ({ firstName, lastName, email, phoneNumber, address, password }) => {
        try {
            await api.register({ firstName, lastName, email, phoneNumber, address, password })
            navigate('/login')
        } catch (error) {
            alert(error.message)
        }

    }
    return (
        <div>
            <RegisterForm register={onRegister} />
        </div>
    )
}
