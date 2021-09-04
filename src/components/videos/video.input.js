import React, { PureComponent } from 'react'
import * as actions from '../../actions'
import { connect } from 'react-redux'
import styled from 'styled-components'
import FilesDragAndDrop from '../files/FilesDragAndDrop'

class VideoInput extends PureComponent {

    state = {
        video: {
            number: '',
            title: '',
            description: '',
            date: '',
            tags: [],
            videofile: '',
            thumbfile: ''
        },
        videoFileExists: false,
        thumbFileExists: false,
        selectedThumb: null,
        selectedVideo: null
    }

    thumbsDir() { return 'https://joeknowles.com/thumbs/' }
    videosDir() { return 'https://joeknowles.com/videos/' }

    componentDidMount() {
        if (this.props.video) {
            this.setState({
                video: this.props.video,
                selectedThumb: {
                    name: (this.props.video.thumbfile.includes('http://')
                        || this.props.video.thumbfile.includes('https://'))
                        ? "" : this.thumbsDir()
                        + this.props.video.thumbfile },
                selectedVideo: {
                    name: (this.props.video.videofile.includes('http://')
                        || this.props.video.videofile.includes('https://'))
                        ? "" : this.videosDir()
                        + this.props.video.videofile
                }
            })
            document.getElementById('thumbOutput').src =
                (this.props.video.thumbfile.includes('http://')
                    || this.props.video.thumbfile.includes('https://'))
                ? "" : this.thumbsDir()
                + this.props.video.thumbfile
            document.getElementById('videoOutput').src =
                (this.props.video.videofile.includes('http://')
                || this.props.video.videofile.includes('https://'))
                ? "" : this.videosDir()
                + this.props.video.videofile
        }
        this.props.getFiles()
    }

    resetState() {
        this.setState({
            video: {
                number: '',
                title: '',
                description: '',
                date: '',
                tags: [],
                videofile: '',
                thumbfile: ''
            },
            videoFileExists: false,
            thumbFileExists: false,
            selectedThumb: null,
            selectedVideo: null
        })
    }


    handleFormChange(e) {
        const { name, value } = e.target
        this.setState({ video: { ...this.state.video, [name]: value } })
    }

    handleFormSubmit() {
        let video = this.state.video
        localStorage.setItem("test", JSON.stringify(video))
        video.number = this.props.number
        video.thumbfile=this.state.selectedThumb.name
        video.videofile = this.state.selectedVideo.name
        this.props.video ? this.props.editVideo(this.props.video._id, video) : this.props.insertVideo(video)
        this.resetState()
        window.location.reload()
    }

    selectThumb(thumb) {
        console.log('selectThumb', thumb)
        if (thumb) {
            const output = document.getElementById('thumbOutput');
            const thumbStatus = document.getElementById('thumbStatus');
            if (!thumb.type) {
                thumbStatus.textContent = 'Error: The File.type property does not appear to be supported on this browser.';
                return;
            }
            if (!thumb.type.match('image.*')) {
                thumbStatus.textContent = 'Error: The selected file does not appear to be an image.'
                return;
            }
            const reader = new FileReader();
            reader.addEventListener('load', event => {
                output.src = event.target.result;
            });
            reader.readAsDataURL(thumb);
            this.setState({ selectedThumb: thumb, video: { ...this.state.video, thumbfile: thumb.name } })
            this.doesThumbExistOnServer()
            return
        }
    }

    selectVideo(video) {
        if (video) {
            const videoStatus = document.getElementById('videoStatus');
            const output = document.getElementById('videoOutput');
            if (!video.type) {
                videoStatus.textContent = 'Error: The File.type property does not appear to be supported on this browser.';
                return;
            }
            if (!video.type.match('video.*')) {
                videoStatus.textContent = 'Error: The selected file does not appear to be a video.'
                return;
            }
            const reader = new FileReader();
            reader.addEventListener('load', event => {
                output.src = event.target.result;
            });
            reader.readAsDataURL(video);
            this.setState({
                selectedVideo: video, video: {
                    ...this.state.video,
                    videofile: video.name.substring(video.name.lastIndexOf('/') + 1)
                }
            })
            this.doesVideoExistOnServer()
        }
    }

    onVideoChange(e) {
        this.selectVideo(e.target.files[0])
    }

    onThumbChange(e) {
        this.selectThumb(e.target.files[0])
    }

    handleThumbSelect(e) {
        const off = e.target.value === 'Thumb Files on Server'
        
        this.setState({
            thumbFileExists: !off,
            selectedThumb: off ? null : { name: e.target.value },
            video: { ...this.state.video, thumbfile: e.target.value }
        })
        document.getElementById('thumbOutput').src = (off ? '' : this.thumbsDir() + e.target.value)
        console.log(this.state.selectedThumb)
    }

    handleVideoSelect(e) {
        const off = e.target.value === 'Video Files on Server'

        this.setState({
            videoFileExists: !off,
            selectedVideo: off ? null : { name: this.videosDir() + e.target.value },
            video: {...this.state.video, videofile: e.target.value}
        })
        document.getElementById('videoOutput').src = off ? '' : this.videosDir() + e.target.value
        
    }

    handleThumbRemove() {
        this.setState({ selectedThumb: null })
    }

    handleVideoRemove() {
        this.setState({ selectedVideo: null })
    }

    doesThumbExistOnServer() {
        this.props.thumbFiles && this.setState({ thumbFileExists: this.props.thumbFiles.includes(this.state.selectedThumb.name)})
    }

    doesVideoExistOnServer() {
        this.props.videoFiles && this.setState({ videoFileExists: this.props.videoFiles.includes(this.state.selectedVideo.name) })
    }

    getFormData(which) {
        const formData = new FormData()
        const file = (which === 'thumb') ? this.state.selectedThumb : this.state.selectedVideo
        formData.append('file', file, file.name)
        formData.append('type', which)
        return formData
    }

    uploadVideo() {
        if (this.state.videoFileExists) {
            return
        }
        console.log('uploadvideo')
        this.props.uploadFile(this.getFormData('video'))
        this.setState({ videoFileExists: true })
    }

    uploadThumb() {
        if (this.state.thumbFileExists) {
            return
        }
        console.log('uploadthumb')
        this.props.uploadFile(this.getFormData('thumb'))
        this.setState({ thumbFileExists: true })
    }

    renderError() {
        if (this.props.errorMessage) {
            return (
                <div className="alert alert-danger">
                    <em>Oops! {this.props.message}</em>
                </div>
            )
        }
    }

    handleClose = () => {
        console.log('cancel')
        this.resetState()
        this.props.cancel()
    }

    renderVideoPreview() {

        return (
            <VideoPreview>
                <div className={`bg ${this.state.selectedVideo ? '' : 'hide'}`}>
                    <video controls={true} className='output' id='videoOutput' alt='Selected video' />
                </div>
                {this.state.selectedVideo && (
                    <div>
                        <em className='hasUploaded'>
                            <button className='delete' id='v' onClick={this.handleVideoRemove.bind(this)}>x</button></em>
                    </div>
                )}
                {!this.props.video && <div>
                    <div className='small'>
                        <label htmlFor='videofile' className='select_button'>
                            <input id='videofile' type='file' onChange={this.onVideoChange.bind(this)} />
                            {!this.state.selectedVideo && <div className='small'><span>Click Here To Select Video File</span></div>}
                            {this.state.selectedVideo && <div className='small'><span>Click Here To Change Video File</span></div>}
                        </label>
                    </div>
                    <div className='big'>
                        {!this.state.selectedVideo && <FilesDragAndDrop onSelect={this.selectVideo.bind(this)}>
                            <em>Drop me a file here!</em>
                            <span
                                role='img'
                                aria-label='emoji'
                                className='area__icon'
                            >
                                &#128526;
                            </span>
                        </FilesDragAndDrop>}
                    </div>
                </div>}
                {this.state.selectedVideo && !this.props.video &&
                    <button
                        onClick={() => this.uploadVideo()}
                        className='upload'
                        disabled={this.state.videoFileExists}
                >{this.state.videoFileExists ? 'File exists on server' : `Upload ${this.state.selectedVideo && this.state.selectedVideo.name}`}</button>}
            </VideoPreview>
        )
    }

    renderThumbPreview() {
        return (
            <ThumbPreview>
                <div className={`bg ${this.state.selectedThumb ? '' : 'hide'}`}>
                    <img className='output' id='thumbOutput' alt='Selected thumbnail' />
                </div>
                <div className='small'>
                    <label htmlFor='thumbfile' className='select_button'>
                        <input id='thumbfile' type='file' onChange={this.onThumbChange.bind(this)} />
                        {!this.state.selectedThumb && <div className='small'><span>Click Here To Select Thumb File</span></div>}
                        {this.state.selectedThumb && <div className='small'><span>Click Here To Change Thumb File</span></div>}
                    </label>
                </div>
                <div className='big'>
                    {this.state.selectedThumb && (
                        <div>
                            <em className='hasUploaded'>
                                <button className='delete' id='v' onClick={this.handleThumbRemove.bind(this)}>x</button></em>
                        </div>
                    )}
                    {!this.state.selectedThumb && <FilesDragAndDrop onSelect={this.selectThumb.bind(this)}>
                        <em>Drop me a file here!</em>
                        <span
                            role='img'
                            aria-label='emoji'
                            className='area__icon'
                        >
                            &#128526;
                        </span>
                    </FilesDragAndDrop>}
                </div>

                {this.state.selectedThumb && !this.props.video &&
                 
                    <button
                        disabled={this.state.thumbFileExists}
                        onClick={() => this.uploadThumb()}
                        className='upload'
                    >
                    {this.state.thumbFileExists ? 'File exists on server' : `Upload ${this.state.selectedThumb && this.state.selectedThumb.name}`}
                    </button>
              
                }
            </ThumbPreview>
        )
    }

    skip(which) {
        this.setState({ video: { ...this.state.video, [which]: 'No ' + which } })
    }

    renderDetails() {
        return (
            <div className='details'>
                <div>
                    <div>
                        Video Progress {this.props.videoUp}
                    </div>
                    <div>
                        Thumb Progress {this.props.thumbUp}
                    </div>
                    <div>
                        <span className={(this.state.selectedVideo || this.state.video.videofile) ? 'checked' : 'unchecked'}></span>
                        Video file
                    </div>
                    <div>
                        <span className={(this.state.selectedThumb || this.state.video.thumbfile) ? 'checked' : 'unchecked'}></span>
                        Thumb file
                    </div>
                    <div name='title'>
                        <span onClick={(e) => this.skip(e.target.id)} id='title' className={this.state.video.title ? 'checked' : 'unchecked'}></span>
                        Title
                    </div>
                    <div name='description'>
                        <span onClick={(e) => this.skip(e.target.id)} id='description' className={this.state.video.description ? 'checked' : 'unchecked'}></span>
                        Description
                    </div>
                    <div name='date'>
                        <span onClick={(e) => this.skip(e.target.id)} id='date' className={this.state.video.date ? 'checked' : 'unchecked'}></span>
                        Date
                    </div>
                    <div name='tags'>
                        <span onClick={(e) => this.skip(e.target.id)} id='tags' className={(this.state.video.tags && this.state.video.tags.length > 0) ? 'checked' : 'unchecked'}></span>
                        Tags
                    </div>
                </div>
            </div>
        )
    }

    test = () => {
        localStorage.setItem("test", JSON.stringify(this.state.video))
    }

    render() {

        return (
            <VideoInputWrapper>
                <div className='number'>Video #{this.props.video ? this.props.video.number : this.props.number}</div>

                <div className='status' id='thumbStatus'></div>
                <div className='status' id='videoStatus'></div>
                <Preview>
                    {this.renderThumbPreview()}
                    {this.renderDetails()}
                    {this.renderVideoPreview()}
                </Preview>
                <Files>
                    <select onChange={this.handleThumbSelect.bind(this)}>
                        <option>Thumb Files on Server</option>
                        {this.props.thumbFiles && this.props.thumbFiles.map((tf, idx) => {
                            return <option value={tf} key={idx}>{tf}</option>
                        })}
                    </select>
                    <select onChange={this.handleVideoSelect.bind(this)}>
                        <option>Video Files on Server</option>
                        {this.props.videoFiles && this.props.videoFiles.map((vf, idx) => {
                            return <option value={vf} key={idx}>{vf}</option>
                        })}
                    </select>
                </Files>
                <fieldset>
                    <input
                        onChange={this.handleFormChange.bind(this)}
                        value={this.state.video.title}
                        name="title"
                        placeholder="Title"
                        type="text" />
                </fieldset>
                <fieldset>
                    <input
                        onChange={this.handleFormChange.bind(this)}
                        value={this.state.video.description}
                        name="description"
                        placeholder="Description"
                        type="text" />
                </fieldset>
                <fieldset>
                    <input
                        onChange={this.handleFormChange.bind(this)}
                        value={this.state.video.date}
                        name="date"
                        placeholder="Date"
                        type="text" />
                </fieldset>
                <fieldset>
                    <input
                        onChange={this.handleFormChange.bind(this)}
                        value={this.state.video.tags}
                        name="tags"
                        placeholder="Tags"
                        type="text" />
                </fieldset>
                {this.renderError()}
                <Buttons>
                    <button className='close' onClick={() => this.test()}>Cancel</button>
                    <button className='close' onClick={this.handleFormSubmit.bind(this)}>Submit</button>
                </Buttons>
            </VideoInputWrapper>
        )
    }
}

const Files = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 0 1.5rem;
    select {
        width: 25%;
    }
`;

const Buttons = styled.div`
    width: 75%;
    margin: 1rem auto;
    display: flex;
    justify-content: space-around;
`;

const PreviewPane = styled.div`
    width: 45%;
    background-color: purple;
    border-radius: 1rem;
    height: 7rem;
    position: relative;
    overflow: hidden;
    .upload {
        position: absolute;
        bottom: 0;
        width: 100%;
        border-radius: 1rem;
        z-index: 2;
    }
    .bg {
        position: absolute;
        top: 0;
        left: 0;
    }
    .output {
        width: 100%;
        margin: auto;

    }
    .hide {
        display: none;
    }
    .delete {
        position: absolute;
        bottom: 0;
        right: 0.5rem;
        z-index: 9999;
    }
    .select_button {
        width: 100%;
        text-align: center;
        background-color: #f0f;
        padding: 0.25rem;
        border-radius: 1rem 1rem 0 0;
    }
    span {
        color: white;
    }
    .status {
        z-index: 9999;
    }
    @media(min-width: 768px) {
        width: 30%;
        height: 12rem;
    }
`;

const VideoPreview = styled(PreviewPane)`
`;

const ThumbPreview = styled(PreviewPane)`
`;

const Preview = styled.div`
    width: 100%;
    padding: 1.5rem 1rem;
    display: flex;
    justify-content: space-between;
    .big {
        display: none;
        .hasUploaded {
                z-index: 9999;
            position: absolute;
            left: 0;

        }
    }
    .details {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 30%;
        margin: 0 1rem;
        background-color: #999;

        .checked {
            display: inline-block;
            width: 1rem;
            height: 1rem;
            background-color: green;
            margin: 0 0.5rem;
        }

        .unchecked {
            display: inline-block;
            width: 1rem;
            height: 1rem;
            background-color: red;
            margin: 0 0.5rem;
        }
    }
    input[type='file'] {
        position: absolute;
        left: -999rem;
    }
    @media(min-width: 1024px) {
        .big {
            display: block;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translateX(-50%) translateY(-50%);
            width: 100%;
        }
        .small {
            color: white;
            label {
                z-index: 9999;
            }
        }
    }
`;

const VideoInputWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    .number {
        text-align: center;
        color: white;
    }
    .labels {
        width: 100%;
        padding: 0.25rem;
        text-align: center;
        span {
            color: white;
            font-size: 1rem;
        }
    }
    fieldset {
        margin: 0.5rem auto;
        width: 75%;
        text-align: center;
        input {
            width: 100%;
        }
    }
`;

const mapStateToProps = (state) => {
    return {
        thumbUp: state.videos.thumbUp,
        videoUp: state.videos.videoUp,
        message: state.videos.message,
        videoFiles: state.videos.videoFiles,
        thumbFiles: state.videos.thumbFiles
    }
};

export default connect(mapStateToProps, actions)(VideoInput)

