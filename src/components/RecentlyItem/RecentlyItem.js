import React from 'react';

const RecentlyItem = ({item, playSong}) => {
  return (
        <div className='section__item' onClick={() => playSong(item.track.id)}>
          <img src={item.track.album.images[1].url} alt=""/>
          <h4>{item.track.name}</h4>
          <p className='section__item-band'>{item.track.artists[0].name}</p>
          <p className='section__item-date'>{(new Date(item.played_at)).toDateString()}</p>
        </div>
  );
};

export default RecentlyItem;
