import {
  MDBContainer,
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarToggler,
  MDBIcon,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBCollapse,
  MDBDropdown,
  MDBDropdownToggle,
  MDBDropdownMenu,
  MDBDropdownItem,
} from 'mdb-react-ui-kit';

import PropTypes from 'prop-types';
PropTypes

import { useState } from 'react';
import Logo from '../../assets/img/logo_eone.png'
import { userProfileState } from '../../recoil/atoms/userProfileState';
import { useRecoilValue } from 'recoil';


export default function Navbar({ onLogin, onLogout, isAuth }) {

  const userProfile = useRecoilValue(userProfileState);

  const [showBasic, setShowBasic] = useState(false);

  const handleLogin = () => {
    onLogin();
  }

  const handleLogout = () => {
    onLogout();
  }


  return (
    <MDBNavbar expand='lg' light bgColor='light'>
      <MDBContainer fluid>
        <MDBNavbarBrand href='#'>
          <img src={Logo} width={50} alt="Logo" />
        </MDBNavbarBrand>

        <MDBNavbarToggler
          aria-controls='navbarSupportedContent'
          aria-expanded='false'
          aria-label='Toggle navigation'
          onClick={() => setShowBasic(!showBasic)}
        >
          <MDBIcon icon='bars' fas />
        </MDBNavbarToggler>

        <MDBCollapse navbar show={showBasic}>
          <MDBNavbarNav className='mr-auto mb-2 mb-lg-0'>
            <MDBNavbarItem>
              <MDBNavbarLink active aria-current='page' href='/'>
                Dashboard
              </MDBNavbarLink>
            </MDBNavbarItem>
            <MDBNavbarItem>
              <MDBNavbarLink href='#'>Submission</MDBNavbarLink>
            </MDBNavbarItem>
            <MDBNavbarItem>
              <MDBNavbarLink href='#'>Request History</MDBNavbarLink>
            </MDBNavbarItem>
            <MDBNavbarItem>
              <MDBNavbarLink href='#'>Admin</MDBNavbarLink>
            </MDBNavbarItem>
            <MDBNavbarItem>
              <MDBNavbarLink href='#'>Report</MDBNavbarLink>
            </MDBNavbarItem>

          </MDBNavbarNav>

          { !isAuth ? 
          <MDBIcon className='me-3' onClick={handleLogin} fas icon="sign-in-alt" /> : 
          <>
          
          <MDBDropdown>
          <MDBDropdownToggle tag='a' className='me-3'><MDBIcon className='me-1' far icon="user-circle" /></MDBDropdownToggle>
          <MDBDropdownMenu>
            <MDBDropdownItem link>{userProfile.name}</MDBDropdownItem>
            <MDBDropdownItem link onClick={handleLogout}>Logout <MDBIcon className='me-3' fas icon="sign-out-alt" /></MDBDropdownItem>
          </MDBDropdownMenu>
        </MDBDropdown>
          
          </>}
          

          {/* <form className='d-flex input-group w-auto'>
            <input type='search' className='form-control' placeholder='Type query' aria-label='Search' />
            <MDBBtn color='primary'>Search</MDBBtn>
          </form> */}
        </MDBCollapse>
      </MDBContainer>
    </MDBNavbar>
  );
}

Navbar.propTypes = {
    onLogin: PropTypes.func.isRequired,
    onLogout: PropTypes.func.isRequired,
    isAuth: PropTypes.bool.isRequired,
}