import { useContext, useState } from 'react';
import { Data } from '../../Context';
import { NavLink } from 'react-router-dom';

function NavbarLibrary() {
    const { theme } = useContext(Data);

    let activeClass =
        'w-[120px] h-[40px] mr-[10px] bg-[rgba(220,220,220,0.8)] border-[3px] border-[#7b7b7b] rounded-[10px] text-[14px] font-semibold flex justify-center items-center cursor-pointer';
    let notActiveClass =
        'w-[120px] h-[40px] mr-[10px] border-[3px] border-[#747474] rounded-[10px] text-[14px] font-semibold flex justify-center items-center cursor-pointer';
    return (
        <div className="flex justify-start items-center">
            {/* Playlist */}

            <NavLink to="playlist" className={({ isActive }) => (isActive ? activeClass : notActiveClass)}>
                PlayList
            </NavLink>

            {/* Bài hát yêu thích */}
            <NavLink to="favoriteSong" className={({ isActive }) => (isActive ? activeClass : notActiveClass)}>
                Bài hát yêu thích
            </NavLink>

            {/* Nghệ sĩ theo dõi */}
            <NavLink to="followArtist" className={({ isActive }) => (isActive ? activeClass : notActiveClass)}>
                Nghệ sĩ theo dõi
            </NavLink>

            {/* Album theo dõi */}
            <NavLink to="favoriteAlbum" className={({ isActive }) => (isActive ? activeClass : notActiveClass)}>
                Album đã thích
            </NavLink>
        </div>
    );
}

export default NavbarLibrary;
