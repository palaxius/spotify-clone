import React, {useEffect} from 'react';
import './Footer.css'
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import PauseCircleOutlineIcon from "@material-ui/icons/PauseCircleOutline";
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import ShuffleIcon from '@material-ui/icons/Shuffle';
import RepeatIcon from '@material-ui/icons/Repeat';
import PlaylistPlayIcon from '@material-ui/icons/PlaylistPlay';
import VolumeUpIcon from '@material-ui/icons/VolumeUp';
import {Grid, Slider} from "@material-ui/core";
import {useDataLayerValue} from "../../DataLayer";

const Footer = ({spotify}) => {
  const [{ item, playing }, dispatch] = useDataLayerValue()

  useEffect(() => {
    spotify.getMyCurrentPlaybackState().then((r) => {
      console.log(r);

      dispatch({
        type: "SET_PLAYING",
        payload: r.is_playing,
      });

      dispatch({
        type: "SET_ITEM",
        payload: r.item,
      });
    });
  }, [spotify]);

  const handlePlayPause = () => {
    if (playing) {
      spotify.pause();
      dispatch({
        type: "SET_PLAYING",
        payload: false,
      });
    } else {
      spotify.play();
      dispatch({
        type: "SET_PLAYING",
        payload: true,
      });
    }
  };

  const skipNext = () => {
    spotify.skipToNext();
    spotify.getMyCurrentPlayingTrack().then((r) => {
      dispatch({
        type: "SET_ITEM",
        payload: r.item,
      });
      dispatch({
        type: "SET_PLAYING",
        payload: true,
      });
    });
  };

  const skipPrevious = () => {
    spotify.skipToPrevious();
    spotify.getMyCurrentPlayingTrack().then((r) => {
      dispatch({
        type: "SET_ITEM",
        payload: r.item,
      });
      dispatch({
        type: "SET_PLAYING",
        payload: true,
      });
    });
  };

  return (
    <div className='footer'>
      <div className="footer__left">
        <img
          className="footer__albumLogo"
          src={item && item.album.images[0].url}
          alt={item && item.name}
        />
        {
          item ? (
            <div className="footer__songInfo">
              <h4 className='footer__songName'>{item.name}</h4>
              <p className='footer__bandName'>{item.artists.map((artist) => artist.name).join(", ")}</p>
            </div>
          ) : (
            <div className="footer__songInfo">
              <h4 className='footer__songName'>No song is playing</h4>
              <p className='footer__bandName'>...</p>
            </div>
          )
        }
      </div>

      <div className="footer__center">
        <RepeatIcon className='footer__green' />
        <SkipPreviousIcon
          className='footer__icon'
          onClick={skipNext}
        />
        {playing ? (
          <PauseCircleOutlineIcon
            onClick={handlePlayPause}
            fontSize="large"
            className="footer__icon"
          />
        ) : (
          <PlayCircleOutlineIcon
            onClick={handlePlayPause}
            fontSize="large"
            className="footer__icon"
          />
        )}
        <SkipNextIcon
          className='footer__icon'
          onClick={skipPrevious}
        />
        <ShuffleIcon className='footer__green'/>
      </div>

      <div className="footer__right">
        <Grid container spacing={2}>
          <Grid item>
            <PlaylistPlayIcon className='footer__controls'/>
          </Grid>
          <Grid item>
            <VolumeUpIcon className='footer__controls'/>
          </Grid>
          <Grid item xs>
            <Slider aria-labelledby="continuous-slider"/>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default Footer;
