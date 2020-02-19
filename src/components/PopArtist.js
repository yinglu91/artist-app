import React, { useState, useEffect } from 'react';
import useMusicPlayer from '../store/useMusicPlayer';

import Artist from './Artist';
import Tracks from './Tracks';

function PopArtist() {
  const { reset } = useMusicPlayer();
  const [artistQuery, setArtistQuery] = useState('Whitney Houston');
  const [artist, setArtist] = useState(null);
  const [tracks, setTracks] = useState([]);

  const fetchTopTracks = async artistId => {
    // console.log(artistId);

    // Fetch the artist's top tracks response
    // https://spotify-api-wrapper.appspot.com/artist/0bjdfjE8XbLa2Odstu6E1E/top-tracks
    const response = await fetch(
      `https://spotify-api-wrapper.appspot.com/artist/${artistId}/top-tracks`
    );

    // Get data
    const data = await response.json();
    console.log(data); //  in browser

    setTracks(data.tracks);
  };

  const fetchArtist = async () => {
    // Get response
    //fetch(`https://spotify-api-wrapper.appspot.com/artist/Maria Callas`)
    const response = await fetch(
      `https://spotify-api-wrapper.appspot.com/artist/${artistQuery}`
    );

    // Get data
    const data = await response.json();
    console.log(data); //  in browser

    const artist = data.artists.items[0];
    setArtist(artist);

    fetchTopTracks(artist.id);
  };

  useEffect(() => {
    reset();
    fetchArtist();
  }, [artistQuery]);

  return (
    <div className="App">
      <h1>Select Artist</h1>
      <div className="form">
        <select
          id="selectedArtist"
          onChange={event => setArtistQuery(event.target.value)}
          value={artistQuery}
        >
          <option value="Whitney Houston">Whitney Houston</option>
          <option value="Michael Jackson">Michael Jackson</option>

          <option value="Johnny Cash">Johnny Cash</option>
          <option value="Loretta Lynn">Loretta Lynn</option>
          <option value="Randy Travis">Randy Travis</option>

          <option value="Lady Gaga">Lady Gaga</option>
        </select>
      </div>

      <Artist artist={artist} />
      <Tracks tracks={tracks} />
    </div>
  );
}

export default PopArtist;
