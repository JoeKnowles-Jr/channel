import React from 'react'
import styled from 'styled-components'
import Signin from '../components/auth/signin'
import Signup from '../components/auth/signup'

const Auth = () => {
    const [showRegister, setShowRegister] = React.useState(false)

    const showReg = () => {
        setShowRegister(true)
    }

    const showSig = () => {
        setShowRegister(false)
    }

    return (
        <AuthWrapper>
            <AuthNavWrapper>
                <NavButton className={`${showRegister ? '' : 'active'}`} onClick={showSig}>Sign In</NavButton>
                <NavButton className={`${showRegister ? 'active' : ''}`} onClick={showReg}>Sign Up</NavButton>
            </AuthNavWrapper>
            {showRegister && (
                <div>
                    <Signup />
                </div>
            )}
            {!showRegister && (
                <div>
                    <Signin />
                </div>
            )}
        </AuthWrapper>
        )
}

const NavButton = styled.span`
    padding: 0.5rem;
    color: #fff;
    font-size: 1.25rem;
    cursor: pointer;
`;

const AuthNavWrapper = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .active {
        font-size: 2rem;
        font-weight: bolder;
        color: #0ff;
        text-shadow: 1px 1px #000;
    }
`;

const AuthWrapper = styled.div`
    width: 80%;
    padding: 2rem;
    border-radius: 4rem;
    margin: 3rem auto 0;
    color: white;
    background-color: #999;
    @media (min-width: 768px) {
        width: 40%;
    }
`;

export default Auth