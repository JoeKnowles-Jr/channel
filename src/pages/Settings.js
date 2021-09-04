import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import * as actions from '../actions'
import styled from 'styled-components'
import BackgroundSection from '../components/settings/background'

class Settings extends PureComponent {

    state = {
        display: 'id',
        settings: {
            name: 'main',
            bgtype: 'gradient',
            bgvalue: 'linear-gradient(180deg, rgba(20,11,38,.8) 0%, rgba(2,7,112,.7) 35%, rgba(234,69,239,.7) 75%, rgba(244,224,137,.7) 100%);',        
            videosfolder: 'https://joeknowles.com/videos/',
            thumbsfolder: 'https://joeknowles.com/thumbs/'
        }
    }

    componentDidMount() {
    }

    saveSettings() {
        this.props.insertSettings(this.state.settings)
    }

    changeDisplay(e) {
        const { id } = e.target;
        this.setState({ display: id })
    }

    renderFolderSection() {
        return (
            <FolderSection>
                <div>
                    <label htmlFor='videosfolder'>Videos folder</label>
                    <input id='videosfolder' type='text' />
                </div>
                <div>
                    <label htmlFor='thumbsfolder'>Thumbs folder</label>
                    <input id='thumbsfolder' type='text' />
                </div>
            </FolderSection>
        )
    }

    renderBackgroundSection() {
        return (
            <BackgroundSection saveSettings={this.saveSettings.bind(this)} />
        )
    }

    render() {

        return (
            <SettingsWrapper>
                <Title>
                    Settings
                </Title>
                <Container>
                    <Menu>
                        <label>
                            <button id='folders' onClick={this.changeDisplay.bind(this)}>Folders</button>
                        </label>
                        <label>
                            <button id='background' onClick={this.changeDisplay.bind(this)}>Background</button>
                        </label>
                    </Menu>
                    <Content>
                        {this.state.display === 'folders' && this.renderFolderSection()}
                        {this.state.display === 'background' && this.renderBackgroundSection()}
                    </Content>
                </Container>
            </SettingsWrapper>
        )
    }
}

const FolderSection = styled.fieldset`
    width: 75%;
    div>label {
        width: 30%;
    }
    div>input {
        width: 70%;
    }
`;

const Content = styled.div`
    width: 75%;
    margin: 0 auto; 
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 2rem;


    label {
        width: 50%;
    }

    input {
        width: 50%;
    }

    .radio {
        width: 100%;
        display: flex;
        justify-content: space-around;
    }
`;

const Menu = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: left;
    color: white;
`;

const Container = styled.div`
    display: flex;
`;

const Title = styled.div`
    margin-top: 2rem;
    font-size: 3rem;
    font-weight: bold;
    font-family: 'Cookies';
    text-align: center;
`
const SettingsWrapper = styled.div`
    width: 100%;
`;

const mapStateToProps = (state) => {
    return {
        settings: state.settings
    }
}

export default connect(mapStateToProps, actions)(Settings)
