import React, { useState, useEffect } from 'react';
import useMusicPlayer from '../store/useMusicPlayer';

import Artist from './Artist';
import Tracks from './Tracks';

function OperaArtist() {
  const { reset } = useMusicPlayer();

  const [artistQuery, setArtistQuery] = useState('Maria Callas');
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
          <option value="Maria Callas">Maria Callas</option>
          <option value="Luciano Pavarotti">Luciano Pavarotti</option>
          <option value="Joan Sutherland">Joan Sutherland</option>
          <option value="Renata Tebaldi">Renata Tebaldi</option>
          <option value="Montserrat Caballe">Montserrat Caballé</option>
        </select>
      </div>

      <Artist artist={artist} />
      <Tracks tracks={tracks} />
    </div>
  );
}

export default OperaArtist;
