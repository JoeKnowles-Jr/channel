import React from 'react'
import styled from 'styled-components'

const Link = ({ link, admin, edit }) => {
    
    return (
        <LinkWrapper>
            <a href={link.url} target='_new' className={`${link.description ? 'small' : 'large'}`}>
                {link.display}
            </a>
            <div className='description'>
                {link.description}
            </div>
            {admin && <div>
                <button onClick={() => edit(JSON.stringify(link))} className='edit'>O</button>
            </div>}
        </LinkWrapper>
    )
}

const LinkWrapper = styled.div`
    border: 1px solid black;
    padding: 1rem;
    margin: 1rem;
    position: relative;
    a {
        text-decoration: none;
        color: #a00aaa;
        text-shadow: 2px 2px 3px white, -2px -2px 3px white, -2px 2px 3px white, 2px -2px 3px white;
        font-weight: bold;
    }
    .small {
        font-size: 1.25rem;
    }
    .large {
        font-size: 1.5rem;
    }
    .description {
        color: white;
        text-shadow: 1px 1px gray;
        font-size: 1.2rem;
    }
    .edit {
        position: absolute;
        top: 0.25rem;
        right: 0.25rem;
        padding: 0;
    }
`;

export default Link