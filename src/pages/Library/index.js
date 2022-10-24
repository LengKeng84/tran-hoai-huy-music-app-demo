import { useContext } from 'react';
import { Data } from '../../Context';
import { Outlet } from 'react-router-dom';

import RowNavbar from '../../components/RowNavbar/RowNavbar';
import NavbarLibrary from '../../components/NavbarLibrary';

function Library() {
    const { theme } = useContext(Data);

    return (
        <div className={`h-full pt-[10px] px-[30px] duration-300`}>
            <RowNavbar item={<NavbarLibrary />} />
            <Outlet />
        </div>
    );
}

export default Library;
