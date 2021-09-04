import React from 'react'
import { connect } from 'react-redux'
import * as actions from '../actions'
import styled from 'styled-components'
import LinksList from '../components/links/link.list'
import '../fonts/Cookies.ttf'

class Links extends React.PureComponent {

    state = {
        currentTag: 'all'
    }

    componentDidMount() {
        this.props.fetchLinks()
    }

    yearChange = (tag) => {
        this.setState({ currentTag: tag })
    }

    render() {

        return (
            <LinksWrapper>
                <Title><span>Links</span></Title>
                <LinksList user={this.props.user} edit={this.editMe} links={this.props.links} />
            </LinksWrapper>
        )
    }
}

const Title = styled.div`
    width: 90%;
    padding: 1rem;
    margin: 1rem auto 0;
    display: flex;
    align-items: center;
    justify-content: space-around;
    span {
        font-family: 'Cookies';
        font-size: 3rem;
        color: #f0f;
    }
`;

const LinksWrapper = styled.div`
    width: 100%;
`;

const mapStateToProps = (state) => {
    return {
        user: state.auth.user,
        links: state.links.links
    }
}

export default connect(mapStateToProps, actions)(Links)
