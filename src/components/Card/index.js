import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useContext } from 'react';
import { Data } from '../../Context';
import { timeConversion } from '../../functions/TimeConversion';
import { followersConversion } from '../../functions/FollowersConversion';
import WaveMusic from './WaveMusic';
import { Link } from 'react-router-dom';

function Card({
    display,
    data,
    play,
    artistsDisplay,
    albumDisplay,
    releaseDate,
    playlistDisplay,
    w220_h300,
    w400_h200,
    wFull_h50,
    wFull_album,
    w380_h150_display,
    top50,
    anotherChoice,
}) {
    const {
        playSong,
        setPlaySong,
        songCurrent,
        theme,
        favoriteSongs,
        setFavoriteSongs,
        artistsFollow,
        playlists,
        setPlaylists,
        songIndex,
    } = useContext(Data);

    // Handler add song to waiting list
    const addWaitingList = (song) => {
        const check = playSong.map((data) => data?.id).includes(song?.id);
        if (check === true) {
            ToastifyError('Bài hát đã có trong hàng chờ');
        } else {
            let newList = playSong;
            newList.push(song);
            setPlaySong([...newList]);
            Toastify('Đã thêm vào danh sách chờ!');
        }
    };

    const playThisSong = (song) => {
        let newList = playSong.filter((data) => data?.id !== song?.id);
        newList[songIndex] = song;
        setPlaySong([...newList]);
    };

    const removeSongWaiting = (songId) => {
        let newList = playSong.filter((song) => song?.id !== songId);
        setPlaySong([...newList]);
    };

    // Handler Favorite Song
    const addFavoriteSong = (dataFavorite) => {
        setFavoriteSongs((prev) => [...prev, dataFavorite]);
    };

    const removeFavoriteSong = (songId) => {
        let newList = favoriteSongs.filter((item) => {
            return item.id !== songId;
        });
        setFavoriteSongs([...newList]);
    };

    // Handler Add/remove Song in Playlist
    const addSongtoPlaylist = (song, playlist, indexPlaylist) => {
        const check = playlist.dataSongs.map((data) => data?.id).includes(song?.id);

        if (!check) {
            let newObj = playlist;
            newObj.dataSongs.push(song);
            let newList = playlists;
            newList.splice(indexPlaylist, 1, newObj);
            localStorage.setItem('playList', JSON.stringify(newList));
            setPlaylists([...newList]);
            Toastify(`Đã thêm bài hát vào playlist: ${playlist.name}!`);
        } else {
            toast.error('Bài hát đã có trong playlist này rồi!', {
                position: 'top-right',
                autoClose: 2000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'colored',
            });
        }
    };

    const removeSongFromList = (songId, playlistIndex) => {
        let newArr = playlists[playlistIndex].dataSongs.filter((song) => song?.id !== songId);
        let newList = playlists;
        newList.splice(playlistIndex, 1, { ...playlists[playlistIndex], dataSongs: newArr });
        // Update localStorage
        localStorage.setItem('playList', JSON.stringify(newList));
        setPlaylists([...newList]);
    };

    // Toastify react
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

    const ToastifyError = (title) => {
        toast.error(title, {
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

    // Update localStorage
    localStorage.setItem('favoriteSongs', JSON.stringify(favoriteSongs));
    localStorage.setItem('artistsFollow', JSON.stringify(artistsFollow));

    return (
        <div
            className={`${display && `w-[220px] h-[300px]`}} 
            }] 
            `}
        >
            {/* Item play song - Start */}
            {play && (
                <div>
                    {/* w220_h300px - Start*/}
                    {w220_h300 && (
                        <div
                            className={`group relative w-[220px] h-[300px] p-[15px] rounded-[8px] border-[1px] border-[#919191] bg-[${theme?.primary1}] duration-300 hover:bg-[rgba(181,181,181,0.4)]`}
                        >
                            {/* Toast */}
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

                            {/* Image */}
                            <div
                                onClick={() => playThisSong(data)}
                                className="group relative w-[190px] h-[190px] flex justify-center items-center cursor-pointer overflow-hidden"
                            >
                                <img src={data?.album.images[0]?.url} alt="" className="w-full h-full rounded-[5px]" />

                                {/* coating */}
                                <div className="absolute top-0 left-0 w-full h-full bg-[rgba(0,0,0,0.7)] rounded-[5px] hidden group-hover:block"></div>

                                {/* Play icon */}
                                {data?.id !== songCurrent?.id && (
                                    <div
                                        className={`absolute bottom-[0] right-[10px] bg-[${theme?.primary2}] w-[50px] h-[50px] flex justify-center items-center rounded-full text-[20px] duration-300 opacity-0 group-hover:opacity-100 group-hover:bottom-[10px]`}
                                    >
                                        <i class="fa-solid fa-play"></i>
                                    </div>
                                )}

                                {/* WaveMusic */}
                                {data?.id === songCurrent?.id && (
                                    <div className="absolute top-0 left-0 w-full h-full bg-[rgba(0,0,0,0.7)] flex justify-center items-center">
                                        <WaveMusic primary1 />
                                    </div>
                                )}
                            </div>

                            {/* Song Name */}
                            <div
                                className={`text-[17px] text-[${theme?.coText1}] font-bold truncate mt-[8px] cursor-default`}
                            >
                                {data?.name}
                            </div>

                            {/* Artist */}
                            <Link to={`/artists/${data?.artists[0].id}`} className={`flex justify-start items-center`}>
                                <i class="fa-solid fa-circle text-[8px]"></i>
                                <span className="text-[15px] font-semibold ml-[5px] truncate hover:underline">
                                    {data?.artists[0].name}
                                </span>
                            </Link>

                            {/*  Btn */}
                            <div className={`justify-end items-center mt-[2px] hidden group-hover:flex`}>
                                {/* Like Song - Start*/}
                                <button className="w-[30px] h-[20px] text-[20px] px-[10px] py-[5px] flex justify-center items-center cursor-pointer">
                                    {favoriteSongs.map((song) => song?.id).includes(data?.id) === false ? (
                                        <Tippy content="Thích bài hát này">
                                            <div
                                                onClick={() => {
                                                    addFavoriteSong(data);
                                                    Toastify(`Bài hát đã được lưu vào thư viện!`);
                                                }}
                                            >
                                                <i class="fa-regular fa-heart"></i>
                                            </div>
                                        </Tippy>
                                    ) : (
                                        <Tippy content="Bỏ thích bài hát này">
                                            <div
                                                onClick={() => {
                                                    removeFavoriteSong(data?.id);
                                                    Toastify(`Đã xoá bài hát khỏi thư viện!`);
                                                }}
                                            >
                                                <i class="fa-solid fa-heart text-[red]"></i>
                                            </div>
                                        </Tippy>
                                    )}
                                </button>
                                {/* Like Song - End*/}

                                {/* Dropdown - Start*/}
                                {/* Btn Open */}
                                <div className="dropdownBtn_Card relative">
                                    <button
                                        className={`w-[35px] h-[30px] text-[25px] flex justify-center items-center cursor-pointer`}
                                    >
                                        <i class="fa-solid fa-ellipsis"></i>
                                    </button>
                                    {/* dropdownContent_Card - Start */}
                                    <div
                                        className={`dropdownContent_Card hidden absolute z-10 bottom-[100%] right-[-5px] w-[220px] py-[10px] bg-[${theme.primary2}] rounded-[5px] border-[1px] border-[gray]`}
                                    >
                                        <div
                                            onClick={() => addWaitingList(data)}
                                            className="px-[10px] py-[10px] cursor-pointer hover:bg-[rgba(255,255,255,0.4)]"
                                        >
                                            <i class="fa-solid fa-clock"></i>
                                            <span className="text-[14px] font-semibold ml-[10px]">
                                                Thêm vào danh sách chờ
                                            </span>
                                        </div>
                                        <div className="itemDropdown_Card relative px-[10px] py-[10px] flex justify-start items-center cursor-pointer hover:bg-[rgba(255,255,255,0.4)]">
                                            <i class="fa-solid fa-list"></i>
                                            <span className="text-[14px] font-semibold ml-[10px]">
                                                Thêm vào Playlist
                                            </span>
                                            <i class="fa-solid fa-caret-right ml-auto text-[20px]"></i>

                                            {/* Submenu */}
                                            <div
                                                className={`submenu_Card hidden absolute right-full bottom-0 w-[250px] z-50 bg-[${theme.primary2}] rounded-[3px] px-[5px] py-[10px] border-[1px] border-[gray]`}
                                            >
                                                <div className="text-center text-[18px] font-semibold border-b-[1px] border-[#585858] pb-[5px] mb-[5px]">
                                                    Playlist
                                                </div>
                                                {playlists.length > 0 ? (
                                                    <div>
                                                        {playlists.map((playlist, index) => (
                                                            <div
                                                                onClick={() => {
                                                                    addSongtoPlaylist(data, playlist, index);
                                                                }}
                                                                key={index}
                                                                className="px-[15px] py-[5px] truncate cursor-pointer hover:bg-[rgba(255,255,255,0.4)]"
                                                            >
                                                                {playlist.name}
                                                            </div>
                                                        ))}
                                                    </div>
                                                ) : (
                                                    <div className="text-center py-[10px]">
                                                        <div className="text-[18px] font-semibold">
                                                            ? Hiện chưa có Playlist nào
                                                        </div>
                                                        <div className="text-[16px]">
                                                            Hãy vào thư viện để tạo 1 playlist
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                    {/* dropdownContent_Card - Start */}
                                </div>

                                {/* Dropdown - End*/}
                            </div>
                        </div>
                    )}
                    {/* w220_h300px - End*/}

                    {/* w400px_h200px - Start*/}
                    {w400_h200 && (
                        <div
                            onClick={() => {
                                playThisSong(data);
                            }}
                            className={`group w-[380px] h-[200px] bg-[${theme.primary1}] border-[1px] border-[#919191] rounded-[8px] p-[15px] cursor-pointer duration-500 hover:bg-[rgba(181,181,181,0.4)]`}
                        >
                            <div className="flex justify-start items-center">
                                {/* Img */}
                                <div className="w-[100px] h-[100px]">
                                    <img
                                        src={data?.album?.images[0]?.url}
                                        alt=""
                                        className="w-full h-full rounded-[5px]"
                                    />
                                </div>
                                <div className="w-[100px] h-[40px] bg-[rgba(255,255,255,0.4)] text-[15px] font-semibold rounded-full flex justify-center items-center ml-[20px]">
                                    Bài hát
                                </div>
                                <div
                                    className={`bg-[${theme?.primary1}] w-[70px] h-[70px] flex justify-center items-center rounded-full text-[30px] ml-[40px] mt-[20px] duration-300 opacity-0 group-hover:opacity-100 group-hover:translate-y-[-10px]`}
                                >
                                    <i class="fa-solid fa-play"></i>
                                </div>
                            </div>
                            {/* Info song */}
                            <div className="mt-[10px]">
                                {/* Song Name */}
                                <div className={`text-[18px] text-[${theme?.coText1}] font-bold truncate`}>
                                    {data?.name}
                                </div>

                                {/* Artist */}
                                <div className={`text-[16px] text-[${theme?.coText2}] font-semibold`}>
                                    {data?.artists[0].name}
                                </div>
                            </div>
                        </div>
                    )}
                    {/* w320_h200px - Start*/}

                    {/* wFull_h50 - Start*/}
                    {wFull_h50 && (
                        <div
                            onDoubleClick={() => playThisSong(data?.song)}
                            className={`group ${
                                data?.song?.id === songCurrent?.id && 'bg-[rgba(162,162,162,0.7)]'
                            } flex justify-start items-center border-b-[1px] border-[gray] py-[10px] rounded-[5px] cursor-default hover:bg-[rgba(162,162,162,0.5)]`}
                        >
                            {/* Toastify */}
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
                            {/* Info Song */}
                            <div className="group flex justify-start items-center">
                                <div
                                    onClick={() => playThisSong(data?.song)}
                                    className="relative w-[50px] flex justify-center items-center cursor-pointer"
                                >
                                    {data?.song.id === songCurrent?.id ? (
                                        <div className="absolute top-[2px] left-[30%]">
                                            <WaveMusic primary2 />
                                        </div>
                                    ) : (
                                        <div className="text-[16px] font-semibold">{data?.index + 1}</div>
                                    )}
                                </div>
                                {/* Img */}
                                <div
                                    onClick={() => playThisSong(data?.song)}
                                    className="relative w-[45px] h-[45px] rounded-[3px] overflow-hidden cursor-pointer"
                                >
                                    <img src={data?.song.album?.images[0].url} alt="" className="w-full h-full" />
                                    {data?.song.id !== songCurrent?.id ? (
                                        <div className="absolute top-0 left-0 w-full h-full bg-[rgba(0,0,0,0.7)] justify-center items-center hidden group-hover:flex">
                                            <i class="fa-solid fa-play text-[18px] text-[#fff]"></i>
                                        </div>
                                    ) : (
                                        <div className="absolute top-0 left-0 w-full h-full bg-[rgba(0,0,0,0.7)] justify-center items-center hidden group-hover:flex">
                                            <i class="fa-solid fa-pause text-[18px] text-[#fff]"></i>
                                        </div>
                                    )}
                                </div>

                                {/* Info name/artists*/}
                                <div className="w-[320px] ml-[15px] ">
                                    <div className="text-[16px] font-semibold truncate">{data?.song.name}</div>
                                    <Link
                                        to={`/artists/${data?.song.artists[0].id}`}
                                        className="text-[15px] truncate hover:underline"
                                    >
                                        {data?.song.artists[0].name}
                                    </Link>
                                </div>

                                {/* Of Album */}
                                <div className="w-[300px] ml-[100px] truncate hover:underline">
                                    <Link to={`/album/${data?.song.album.id}`}>{data?.song.album.name}</Link>
                                </div>
                            </div>
                            <div className="ml-[80px] text-[14px] font-semibold">
                                {timeConversion(data.song.duration_ms)}
                            </div>

                            {/* Các tuỳ chọn */}
                            <div className="ml-auto mr-[30px] justify-start items-center hidden group-hover:flex">
                                {/* removeSongWaiting_btn */}
                                {data?.removeSongWaiting_btn && (
                                    <Tippy content="Xoá bài hát này khỏi danh sách chờ">
                                        <button
                                            onClick={() => removeSongWaiting(data?.song.id)}
                                            className="mr-[15px] opacity-80 hover:opacity-100"
                                        >
                                            <i class="fa-solid fa-trash-can"></i>
                                        </button>
                                    </Tippy>
                                )}

                                {/* Unlike Song Btn */}
                                {data?.favoriteSong && (
                                    <Tippy content="Bỏ thích bài hát này">
                                        <button
                                            onClick={() => removeFavoriteSong(data?.song.id)}
                                            className="mr-[20px] opacity-80 hover:opacity-100"
                                        >
                                            <i class="fa-solid fa-heart-circle-minus text-[18px]"></i>
                                        </button>
                                    </Tippy>
                                )}

                                {/* Like/UnLike Song Btn  */}
                                {data?.likeSong_Btn && (
                                    <button className="w-[30px] h-[20px] text-[20px] px-[10px] py-[5px] flex justify-center items-center cursor-pointer">
                                        {favoriteSongs.map((song) => song?.id).includes(data?.song.id) === false ? (
                                            <Tippy content="Thích bài hát này">
                                                <div
                                                    onClick={() => {
                                                        addFavoriteSong(data?.song);
                                                        Toastify(`Bài hát đã được lưu vào thư viện!`);
                                                    }}
                                                >
                                                    <i class="fa-regular fa-heart"></i>
                                                </div>
                                            </Tippy>
                                        ) : (
                                            <Tippy content="Bỏ thích bài hát này">
                                                <div
                                                    onClick={() => {
                                                        removeFavoriteSong(data?.song.id);
                                                        Toastify(`Đã xoá bài hát khỏi thư viện!`);
                                                    }}
                                                >
                                                    <i class="fa-solid fa-heart text-[red]"></i>
                                                </div>
                                            </Tippy>
                                        )}
                                    </button>
                                )}

                                {/* Remove Song  */}
                                {data?.removeSong_Btn && (
                                    <Tippy content="Xoá bài hát này khỏi playlist">
                                        <button
                                            onClick={() => removeSongFromList(data?.song.id, data?.playlistIndex)}
                                            className="mx-[5px] text-[17px] opacity-75 hover:opacity-100"
                                        >
                                            <i class="fa-solid fa-trash-can"></i>
                                        </button>
                                    </Tippy>
                                )}

                                {/* Dropdown - Start*/}
                                <div className="dropdownBtn_Card relative">
                                    {/* Btn */}
                                    <button
                                        className={`w-[40px] h-[30px] text-[25px] flex justify-center items-center cursor-pointer`}
                                    >
                                        <i class="fa-solid fa-ellipsis"></i>
                                    </button>

                                    {/* Dropdown Content */}
                                    <div
                                        className={`dropdownContent_Card hidden absolute z-10 bottom-[100%] right-0 w-[240px] py-[10px] bg-[${theme.primary2}] rounded-[5px] border-[1px] border-[gray]`}
                                    >
                                        <div
                                            onClick={() => addWaitingList(data?.song)}
                                            className="px-[10px] py-[5px] cursor-pointer hover:bg-[rgba(255,255,255,0.4)]"
                                        >
                                            <i class="fa-solid fa-clock"></i>
                                            <span className="text-[14px] font-semibold ml-[10px]">
                                                Thêm vào danh sách chờ
                                            </span>
                                        </div>
                                        <div className="itemDropdown_Card px-[10px] py-[5px] flex justify-start items-center cursor-pointer hover:bg-[rgba(255,255,255,0.4)]">
                                            <i class="fa-solid fa-list"></i>
                                            <span className="text-[14px] font-semibold ml-[10px]">
                                                Thêm vào Playlist
                                            </span>
                                            <i class="fa-solid fa-caret-right ml-auto text-[20px]"></i>

                                            {/* Submenu */}
                                            <div
                                                className={`submenu_Card hidden absolute right-full bottom-0 w-[250px] z-50 bg-[${theme.primary2}] rounded-[3px] px-[5px] py-[10px] border-[1px] border-[gray]`}
                                            >
                                                <div className="text-center text-[18px] font-semibold border-b-[1px] border-[#585858] pb-[5px] mb-[5px]">
                                                    Playlist
                                                </div>
                                                {playlists.length > 0 ? (
                                                    <div>
                                                        {playlists.map((playlist, index) => (
                                                            <div
                                                                onClick={() => {
                                                                    addSongtoPlaylist(data?.song, playlist, index);
                                                                }}
                                                                key={index}
                                                                className="px-[15px] py-[5px] truncate cursor-pointer hover:bg-[rgba(255,255,255,0.4)]"
                                                            >
                                                                {playlist.name}
                                                            </div>
                                                        ))}
                                                    </div>
                                                ) : (
                                                    <div className="text-center py-[10px]">
                                                        <div className="text-[18px] font-semibold">
                                                            ? Hiện chưa có Playlist nào
                                                        </div>
                                                        <div className="text-[16px]">
                                                            Hãy vào thư viện để tạo 1 playlist
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* Dropdown - End*/}
                            </div>
                        </div>
                    )}
                    {/* wFull_h50 - End */}

                    {/* wFull_album - Start */}
                    {wFull_album && (
                        <div
                            onDoubleClick={() => playThisSong(data?.song)}
                            className="group flex justify-start items-center py-[5px] cursor-default hover:bg-[rgba(122,122,122,0.3)] "
                        >
                            <div className="w-[70px] text-[20px] font-semibold flex justify-center items-center cursor-pointer">
                                {data?.song.id === songCurrent?.id ? (
                                    <Tippy content="Tạm dừng bài hát này">
                                        <div>
                                            <span className=" hidden group-hover:block">
                                                <i class="fa-solid fa-pause"></i>
                                            </span>
                                            <span className="group-hover:hidden">
                                                <WaveMusic primary2 />
                                            </span>
                                        </div>
                                    </Tippy>
                                ) : (
                                    <Tippy content="Phát bài hát này">
                                        <div onClick={() => playThisSong(data?.song)}>
                                            <span className="hidden group-hover:block">
                                                <i class="fa-solid fa-play"></i>
                                            </span>
                                            <span className="group-hover:hidden">{data?.index + 1}</span>
                                        </div>
                                    </Tippy>
                                )}
                            </div>
                            <div>
                                <div className="w-[700px] text-[18px] font-bold truncate">{data?.song.name}</div>
                                <Link
                                    to={`/artists/${data?.song.artists[0].id}`}
                                    className="text-[14px] hover:underline"
                                >
                                    {data?.song.artists[0].name}
                                </Link>
                            </div>
                            <div className="ml-[80px] mr-[80px]">{timeConversion(data?.song.duration_ms)}</div>

                            {/* Btn */}
                            <div className="ml-auto mr-[30px] hidden justify-start items-center group-hover:flex">
                                {/* Like Song Btn */}
                                <div className="mr-[10px]">
                                    {favoriteSongs.map((song) => song?.id).includes(data?.song.id) === false ? (
                                        <Tippy content="Lưu album này vào thư viện" delay={[300, 0]}>
                                            <button
                                                onClick={() => {
                                                    addFavoriteSong(data?.song);
                                                    Toastify('Đã lưu bài hát vào thư viện!');
                                                }}
                                                className="text-[20px]"
                                            >
                                                <i class="fa-regular fa-heart "></i>
                                            </button>
                                        </Tippy>
                                    ) : (
                                        <Tippy content="Xoá album này khỏi thư viện" delay={[300, 0]}>
                                            <button
                                                onClick={() => {
                                                    removeFavoriteSong(data?.song.id);
                                                    Toastify('Đã xoá bài hát khỏi thư viện!');
                                                }}
                                                className="text-[20px] text-[red]"
                                            >
                                                <i class="fa-solid fa-heart "></i>
                                            </button>
                                        </Tippy>
                                    )}
                                </div>
                                {/* Dropdown Btn - Start*/}
                                <div className="dropdownBtn_Card relative">
                                    {/* Btn */}
                                    <button
                                        className={`w-[40px] h-[30px] text-[25px] flex justify-center items-center cursor-pointer`}
                                    >
                                        <i class="fa-solid fa-ellipsis"></i>
                                    </button>

                                    {/* Dropdown Content */}
                                    <div
                                        className={`dropdownContent_Card hidden absolute z-10 bottom-[100%] right-0 w-[240px] py-[10px] bg-[${theme.primary2}] rounded-[5px] border-[1px] border-[gray]`}
                                    >
                                        <div
                                            onClick={() => addWaitingList(data?.song)}
                                            className="px-[10px] py-[5px] cursor-pointer hover:bg-[rgba(255,255,255,0.4)]"
                                        >
                                            <i class="fa-solid fa-clock"></i>
                                            <span className="text-[14px] font-semibold ml-[10px]">
                                                Thêm vào danh sách chờ
                                            </span>
                                        </div>
                                        <div className="itemDropdown_Card px-[10px] py-[5px] flex justify-start items-center cursor-pointer hover:bg-[rgba(255,255,255,0.4)]">
                                            <i class="fa-solid fa-list"></i>
                                            <span className="text-[14px] font-semibold ml-[10px]">
                                                Thêm vào Playlist
                                            </span>
                                            <i class="fa-solid fa-caret-right ml-auto text-[20px]"></i>

                                            {/* Submenu */}
                                            <div
                                                className={`submenu_Card hidden absolute right-full bottom-0 w-[250px] z-50 bg-[${theme.primary2}] rounded-[3px] px-[5px] py-[10px] border-[1px] border-[gray]`}
                                            >
                                                <div className="text-center text-[18px] font-semibold border-b-[1px] border-[#585858] pb-[5px] mb-[5px]">
                                                    Playlist
                                                </div>
                                                {playlists.length > 0 ? (
                                                    <div>
                                                        {playlists.map((playlist, index) => (
                                                            <div
                                                                onClick={() => {
                                                                    addSongtoPlaylist(data?.song, playlist, index);
                                                                }}
                                                                key={index}
                                                                className="px-[15px] py-[5px] truncate cursor-pointer hover:bg-[rgba(255,255,255,0.4)]"
                                                            >
                                                                {playlist.name}
                                                            </div>
                                                        ))}
                                                    </div>
                                                ) : (
                                                    <div className="text-center py-[10px]">
                                                        <div className="text-[18px] font-semibold">
                                                            ? Hiện chưa có Playlist nào
                                                        </div>
                                                        <div className="text-[16px]">
                                                            Hãy vào thư viện để tạo 1 playlist
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* Dropdown Btn - End*/}
                            </div>
                        </div>
                    )}

                    {/* wFull_h40 - End */}
                </div>
            )}
            {/* Item play song - End */}

            {/* Item display  - Start */}
            {display && (
                <div
                    className={`relative w-[220px] h-[300px] bg-[${theme.primary1}] p-[15px] rounded-[8px] border-[1px] border-[#424242]`}
                >
                    <div className="relative w-[190px] h-[190px] rounded-[5px] overflow-hidden">
                        {display.img !== 'none' ? (
                            <img className="absolute top-0 left-0" src={display.img} alt="" />
                        ) : (
                            <div
                                className={`w-full h-full bg-[rgba(255,255,255,0.5)] flex justify-center items-center`}
                            >
                                <span class="material-icons-outlined text-[70px]">queue_music</span>
                            </div>
                        )}
                    </div>
                    <div className="text-[18px] font-bold truncate mt-[10px]">{display.title1}</div>

                    {/* Delete Btn */}
                    <div></div>
                </div>
            )}
            {/* Item display  - End */}

            {/* Display Artists - Start*/}
            {artistsDisplay &&
                ((w220_h300 && (
                    <div
                        className={`group relative w-[220px] h-[300px] bg-[${theme.primary1}] p-[15px] rounded-[8px] border-[1px] border-[#919191] cursor-pointer duration-300 hover:bg-[rgba(181,184,181,0.4)]`}
                    >
                        <div className="w-[190px] h-[190px] rounded-[5px] overflow-hidden">
                            <img className="w-full h-full" src={data?.images[1]?.url} alt="" />
                        </div>
                        <div className="text-[18px] font-bold truncate mt-[8px]">{data?.name}</div>

                        <div className={``}>
                            <i class="fa-solid fa-circle text-[8px]"></i>
                            <span className="text-[14px] font-semibold ml-[5px]">
                                {followersConversion(data?.followers.total)} người theo dõi
                            </span>
                        </div>
                    </div>
                )) ||
                    (w400_h200 && (
                        <div
                            className={`group w-[380px] h-[200px] bg-[${theme.primary1}] border-[1px] border-[#919191] rounded-[8px] p-[15px] cursor-pointer duration-500 hover:bg-[rgba(181,181,181,0.4)]`}
                        >
                            <div className="flex justify-start items-center">
                                {/* Img */}
                                <div className="w-[100px] h-[100px]">
                                    <img src={data?.images[1]?.url} alt="" className="w-full h-full rounded-[5px]" />
                                </div>
                                <div className="w-[100px] h-[40px] bg-[rgba(255,255,255,0.4)] text-[15px] font-semibold rounded-full flex justify-center items-center ml-[20px]">
                                    Nghệ sĩ
                                </div>
                            </div>

                            {/* Info Artists */}
                            <div className="mt-[15px]">
                                <div className={`text-[22px] text-[${theme?.coText1}] font-bold truncate`}>
                                    {data?.name}
                                </div>
                            </div>
                        </div>
                    )))}
            {/* Display Artists - End*/}

            {/* Album Display - Start */}
            {albumDisplay && (
                <div
                    className={`group relative w-[220px] h-[300px] bg-[${theme.primary1}] p-[15px] rounded-[8px] border-[1px] border-[#919191] cursor-pointer duration-300 hover:bg-[rgba(181,184,181,0.4)]`}
                >
                    {/* Img */}
                    <div className="w-[190px] h-[190px] rounded-[5px] overflow-hidden">
                        <img src={data?.images[1]?.url} alt="" className="w-full h-full" />
                    </div>

                    {/* Info Album */}
                    <div className="mt-[8px]">
                        <div className="text-[17px] font-bold truncate">{data?.name}</div>
                        <div className={`text-[15px] font-semibold`}>
                            <i class="fa-solid fa-circle text-[8px]"></i>
                            {releaseDate ? (
                                <span className="ml-[8px]">{data?.release_date}</span>
                            ) : (
                                <span className="ml-[8px]">{data?.artists[0].name}</span>
                            )}
                        </div>
                        <div className={`text-[14px] font-semibold mt-[3px]`}>
                            <i class="fa-solid fa-music"></i>
                            <span className="ml-[5px]">{data?.total_tracks} bài hát</span>
                        </div>
                    </div>
                </div>
            )}
            {/* Album Display - End */}

            {/* Playlist Display - Start  */}
            {playlistDisplay && (
                <div
                    className={`group relative w-[220px] h-[300px] bg-[${theme.primary1}] p-[15px] rounded-[8px] border-[1px] border-[#919191] cursor-pointer duration-300 hover:bg-[rgba(181,184,181,0.4)]`}
                >
                    {/* Img */}
                    <div className="w-[190px] h-[190px] rounded-[5px] overflow-hidden">
                        <img src={data?.images[0]?.url} alt="" className="w-full h-full" />
                    </div>

                    {/* Info Playlist */}
                    <div className="mt-[8px]">
                        <div className="text-[18px] font-bold truncate">{data?.name}</div>
                        <div className={`text-[14px] font-semibold truncate`}>
                            <i class="fa-solid fa-circle text-[8px]"></i>
                            <span className="ml-[5px]">Của {data?.owner.display_name}</span>
                        </div>
                        <div className={`text-[14px] font-semibold mt-[3px]`}>
                            <i class="fa-solid fa-music"></i>
                            <span className="ml-[5px]">{data?.tracks.total} bài hát</span>
                        </div>
                    </div>
                </div>
            )}
            {/* Playlist Display - End  */}

            {/* TopList - Start */}
            {w380_h150_display && (
                <div
                    className={`group w-[380px] h-[150px] bg-[${theme.primary1}] rounded-[8px] flex justify-start items-stretch overflow-hidden hover:bg-[rgba(211,211,211,0.2)]`}
                >
                    {/* Img */}
                    <div className="w-[150px] h-[150px]">
                        <img
                            src={data?.images[0].url}
                            alt=""
                            className="w-full h-full duration-300 group-hover:scale-[1.05]"
                        />
                    </div>

                    {/* Info */}
                    <div className="w-[230px] p-[10px] flex flex-col justify-start items-stretch">
                        <div className="text-[18px] font-bold truncate">{data?.name}</div>
                        <div className="font-semibold truncate mt-[20px]">{data?.description}</div>
                        <div className="mt-auto">{data?.tracks?.total} bài hát</div>
                        <div className="mt-auto">
                            <i class="fa-solid fa-circle text-[5px]"></i>
                            <span className=" text-[14px] ml-[5px]">Đề xuất bởi {data?.owner?.display_name}</span>
                        </div>
                    </div>
                </div>
            )}
            {/* TopList - End */}

            {/* Top50 - Start */}
            {top50 && (
                <div
                    className={`w-[250px] h-[350px] bg-[${theme.primary1}] rounded-[8px] p-[10px] overflow-hidden hover:bg-[rgba(211,211,211,0.2)]`}
                >
                    {/* Img */}
                    <div className="w-[230px] h-[230px] rounded-[8px]">
                        <img src={data?.images[0].url} alt="" className="w-full h-full" />
                    </div>

                    <div className="mt-[10px] flex flex-col justify-start items-stretch">
                        <div className="text-center text-[20px] font-bold">{data?.name}</div>
                        {/* <div className="truncate">{data?.description}</div> */}
                        <div className="text-center text-[15px] mt-[5px]">Đề xuất bởi {data?.owner?.display_name}</div>
                    </div>
                </div>
            )}
            {/* Top50 - End */}

            {/* anotherChoice - Start */}
            {anotherChoice && (
                <div
                    className={`w-[280px] h-[120px] bg-[${theme.primary1}] rounded-[8px] flex justify-start items-center overflow-hidden cursor-pointer hover:bg-[rgba(211,211,211,0.2)]`}
                >
                    {/* Img */}
                    <div className="w-[120px] h-[120px]">
                        <img src={data?.icons[0].url} alt="" className="w-full h-full" />
                    </div>

                    {/* Info */}
                    <div className="w-[160px] text-center text-[18px] font-bold px-[5px]">{data?.name}</div>
                </div>
            )}
            {/* anotherChoice - End */}
        </div>
    );
}

export default Card;
