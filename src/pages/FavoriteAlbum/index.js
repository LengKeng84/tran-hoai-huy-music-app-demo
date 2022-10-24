import { useState, useContext, useEffect } from 'react';
import { Data } from '../../Context';
import { Link } from 'react-router-dom';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';

import Card from '../../components/Card';

function FavoriteAlbum() {
    const { favoriteAlbums, setFavoriteAlbums } = useContext(Data);

    const [dataAPI, setDataAPI] = useState();
    const [searchResult, setSearchResult] = useState('');

    // Add/Remove album to list

    const removeAlbum = (albumId) => {
        let newList = favoriteAlbums.filter((data) => data.id !== albumId);
        setFavoriteAlbums([...newList]);
    };

    localStorage.setItem('favoriteAlbums', JSON.stringify(favoriteAlbums));

    // Get Token
    const CLIENT_ID = '360b3682710348698d1992386de2dd6a';
    const CLIENT_SECRET = '25a196bf0119450c84e8ed819ebc5f9b';
    const [token, setToken] = useState();
    useEffect(() => {
        // API Access Token

        fetch('https://accounts.spotify.com/api/token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                Authorization: 'Basic ' + btoa(CLIENT_ID + ':' + CLIENT_SECRET),
            },
            body: 'grant_type=client_credentials',
        })
            .then((res) => res.json())
            .then((data) => setToken(data.access_token));
    }, []);

    useEffect(() => {
        fetch('https://api.spotify.com/v1/search?q=' + searchResult + '&type=album', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token,
            },
        })
            .then((res) => res.json())
            .then((data) => setDataAPI(data?.albums.items));
    }, [searchResult]);

    return (
        <div>
            {/* Display Album */}
            {favoriteAlbums.length > 0 ? (
                <div className="">
                    <div className="text-[25px] font-bold">{favoriteAlbums.length} Album đã lưu</div>
                    <div className="grid grid-cols-5 gap-x-[10px] gap-y-[30px] mt-[20px]">
                        {favoriteAlbums.map((data, index) => (
                            <Link to={`/album/${data.id}`} className="relative group">
                                <Card key={index} data={data} albumDisplay />
                            </Link>
                        ))}
                    </div>
                </div>
            ) : (
                <div className=" text-center mt-[200px]">
                    <div className="text-[40px] font-black">Đưa Album bạn yêu thích vào thư viện </div>
                    <div className="text-[25px] font-black">Bằng cách nhấn vào nút Lưu Album này</div>
                    <div className="">
                        <span class="material-icons-outlined text-[80px]">library_music</span>
                    </div>
                </div>
            )}
        </div>
    );
}

export default FavoriteAlbum;
