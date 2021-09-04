import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions'
import styled from 'styled-components';
import smiley from '../img/smiley.png';
import frowny from '../img/frowny.png';

class VideoWatch extends PureComponent {

    state = {
        viewed: false,
        video: null
    }

    componentDidMount() {
        const vidNumber = this.props.match.params.vid;
        const video = this.props.videos.filter(v => {
            return v._id === vidNumber;
        })[0];
        this.setState({video : video})
    }

    timeUpdate() {
        const vid = document.getElementById('watch-video')
        document.getElementById('time').innerHTML = vid.currentTime;
        if (vid.currentTime > 10) {
            this.setState({ viewed: true })
            this.props.videoWatched({
                vid: this.state.video._id,
                currentViews: this.state.video.views
            })
        }
    }

    render() {

        const videoUrl = (videofile) => {
            return 'https://joeknowles.com/videos/' + videofile;
                
        };

        return (
            <VideoWatchWrapper>
                {this.state.video && <VideoWrapper>
                    <video
                        src={videoUrl(this.state.video.videofile)}
                        id='watch-video'
                        controls
                        onTimeUpdate={this.state.viewed ? null : this.timeUpdate.bind(this)}>
                        
                    </video>
        
                    <ViewsLikesWrapper>
                        <div id='time'></div>
                        <div className='vl-left'>
                            {this.state.video.views} views
                        </div>
                        <div className='vl-right'>
                            <div>
                                <Icon src={smiley} />
                                {this.state.video.likes || 0}
                            </div>
                            <div>
                                <Icon src={frowny} />
                                {this.state.video.dislikes || 0}
                            </div>
                        </div>
                    </ViewsLikesWrapper>
                    <VideoTitle>{this.state.video.title}</VideoTitle>
                    <VideoDescription>{this.state.video.description}</VideoDescription>
                </VideoWrapper>}
            </VideoWatchWrapper>
        );
    }
}

const VideoWrapper = styled.div`
    width: 75%;
`;

const Icon = styled.img`
    width: 24px;
    height: 24px;
    margin-right: 0.5rem;
    cursor: pointer;
`;

const VideoDescription = styled.div`
    padding-left: 1rem;

`;

const VideoTitle = styled.div`
    padding-left: 1rem;
    font-size: 2rem;
`;

const ViewsLikesWrapper = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .vl-left {
        padding-left: 1rem;
        font-size: 1.25rem;
    }
    .vl-right {
        border-radius: 1rem;
        display: flex;
        align-items: center;
        justify-content: space-around;
        width: 20%;
        padding: 0.5rem 1rem 0.5rem 0.5rem;
        background-color: #999;
        div{
            font-size: 1.5rem;
            display: flex;
            align-items: center;
        }
    }
`;

const VideoWatchWrapper = styled.div`
    padding: 1rem 7rem;
    video {
        height: 75vh;
        margin: 0 auto;
    }
    margin: 5rem 0;
`;

const mapStateToProps = (state) => {
    return { videos: state.videos.videos }
}

export default connect(mapStateToProps, actions)(VideoWatch);