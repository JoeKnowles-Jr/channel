import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import * as actions from '../actions'
import styled from 'styled-components'
// import history from '../history'
import VideoGrid from '../components/videos/videoGrid'

class Home extends PureComponent {

    state = {
        currentYear: 2021,
        display: 'grid'
    }

    componentDidMount() {
        this.props.fetchVideos()
        // this.props.populateVideos(2021)
    }

    yearChange = (year) => {
        this.setState({ currentYear: year })
    }

    watchVideo() {
        
    }

    render() {
        if (!this.props.videos || this.props.videos.length < 1) {
            return <div>Loading...</div>;
        }

        const videos = (this.props.videos.length > 0) ? this.props.videos.filter(v => {
            return v.videofile && v.date.endsWith(this.state.currentYear)
        }) : []

        return (
            <HomeWrapper>

                    <ButtonsWrapper>
                        <YearButton onClick={() => this.yearChange(2021)} className={`${this.state.currentYear === 2021 ? 'current' : ''}`}>2021</YearButton>
                        <YearButton onClick={() => this.yearChange(2020)} className={`${this.state.currentYear === 2020 ? 'current' : ''}`}>2020</YearButton>
                        <YearButton onClick={() => this.yearChange(2019)} className={`${this.state.currentYear === 2019 ? 'current' : ''}`}>2019</YearButton>
                        <YearButton onClick={() => this.yearChange(2018)} className={`${this.state.currentYear === 2018 ? 'current' : ''}`}>2018</YearButton>
                        <YearButton onClick={() => this.yearChange(2017)} className={`${this.state.currentYear === 2017 ? 'current' : ''}`}>2017</YearButton>
                        <YearButton onClick={() => this.yearChange(2016)} className={`${this.state.currentYear === 2016 ? 'current' : ''}`}>2016</YearButton>
                    </ButtonsWrapper>
                {this.props.videos && <VideoGrid videos={videos} />}
            </HomeWrapper>
        )
    }
}

const YearButton = styled.span`
    color: white;
    font-size: 1rem;
    cursor: pointer;
    @media(min-width: 832px) {
        font-size: 1.25rem;
    }
    @media(min-width: 1200px) {
        font-size: 2rem;
    }
`;

const ButtonsWrapper = styled.div`
    width: 90%;
    padding: 0 0 2rem;
    margin: 1rem auto 0;
    display: flex;
    align-items: center;
    justify-content: space-around;
    .current {
        font-size: 2.5rem;
        font-weight: bolder;
        color: green;
    }
    @media (min-width: 768px) {
        width: 50%;
    }
`;

const HomeWrapper = styled.div`
    width: 100%;
    position: relative;
`;

const mapStateToProps = (state) => {
    return {
        videos: state.videos.videos
    }
}

export default connect(mapStateToProps, actions)(Home)
