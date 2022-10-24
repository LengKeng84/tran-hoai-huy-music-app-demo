import Card from '../../components/Card';
import { Link } from 'react-router-dom';

import { useContext, useState } from 'react';
import { Data } from '../../Context';

function Playlist() {
    const { theme } = useContext(Data);
    const { playlists, setPlaylists } = useContext(Data);

    const [openCrtPlaylist, setOpenCrtPlaylist] = useState(false);
    const [inputCrtPlaylist, setInputCrtPlaylist] = useState('');
    const [confirmLayout, setConfirmLayout] = useState('none');
    const [activeWarning, setActiveWarning] = useState(false);

    localStorage.setItem('playList', JSON.stringify(playlists));

    const addAPlaylist = () => {
        const check = playlists.map((data) => data.name).includes(inputCrtPlaylist);
        if (check === true) {
            setActiveWarning(true);
            setTimeout(() => {
                setActiveWarning(false);
            }, 3000);
        } else {
            inputCrtPlaylist.length > 0 && setPlaylists((prev) => [...prev, { name: inputCrtPlaylist, dataSongs: [] }]);
            setInputCrtPlaylist('');
            inputCrtPlaylist.length > 0 && setOpenCrtPlaylist(false);
        }
    };

    const removeItemPlaylist = (namePlaylist) => {
        let newList = playlists.filter((item) => {
            return item.name !== namePlaylist;
        });

        setPlaylists([...newList]);
    };

    return (
        <div className="">
            {/* Title */}
            <div className="text-[28px] font-black">Tạo Playlist của riêng bạn</div>

            {/* Menu Create Playlist */}
            {openCrtPlaylist && (
                <div className="z-10 fixed top-0 left-0 w-full h-full flex justify-center items-center">
                    {/* Background */}
                    <div
                        onClick={() => {
                            setOpenCrtPlaylist(false);
                            setInputCrtPlaylist('');
                        }}
                        className="absolute left-0 top-0 w-full h-full"
                    ></div>
                    <div
                        className={`z-[20] relative px-[30px] py-[20px] bg-[${theme.primary2}] border-[1px] border-[#bcbcbc] rounded-[8px] flex flex-col justify-start items-center`}
                    >
                        <div className="text-[25px]">Nhập tên PlayList</div>
                        <input
                            type="text"
                            value={inputCrtPlaylist}
                            onChange={(e) => setInputCrtPlaylist(e.target.value)}
                            className="w-[400px] h-[40px] rounded-[8px] px-[20px] text-[#0f0f0f] bg-[#f0f0f0] mt-[20px]"
                        />
                        {/* Warning Token */}
                        {activeWarning && (
                            <div className="mt-[8px] font-semibold">
                                <i class="fa-solid fa-triangle-exclamation text-[20px]"></i>
                                <span className="ml-[5px]">Tên playlist đã trùng, vui lòng đặt tên khác</span>
                            </div>
                        )}

                        {/* Create Btn */}
                        <div
                            onClick={() => addAPlaylist()}
                            className={`w-[120px] h-[40px] bg-[${theme.primary3}] text-[18px] rounded-full flex justify-center items-center mt-[20px] cursor-pointer duration-200 hover:bg-[rgba(176,176,176,0.4)]`}
                        >
                            Tạo
                        </div>

                        {/* Close Btn */}
                        <div
                            onClick={() => {
                                setOpenCrtPlaylist(false);
                                setInputCrtPlaylist('');
                            }}
                            className="absolute top-[10px] right-[20px] text-[25px] cursor-pointer hover:scale-[1.5]"
                        >
                            <i class="fa-solid fa-xmark"></i>
                        </div>
                    </div>
                </div>
            )}

            {/* Container - Start*/}
            {playlists.length > 0 ? (
                <div>
                    {/* Btn tạo PLaylist */}
                    <div
                        onClick={() => setOpenCrtPlaylist(true)}
                        className="w-[260px] group flex justify-start items-center mt-[20px] cursor-pointer"
                    >
                        <span
                            className={`w-[35px] h-[35px] text-[20px] bg-[${theme.primary3}] rounded-full flex justify-center items-center duration-300 group-hover:scale-[1.2]`}
                        >
                            <i class="fa-solid fa-plus"></i>
                        </span>
                        <span className="text-[20px] font-semibold ml-[10px] duration-300 group-hover:tracking-[1px]">
                            Tạo thêm 1 playlist
                        </span>
                    </div>
                    <div className="mt-[30px] grid grid-cols-5 gap-x-[10px] gap-y-[15px]">
                        {playlists.map((data, index) => (
                            <div key={index} className="group">
                                <Link to={`/playlist/${index}`}>
                                    <Card
                                        display={{
                                            img: 'none',
                                            title1: data.name,
                                        }}
                                    />
                                </Link>
                                <div
                                    onClick={() => setConfirmLayout(index)}
                                    className="text-[14px] ml-[28%] pt-[5px] opacity-0 cursor-pointer hover:underline group-hover:opacity-100"
                                >
                                    <i class="fa-solid fa-trash-can"></i> Xoá playlist
                                </div>
                                {/* Confirm Layout */}
                                {confirmLayout === index && (
                                    <div className="fixed top-0 left-0 z-50 w-full h-full bg-[rgba(0,0,0,0.6)] flex justify-center items-center">
                                        <div className={`bg-[${theme.primary2}] px-[50px] py-[30px] rounded-[10px]`}>
                                            <div className="text-[25px] font-semibold">
                                                Bạn có chắc muốn xoá Playlist này?
                                            </div>
                                            <div className="text-center text-[18px] font-semibold">"{data.name}"</div>
                                            <div className="mt-[20px] flex justify-center">
                                                <button
                                                    onClick={() => {
                                                        removeItemPlaylist(data.name);
                                                        setConfirmLayout('none');
                                                    }}
                                                    className={`w-[150px] bg-[${theme.primary3}] px-[15px] py-[8px] m-auto rounded-full font-semibold hover:bg-[rgba(214,214,214,0.4)]`}
                                                >
                                                    Xác nhận
                                                </button>
                                                <button
                                                    onClick={() => setConfirmLayout('none')}
                                                    className={`w-[150px] bg-[${theme.primary3}] px-[15px] py-[8px] m-auto rounded-full font-semibold hover:bg-[rgba(214,214,214,0.4)]`}
                                                >
                                                    Không
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <div className="flex flex-col justify-start items-center">
                    <div className="text-[50px] font-black mt-[100px]">Hãy tạo Playlist đầu tiên của bạn</div>
                    {/* Btn tạo PLaylist */}
                    <div
                        onClick={() => setOpenCrtPlaylist(true)}
                        className={`w-[220px] group flex justify-start items-center mt-[20px] cursor-pointer`}
                    >
                        <span
                            className={`w-[35px] h-[35px] text-[20px] bg-[${theme.primary1}] rounded-[4px] flex justify-center items-center duration-300 group-hover:scale-[1.2]`}
                        >
                            <i class="fa-solid fa-plus"></i>
                        </span>
                        <span className="text-[25px] font-bold ml-[10px] duration-300 group-hover:tracking-[1px]">
                            Tạo playlist
                        </span>
                    </div>
                </div>
            )}
            {/* Container - End*/}
        </div>
    );
}

export default Playlist;
