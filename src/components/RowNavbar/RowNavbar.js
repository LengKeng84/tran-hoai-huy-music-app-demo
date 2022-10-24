// import ItemsNavbar from './ItemsNavbar';
import { useContext, useState } from 'react';
import { Data } from '../../Context';
import Theme from '../Theme';

function RowNavbar({ item }) {
    const { theme } = useContext(Data);
    const [hiddenTheme, setHiddenTheme] = useState(true);

    const getCallBack = (data) => {
        setHiddenTheme(data);
    };

    return (
        <div
            className={`fixed top-0 right-0 h-[60px] contentRowbar bg-[${
                theme.primary1
            }] border-b-[1px] border-[rgba(128,128,128,0.7)] px-[30px] ${
                theme.primary1 === 'rgb(0,0,0)' ? 'shadow-[#fff]' : 'shadow-[#000]'
            } flex justify-start items-center z-10 duration-300`}
        >
            {/* Item Left */}
            {item && item}
            <div></div>
            {/* Items Right*/}
            <div className="flex items-center h-full ml-auto mr-[30px]">
                {/* Theme Btn */}
                <div
                    onClick={() => setHiddenTheme(false)}
                    className={`text-[${theme.coText}] font-semibold cursor-pointer duration-300 hover:scale-110`}
                >
                    <i class="fa-solid fa-brush"></i> Đổi chủ đề
                </div>
                {/* Trợ giúp */}
                <div
                    className={`flex justify-center items-center w-[140px] text-[${theme.coText}] font-semibold h-full cursor-pointer duration-300 hover:scale-110`}
                >
                    <div className="text-[17px] mr-[10px]">
                        <i class="fa-solid fa-circle-question"></i>
                    </div>
                    <div className="text-[14px]">Trợ giúp</div>
                </div>

                {/* Đăng nhập */}
                <div
                    className="flex justify-center items-center w-[140px] h-[40px] bg-[rgb(230,230,230)] text-[#3a3a3a] font-semibold cursor-pointer duration-300 rounded-[20px] hover:bg-[rgba(111,111,111,0.4)] hover:text-[#f7f7f7]"
                    onClick={() => {
                        document.querySelector('.signIn').style.display = 'flex';
                    }}
                >
                    <div className="text-[17px] mr-[10px]">
                        <i class="fa-solid fa-right-to-bracket"></i>
                    </div>
                    <div className="text-[14px]">Đăng nhập</div>
                </div>
            </div>
            {/* Theme */}
            {!hiddenTheme && <Theme hidden={getCallBack} />}
        </div>
    );
}

export default RowNavbar;
