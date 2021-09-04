import React from 'react'
import styled from 'styled-components'

const User = ({ user, edit, admin }) => {
    
    const joinDate = user.createdAt.substring(0, 10)

    return (
        <UserWrapper>
            <div>
                {`${user.firstName} ${user.lastName}`}
            </div>
            <div>
                {user.role}
            </div>
            <div>
                {`Joined on ${joinDate}`}
            </div>
            {admin && <div className='edit'>
                <button onClick={() => edit(user._id)} className='edit'>O</button>
            </div>}
        </UserWrapper>
    )
}

const UserWrapper = styled.div`
    border: 1px solid black;
    border-radius: 1rem;
    padding: 0.25rem 0.5rem;
    margin: 0.5rem 0;
    position: relative;
    .edit {
        position: absolute;
        top: 5px;
        right: 5px;
        border-radius: 1rem;
    }
`;

export default User