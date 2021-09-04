import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/lib/integration/react'
import { persistor, store } from './store'
import { BrowserRouter, Router, Switch } from 'react-router-dom'
import History from './history.js'
import Routes from './routes'

import './style/style.css'

import registerServiceWorker from './registerServiceWorker'

localStorage.clear()

ReactDOM.render(
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <BrowserRouter>
                <Router history={History} basename={'/channel'}>
                    <Switch>
                        <Routes />
                    </Switch>
                </Router>
            </BrowserRouter>
        </PersistGate>
    </Provider>, document.getElementById('root'))
registerServiceWorker()
