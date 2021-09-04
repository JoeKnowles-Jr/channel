import React, { PureComponent } from 'react'
import * as actions from '../../actions'
import { connect } from 'react-redux'
import styled from 'styled-components'

class UserInput extends PureComponent {

    state = {
        firstName: '',
        lastName: '',
        email: '',
        role: '',
        needsPwUpdate: false,
        likedVideos: [],
        dislikedVideos: [],
        comments: [],
        createdAt: '',
        updatedAt: ''
    }

    componentDidMount() {
        this.props.user && this.setState(this.props.user)
    }

    handleChange(e) {
        const { name, value } = e.target
        if (name === 'needsPwUpdate') {
            const box = document.getElementById('pwupdate')
            this.setState({ needsPwUpdate: box.checked })
            return
        }
        this.setState({ [name]: value })
    }

    resetState() {
        this.setState({
            firstName: '',
            lastName: '',
            email: '',
            role: '',
            needsPwUpdate: false,
            likedVideos: [],
            dislikedVideos: [],
            comments: [],
            createdAt: '',
            updatedAt: ''
        })
    }

    handleFormSubmit() {
        this.props.user && this.props.editUser(this.props.user._id, this.state)
        !this.props.user && this.props.insertUser(this.state)
        this.resetState()
        window.location.reload()
    }

    renderError() {
        if (this.props.errorMessage) {
            return (
                <div className="alert alert-danger">
                    <em>Oops! {this.props.errorMessage}</em>
                </div>
            )
        }
    }

    render() {

        const handleClose = () => {
            console.log('close')
            this.resetState()
            this.props.cancel()
        }

        return (
            <UserForm>
                <fieldset>
                    <input
                        onChange={this.handleChange.bind(this)}
                        value={this.state.firstName}
                        name="firstName"
                        placeholder="First name"
                        type="text" />
                </fieldset>
                <fieldset>
                    <input
                        onChange={this.handleChange.bind(this)}
                        value={this.state.lastName}
                        name="lastName"
                        placeholder="Last name"
                        type="text" />
                </fieldset>
                <fieldset>
                    <input
                        onChange={this.handleChange.bind(this)}
                        value={this.state.email}
                        name="email"
                        placeholder="Email"
                        type="text" />
                </fieldset>
                <fieldset>
                    <select
                        onChange={this.handleChange.bind(this)}
                        value={this.state.role}
                        name="role"
                        type="text" >
                        <option>Admin</option>
                        <option>User</option>
                        </select>
                </fieldset>
                <fieldset>
                    <input
                        onChange={this.handleChange.bind(this)}
                        checked={this.state.needsPwUpdate}
                        name="needsPwUpdate"
                        id='pwupdate'
                        type="checkbox" /> Needs Password Update
                </fieldset>
                {this.renderError()}
                <div>
                    <button className="btn btn-primary" onClick={() => this.handleFormSubmit()}>Submit</button>
                    <button className='close' onClick={() => handleClose()}>Cancel</button>
                </div>
            </UserForm>
        )
    }
}

const UserForm = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    fieldset {
        margin: 0.5rem auto;
        width: 75%;
        text-align: center;
        input {
            width: 100%;
        }
    }
`;

const mapStateToProps = (state) => {
    return {
        uid: state.auth.user._id
    }
}

export default connect(mapStateToProps, actions)(UserInput)

