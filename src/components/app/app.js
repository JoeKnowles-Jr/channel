import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from '../../actions'
import NavHeader from '../nav/navHeader'
import styled from "styled-components"

class App extends Component {

	componentDidMount() {
		this.props.fetchSettings()
	}

	render() {
		return (
			<MainApp>
				<NavHeader />
				<MainContent>
					{this.props.children}
				</MainContent>
				<Footer>
					<span>jbk &copy; 2021</span>
				</Footer>
			</MainApp>
		)
	}
}

const MainContent = styled.div`
	width: 100%;
	flex-grow: 1;
	flex-shrink: 0;
	margin-top: 4rem;
	margin-bottom: 4rem;
	padding: 1rem;
`;

const MainApp = styled.div`
    position: relative;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    min-height: 100vh;
    background: rgb(20,11,38);
    background: linear-gradient(180deg, rgba(20,11,38,.8) 0%, rgba(2,7,112,.7) 35%, rgba(234,69,239,.7) 75%, rgba(244,224,137,.7) 100%);
`;

const Footer = styled.div`
	margin-top: 2rem;
	width: 100%;
	height: 2rem;
	text-align: center;
	flex-shrink: 0;
	span {
		transform: translateX(-50%);
		padding: 0.5rem 0.75rem;
		background-color: rgba(0, 0, 200, 0.3);
		border-radius: 50px;
		color: white;
	}
`;

const mapStateToProps = (state) => {
	return {
		settings: state.settings
	}
}

export default connect(mapStateToProps, actions)(App)
