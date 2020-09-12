import React from 'react';
import './Body.css'
import Header from "../Header/Header";
import {useDataLayerValue} from "../../DataLayer";
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';
import FavoriteIcon from '@material-ui/icons/Favorite';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import SongRow from "../SongRow/SongRow";
import RecentlyItem from "../RecentlyItem/RecentlyItem";
import TopTrack from "../TopTrack/TopTrack";
import TopArtist from "../TopArtist/TopTrack";

const Body = ({ spotify }) => {
  const [{ discover_weekly, recently_played, top_tracks, top_artists }, dispatch] = useDataLayerValue()

  const playPlaylist = (id) => {
    spotify
      .play({
        context_uri: `spotify:playlist:0iFFDF0XDsriw5lp2ilT3b`,
      })
      .then((res) => {
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
      }).catch(err => alert(`Player command failed: Premium required \nYou must have a premium account to play music`))
  };

  const playSong = (id) => {
    spotify
      .play({
        uris: [`spotify:track:${id}`],
      })
      .then((res) => {
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
      }).catch(err => alert(`Player command failed: Premium required \nYou must have a premium account to play music`))
  };

  return (
    <div className='body'>
      <Header spotify={spotify}/>

      {
        top_artists && top_artists.items.length ?
        <div className="section">
          <h2 className='section__title'>Your top artists</h2>
          <div className='wrapper'>
            {
              top_artists && top_artists.items && top_artists.items.map((item) =>
                (
                <TopArtist playSong={playSong} item={item} key={Math.random()}/>
              ))
            }
          </div>
        </div>
        : null
      }

      {
        top_tracks && top_tracks.items && top_tracks.items.length &&
        <div className="section">
          <h2 className='section__title'>Your top tracks</h2>
          <div className='wrapper'>
            {
              top_tracks && top_tracks.items && top_tracks.items.map((item) => (
                <TopTrack playSong={playSong} item={item} key={item.id + Math.random()}/>
              ))
            }
          </div>
        </div>
      }

      {
        recently_played && recently_played.items && recently_played.items.length &&
        <div className="section">
        <h2 className='section__title'>Recently Played</h2>
        <div className='wrapper'>
          {
            recently_played && recently_played.items && recently_played.items.map((item) => (

              <RecentlyItem playSong={playSong} item={item} key={item.track.id + Math.random()}/>
            ))
          }
        </div>
      </div>
      }

      <div className="body__info">
        <img src={discover_weekly ? discover_weekly.images[0].url : 'https://newjams-images.scdn.co/v2/discover-weekly/pOdnPTRma6KZzKPNRN9oUA==/bmVuZW5lbmVuZW5lbmVuZQ==/default'} alt="weekly"/>
        <div className="body__info-text">
          <strong>PLAYLIST</strong>
          <h2>Discover Weekly</h2>
          <p>{discover_weekly && discover_weekly.description}</p>
        </div>
      </div>
      <div className="body__songs">
        <div className="body__icons">
          <PlayCircleFilledIcon
            className='body__shuffle'
            onClick={playPlaylist}
          />
          <FavoriteIcon fontSize='large'/>
          <MoreHorizIcon />
        </div>

        {discover_weekly && discover_weekly.tracks.items.map(item => (
          <SongRow playSong={playSong} track={item.track} key={item.track.id + Math.random()}/>
        ))}
      </div>
    </div>
  );
};

export default Body;
