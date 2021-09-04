import React from "react"
import { Link } from 'react-router-dom'
import styled from "styled-components"
import Video from "./video"

const VideoGrid = ({ user, videos }) => {
  return (
    <VideoGridWrapper>
      <VGrid>
        {videos &&
          videos.map((v) => {
            return (
              <Link key={v._id} to={`/channel/videowatch/${v._id}`}>
                <Video user={user} video={v} />
              </Link>
            )
          })}
      </VGrid>
    </VideoGridWrapper>
  )
}

const VGrid = styled.div`
  margin: 0 auto;
  width: 90%;
  min-height: 80vh;
  @media(min-width: 768px) {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 0fr));
    grid-column-gap: 1rem;
    grid-row-gap: 0;
  }
  a {
    text-decoration: none;
  }
`;

const VideoGridWrapper = styled.div`
  width: 100%;
`;

export default VideoGrid
