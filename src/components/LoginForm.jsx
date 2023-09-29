import {
    MDBBtn,
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBCard,
    MDBCardBody,
    MDBInput,
}
    from 'mdb-react-ui-kit';
import { useState } from 'react';
import validator from 'validator';
import PropTypes from 'prop-types'

function LoginForm({ login }) {

    const [formLogin, setFormLogin] = useState({
        email: '',
        password: '',
    });

    const [formErrors, setFormErrors] = useState({});

    const { email, password } = formLogin;

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormLogin({ ...formLogin, [id]: value })
    }

    const validateForm = () => {
        const newErrors = {}

        if (!validator.isEmail(email) || validator.isEmpty(email)) {
            newErrors.email = "*Format email tidak valid dan tidak boleh kosong."
        }
        if (validator.isEmpty(password)) {
            newErrors.password = "*Password tidak boleh kosong"
        }

        setFormErrors(newErrors);
        if (Object.keys(newErrors).length === 0) {
            setFormErrors({});
            return Object.keys(newErrors).length === 0;
        }
    }

    const handleLogin = (e) => { 
        e.preventDefault();
        if (validateForm()) {
            login({ email, password })
        }
    }

    return (
        <MDBContainer style={{ "backgroundColor": "hsl(0, 0%, 96%)" }} fluid className='p-4'>

            <MDBRow>
                <MDBCol md='6' className='text-center text-md-start d-flex flex-column justify-content-center'>

                    <h1 className="my-5 display-3 fw-bold ls-tight px-3">
                        Kemudahan adalah <br />
                        <span className="text-primary">Kunci.</span>
                    </h1>

                    <p className='px-3' style={{ color: 'hsl(217, 10%, 50.8%)' }}>
                        Jadikan pengajuan barang menjadi lebih mudah, sehingga Anda dapat fokus pada yang penting.
                    </p>
                </MDBCol>

                <MDBCol md='6'>
                    <MDBCard className='my-5'>
                        <MDBCardBody className='p-5'>

                            <form onSubmit={handleLogin}>
                                <MDBInput value={email} onChange={handleChange} label='Email' id='email' type='email' />
                                {formErrors.email && (<p style={{'color': 'red'}}>{formErrors.email}</p>)}
                                <MDBInput wrapperClass='mt-4' value={password} onChange={handleChange} label='Password' id='password' type='password' />
                                {formErrors.password && (<p style={{'color': 'red'}}>{formErrors.password}</p>)}

                                <MDBBtn type='submit' className='w-100 mb-4 mt-4' size='md'>Login</MDBBtn>
                            </form>

                        </MDBCardBody>
                    </MDBCard>
                </MDBCol>

            </MDBRow>

        </MDBContainer>
    );
}

LoginForm.propTypes = {
    login: PropTypes.func.isRequired,
}

export default LoginForm;