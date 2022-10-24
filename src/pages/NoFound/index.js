import { useContext } from 'react';
import { Data } from '../../Context';

function NoFound() {
    const { theme } = useContext(Data);

    return (
        <div
            className={`fixed top-0 left-0 w-full h-screen bg-[${theme.primary1}] flex flex-col justify-center items-center z-50`}
        >
            <i class="fa-solid fa-circle-exclamation text-[80px]"></i>
            <span className="text-[40px] font-black">Không tìm thấy trang!</span>
        </div>
    );
}

export default NoFound;
