import ItemsNavbar from './ItemsNavbar';
import { Link } from 'react-router-dom';

import { useContext } from 'react';
import { Data } from '../../Context';

function ColNavbar() {
    const { theme } = useContext(Data);
    const { playlists } = useContext(Data);
    return (
        <div
            className={`fixed left-0 top-0 w-[250px] h-screen bg-[${theme.primary2}] border-r-[1px] border-[rgba(51,51,51,0.2)] text-[${theme.coText1}] z-10 duration-500`}
        >
            {/* Logo */}
            <Link to="/" className="w-full flex justify-center items-center py-[10px] cursor-pointer">
                <i class={`fa-brands fa-napster text-[60px] text-[${theme.coText1}] mr-[10px]`}></i>
                <span className={`text-[25px] text-[${theme.coText1}] font-bold`}>KMusic</span>
            </Link>
            {/* ItemsNavbar */}
            <div className="mt-[10px]">
                <ItemsNavbar path="/" icon={<i class="fa-solid fa-house-user"></i>} title="Trang chủ" />
                <ItemsNavbar path="/search" icon={<i class="fa-solid fa-magnifying-glass"></i>} title="Tìm kiếm" />
                <ItemsNavbar path="/library/playlist" icon={<i class="fa-solid fa-book"></i>} title="Thư viện" />
                <ItemsNavbar path="/upgrade" icon={<i class="fa-solid fa-gem"></i>} title="Nâng cấp VIP" />
            </div>

            {/* Playlist */}
            {/* Line */}
            <div className="flex justify-center mt-[10px]">
                <div className="w-[70%] h-[1px] bg-[rgba(255,255,255,0.2)]"></div>
            </div>
            {/* Line */}
            <div className="px-[30px] mt-[10px]">
                <div className="flex justify-start items-center mb-[5px]">
                    <span class="material-icons-outlined text-[30px] w-[30px] text-center duration-300">
                        queue_music
                    </span>
                    <span className="text-[16px] ml-[20px] font-semibold duration-300">
                        Playlist ({playlists.length})
                    </span>
                </div>
                <div className="h-[300px] overflow-auto">
                    {playlists.map((data, index) => (
                        <Link key={index} to={`/playlist/${index}`}>
                            <div className="mt-[5px] px-[5px] py-[2px] truncate hover:bg-[rgba(255,255,255,0.2)] duration-100 cursor-pointer">
                                {data.name}
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default ColNavbar;
