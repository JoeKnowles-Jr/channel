import React, { PureComponent } from 'react'
import { Field, reduxForm } from 'redux-form'
import * as actions from '../../actions'
import { connect } from 'react-redux'
import history from '../../history'
// import styled from 'styled-components'

class Signup extends PureComponent {

    handleFormSubmit(formProps) {
        formProps.role = 'User'
        this.props.signupUser(formProps)
    }

    renderField = ({ input, label, type, meta: { touched, error } }) => (
        <div>
            {/* <label>{label}</label> */}
            <div>
                <input className="form-control" {...input} placeholder={label} type={type} />
                {touched && error && <span className="text-danger">{error}</span>}
            </div>
        </div>
    )

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
        const { handleSubmit, submitting } = this.props

        const handleClose = () => {
            history.push('/channel')
        }

        return (
            <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
                <fieldset className="form-group">
                    <Field
                        name="firstName"
                        label="First Name"
                        component={this.renderField}
                        type="text" />
                </fieldset>
                <fieldset className="form-group">
                    <Field
                        name="lastName"
                        label="Last Name"
                        component={this.renderField}
                        type="text" />
                </fieldset>
                <fieldset className="form-group">
                    <Field
                        name="email"
                        label="Email"
                        component={this.renderField}
                        type="text" />
                </fieldset>
                <fieldset className="form-group">
                    <Field
                        name="password"
                        label="Password"
                        component={this.renderField}
                        type="password" />
                </fieldset>
                <fieldset className="form-group">
                    <Field
                        name="passwordConfirmation"
                        label="Password Confirmation"
                        component={this.renderField}
                        type="password" />
                </fieldset>
                {this.renderError()}
                <button type="submit" className="btn btn-primary" disabled={submitting}>Sign Up</button>
                <button className='close' onClick={() => handleClose()}>Cancel</button>
            </form>
        )
    }
}

const validate = values => {
    const errors = {}

    if (!values.email) {
        errors.email = 'Please enter an email'
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address'
    }

    if (!values.password) {
        errors.email = 'Please enter an password'
    }

    if (!values.passwordConfirmation) {
        errors.email = 'Please enter an password confirmation'
    }

    if (values.password !== values.passwordConfirmation) {
        errors.password = 'Password must match'
    }

    return errors
}

const mapStateToProps = (state) => {
    return {
        errorMessage: state.auth.error,
        userState: ''
    }
}

export default reduxForm({
    form: 'signup',
    validate
})(connect(mapStateToProps, actions)(Signup))
