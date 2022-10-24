import { useState } from 'react';
import { Link } from 'react-router-dom';

import Card from '../../components/Card';
import RowNavbar from '../../components/RowNavbar/RowNavbar';
import Searcher from '../../components/Searcher';

function Search() {
    const [dataAPI, setDataAPI] = useState([]);

    const getData = (data) => {
        setDataAPI(data);
    };

    return (
        <div className={`px-[30px]`}>
            <RowNavbar item={<Searcher callback={getData} />} />
            {/* Display - Start*/}
            <div className={``}>
                {dataAPI?.tracks ? (
                    <div>
                        {/* Kq hàng đầu */}
                        <div className="mt-[20px]">
                            <div className="text-[28px] font-bold">Kết quả hàng đầu</div>
                            <div className="flex mt-[20px]">
                                <Card
                                    data={
                                        dataAPI?.tracks?.items.filter((data) => {
                                            return data?.preview_url != null;
                                        })[0]
                                    }
                                    play
                                    w400_h200
                                />

                                <div className="ml-[80px]">
                                    <Link to={`/artists/${dataAPI?.artists?.items[0]?.id}`}>
                                        <Card data={dataAPI?.artists?.items[0]} artistsDisplay w400_h200 />
                                    </Link>
                                </div>
                            </div>
                        </div>

                        {/* Bài hát */}
                        <div>
                            <div className="text-[30px] font-bold mt-[40px] mb-[15px]">Bài hát</div>
                            <div className="grid grid-cols-5">
                                {dataAPI?.tracks?.items
                                    .filter((data) => {
                                        return data?.preview_url != null;
                                    })
                                    .slice(0, 5)
                                    .map((data, index) => (
                                        <Card key={index} data={data} play w220_h300 />
                                    ))}
                            </div>
                        </div>

                        {/* Nghệ sĩ */}
                        <div>
                            <div className="text-[30px] font-bold mt-[50px] mb-[20px]">Nghệ sĩ</div>
                            <div className="grid grid-cols-5">
                                {dataAPI?.artists?.items.slice(0, 5).map((data, index) => (
                                    <Link to={`/artists/${data?.id}`}>
                                        <Card key={index} data={data} artistsDisplay w220_h300 />
                                    </Link>
                                ))}
                            </div>
                        </div>

                        {/* Album */}
                        <div>
                            <div className="text-[30px] font-bold mt-[50px] mb-[20px]">Album</div>
                            <div className="grid grid-cols-5">
                                {dataAPI?.albums?.items.slice(0, 5).map((data, index) => (
                                    <Link to={`/album/${data?.id}`}>
                                        <Card key={index} data={data} albumDisplay />
                                    </Link>
                                ))}
                            </div>
                        </div>

                        {/* Playlist */}
                        <div>
                            <div className="text-[30px] font-bold mt-[50px] mb-[20px]">Playlist</div>
                            <div className="grid grid-cols-5">
                                {dataAPI?.playlists?.items.slice(0, 5).map((data, index) => (
                                    <Link to={`/public_playlists/${data?.id}`}>
                                        <Card key={index} data={data} playlistDisplay />
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="text-center mt-[80px]">
                        <div className="text-[40px] font-black mb-[40px]">
                            Tìm kiếm những bài hát, nghệ sĩ bạn muốn!
                        </div>
                        <i class="fa-solid fa-headphones text-[300px]"></i>
                    </div>
                )}
            </div>
            {/* Display - End*/}
        </div>
    );
}

export default Search;
