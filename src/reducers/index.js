import { combineReducers } from 'redux'
import { reducer as authReducer } from './auth'
import { reducer as videoReducer } from './videos'
import { reducer as linkReducer } from './links'
import { reducer as userReducer } from './users'
import { reducer as playlistReducer } from './playlists'
import { reducer as settingsReducer } from './settings'
import { reducer as formReducer } from 'redux-form'

const rootReducer = combineReducers({
    form: formReducer,
    auth: authReducer,
    videos: videoReducer,
    links: linkReducer,
    users: userReducer,
    playlists: playlistReducer,
    settings: settingsReducer
})

export default rootReducer
