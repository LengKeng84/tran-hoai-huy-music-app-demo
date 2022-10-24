import './App.css';
import { Route, Routes } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Data } from './Context';
// -----------------------
import ColNavbar from './components/ColNavbar';
import Home from './pages/Home';
import Library from './pages/Library';
import FavoriteSong from './pages/FavoriteSong';
import PlayerSong from './components/PlayerSong/PlayerSong';
import SignInLayout from './components/SignInLayout';
import Upgrade from './pages/Upgrade';
import Search from './pages/Search';
import Playlist from './pages/Playlist';
import PrivatePlaylist from './pages/PrivatePlaylist';
import ArtistsFollow from './pages/ArtistsFollow';
import Artists from './pages/Artists';
import Album from './pages/Album';
import FavoriteAlbum from './pages/FavoriteAlbum';
import PublicPlaylists from './pages/PublicPlaylists';
import AnotherChoise from './pages/AnotherChoise';
import NoFound from './pages/NoFound';
// ---------------------------

function App() {
    const [playSong, setPlaySong] = useState([]);
    const [songCurrent, setSongCurrent] = useState(null);
    const [songIndex, setSongIndex] = useState(0);

    // Theme
    const [theme, setTheme] = useState(
        JSON.parse(localStorage.getItem('theme')) ?? {
            primary1: 'rgb(67,7,67)',
            primary2: 'rgb(175,59,175)',
            primary3: 'rgb(117,10,67)',
            coText1: '#fff',
            coText2: '#000',
        },
    );
    // Playlist
    const [playlists, setPlaylists] = useState(
        JSON.parse(localStorage.getItem('playList')) ?? [
            { name: '#1 Danh sách phát của tôi', dataSongs: [] },
            { name: '#2 Danh sách phát của tôi', dataSongs: [] },
            { name: '#3 Danh sách phát của tôi', dataSongs: [] },
            { name: '#4 Danh sách phát của tôi', dataSongs: [] },
            { name: '#5 Danh sách phát của tôi', dataSongs: [] },
            { name: '#6 Danh sách phát của tôi', dataSongs: [] },
        ],
    );
    // Favorite Song
    const [favoriteSongs, setFavoriteSongs] = useState(JSON.parse(localStorage.getItem('favoriteSongs')) ?? []);

    // Artists Follow
    const [artistsFollow, setArtistsFollow] = useState(JSON.parse(localStorage.getItem('artistsFollow')) ?? []);

    // Favorite Album
    const [favoriteAlbums, setFavoriteAlbums] = useState(JSON.parse(localStorage.getItem('favoriteAlbums')) ?? []);

    return (
        <Data.Provider
            value={{
                playSong,
                setPlaySong,
                theme,
                setTheme,
                playlists,
                setPlaylists,
                favoriteSongs,
                setFavoriteSongs,
                artistsFollow,
                setArtistsFollow,
                favoriteAlbums,
                setFavoriteAlbums,
                songCurrent,
                setSongCurrent,
                songIndex,
                setSongIndex,
            }}
        >
            {/* <Router> */}
            <div className={`App relative bg-[${theme.primary1}]`}>
                <ColNavbar />
                <SignInLayout />
                <div
                    className={`contentLayout bg-gradient-to-br from-[${theme.primary1}] via-[${theme.primary3}] to-[${theme.primary2}] text-[${theme.coText1}] pb-[200px]`}
                >
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/search" element={<Search />} />
                        <Route path="/library" element={<Library />}>
                            <Route path="playlist" element={<Playlist />} />
                            <Route path="favoriteSong" element={<FavoriteSong />} />
                            <Route path="followArtist" element={<ArtistsFollow />} />
                            <Route path="favoriteAlbum" element={<FavoriteAlbum />} />
                        </Route>
                        <Route path="/upgrade" element={<Upgrade />} />
                        {playlists.map((data, index) => (
                            <Route
                                path={`/playlist/${index}`}
                                element={<PrivatePlaylist data={data} index={index} />}
                                key={index}
                            />
                        ))}
                        <Route path="/artists/:artistsId" element={<Artists />} />
                        <Route path="/album/:albumId" element={<Album />} />
                        <Route path="/public_playlists/:playlistId" element={<PublicPlaylists />} />
                        <Route path="/anotherChoise/:categoriesId" element={<AnotherChoise />} />
                    </Routes>
                </div>
            </div>
            <PlayerSong />
            {/* </Router> */}
        </Data.Provider>
    );
}

export default App;
