import {
  MDBRow,
  MDBCol,
  MDBInput,
  MDBBtn,
  MDBContainer,
} from "mdb-react-ui-kit"
import { useState } from "react"
import validator from "validator"
import PropTypes from 'prop-types'

export default function RegisterForm({ register }) {


  const [formRegister, setFormRegister] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    address: '',
    password: '',
    confirmPassword: '',
  });
  const [formErrors, setFormErrors] = useState({});

  const { firstName, lastName, email, phoneNumber, address, password, confirmPassword } = formRegister;

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormRegister({
      ...formRegister,
      [id]: value,
    })
  }

  const validateForm = () => {

    const newErrors = {};

    if (!validator.isAlphanumeric(firstName) || validator.isEmpty(firstName)) {
      newErrors.firstName = "*First Name harus Alfanumeric dan tidak boleh kosong";
    }
    if (!validator.isEmail(email) || validator.isEmpty(email)) {
      newErrors.email = "*Format email tidak valid dan tidak boleh kosong.";
    }
    if (!validator.isAlphanumeric(phoneNumber) || validator.isEmpty(phoneNumber)) {
      newErrors.phoneNumber = "*Phone Number harus Alfanumeric dan tidak boleh kosong";
    }
    if (!validator.isAlphanumeric(address) || validator.isEmpty(address)) {
      newErrors.address = "*Address harus Alfanumeric dan tidak boleh kosong";
    }
    if (password.length < 6 || validator.isEmpty(password)) {
      newErrors.password = "*Password harus memiliki setidaknya 6 karakter dan tidak boleh kosong."
    }
    if (password != confirmPassword) {
      newErrors.confirmPassword = "Password dan Confirm Password harus cocok."
    }

    setFormErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setFormErrors({})
      return Object.keys(newErrors).length === 0;
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      register({
        firstName,
        lastName,
        email,
        phoneNumber,
        address,
        password
      })
    }
  }

  return (
    <div>
      <MDBContainer className="w-50 mt-3">
        <h2 className="text-center">Register</h2>
        <hr />
        <form onSubmit={handleSubmit}>
          <MDBRow className="mb-4">
            <MDBCol>
              <MDBInput value={firstName} onChange={handleChange} id="firstName" label="First Name" />
              {formErrors.firstName && (<p style={{'color': 'red'}}>{formErrors.firstName}</p>)}
              </MDBCol>
            <MDBCol>
              <MDBInput value={lastName} onChange={handleChange} id="lastName" label="Last Name" />
              {formErrors.lastName && (<p style={{'color': 'red'}}>{formErrors.lastName}</p>)}
              </MDBCol>
          </MDBRow>
          <MDBInput type="email" value={email} onChange={handleChange} id="email" label="Email" className="mt-4" />
          {formErrors.email && (<p style={{'color': 'red'}}>{formErrors.email}</p>)}
          <MDBInput type="phone_number" value={phoneNumber} onChange={handleChange} id="phoneNumber" label="Phone Number" className="mt-4" />
          {formErrors.phoneNumber && (<p style={{'color': 'red'}}>{formErrors.phoneNumber}</p>)}
          <MDBInput type="address" value={address} onChange={handleChange} id="address" label="Address" className="mt-4" />
          {formErrors.address && (<p style={{'color': 'red'}}>{formErrors.address}</p>)}
          <MDBInput type="password" value={password} onChange={handleChange} id="password" label="Password" className="mt-4" />
          {formErrors.password && (<p style={{'color': 'red'}}>{formErrors.password}</p>)}
          <MDBInput type="password" value={confirmPassword} onChange={handleChange} id="confirmPassword" label="Confirm Password" className="mt-4" />
          {formErrors.confirmPassword && (<p style={{'color': 'red'}}>{formErrors.confirmPassword}</p>)}
          <div className="text-center">
            <MDBBtn type="submit" className="mt-4">Register</MDBBtn>
          </div>
        </form>
      </MDBContainer>
    </div>
  )
}

RegisterForm.propTypes = {
  register: PropTypes.func.isRequired
}
