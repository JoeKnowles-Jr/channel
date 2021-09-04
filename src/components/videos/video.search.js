import React from 'react'
import { connect } from 'react-redux'
import * as actions from '../../actions'
import styled from 'styled-components'
import VideoList from './video.list'

class VideoSearch extends React.PureComponent {

    state = {
        displayVideos: null
    }

    componentDidMount() {
        this.setState({
            displayVideos: this.props.videos.filter(v => {

            })
        })
    }

    render() {
        return (
            <SearchWrapper>
                {this.props.videos && <VideoList add={this.props.add} playlist={this.props.playlist} compact={true} videos={this.state.displayVideos} orientation={'h'} />}
            </SearchWrapper>
        )
    }
}

const SearchWrapper = styled.div`

`;

const mapStateToProps = (state) => {
    return {
        videos: state.videos.videos
    }
}

export default connect(mapStateToProps, actions)(VideoSearch)
