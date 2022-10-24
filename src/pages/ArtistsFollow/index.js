import { useContext, useState, useEffect } from 'react';
import { Data } from '../../Context';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Card from '../../components/Card';

function ArtistsFollow() {
    const { theme, artistsFollow, setArtistsFollow } = useContext(Data);

    const [searchResult, setSearchResult] = useState('');

    const [dataAPI, setDataAPI] = useState([]);

    // Handler Artists Follow
    const addArtistFollow = (dataArtistFollow) => {
        setArtistsFollow((prev) => [...prev, dataArtistFollow]);
    };
    const removeArtistFollow = (dataArtistFollow) => {
        let newList = artistsFollow.filter((item) => {
            return item.id !== dataArtistFollow.id;
        });
        setArtistsFollow([...newList]);
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

    localStorage.setItem('artistsFollow', JSON.stringify(artistsFollow));

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
        fetch('https://api.spotify.com/v1/search?q=' + searchResult + '&type=artist', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token,
            },
        })
            .then((res) => res.json())
            .then((data) => setDataAPI(data?.artists?.items));
    }, [searchResult]);

    return (
        <div className="">
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
            {/* Content - Start*/}
            <div className="mt-[10px] ">
                {artistsFollow.length > 0 ? (
                    <div>
                        <div className="flex justify-start items-center">
                            <span className="text-[25px] font-bold">Nghệ sĩ đang theo dõi</span>
                            <span className="text-[20px] ml-[10px]">({artistsFollow.length} nghệ sĩ)</span>
                        </div>
                        <div className="mt-[15px] grid grid-cols-5 gap-[20px]">
                            {artistsFollow.map((data, index) => (
                                <Link to={`/artists/${data?.id}`}>
                                    <Card key={index} data={data} artistsDisplay w220_h300 />
                                </Link>
                            ))}
                        </div>
                    </div>
                ) : (
                    <div className="flex flex-col justify-start items-center mt-[20px]">
                        <div className="w-[100px] h-[100px] relative">
                            <i class="fa-solid fa-user text-[80px]"></i>
                            <i
                                class={`fa-solid fa-music absolute top-[40%] left-[50%] bg-[${theme.primary1}] rounded-full text-[60px]`}
                            ></i>
                        </div>
                        <div className="text-[50px] font-black">Theo dõi nghệ sĩ đầu tiên của bạn</div>
                        <div className="text-[30px] font-semibold">Bằng cách nhấn vào nút theo dõi.</div>
                    </div>
                )}
            </div>

            {/* Content - End*/}

            {/* Line */}
            <div className="flex justify-center mt-[20px]">
                <div className="w-[80%] h-[1px] bg-[gray]"></div>
            </div>

            <div className="flex flex-col justify-start items-center mt-[20px]">
                <div className=" text-[25px] font-bold">Tìm kiếm nghệ sĩ </div>
                <div className="relative w-[400px] h-[40px]">
                    {/* Input */}
                    <input
                        type="text"
                        value={searchResult}
                        onChange={(e) => setSearchResult(e.target.value)}
                        className={`w-full h-full mt-[10px] bg-[${theme.primary2}] rounded-full px-[40px] placeholder:text-[#fff] border-[1px] border-[#eee] `}
                        placeholder="Nhập tên nghệ sĩ"
                    />

                    {/* Clear Btn */}
                    {searchResult.length > 0 && (
                        <span
                            onClick={() => setSearchResult('')}
                            className="absolute top-[18px] right-[20px] cursor-pointer hover:scale-[1.3]"
                        >
                            <i class="fa-solid fa-xmark"></i>
                        </span>
                    )}
                </div>
                {/* Dropdown - Start*/}
                {dataAPI?.length > 0 && (
                    <div
                        className={`w-[700px] bg-[${theme.primary3}] rounded-[8px] border-[1px] border-[gray] py-[10px] mt-[20px]`}
                    >
                        {dataAPI?.slice(0, 10).map((data, index) => (
                            <div
                                key={index}
                                className="px-[20px] py-[8px] hover:bg-[rgba(196,196,196,0.3)] flex justify-start items-center"
                            >
                                <Link
                                    to={`/artists/${data?.id}`}
                                    className="flex justify-start items-center cursor-pointer"
                                >
                                    <div className="w-[45px] h-[45px]">
                                        <img src={data?.images[1]?.url} className="w-full h-full" />
                                    </div>
                                    <div className="w-[350px] ml-[15px] truncate">
                                        <div className="font-semibold">{data?.name}</div>
                                        <div className={`text-[14px] text-[${theme.coText2}] font-semibold`}>
                                            Nghệ sĩ
                                        </div>
                                    </div>{' '}
                                </Link>

                                {/* Btn Follow */}
                                <div
                                    className={`ml-auto text-[14px] border-[2px] border-[gray] px-[10px] py-[5px] rounded-[5px] hover:border-[#fff]`}
                                >
                                    {artistsFollow.map((data) => data.id).includes(data?.id) ? (
                                        <button
                                            onClick={() => {
                                                removeArtistFollow(data);
                                                Toastify('Đã xoá khỏi Danh sách theo dõi!');
                                            }}
                                        >
                                            Bỏ theo dõi
                                        </button>
                                    ) : (
                                        <button
                                            onClick={() => {
                                                addArtistFollow(data);
                                                Toastify('Đã lưu vào Danh sách theo dõi!');
                                            }}
                                        >
                                            Theo dõi
                                        </button>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
                {/* Dropdown - End */}
            </div>
        </div>
    );
}

export default ArtistsFollow;
