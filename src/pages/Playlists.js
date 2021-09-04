import React from 'react'
import { connect } from 'react-redux'
import * as actions from '../actions'
import styled from 'styled-components'
import PlaylistList from '../components/playlists/playlist.list'
import PlaylistInput from '../components/playlists/playlist.input'
import '../fonts/Cookies.ttf'

class Playlists extends React.PureComponent {

    state = {
        display: 'input',
        editlist: null
    }

    componentDidMount() {
        this.props.fetchPlaylists()
    }

    yearChange = (tag) => {
        this.setState({ currentTag: tag })
    }

    editMe(plid) {
        const playlist = this.props.playlists.filter(pl => { return pl._id === plid })[0]
        this.setState({editlist: playlist, display: 'input'})
    }

    createPlaylist() {

    }

    render() {

        return (
            <PlaylistsWrapper>
                <Title><span>Playlists</span><button onClick={() => this.setState({display: 'input'})}>Create Playlist</button></Title>
                {this.state.display === 'playlists' && this.props.playlists && <PlaylistList user={this.props.user} edit={this.editMe.bind(this)} playlists={this.props.playlists} />}
                {!this.props.playlists && this.state.display === 'playlists' && <Empty>No Playlists!</Empty>}
                {this.state.display === 'input' && <PlaylistInput playlist={this.state.editlist} cancel={() => this.setState({display: 'playlists', editlist: null})} />}
            </PlaylistsWrapper>
        )
    }
}

const Empty = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.5rem;
    font-weight: bold;
    color: white;
`;

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

const PlaylistsWrapper = styled.div`
    width: 100%;
`;

const mapStateToProps = (state) => {
    return {
        user: state.auth.user,
        playlists: state.playlists.playlists
    }
}

export default connect(mapStateToProps, actions)(Playlists)
