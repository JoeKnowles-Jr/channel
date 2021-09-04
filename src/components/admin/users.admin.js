import React from 'react'
import { useDispatch } from 'react-redux'
import { deleteUser } from '../../actions'
import styled from 'styled-components'
import UserList from '../users/user.list'
import UserInput from '../users/user.input'

const UsersAdmin = ({ users }) => {
    const dispatch = useDispatch()
    const [display, setDisplay] = React.useState('users')
    const [editUser, setEditUser] = React.useState(null)

    const editMe = (uid) => {
        const user = users.filter(u => { return u._id === uid })[0]
        setEditUser(user)
        setDisplay('input')
    }

    const deleteMe = () => {
        if (editUser) {
            console.log('about to delete')
            dispatch(deleteUser(editUser._id))
            setEditUser(null)
            setDisplay('users')
            window.location.reload()
        }
    }

    return (
        <div>
            <Title>
                UsersAdmin
            </Title>

            <Total>
                {users.length} user{users.length > 1 && 's'}
            </Total>

            {editUser && display === 'input' && <AddButton><button onClick={() => deleteMe()}>Delete User</button></AddButton>}

            {display === 'users' && users && <UserList admin={true} edit={editMe} users={users} />}
            {display === 'input' && <UserInput cancel={() => setDisplay('users')} user={editUser} />}
        </div>
    )
}

const Total = styled.div`
    color: white;
    text-align: center;
`;

const Title = styled.div`
    margin-top: 2rem;
    font-size: 3rem;
    font-weight: bold;
    font-family: 'Cookies';
    text-align: center;
`

const AddButton = styled.div`
    text-align: end
`

export default UsersAdmin
