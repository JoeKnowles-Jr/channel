import React from 'react'
import styled from 'styled-components'
import Video from './video'

const VideoList = ({ videos, user, playlist, add, edit, del, mode, compact, orientation = 'v' }) => {
    const [selected, setSelected] = React.useState(0)
    const [displayVideos, setDisplayVideos] = React.useState([])
    const [viewIndex, setViewIndex] = React.useState(0)

    React.useEffect(() => {
        !playlist && setDisplayVideos(videos)
        videos && playlist && setDisplayVideos(
            videos.filter(v => { return !playlist.videos.includes(v._id) })
        )
    }, [])

    const handleClick = (video, idx) => {
        console.log(video)
        setSelected(idx)
        add && add(video)
    }

    const left = () => {

    }

    const right = () => {

    }

    const mapVideos = () => {
        return displayVideos ? displayVideos.map((v, idx) => {
            return <div key={idx} onClick={(e) => handleClick(v, idx)} className={(compact && idx === selected) ? 'selected' : ''}>
                {idx === selected && mode === 'edit' && <div>
                    <button onClick={(e) => del(e, v._id)}>x</button>
                </div>}
                <Video compact={compact} edit={edit} user={user} video={v} />
                {orientation === 'v' && <VideoDetails>
                    <span>{v.videofile}</span>
                </VideoDetails>}
            </div>
        })
            :
            <div></div>
    }

    return (
        <VideoListWrapper>
            {orientation === 'h' && <ListHWrapper>
                {mapVideos()}
            </ListHWrapper>}

            {orientation === 'v' && <ListVWrapper>
                {mapVideos()}
            </ListVWrapper>}
        </VideoListWrapper>
    )
}

const VideoDetails = styled.div`
    color: white;
`;

const VideoWrapper = styled.div`

`;

const ListHWrapper = styled.div`
    width: 75%;
    display: flex;
    .selected {
        display: flex;
        flex-direction: column;
        border: 2px solid red;
    }
`;

const ListVWrapper = styled.div`

`;

const VideoListWrapper = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-around;
`;

export default VideoList
