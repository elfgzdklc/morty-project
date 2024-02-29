import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header, Nav, Divider } from 'rsuite';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../redux/actions';
import image from "../favicon.png"
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function NavbarPage() {
    const navigate = useNavigate();

    const isLoggedIn = useSelector(state => state.user.isLoggedIn);
    const dispatch = useDispatch();

    const handleItemClick = (url) => {
        navigate(url);
    };
    const handleLogout = () => {
        dispatch(logout());
        navigate("/login");
    };
    const [active, setActive] = useState('home');

    const Navbar = ({ active, onSelect, ...props }) => {
        return (
            <Nav {...props} activeKey={active} onSelect={onSelect} style={{ marginTop: 50, marginBottom: 50 }}>
                <div className='row mx-0 px-3 fw-semibold'>
                    <div className='col-6  mt-2'>
                        {isLoggedIn && (
                            <>
                                <Nav.Item eventKey="home" onClick={() => handleItemClick('/')} className='text-dark'>Ana Sayfa</Nav.Item>
                                <Nav.Item eventKey="favorites" onClick={() => handleItemClick('/favorites')}className='text-dark'>Favoriler</Nav.Item>
                            </>
                        )}
                    </div>
                    <div className='col-6 d-flex justify-content-end '>
                        {isLoggedIn ? (
                            <Nav.Item eventKey="logout" onClick={handleLogout} className='text-dark'>Çıkış <FontAwesomeIcon icon={faArrowRightFromBracket} className='fs-5 text-dark'/></Nav.Item>
                        ) : (
                            <>
                                <Nav.Item eventKey="login" onClick={() => handleItemClick('/login')} className='text-dark'>Giriş</Nav.Item>
                                <Nav.Item eventKey="register" onClick={() => handleItemClick('/register')}className='text-dark'>Kayıt</Nav.Item>
                            </>
                        )}
                    </div>
                </div>
                
                <div className='row'>
                    <div className='col-md-12 col-sm-1 d-flex justify-content-center'>
                        <img src={image} width={200} alt="img-logo" />
                    </div>
                </div>
            </Nav>
        );
    };
    return (
        <Header>
            <Navbar active={active} appearance="subtle" reversed onSelect={setActive} />
            <Divider>The Rick and Morty</Divider>
        </Header >
    );
}

export default NavbarPage;
