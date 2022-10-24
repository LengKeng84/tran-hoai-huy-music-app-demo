import { Data } from '../../Context';
import { useState, useEffect, useContext } from 'react';
import Card from '../../components/Card';

import RowNavbar from '../../components/RowNavbar/RowNavbar';
import { Link } from 'react-router-dom';

function Home() {
    const { theme } = useContext(Data);
    const [dataAPI, setDataAPI] = useState({});

    // Index items display
    const [vpopIndex, setVpopIndex] = useState(6);
    const [kpopIndex, setKpopIndex] = useState(6);
    const [popularIndex, setPopularIndex] = useState(6);

    const CLIENT_ID = '360b3682710348698d1992386de2dd6a';
    const CLIENT_SECRET = '25a196bf0119450c84e8ed819ebc5f9b';

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
            .then((data) => data.access_token)
            .then((token) => {
                fetch(`https://api.spotify.com/v1/browse/categories/toplists/playlists`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: 'Bearer ' + token,
                    },
                })
                    .then((res) => res.json())
                    .then((data) => {
                        let newObj = dataAPI;
                        newObj.topList = data;
                        setDataAPI({ ...newObj });
                    });
                return token;
            })
            .then((token) => {
                fetch(`https://api.spotify.com/v1/browse/categories/0JQ5DAqbMKFLIOWOrpNSUR/playlists`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: 'Bearer ' + token,
                    },
                })
                    .then((res) => res.json())
                    .then((data) => {
                        let newObj = dataAPI;
                        newObj.vpop = data;
                        setDataAPI({ ...newObj });
                    });
                return token;
            })
            .then((token) => {
                fetch(`https://api.spotify.com/v1/browse/categories/0JQ5DAqbMKFGvOw3O4nLAf/playlists`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: 'Bearer ' + token,
                    },
                })
                    .then((res) => res.json())
                    .then((data) => {
                        let newObj = dataAPI;
                        newObj.kpop = data;
                        setDataAPI({ ...newObj });
                    });
                return token;
            })
            .then((token) => {
                fetch(`https://api.spotify.com/v1/browse/categories/0JQ5DAqbMKFQIL0AXnG5AK/playlists`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: 'Bearer ' + token,
                    },
                })
                    .then((res) => res.json())
                    .then((data) => {
                        let newObj = dataAPI;
                        newObj.popular = data;
                        setDataAPI({ ...newObj });
                    });
                return token;
            })
            .then((token) => {
                fetch(`https://api.spotify.com/v1/browse/categories`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: 'Bearer ' + token,
                    },
                })
                    .then((res) => res.json())
                    .then((data) => {
                        let newObj = dataAPI;
                        newObj.anotherChoice = data;
                        setDataAPI({ ...newObj });
                    });
                return token;
            });
    }, []);

    return (
        <div className={`text-[${theme.coText1}]`}>
            <RowNavbar />
            {/* Header - Start */}
            <div className="font-black relative">
                <a
                    href="#content"
                    className="group text-[30px] absolute bottom-[40%] left-[30px] flex flex-col items-center cursor-pointer"
                >
                    <span className="text-[#fff] bg-[rgb(7,24,71)] px-[25px] py-[15px] rounded-full border-[2px] border-[#fff] duration-300 hover:bg-[rgb(38,76,180)]">
                        Cùng nhau khám phá!
                    </span>
                    <i class="fa-solid fa-angles-down mt-[10px] text-[40px] opacity-0 duration-300 group-hover:opacity-100"></i>
                </a>
                <img
                    src="https://images-na.ssl-images-amazon.com/images/S/pv-target-images/bbc134138bee4c4418406b2d1071e083d14c57f9f37bb3db368572f6fff8ac48._RI_.jpg"
                    alt=""
                    className="height_Img_Home"
                />
            </div>
            {/* Header - End */}

            <div id="content" className="px-[20px]">
                {/* Toplist - Start */}
                <div className="mt-[20px]">
                    <div className="text-[25px] font-black">Top List</div>
                    <div className="flex justify-start flex-wrap gap-x-[15px] gap-y-[20px] mt-[20px]">
                        {dataAPI?.topList?.playlists?.items.slice(0, 9).map((data, index) => (
                            <Link to={`public_playlists/${data?.id}`}>
                                <Card key={index} data={data} w380_h150_display />
                            </Link>
                        ))}
                    </div>
                </div>
                {/* Toplist - End */}

                {/* Top 50 */}
                <div className="mt-[50px]">
                    <div className="text-[25px] font-black">Top 50</div>
                    <div className="grid grid-cols-4 gap-x-[10px] gap-y-[15px] mt-[20px]">
                        {dataAPI?.topList?.playlists?.items.slice(9, 13).map((data, index) => (
                            <Link to={`public_playlists/${data?.id}`}>
                                <Card key={index} data={data} top50 />
                            </Link>
                        ))}
                    </div>
                </div>

                {/* VPOP  */}
                <div className="mt-[50px]">
                    <div className="text-[25px] font-black">V-Pop</div>
                    <div className="flex justify-start flex-wrap gap-x-[15px] gap-y-[20px] mt-[20px]">
                        {dataAPI?.vpop?.playlists?.items.slice(0, vpopIndex).map((data, index) => (
                            <Link to={`public_playlists/${data?.id}`}>
                                <Card key={index} data={data} w380_h150_display />
                            </Link>
                        ))}
                    </div>

                    {/* Btn display */}

                    <div className="text-right mt-[20px] ">
                        {vpopIndex === 6 ? (
                            <button
                                onClick={() => setVpopIndex(50)}
                                className="mr-[30px] text-[18px] font-semibold hover:underline"
                            >
                                <span>Xem tất cả</span> <i class="fa-solid fa-angles-down text-[16px] ml-[3px]"></i>
                            </button>
                        ) : (
                            <button
                                onClick={() => setVpopIndex(6)}
                                className="mr-[30px] text-[18px] font-semibold hover:underline"
                            >
                                <span>Ẩn bớt</span> <i class="fa-solid fa-angles-up text-[16px] ml-[3px]"></i>
                            </button>
                        )}
                    </div>
                </div>

                {/* KPOP  */}
                <div className="mt-[50px]">
                    <div className="text-[25px] font-black">K-Pop</div>
                    <div className="flex justify-start flex-wrap gap-x-[15px] gap-y-[20px] mt-[20px]">
                        {dataAPI?.kpop?.playlists?.items.slice(0, kpopIndex).map((data, index) => (
                            <Link to={`public_playlists/${data?.id}`}>
                                <Card key={index} data={data} w380_h150_display />
                            </Link>
                        ))}
                    </div>

                    {/* Btn display */}

                    <div className="text-right mt-[20px] ">
                        {kpopIndex === 6 ? (
                            <button
                                onClick={() => setKpopIndex(50)}
                                className="mr-[30px] text-[18px] font-semibold hover:underline"
                            >
                                <span>Xem tất cả</span> <i class="fa-solid fa-angles-down text-[16px] ml-[3px]"></i>
                            </button>
                        ) : (
                            <button
                                onClick={() => setKpopIndex(6)}
                                className="mr-[30px] text-[18px] font-semibold hover:underline"
                            >
                                <span>Ẩn bớt</span> <i class="fa-solid fa-angles-up text-[16px] ml-[3px]"></i>
                            </button>
                        )}
                    </div>
                </div>

                {/* Thịnh hành  */}
                <div className="mt-[50px]">
                    <div className="text-[25px] font-black">Thịnh hành</div>
                    <div className="flex justify-start flex-wrap gap-x-[15px] gap-y-[20px] mt-[20px]">
                        {dataAPI?.popular?.playlists?.items.slice(0, popularIndex).map((data, index) => (
                            <Link to={`public_playlists/${data?.id}`}>
                                <Card key={index} data={data} w380_h150_display />
                            </Link>
                        ))}
                    </div>

                    {/* Btn display */}
                    <div className="text-right mt-[20px] ">
                        {popularIndex === 6 ? (
                            <button
                                onClick={() => setPopularIndex(50)}
                                className="mr-[30px] text-[18px] font-semibold hover:underline"
                            >
                                <span>Xem tất cả</span> <i class="fa-solid fa-angles-down text-[16px] ml-[3px]"></i>
                            </button>
                        ) : (
                            <button
                                onClick={() => setPopularIndex(6)}
                                className="mr-[30px] text-[18px] font-semibold hover:underline"
                            >
                                <span>Ẩn bớt</span> <i class="fa-solid fa-angles-up text-[16px] ml-[3px]"></i>
                            </button>
                        )}
                    </div>
                </div>

                {/* Lựa chọn khác */}
                <div className="mt-[50px]">
                    <div className="text-[25px] font-black">Lựa chọn khác</div>
                    <div className="flex justify-start flex-wrap gap-x-[15px] gap-y-[20px] mt-[20px]">
                        {dataAPI?.anotherChoice?.categories?.items.slice(3, 19).map((data, index) => (
                            <Link to={`/anotherChoise/${data?.id}`}>
                                <Card key={index} data={data} anotherChoice />
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;
