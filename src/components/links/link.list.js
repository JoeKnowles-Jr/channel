import React from 'react'
import styled from 'styled-components'
import Link from './link'
import '../../fonts/Cookies.ttf'

const LinksList = ({links, admin, edit}) => {

    return (
        <LinksListWrapper>
            {links && links.map((category, idx) => {
                return (<div key={idx}>
                    <Category>
                        {category._id}
                    </Category>
                    {category.links.map((l, idx2) => {
                        return <Link edit={edit} admin={admin} key={`${idx}${idx2}`} link={l} />
                    })}
                    </div>)
            })}
        </LinksListWrapper>
    )
}

const Category = styled.div`
    font-size: 2.5rem;
    color: #f0f;
    text-shadow: 2px 2px 2px gray;
    font-family: 'Cookies';
`;

const LinksListWrapper = styled.div`

`;

export default LinksList