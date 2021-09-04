import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import * as actions from '../actions'
import styled from 'styled-components'
import VideosAdmin  from '../components/admin/videos.admin'
import LinksAdmin  from '../components/admin/links.admin'
import UsersAdmin  from '../components/admin/users.admin'

class Home extends PureComponent {

    state = {
        display: 'videos'
    }

    componentDidMount() {
        this.props.which && this.setState({ display: this.props.which })
        this.props.fetchVideos()
        this.props.fetchUsers()
    }

    render() {

        return (
            <AdminWrapper>
                {this.state.display === 'videos' && <VideosAdmin user={this.props.user} videos={this.props.videos} />}
                {this.state.display === 'links' && <LinksAdmin />}
                {this.state.display === 'users' && <UsersAdmin users={this.props.users} />}
            </AdminWrapper>
        )
    }
}

const AdminWrapper = styled.div`
    width: 100%;
    position: relative;
    @media(min-width: 768px) {
        width: 75%;
        margin: 0 auto;
    }
`;

const mapStateToProps = (state) => {
    return {
        videos: state.videos.videos,
        links: state.links.links,
        users: state.users.users,
        user: state.auth.user
    }
}

export default connect(mapStateToProps, actions)(Home)
