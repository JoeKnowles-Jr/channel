import React from 'react'
import styled from 'styled-components'
import User from './user'

const UserList = ({ users, edit, admin }) => {
    
    return (
        <UserListWrapper>
            {users.map((u, idx) => {
                return <User admin={admin} edit={edit} user={u} key={idx} />
            })}
        </UserListWrapper>
    )
}

const UserListWrapper = styled.div`
    width: 50%;
    margin: 0 auto;
`;

export default UserList