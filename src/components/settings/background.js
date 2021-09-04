import React from 'react'
import { PhotoshopPicker } from "react-color";
import styled from 'styled-components'

class BackgroundSection extends React.PureComponent {

    state = {
        solid: '#00aa00',
        image: '',
        display: 'image'
    }

    componentDidMount() {
        document.getElementById('solid').style = 'background-color: green;'
        document.getElementById('gradient').style = 'background: linear-gradient(180deg, rgba(20,11,38,.8) 0%, rgba(2,7,112,.7) 35%, rgba(234,69,239,.7) 75%, rgba(244,224,137,.7) 100%);'
        document.getElementById('image').src = 'http://joeknowles.com/thumbs/avi.png'
    }

    saveSettings() {
        this.props.saveSettings()
    }

    radioChange = (e) => {
        this.setState({ display: e.target.value })
    }

    changeSolidColor = (color, event) => {
        this.setState({ solid: color.hex })
        document.getElementById('solid').style.backgroundColor = color.hex
    }

    changeImage() {

    }

    render() {
        return (
            <BackgroundSectionWrapper>
                <BgOptions className='radio'>
                    <div>
                        <label>
                            Image
                            <input
                                name="bg_radio"
                                type='radio'
                                value='image'
                                checked={this.state.display === 'image'}
                                onChange={this.radioChange}
                            />
                            <BackgroundPreview>
                                <img className='img' id='image' alt='app background' />
                            </BackgroundPreview>
                        </label>
                    </div>
                    <div>
                        <label>
                            Solid Color
                            <input
                                name="bg_radio"
                                type='radio'
                                value='solid'
                                checked={this.state.display === 'solid'}
                                onChange={this.radioChange}
                            />
                            <BackgroundPreview id='solid'>
                                <div
                                    id='solid'
                                >
                                    
                                    </div>
                            </BackgroundPreview>
                        </label>
                    </div>
                    <div>
                        <label>
                            Gradient
                            <input
                                name="bg_radio"
                                type='radio'
                                value='gradient'
                                checked={this.state.display === 'gradient'}
                                onChange={this.radioChange}
                            />
                            <BackgroundPreview id='gradient'></BackgroundPreview>
                        </label>
                    </div>
                </BgOptions>

                <PickersWrapper>
                    <ColorPickerWrapper>
                        {this.state.display === 'solid' && <PhotoshopPicker
                            color={this.state.solid}
                            onAccept={this.saveSettings.bind(this)}
                            onChangeComplete={this.changeSolidColor.bind(this)}
                        />}
                    </ColorPickerWrapper>
                </PickersWrapper>

            </BackgroundSectionWrapper>
        )
    }
}

const ColorPickerWrapper = styled.div`

`;

const PickersWrapper = styled.div`

`;

const BgOptions = styled.div`
    display: flex;
    flex-direction: column;
`;

const BackgroundPreview = styled.div`
    width: 10rem;
    height: 10rem;
    border: 1px solid black;
    .img {
        width: 10rem;
        height: 10rem;
    }
`;

const BackgroundSectionWrapper = styled.fieldset`
    display: flex;
    width: 100%;
`;

export default BackgroundSection
