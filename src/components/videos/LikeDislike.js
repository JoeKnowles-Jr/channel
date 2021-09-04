import React from 'react'
import styled from 'styled-components'
import smiley from '../../img/smiley.png'
import smiley_on from '../../img/smiley-on.png'
import frowny from '../../img/frowny.png'
import frowny_on from '../../img/frowny-on.png'

const LikeDislike = ({ update, user, setUser, video, setVideo }) => {
    const [likes, setLikes] = React.useState(0)
    const [dislikes, setDislikes] = React.useState(0)
    const [isLiked, setIsLiked] = React.useState(false)
    const [isDisliked, setIsDisliked] = React.useState(false)

    React.useEffect(() => {
        console.log(video)
        if (video) {
            setLikes(video.likedBy.length || 0)
            setDislikes(video.dislikedBy.length || 0)
        }
    }, [video])

    React.useEffect(() => {
        if (user) {
            const userLikes = user.likedVideos.map(String)
            const userDislikes = user.dislikedVideos.map(String)
            setIsLiked(userLikes.includes(video._id.toString()))
            setIsDisliked(userDislikes.includes(video._id.toString()))
        }
    }, [user])

    const handleLikeClick = (e) => {
        e.preventDefault()
        e.stopPropagation()

        console.log("like clicked")
        if (user) {
            // if (isLiked) {
            //     updateVideo(video._id, { $pull: { likedBy: user._id } })
            //         .then(response => {
            //             update();
            //             // console.log(response.data);
            //             setVideo(response.data);
            //         })
            //         .catch(err => { console.log(err); });
            //     updateUser(user._id, { $pull: { likedVideos: video._id } })
            //         .then(response => {
            //             update();
            //             setUser(response.data);
            //         })
            //         .catch(err => { console.log(err); });
            // } else {
            //     updateVideo(video._id, { $push: { likedBy: user._id } })
            //         .then(response => {
            //             update();
            //             // console.log(response.data);
            //             setVideo(response.data);
            //         })
            //         .catch(err => { console.log(err); });
            //     updateUser(user._id, { $push: { likedVideos: video._id } })
            //         .then(response => {
            //             update();
            //             setUser(response.data);
            //         })
            //         .catch(err => { console.log(err); });
            //     console.log("here");
            // }
        }
    }

    const handleDislikeClick = (e) => {
        e.preventDefault()
        e.stopPropagation()
        // if (isDisliked) {
        //     updateVideo(video._id, { $pull: { dislikedBy: user._id } })
        //         .then(respone => {
        //             update();
        //             console.log(respone.data);
        //         })
        //         .catch(err => { console.log(err); });
        //     updateUser(user._id, { $pull: { dislikedVideos: video._id } })
        //         .then(respone => {
        //             update();
        //             console.log(respone.data);
        //         })
        //         .catch(err => { console.log(err); });
        //     setDislikes(dislikes - 1);
        //     setIsDisliked(false);
        // } else {
        //     updateVideo(video._id, { $push: { dislikedBy: user._id } })
        //         .then(respone => {
        //             update();
        //             console.log(respone.data);
        //         })
        //         .catch(err => { console.log(err); });
        //     updateUser(user._id, { $push: { dislikedVideos: video._id } })
        //         .then(respone => {
        //             update();
        //             console.log(respone.data);
        //         })
        //         .catch(err => { console.log(err); });
        //     setDislikes(dislikes + 1);
        //     setIsDisliked(true);
        // }
    }

    const lIcon = (isLiked && (!isDisliked)) ? smiley_on : smiley
    const dIcon = (isDisliked && (!isLiked)) ? frowny_on : frowny

    return (
        <LikeDislikeWrapper>
            <section>
                <Icon src={lIcon} onClick={handleLikeClick} />
                {likes}
            </section>
            <section>
                <Icon src={dIcon} onClick={handleDislikeClick} />
                {dislikes}
            </section>
        </LikeDislikeWrapper>
    )
}

const LikeDislikeWrapper = styled.section`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-around
`;

const Icon = styled.img`
    width: 16px;
    height: 16px;
    margin-right: 0.5rem;
`;






export default LikeDislike


