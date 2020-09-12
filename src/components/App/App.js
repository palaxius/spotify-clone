import React, {useEffect} from 'react';
import Login from "../Login/Login";
import {getTokenFromUrl} from "../../spotify";
import SpotifyWebApi from "spotify-web-api-js";
import Player from "../Player/Player";
import {useDataLayerValue} from "../../DataLayer";

const spotify = new SpotifyWebApi()

function App() {
  const [{ token }, dispatch] = useDataLayerValue()

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

      spotify.getUserPlaylists().then(playlists => {
        dispatch({
          type: 'SET_PLAYLISTS',
          payload: playlists
        })
      })

      spotify.getPlaylist('0iFFDF0XDsriw5lp2ilT3b').then(response => (
        dispatch({
          type: 'SET_DISCOVER_WEEKLY',
          payload: response
        })
      ))

      spotify.getMyRecentlyPlayedTracks().then(response => (
        dispatch({
          type: 'SET_RECENTLY_PLAYED',
          payload: response
        })
      ))

      spotify.getMyTopTracks().then(response => {
        dispatch({
          type: 'SET_TOP_TRACKS',
          payload: response
        })
      })

      spotify.getMyTopArtists().then((response) =>
        dispatch({
          type: "SET_TOP_ARTISTS",
          payload: response,
        })
      );
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