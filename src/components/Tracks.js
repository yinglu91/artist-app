import React from 'react';
import useMusicPlayer from '../store/useMusicPlayer';
import './artist.css';

function Tracks({ tracks }) {
  const { currentTrackName, playTrack, isPlaying } = useMusicPlayer();

  const trackIcon = track => {
    if (!track.preview_url) {
      return <span>N/A</span>;
    }

    if (currentTrackName === track.preview_url && isPlaying) {
      return <span onClick={() => playTrack(track.preview_url)}>| |</span>;
    } else {
      return <span onClick={() => playTrack(track.preview_url)}>&#9654;</span>;
    }
  };

  return (
    <div>
      {tracks.map(track => {
        const { id, name, album } = track;

        return (
          <div key={id} className="track">
            <img
              src={album.images[0].url}
              alt="track-image"
              className="track-image"
            />
            <p className="track-text">{name}</p>
            <p className="track-icon">{trackIcon(track)}</p>
          </div>
        );
      })}
    </div>
  );
}

export default Tracks;
