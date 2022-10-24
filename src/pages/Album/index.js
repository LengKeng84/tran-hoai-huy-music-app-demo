import { Data } from '../../Context';
import { useState, useEffect, useContext } from 'react';
import { Link, useParams } from 'react-router-dom';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import RowNavbar from '../../components/RowNavbar/RowNavbar';
import Card from '../../components/Card';

function Album() {
    const { albumId } = useParams();
    const { theme, favoriteAlbums, setFavoriteAlbums } = useContext(Data);

    const [albumData, setAlbumData] = useState();
    const [artist, setArtist] = useState();

    // Add/Remove album to list
    const addAlbum = (data) => {
        setFavoriteAlbums((prev) => [...prev, data]);
    };
    const removeAlbum = (albumId) => {
        let newList = favoriteAlbums.filter((data) => data.id !== albumId);
        setFavoriteAlbums([...newList]);
    };
    localStorage.setItem('favoriteAlbums', JSON.stringify(favoriteAlbums));

    // Add/remove favorite song
    const addFavoriteSong = (data) => {};

    // Get API data

    const CLIENT_ID = '360b3682710348698d1992386de2dd6a';
    const CLIENT_SECRET = '25a196bf0119450c84e8ed819ebc5f9b';

    // API Access Token
    useEffect(() => {
        fetch('https://accounts.spotify.com/api/token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                Authorization: 'Basic ' + btoa(CLIENT_ID + ':' + CLIENT_SECRET),
            },
            body: 'grant_type=client_credentials',
        })
            .then((res) => res.json())
            .then((data) => data.access_token)
            .then((token) => {
                // Get Album
                fetch(`https://api.spotify.com/v1/albums/${albumId}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: 'Bearer ' + token,
                    },
                })
                    .then((res) => res.json())
                    .then((data) => {
                        setAlbumData(data);
                        return data.artists[0].id;
                    })
                    .then((artistId) => {
                        // Get Artist
                        fetch(`https://api.spotify.com/v1/artists/${artistId}`, {
                            method: 'GET',
                            headers: {
                                'Content-Type': 'application/json',
                                Authorization: 'Bearer ' + token,
                            },
                        })
                            .then((res) => res.json())
                            .then((data) => setArtist(data));
                    });
            });
    }, []);

    // Toastify
    const Toastify = (title) => {
        toast.success(title, {
            position: 'top-right',
            autoClose: 2000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'colored',
        });
    };

    return (
        <div className="">
            <RowNavbar />
            <ToastContainer
                position="top-right"
                autoClose={2000}
                hideProgressBar
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
            />
            {/* Header - Start */}
            <div
                className={`flex justify-start items-stretch bg-gradient-to-b from-[${theme.primary1}] via-[${theme.primary3}] to-[${theme.primary2}] px-[30px] py-[20px] border-b-[1px] border-[rgba(255,255,255,0.8)]`}
            >
                <div className="w-[300px] h-[300px] rounded-[8px] overflow-hidden">
                    <img src={albumData?.images[0].url} alt="" className="w-full h-full" />
                </div>
                <div className="pl-[30px]">
                    <div className="text-[30px] font-black ">#Album</div>
                    <div className="text-[45px] font-black overflow-ellipsis">{albumData?.name}</div>
                    <div className="flex justify-start items-center">
                        <Link
                            to={`/artists/${artist?.id}`}
                            className="w-[50px] h-[50px] rounded-full overflow-hidden  cursor-pointer"
                        >
                            <img src={artist?.images[2].url} />
                        </Link>
                        <Link to={`/artists/${artist?.id}`} className="pl-[10px] text-[22px] font-bold  cursor-pointer">
                            {albumData?.artists[0].name}
                        </Link>
                    </div>
                    <div className="text-[17px] font-semibold mt-[10px]">
                        <span>Ngày phát hành: {albumData?.release_date}</span>
                        <span className="ml-[10px]">
                            <i class="fa-solid fa-circle text-[5px]"></i> {albumData?.total_tracks} bài hát
                        </span>
                    </div>
                </div>
            </div>
            {/* Header - End */}
            {/* Content - Start */}
            <div className={`px-[30px] pt-[30px]`}>
                {/* Header */}
                <div className="flex justify-start items-center pb-[20px] border-b-[1px] border-[rgba(255,255,255,0.6)]">
                    {/* Play */}
                    <button className="flex justify-center items-center duration-300 hover:scale-[1.05]">
                        <i
                            class={`fa-solid fa-play text-[25px] w-[50px] h-[50px] bg-[${theme.primary1}] rounded-full flex justify-center items-center`}
                        ></i>
                        <span className="text-[25px] font-semibold pl-[10px]">Phát tất cả</span>
                    </button>

                    {/* Save */}
                    <div className="ml-[30px]">
                        {favoriteAlbums.map((data) => data?.id).includes(albumData?.id) === false ? (
                            <Tippy content="Lưu album này vào thư viện" delay={[300, 0]}>
                                <button
                                    onClick={() => {
                                        addAlbum(albumData);
                                        Toastify('Đã lưu album vào thư viện!');
                                    }}
                                    className="text-[35px]"
                                >
                                    <i class="fa-regular fa-heart "></i>
                                </button>
                            </Tippy>
                        ) : (
                            <Tippy content="Xoá album này khỏi thư viện" delay={[300, 0]}>
                                <button
                                    onClick={() => {
                                        removeAlbum(albumData?.id);
                                        Toastify('Đã xoá album khỏi thư viện!');
                                    }}
                                    className="text-[35px] text-[red]"
                                >
                                    <i class="fa-solid fa-heart "></i>
                                </button>
                            </Tippy>
                        )}
                    </div>

                    {/* Tuỳ chọn */}
                    <Tippy content="Tuỳ chọn khác" delay={[300, 0]}>
                        <button className="ml-[30px] text-[30px]">
                            <i class="fa-solid fa-ellipsis"></i>
                        </button>
                    </Tippy>
                </div>

                {/* Container - Start */}
                <div>
                    {albumData?.tracks?.items
                        ?.filter((song) => song?.preview_url !== null)
                        .map((item) => {
                            return { ...item, album: albumData };
                        })
                        .map((data, index) => (
                            <Card key={index} data={{ song: data, index: index }} play wFull_album />
                        ))}
                </div>
                {/* Container - End */}
            </div>
            {/* Content - End */}
        </div>
    );
}

export default Album;
