import React from 'react';

const TopTrack = ({item, playSong}) => {
  return (
        <div className='section__item' onClick={() => playSong(item.id)}>
          <img src={item.album.images[1].url} alt="track"/>
          <h4>{item.name}</h4>
          <p className='section__item-band'>{item.artists[0].name}</p>
        </div>
  );
};

export default TopTrack;
