import { NavLink } from 'react-router-dom';

import { useContext } from 'react';
import { Data } from '../../Context';

function ItemsNavbar({ icon, title, path }) {
    const { theme } = useContext(Data);
    const activeClass =
        'group w-full h-[45px] flex items-center px-[30px] cursor-pointer border-r-[6px] border-r-[rgba(180,180,180,0.8)]';
    const notActiveClass = 'group w-full h-[45px] flex items-center px-[30px] cursor-pointer';

    return (
        <div>
            <NavLink to={path} className={({ isActive }) => (isActive ? activeClass : notActiveClass)}>
                <div className="text-[25px] w-[30px] text-center duration-300 group-hover:scale-[1.2]">{icon}</div>
                <div className={`text-[15px] ml-[20px] font-semibold duration-300 group-hover:tracking-[2px]`}>
                    {title}
                </div>
            </NavLink>
        </div>
    );
}

export default ItemsNavbar;
