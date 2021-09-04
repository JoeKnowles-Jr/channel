import React from 'react'
import styled from 'styled-components'
import nofileimg from '../../img/file_broken.png'
import LikeDislike from './LikeDislike'

const getThumbUrl = (thumbfile) => {
    if (!thumbfile) { return null }
    return 'https://joeknowles.com/thumbs/' + thumbfile
}

const Video = ({ updateLikes, user, edit, video, compact }) => {

    const thumb = getThumbUrl(video.thumbfile)

    return (
        <VideoWrapper>
            <div className={compact ? 'compact' : 'full'}>
                <Thumb>
                    <img src={thumb || nofileimg} alt='thumbnail' />
                    {video.duration && <TimeDisplay>{video.duration}</TimeDisplay>}
                </Thumb>

                <VideoTitle>
                    {!compact && <ViewsLikes>
                        <section className='vd-left'>{video.views || 0} views</section>
                        <section className='vd-right'>
                            <LikeDislike video={video} update={updateLikes} user={user} />
                        </section>
                    </ViewsLikes>}
                    <span>{video.title || "No title"}</span>
                </VideoTitle>
                {user && user.role === 'Admin' && <p>
                    <button onClick={() => edit(video._id)} className='edit'>O</button>
                </p>}
            </div>
        </VideoWrapper>
    )
}

const VideoTitle = styled.section`
    position: relative;
    height: 40%;
    font-size: 1rem;
    padding: 0.25rem 0 0 0.2rem;
    background-color: #666;
    align-items: left;
    color: white;
`;

const Thumb = styled.section`
    position: relative;
    width: 100%;
    height: 60%;
    img {
        width: 100%;
        height: 100%;
    }
`;

const VideoWrapper = styled.div`
    overflow: hidden;
    position: relative;
    margin: 1rem auto;
    padding: 0;
    border-radius: 1rem;
    box-shadow: 5px 5px #090;
    background-color: #333;
    border: 1px solid blue;
    div {
        display: flex;
        justify-content: center;
        align-items: top;
        flex-direction: column;
    }
    .compact {
        width: 140px;
        height: 125px;
    }
    .full {
        width: 280px;
        height: 250px;
    }
    .edit {
        position: absolute;
        border-radius: 50%;
        top: 1rem;
        right: 1rem;
    }
`;

const ViewsLikes = styled.section`
    width: 100%;
    font-size: 0.75rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: absolute;
    bottom: 2%;
    left: 5%;
    .vd-left {
        width: 30%;
    }
    .vd-right {
        display: flex;
        align-items: center;
        justify-content: space-around;
        width: 50%;
        padding-right: 1rem;
    }
`;

const TimeDisplay = styled.span`
    z-index: 3;
    top: 75%;
    right: 1%;
    position: absolute;
    background-color: #282828;
    color: #ccc;
    padding: 0.25rem 0.5rem;
    border-radius: 1rem;
`;

export default Video;