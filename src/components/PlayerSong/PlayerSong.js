import { useContext, useEffect, useState, useRef } from 'react';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import { Link } from 'react-router-dom';
import { Data } from '../../Context';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Card from '../Card';

function PlayerSong() {
    const {
        theme,
        playSong,
        favoriteSongs,
        setFavoriteSongs,
        songCurrent,
        setSongCurrent,
        songIndex,
        setSongIndex,
        playlists,
        setPlaylists,
    } = useContext(Data);

    // Open active player
    const [hiddenPlayer, setHiddenPlayer] = useState(true);

    // Open Waiting List
    const [waitingList, setWaitingList] = useState(false);

    // Handler
    const prevSong = () => {
        songIndex === 0 ? setSongIndex(playSong.length - 1) : setSongIndex((prev) => prev - 1);
    };
    const nextSong = () => {
        songIndex === playSong.length - 1 ? setSongIndex(0) : setSongIndex((prev) => prev + 1);
    };

    // Song play current

    useEffect(() => {
        setSongCurrent(playSong[songIndex]);
    }, [songIndex, playSong]);

    useEffect(() => {
        if (songCurrent?.preview_url === null || songCurrent?.preview_url === undefined) {
            setHiddenPlayer(true);
        } else setHiddenPlayer(false);
    }, [songCurrent]);
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

    // Click outside
    const [openMenu, setOpenMenu] = useState(false);
    let menuRef = useRef();

    useEffect(() => {
        let handler = (e) => {
            if (!menuRef?.current.contains(e.target)) {
                setOpenMenu(false);
            }
        };
        document.addEventListener('mousedown', handler);

        return () => {
            document.removeEventListener('mousedown', handler);
        };
    });

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

    return (
        <div
            className={`fixed w-full h-[120px] bottom-0 z-50 flex justify-between items-center bg-[${
                theme?.primary1
            }] text-[${theme.coText1}] border-t-[0.5px] border-[${theme?.primary3}] ${
                hiddenPlayer && 'translate-y-[100%]'
            } duration-300`}
        >
            {/* Hidden Btn */}
            <div
                onClick={() => setHiddenPlayer(!hiddenPlayer)}
                className={`absolute bottom-[100%] left-[50%] translate-x-[-50%] w-[70px] h-[30px] rounded-t-[10px] border-x-[1px] border-t-[1px] border-[${theme.primary3}] bg-[${theme?.primary1}] text-[${theme?.primary2}] text-[30px] z-30 flex justify-center items-center cursor-pointer`}
            >
                <i class={`fa-solid fa-caret-down text-[${theme.coText1}] ${hiddenPlayer && 'rotate-[180deg]'}`}></i>
            </div>

            {/* Info Player Song */}
            <div className="w-[400px] z-30 flex justify-start items-center">
                {/* Img */}
                <div className="w-[60px] h-[60px] ml-[20px]">
                    {playSong[songIndex]?.album.images[0].url && (
                        <img src={playSong[songIndex]?.album.images[0]?.url} alt="" className="w-full h-full" />
                    )}
                </div>

                {/* Info Song */}
                <div className="w-[350px] px-[10px]">
                    <div className="font-bold text-[16px] truncate">{playSong[songIndex]?.name}</div>
                    <Link
                        to={`/artists/${playSong[songIndex]?.artists[0].id}`}
                        className="text-[14px] font-semibold truncate hover:underline"
                    >
                        {playSong[songIndex]?.artists[0].name}
                    </Link>
                </div>
            </div>

            {/* Audio */}
            <AudioPlayer
                className={`playerMusic`}
                src={songCurrent?.preview_url}
                autoPlay
                showSkipControls
                onEnded={nextSong}
                onClickPrevious={prevSong}
                onClickNext={nextSong}
            />

            {/* Buttons - Start*/}
            <div className="w-[400px] flex justify-center items-center">
                {/* Like Song - Start*/}
                <button className="w-[30px] h-[20px] text-[25px] px-[10px] py-[5px] flex justify-center items-center cursor-pointer">
                    {favoriteSongs.map((song) => song?.id).includes(playSong[songIndex]?.id) === false ? (
                        <Tippy content="Thích bài hát này">
                            <div
                                onClick={() => {
                                    addFavoriteSong(playSong[songIndex]);
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
                                    removeFavoriteSong(playSong[songIndex]?.id);
                                    Toastify(`Đã xoá bài hát khỏi thư viện!`);
                                }}
                            >
                                <i class="fa-solid fa-heart text-[red]"></i>
                            </div>
                        </Tippy>
                    )}
                </button>

                {/* Thêm vào playlist */}

                <Tippy content="Thêm vào palylist">
                    <div
                        onClick={() => setOpenMenu(!openMenu)}
                        ref={menuRef}
                        className="relative ml-[30px] pt-[15px] translate-y-[-5px] cursor-pointer"
                    >
                        <i class="fa-solid fa-music text-[20px]"></i>
                        <i class="fa-solid fa-plus"></i>

                        <div
                            className={`absolute bottom-[100%] left-[50%] translate-x-[-50%] bg-[${
                                theme.primary2
                            }] w-[250px] py-[10px] rounded-[10px] ${openMenu ? 'block' : 'hidden'}`}
                        >
                            <div className="text-center font-semibold border-b-[1px] pb-[10px]">Thêm vào playlist</div>
                            <div className="">
                                {playlists?.length > 0 ? (
                                    playlists?.map((playlist, index) => (
                                        <div
                                            onClick={() => addSongtoPlaylist(songCurrent, playlist, index)}
                                            key={index}
                                            className="px-[10px] py-[5px] cursor-pointer hover:bg-[rgba(0,0,0,0.5)]"
                                        >
                                            {playlist.name}
                                        </div>
                                    ))
                                ) : (
                                    <div className="text-center px-[10px] py-[10px] font-semibold text-[20px]">
                                        Hiện chưa có Playlist nào, vào thư viện để tạo
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </Tippy>

                {/* Danh sách chờ - waiting*/}
                <div className="ml-[30px]">
                    <Tippy content="Danh sách chờ">
                        <button
                            onClick={() => setWaitingList(!waitingList)}
                            className={`text-[22px] ${waitingList && 'text-[#828282]'}`}
                        >
                            <i class="fa-solid fa-list"></i>
                        </button>
                    </Tippy>

                    {/* Container Waiting List - Start */}
                    {waitingList && (
                        <div className={`fixed left-0 top-[0] w-full waitingList bg-[${theme.primary3}] py-[40px]`}>
                            {/* Close Btn */}
                            <button
                                onClick={() => setWaitingList(false)}
                                className={`absolute top-[20px] right-[50px] text-[30px] hover:scale-[1.3]`}
                            >
                                <i class="fa-solid fa-xmark"></i>
                            </button>
                            <div className="text-center text-[30px] font-bold">Danh sách chờ</div>
                            {playSong?.length > 0 ? (
                                // Container - Start
                                <div className="px-[50px] h-[80%] overflow-y-scroll pt-[70px]">
                                    {playSong.map((data, index) => (
                                        <Card
                                            key={index}
                                            data={{
                                                song: data,
                                                index: index,
                                                likeSong_Btn: true,
                                                removeSongWaiting_btn: true,
                                            }}
                                            play
                                            wFull_h50
                                        />
                                    ))}
                                </div>
                            ) : (
                                // Container - End
                                <div className="text-center text-[30px] font-bold mt-[200px]">
                                    !!! Hiện chưa có bài hát nào!
                                </div>
                            )}
                        </div>
                    )}
                    {/* Container Waiting List - End */}
                </div>
                {/* Like Song - End*/}
            </div>
            {/* Buttons - End */}
        </div>
    );
}

export default PlayerSong;
