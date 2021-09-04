import React from 'react'
import styled from 'styled-components'
import VideoList from '../videos/video.list'
import VideoInput from '../videos/video.input'
import { deleteVideo } from '../../actions'
import {useDispatch} from 'react-redux'

const VideosAdmin = ({ videos, user }) => {
    const dispatch = useDispatch()
    const [display, setDisplay] = React.useState('videos')
    const [editVideo, setEditVideo] = React.useState(null)

    const editMe = (vid) => {
        const video = videos.filter(v => { return v._id === vid })[0]
        setEditVideo(video)
        setDisplay('input')
    }

    const deleteMe = () => {
        if (editVideo) {
            console.log('about to delete')
            dispatch(deleteVideo(editVideo._id))
            setEditVideo(null)
            setDisplay('videos')
            window.location.reload()
        }
    }

    return (
        <div>
            <Title>
                VideosAdmin
            </Title>
            
            {display === 'videos' && <AddButton><button onClick={() => setDisplay('input')}>Add Video</button></AddButton>}
            {editVideo && display === 'input' && <AddButton><button onClick={() => deleteMe()}>Delete Video</button></AddButton>}

            {display === 'videos' && videos && <VideoList orientation='v' edit={editMe} user={user} videos={videos} />}
            {display === 'input' && <VideoInput number={videos.length + 1} cancel={() => setDisplay('videos')} video={editVideo} />}
        </div>
    )
}

const Title = styled.div`
    margin-top: 2rem;
    font-size: 3rem;
    font-weight: bold;
    font-family: 'Cookies';
    text-align: center;
`

const AddButton = styled.div`
    text-align: end
`
export default VideosAdmin
