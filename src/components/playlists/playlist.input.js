import React, { PureComponent } from 'react'
import * as actions from '../../actions'
import { connect } from 'react-redux'
import styled from 'styled-components'
import VideoSearch from '../videos/video.search'
import VideoList from '../videos/video.list'
import Video from '../videos/video'

class PlaylistInput extends PureComponent {

    state = {
        selected: 0,
        playlist: {
            title: '',
            description: '',
            videos: []
        }
    }

    componentDidMount() {
        this.props.playlist && this.setState({ playlist: this.props.playlist })
    }

    handleChange(e) {
        const { name, value } = e.target
        this.setState({ playlist: { ...this.state.playlist, [name]: value } })
    }

    resetState() {
        this.setState({
            selected: 0,
            playlist: {
                title: '',
                description: '',
                videos: []
            }
        })
    }

    handleFormSubmit() {
        this.props.playlist && this.props.editPlaylist(this.props.playlist._id,
            {
                title: this.state.playlist.title,
                description: this.state.playlist.description,
                videos: this.state.playlist.videos
            })
        !this.props.playlist && this.props.insertPlaylist(this.state.playlist)
        this.resetState()
        window.location.reload()
    }

    renderError() {
        if (this.props.errorMessage) {
            return (
                <div className='alert alert-danger'>
                    <em>Oops! {this.props.errorMessage}</em>
                </div>
            )
        }
    }

    handleClose = () => {
        console.log('close')
        this.resetState()
        this.props.cancel()
    }

    add(vid) {
        this.setState({
            playlist: {
                ...this.state.playlist,
                videos: [
                    ...this.state.playlist.videos,
                    vid
                ]
            }
        })
        this.props.addVideoToPlaylist(vid)
    }

    del(e, vid) {
        e.preventDefault()
        e.stopPropagation()
        console.log('del')
        this.props.removeVideoFromPlaylist(this.state.playlist._id, vid)
        const vids = this.state.playlist.videos.filter(v => { return v._id !== vid })
        this.setState({
            playlist: {
                ...this.state.playlist,
                videos: vids
            }
        })
    }

    render() {

        return (
            <PlaylistForm>
                <fieldset>
                    <input
                        onChange={this.handleChange.bind(this)}
                        defaultValue={this.props.playlist ? this.props.playlist.title : ''}
                        name='title'
                        placeholder='Title'
                        type='text' />
                </fieldset>
                <fieldset>
                    <input
                        onChange={this.handleChange.bind(this)}
                        defaultValue={this.props.playlist ? this.props.playlist.description : ''}
                        name='description'
                        placeholder='Description'
                        type='text' />
                </fieldset>
                {this.renderError()}
                <Videos>
                    {this.state.playlist.videos && this.state.playlist.videos.length > 0 &&
                        <VideoList del={this.del.bind(this)} mode='edit' compact={true} videos={this.props.playlist.videos} orientation='h' />}
                </Videos>
                <Buttons>
                    <button className='close btn btn-secondary' onClick={this.handleClose.bind(this)}>Cancel</button>
                    <button className='btn btn-primary' onClick={() => this.handleFormSubmit()}>Save</button>
                </Buttons>
                <fieldset>
                    <button>Add Videos</button>
                </fieldset>
                <VideoSearch add={this.add.bind(this)} playlist={this.state.playlist} />
            </PlaylistForm>
        )
    }
}

const Videos = styled.div`
    width: 75%;
    display: flex;
    .selected {
        border: 2px solid red;
    }
`;

const Buttons = styled.div`
    width: 75%;
    margin: 1rem auto;
    display: flex;
    justify-content: space-around;
`;

const PlaylistForm = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    fieldset {
        margin: 0.5rem auto;
        width: 75%;
        text-align: center;
        input {
            width: 40%;
        }
    }
`;

export default connect(null, actions)(PlaylistInput)
