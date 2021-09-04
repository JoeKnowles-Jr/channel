import axios from 'axios'
import History from '../history.js'
import { authUrl, userUrl } from './action.urls'
import {
    AUTH_USER,
    UNAUTH_USER,
    AUTH_ERROR,
    FETCH_USERS
} from './types'

export const signinUser = ({ email, password }) => {
    return (dispatch) => {
        // submit email/password to the server
        axios.post(`${authUrl}/signin`, { email, password })
            .then(response => {

                // if request is good...
                // - update state to indicate user is authenticated
                dispatch({ type: AUTH_USER, payload: { user: response.data.user } })

                // - save the jwt token
                localStorage.setItem('token', response.data.token)
                localStorage.setItem('user', response.data.user)

                // - redirect to the homepage
                History.push('/channel')

            }).catch(() => {
                // if request is bad...
                // - show an error to the user
                dispatch(authError('Bad Login Info'))
            })
    }
}

export const signupUser = (params) => {
    return (dispatch) => {
        // submit user data to the server
        axios.post(`${authUrl}/signup`, params)
            .then(response => {
                dispatch({ type: AUTH_USER, payload: { user: response.data.user } })
                localStorage.setItem('token', response.data.token)
                localStorage.setItem('user', JSON.stringify(response.data.user))
                History.push('/channel')
            })
            .catch(err => {
                dispatch(authError(err.response.data.error))
            })
    }
}

export const authError = (error) => {
    return {
        type: AUTH_ERROR,
        payload: error
    }
}

export const signoutUser = () => {
    localStorage.clear()
    History.push('/channel')
    return { type: UNAUTH_USER }
}

export const fetchUsers = () => {
    return (dispatch) => {
        axios.get(userUrl)
            .then(response => {
                dispatch({ type: FETCH_USERS, payload: { users: response.data.users } })
            })
        .catch(err => console.log(err))
    }
}

export const editUser = (uid, update) => {
    console.log(uid, update)
    return (dispatch) => {
        axios.put(userUrl, { filter: uid, update })
            .then(response => {
                if (response.status === 200) {
                    console.log('User updated')
                    dispatch({ type: FETCH_USERS, payload: { users: response.data.users } })
                }
            })
            .catch(err => console.log(err))
    }
}

export const deleteUser = (uid) => {
    const url = `${userUrl}/${uid}`
    console.log(url, uid)
    return (dispatch) => {
        axios.delete(url)
            .then(response => {
                dispatch({ type: FETCH_USERS, payload: { users: response.data.users } })
            })
            .catch(err => console.log(err))
    }
}
