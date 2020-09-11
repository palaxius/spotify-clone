import React, {useEffect} from 'react';
import './App.css';
import Login from "../Login/Login";
import {getTokenFromUrl} from "../../spotify";
import SpotifyWebApi from "spotify-web-api-js";
import Player from "../Player/Player";
import {useDataLayerValue} from "../../DateLayer";

const spotify = new SpotifyWebApi()

function App() {
  const [{ user, token }, dispatch] = useDataLayerValue()

  useEffect(() => {
    const tokenObject = getTokenFromUrl()
    window.location.hash = ''
    const _token = tokenObject.access_token

    if (_token) {
      dispatch({
        type: 'SET_TOKEN',
        payload: _token
      })

      spotify.setAccessToken(_token)

      spotify.getMe().then(user => {

        dispatch({
          type: 'SET_USER',
          payload: user
        })
      })
    }
  }, [])

  return (
    <div className="app">
      {
        token
          ? <Player spotify={spotify}/>
          : <Login />
      }
    </div>
  );
}

export default App;