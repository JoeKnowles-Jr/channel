import React from 'react'
import { Route } from 'react-router-dom'
import styled from 'styled-components'
import App from '../components/app/app'
import Auth from '../pages/Auth'
import Signout from '../components/auth/signout'
import Home from '../pages/Home'
import Links from '../pages/Links'
import Playlists from '../pages/Playlists'
import Test from '../pages/Test'
import Admin from '../pages/Admin'
import Settings from '../pages/Settings'
import VideoWatch from '../pages/VideoWatch'

const Routes = () => {

    return (
        <App>
            <RouteWrapper>
                <Route path='/channel' exact render={(props) => <Home {...props} />} />
                <Route path='/channel/settings' exact render={(props) => <Settings {...props} />} />
                <Route exact path="/channel/auth" component={Auth} />
                <Route exact path="/channel/test" component={Test} />
                <Route exact path="/channel/links" render={(props) => <Links {...props} />} />
                <Route exact path="/channel/playlists" render={(props) => <Playlists {...props} />} />
                <Route exact path="/channel/signout" render={(props) => <Signout {...props} />} />
                <Route exact path="/channel/videowatch/:vid" render={(props) => <VideoWatch {...props} />} />
                <Route exact path='/channel/vadmin' render={(props) => <Admin which='videos' {...props} />}/>
                <Route exact path='/channel/ladmin' render={(props) => <Admin which='links' {...props} />}/>
                <Route exact path='/channel/uadmin' render={(props) => <Admin which='users' {...props} />}/>
            </RouteWrapper>
        </App>
    )
}

const RouteWrapper = styled.div`

`;

export default Routes
