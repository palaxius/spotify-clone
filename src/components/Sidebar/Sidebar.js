import React from 'react';
import './Sidebar.css'
import SidebarOption from "../SidebarOption/SidebarOption";
import HomeIcon from '@material-ui/icons/Home';
import SearchIcon from '@material-ui/icons/Search';
import LibraryMusicIcon from '@material-ui/icons/LibraryMusic';
import {useDataLayerValue} from "../../DataLayer";

const Sidebar = () => {
  const [{ playlists }] = useDataLayerValue()

  return (
    <div className='sidebar'>
      <img
        className='sidebar__logo'
        src="https://getheavy.com/wp-content/uploads/2019/12/spotify2019-830x350.jpg"
        alt="spotify-logo"
      />
      <SidebarOption Icon={HomeIcon} title='Home' />
      <SidebarOption Icon={SearchIcon} title='Search' />
      <SidebarOption Icon={LibraryMusicIcon} title='Your library' />

      <br/>
      <strong className='sidebar__title'>PLAYLISTS</strong>
      <hr/>

      {playlists && playlists.items && playlists.items.map((playlist, index) => (
         <SidebarOption title={playlist.name} key={index}/>
      ))}

    </div>
  );
};

export default Sidebar;
