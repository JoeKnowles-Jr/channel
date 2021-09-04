import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import logo from '../../img/logo.png'
import gear from '../../img/gear.png'
import '../../fonts/Cookies.ttf'

class NavHeader extends PureComponent {

    render() {
        // const user = this.props.user
        const isAuthenticated = this.props.authenticated
        return (
            <NavHeaderWrapper>
                <div className="title">
                    <Link to='/channel'>
                        <img className="pfp" src={logo} alt="avatar" />
                    </Link>
                    <div className="banner">
                        <span>Channel</span>
                    </div>
                    {this.props.admin && <div className='tab'>
                        <Link className='adminlink' to='/channel/settings'><img src={gear} alt='app settings' /></Link>
                        <Link className='adminlink' to='/channel/vadmin'>videos</Link>
                        <Link className='adminlink' to='/channel/ladmin'>links</Link>
                        <Link className='adminlink' to='/channel/uadmin'>users</Link>
                    </div>}
                </div>
                <nav className="hdr-btn-wrapper">
                    <div className="hdr-btns">
                        <Link className="nav-link hdr-btn" to="/channel/links">Links</Link>
                        <Link className="nav-link hdr-btn" to="/channel/playlists">Playlists</Link>
                        {isAuthenticated && (<div>
                            <Link className="nav-link hdr-btn" to="/channel/signout">Signout</Link>
                        </div>)}
                        {!isAuthenticated && (<div>
                            <Link className="nav-link hdr-btn" to="/channel/auth">Sign In / Sign Up</Link>
                        </div>)}
                    </div>
                </nav>
            </NavHeaderWrapper>
        )
    }
}

const NavHeaderWrapper = styled.div`
    position: fixed;
    top: 0;
    z-index: 999;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    background-color: #445;
    font-family: 'Cookies', cursive;
        @media (prefers-reduced-motion: no-preference) {
        .pfp {
            animation: logo-spin infinite 20s linear;
        }
    }

    @keyframes logo-spin {
        from {
            transform: rotate(0deg);
        }
        to {
            transform: rotate(360deg);
        }
    }
    .title {
        position: relative;
        display: flex;
        align-items: center;
        max-height: 5rem;
        justify-content: space-around;
        width: 45%;
        margin-left: 1rem;
        text-align: center;
        color: #fff;
        text-shadow: 3px 3px 5px #333;
        text-decoration: none;
        font-size: 1.2rem;
        border-radius: 50px;
        background: linear-gradient(to right, #0ff, #f0f);
        .tab {
            padding: 0 0.25rem;
            position: absolute;
            display: flex;
            align-items: center;
            justify-content: space-around;
            bottom: -25px;
            width: 90%;
            background: linear-gradient(to right, #0ff, #f0f);
            height: 2rem;
            z-index: -1;
            border-radius: 0 0 50px 50px;
            :hover {
                text-decoration: none;
            }
            .adminlink {
                font-size: 1rem;
                color: #fff;
                text-shadow: 3px 3px 5px #333;
            }
            img {
                width: 24px;
                height: 24px;
            }
        }
        img {
            margin-left: 1rem;
            width: 48px;
            height: 48px;
            border-radius: 50%;
        }
        .liu {
            font-size: 1rem;
        }
        .role {
            font-size: 0.77rem;
        }
        .guest {

        }
        @media (min-width: 768px) {
            font-size: 1.5rem;
            width: 30%;
        }
        @media (min-width: 1366px) {
            font-size: 2rem;
            width: 20%;
        }
    }

    #current-user {
        position: absolute;
        bottom: 7px;
        left: 13px;
        display: inline-block;
        font-family: digital2, sans-serif;
        border: 3px solid #3a1cff;
        border-radius: 30px;
        color: #7f7;
        background-color: #555;
        text-shadow: none;
        padding: 7px 7px 2px;
        font-size: 0.75rem;
        -webkit-box-shadow: inset 3px 3px 3px 0 rgba(0, 0, 0, 1);
        -moz-box-shadow: inset 3px 3px 3px 0 rgba(0, 0, 0, 1);
        box-shadow: inset 3px 3px 3px 0 rgba(0, 0, 0, 1);
    }

    .banner {
        width: 50%;
        margin: 5px auto;
        border-radius: 100px;
        line-height: 1.75rem;
    }

    .hdr-btn-wrapper {
        margin-right: 1rem;
        .hdr-btns {
            display: flex;
        }
    }

    .hdr-btn {
        color: #14e71a;
        text-align: center;
        display: inline-block;
        text-shadow: none;
        text-decoration: none;
        font-size: 1rem;
        padding: 0.75rem;
        margin: 5px 3px 0;
        border-right: 2px solid #0724ef;
        border-bottom: 2px solid #0724ef;
        border-radius: 0 10px 0 10px;
        @media (max-width: 550px) {
            font-size: 0.8rem;
        }
        @media (min-width: 1240px) {
            font-size: 1.25rem;
        }
    }
`;

const mapStateToProps = (state) => {
    return {
        authenticated: state.auth.authenticated,
        admin: state.auth.user ? (state.auth.user.role === 'Admin') : false
    }
};

export default connect(mapStateToProps)(NavHeader)
