import { Outlet } from 'react-router-dom';

import RowNavbar from '../../components/RowNavbar/RowNavbar';
import NavbarLibrary from '../../components/NavbarLibrary';

function Library() {
    return (
        <div className={`h-full pt-[10px] px-[30px] duration-300`}>
            <RowNavbar item={<NavbarLibrary />} />
            <Outlet />
        </div>
    );
}

export default Library;
