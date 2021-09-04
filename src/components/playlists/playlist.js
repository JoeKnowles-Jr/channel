import React from 'react'
import styled from 'styled-components'
import VideoList from '../videos/video.list'
import gear from '../../img/gear.png'

const Playlist = ({ playlist, edit }) => {

    return (
        <PlaylistWrapper>
            <div className='title'>
                {playlist.title}
                <Buttons>                    
                    <button onClick={() => edit(playlist._id)}>
                        <img width='16px' src={gear} />
                    </button>
                </Buttons>
            </div>
            <div className='description'>
                {playlist.description}
            </div>
            {playlist.videos && playlist.videos.length > 0 && <VideoList compact={true} videos={playlist.videos} orientation='h' />}
        </PlaylistWrapper>
    )
}

const Buttons = styled.div`
    display: inline-block;
    margin-left: 1rem;
`;

const PlaylistWrapper = styled.div`
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

export default Playlist