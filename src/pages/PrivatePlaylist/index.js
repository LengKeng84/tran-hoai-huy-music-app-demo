import { Link } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { Data } from '../../Context';

import RowNavbar from '../../components/RowNavbar/RowNavbar';
import Card from '../../components/Card';

function PrivatePlaylist({ data, index }) {
    const { theme, playlists, setPlaylists, setPlaySong, setSongIndex } = useContext(Data);

    const [searchResult, setSearchResult] = useState('');
    const [dataSong, setDataSong] = useState();
    const [openConfirmLayout, setOpenConfirmLayout] = useState(false);
    const [openSearcher, setOpenSearcher] = useState(data.dataSongs.length > 0 ? false : true);
    const [openChangeName, setOpenChangeName] = useState(false);
    const [inputName, setInputName] = useState('');
    const [activeWarning, setActiveWarning] = useState(false);

    // Handler Play all songs
    const playAllSongs = () => {
        let newList = data?.dataSongs;
        setSongIndex(0);
        setPlaySong([...newList]);
    };

    // Add/remove playlist
    const addSongToList = (item) => {
        let newObject = data;
        newObject.dataSongs.push(item);
        let newList = playlists;
        newList.splice(index, 1, newObject);
        localStorage.setItem('playList', JSON.stringify(newList)); // Update localStorage
        setPlaylists([...newList]);
    };

    // changePlaylistName handler
    const changePlaylistName = () => {
        let check = playlists.map((data) => data.name).includes(inputName);
        if (check === true) {
            setActiveWarning(true);
            setTimeout(() => {
                setActiveWarning(false);
            }, 4000);
        } else {
            let newObj = {
                ...data,
                name: inputName,
            };
            let newList = playlists;
            newList.splice(index, 1, newObj);
            setPlaylists([...newList]);
            setInputName('');
            setOpenChangeName(false);
        }
    };

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
    // Call API
    useEffect(() => {
        fetch('https://api.spotify.com/v1/search?q=' + searchResult + '&type=track', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token,
            },
        })
            .then((res) => res.json())
            .then((data) => setDataSong(data?.tracks?.items));
    }, [searchResult]);

    return (
        <div className={`w-full text-[${theme.coText1}] px-[30px] pt-[20px] pb-[180px]`}>
            <RowNavbar />

            {/* Header - Start*/}
            <div className="flex justify-start items-stretch">
                {/* Image */}
                <div
                    className={`group relative w-[200px] h-[200px] bg-[${theme.primary3}] rounded-full flex justify-center items-center cursor-pointer`}
                >
                    <i class={`fa-solid fa-image text-[50px] text-[${theme.coText1}]`}></i>
                    <div
                        className={`absolute top-0 left-0 w-full h-full bg-[rgba(128,128,128,0.4)] text-[${theme.coText2}] rounded-full hidden group-hover:flex justify-center items-center `}
                    >
                        Chọn ảnh
                    </div>
                </div>

                {/* Title */}
                <div className="w-[900px] ml-[20px] flex flex-col">
                    <div className="text-[50px] font-black truncate">
                        {data.name}
                        <i
                            onClick={() => setOpenChangeName(true)}
                            class="fa-solid fa-pen-to-square text-[30px] ml-[20px] cursor-pointer"
                        ></i>
                    </div>

                    {/* Change name display */}
                    {openChangeName && (
                        <div className="z-10 fixed left-0 top-0 w-full h-full flex justify-center items-center">
                            {/* Background */}
                            <div
                                onClick={() => setOpenChangeName(false)}
                                className="absolute left-0 top-0 w-full h-full"
                            ></div>

                            {/* Content */}
                            <div
                                className={`relative z-20 px-[30px] py-[20px] bg-[${theme.primary2}] border-[1px] border-[#bcbcbc] rounded-[8px] flex flex-col justify-start items-center`}
                            >
                                <div className="text-[25px] font-semibold">Đổi tên playlist</div>
                                <input
                                    type="text"
                                    value={inputName}
                                    onChange={(e) => setInputName(e.target.value)}
                                    className="w-[400px] h-[40px] rounded-[8px] px-[20px] text-[#0f0f0f] bg-[#f0f0f0] mt-[20px]"
                                />
                                {/* Warning Token */}
                                {activeWarning && (
                                    <div className="mt-[8px] font-semibold">
                                        <i class="fa-solid fa-triangle-exclamation text-[20px]"></i>
                                        <span className="ml-[5px]">Tên playlist đã trùng, vui lòng đặt tên khác</span>
                                    </div>
                                )}
                                <button
                                    onClick={() => changePlaylistName()}
                                    className={`w-[120px] h-[40px] bg-[${theme.primary3}] text-[18px] rounded-full flex justify-center items-center mt-[20px] cursor-pointer duration-200 hover:bg-[rgba(176,176,176,0.4)]`}
                                >
                                    Đổi tên
                                </button>

                                {/* Close Btn */}
                                <div
                                    onClick={() => setOpenChangeName(false)}
                                    className="absolute top-[10px] right-[20px] text-[25px] cursor-pointer hover:scale-[1.5]"
                                >
                                    <i class="fa-solid fa-xmark"></i>
                                </div>
                            </div>
                        </div>
                    )}
                    <div className="pl-[10px] text-[25px] font-semibold">{data.dataSongs?.length} bài hát</div>
                    {/* Delete Page */}
                    <div className="mt-auto">
                        <div
                            onClick={() => setOpenConfirmLayout(true)}
                            className="px-[10px] py-[5px] cursor-pointer duration-200 hover:tracking-[1px]"
                        >
                            <i class="fa-solid fa-trash-can text-[20px]"></i>
                            <span className="pl-[10px]">Xoá Playlist này</span>
                        </div>
                    </div>
                    {/* Confirm Layout - Start */}
                    {openConfirmLayout && (
                        <div className="fixed left-0 top-0 z-50 w-full h-full bg-[rgba(0,0,0,0.6)] flex justify-center items-center">
                            <div className={`bg-[${theme.primary2}] rounded-[10px] px-[40px] py-[30px]`}>
                                <div className="text-[25px] font-semibold">Bạn có chắc muốn xoá Playlist này?</div>
                                <div className="flex justify-evenly items-center mt-[20px]">
                                    <Link to="/library/playlist">
                                        <button
                                            onClick={() => {
                                                let newList = playlists.filter((item) => {
                                                    return item.name !== data.name;
                                                });
                                                setPlaylists([...newList]);
                                            }}
                                            className={`w-[150px] bg-[${theme.primary3}] rounded-full px-[20px] py-[10px] hover:bg-[rgba(212,212,212,0.4)]`}
                                        >
                                            Xác nhận
                                        </button>
                                    </Link>
                                    <button
                                        onClick={() => setOpenConfirmLayout(false)}
                                        className={`w-[150px] bg-[${theme.primary3}] rounded-full px-[20px] py-[10px] hover:bg-[rgba(212,212,212,0.4)]`}
                                    >
                                        Không
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                    {/* Confirm Layout - End */}
                </div>
            </div>

            {/* Line */}
            <div className="flex justify-center mt-[20px]">
                <div className={`w-[90%] h-[2px] bg-[${theme.primary2}]`}></div>
            </div>
            {/* Header - End*/}

            {/* Content - Start*/}
            <div className="mt-[20px]">
                {/* Bài hát đã lưu - Start*/}
                {data.dataSongs.length > 0 && (
                    <div className="">
                        {/* Title */}

                        <button
                            onClick={() => playAllSongs()}
                            className="group px-[5px] flex justify-start items-center cursor-pointer"
                        >
                            <div
                                className={`w-[60px] h-[60px] rounded-full flex justify-center items-center bg-[${theme.primary1}] text-[25px] duration-300 group-hover:bg-[rgba(185,185,185,0.4)]`}
                            >
                                <i class="fa-solid fa-play"></i>
                            </div>
                            <div className="text-[30px] font-semibold ml-[10px] duration-300 group-hover:tracking-[1px]">
                                Phát tất cả
                            </div>
                        </button>
                        {/* Title */}
                        <div className="flex justify-start py-[20px] text-[18px]">
                            <div className="ml-[20px] font-bold">#Thông tin</div>
                            <div className="ml-[420px] font-bold">#Album</div>
                            <div className="ml-[270px] font-bold">#Thời lượng</div>
                        </div>

                        {/* Container */}
                        <div className="py-[10px] border-t-[1px] border-t-[#565656]">
                            {data.dataSongs?.map((data, indexItem) => (
                                <Card
                                    key={indexItem}
                                    data={{
                                        song: data,
                                        index: indexItem,
                                        likeSong_Btn: true,
                                        removeSong_Btn: true,
                                        playlistIndex: index,
                                    }}
                                    play
                                    wFull_h50
                                />
                            ))}
                        </div>
                    </div>
                )}
                {/* Thêm bài hát Btn - Start*/}
                {!openSearcher && (
                    <button
                        onClick={() => setOpenSearcher(true)}
                        className="group px-[5px] mt-[20px] flex justify-start items-center cursor-pointer"
                    >
                        <span
                            className={`w-[35px] h-[35px] flex justify-center items-center bg-[${theme.primary1}] rounded-[5px] group-hover:bg-[rgba(185,185,185,0.4)]`}
                        >
                            <i class="fa-solid fa-plus text-[20px]"></i>
                        </span>
                        <span className="text-[18px] font-bold ml-[10px] duration-300 group-hover:tracking-[1px]">
                            Thêm bài hát
                        </span>
                    </button>
                )}
                {/* Thêm bài hát Btn - End*/}

                {/* Bài hát đã lưu - End*/}
                {/* Tìm kiếm bìa hát - Start */}
                {openSearcher && (
                    <div className="mt-[20px]">
                        <div className="text-[20px] font-semibold">Hãy tìm bài hát bạn muốn thêm vào playlist</div>
                        <div className="relative w-[700px] h-[40px]">
                            <input
                                type="text"
                                placeholder="Nhập tên bài hát"
                                value={searchResult}
                                onChange={(e) => setSearchResult(e.target.value)}
                                className={`w-full h-full rounded-[5px] mt-[10px] bg-[${theme.primary1}] placeholder:text-[#a9a9a9] px-[35px] border-[1px] border-[#bbbbbb]`}
                            />
                            <i class="fa-solid fa-magnifying-glass absolute top-[60%] left-[10px]"></i>
                            {searchResult.length > 0 && (
                                <i
                                    onClick={() => setSearchResult('')}
                                    class="fa-solid fa-xmark absolute top-[60%] right-[15px] hover:scale-[1.2] cursor-pointer"
                                ></i>
                            )}
                            {/* Close Searcher */}
                            <button
                                onClick={() => setOpenSearcher(false)}
                                className="text-[30px] absolute top-[-30%] right-[-50px]"
                            >
                                <i className="fa-solid fa-xmark"></i>
                            </button>
                        </div>

                        {/* Dropdown - Start*/}

                        {searchResult.length > 0 && (
                            <div
                                className={`mt-[25px] w-[700px] bg-[${theme.primary1}] rounded-[5px] mt-[10px] overflow-hidden`}
                            >
                                {dataSong
                                    ?.filter(
                                        (song) =>
                                            playlists[index]?.dataSongs.map((data) => data.id).includes(song.id) ===
                                            false,
                                    )
                                    .slice(0, 10)
                                    .map((data, index) => (
                                        <div
                                            key={index}
                                            className="px-[20px] py-[8px] flex justify-start items-center hover:bg-[rgba(255,255,255,0.4)]"
                                        >
                                            <div className="w-[50px] h-[50px] rounded-[3px] overflow-hidden">
                                                <img
                                                    src={data?.album.images[2]?.url}
                                                    alt=""
                                                    className="w-full h-full"
                                                />
                                            </div>
                                            <div className="ml-[15px]">
                                                <div className="text-[18px] font-semibold w-[270px] truncate">
                                                    {data?.name}
                                                </div>
                                                <div className={`flex justify-start items-center`}>
                                                    <i class="fa-solid fa-circle text-[8px]"></i>
                                                    <span className="text-[16px] ml-[5px]">
                                                        {data?.artists[0]?.name}
                                                    </span>
                                                </div>
                                            </div>
                                            <div
                                                onClick={() => addSongToList(data)}
                                                className={`ml-auto w-[100px] h-[30px] bg-[${theme.primary3}] rounded-full flex justify-center items-center cursor-pointer border-[1px] border-[#333] hover:border-[#d7d7d7]`}
                                            >
                                                Thêm vào
                                            </div>
                                        </div>
                                    ))}
                            </div>
                        )}

                        {/* Dropdown - End*/}
                    </div>
                )}
                {/* Tìm kiếm bìa hát - End */}
            </div>
            {/* Content - End*/}
        </div>
    );
}

export default PrivatePlaylist;
