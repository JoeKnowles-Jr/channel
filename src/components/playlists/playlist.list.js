import React from 'react'
import styled from 'styled-components'
import Playlist from './playlist'
import '../../fonts/Cookies.ttf'

const PlaylistList = ({ playlists, admin, edit }) => {

    return (
        <PlaylistListWrapper>
            {playlists && playlists.map((playlist, idx) => {
                return (<div key={idx}>
                    <Playlist playlist={playlist} edit={edit} />

                </div>)
            })}
        </PlaylistListWrapper>
    )
}

const PlaylistListWrapper = styled.div`

`;

export default PlaylistList