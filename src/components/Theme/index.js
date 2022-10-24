import { useContext } from 'react';
import { Data } from '../../Context';
import { dataThemes } from '../../data/ThemeData';

function Theme({ hidden }) {
    const { theme, setTheme } = useContext(Data);

    const handlerTheme = (data) => {
        setTheme(data);
        localStorage.setItem('theme', JSON.stringify(data));
    };

    return (
        <div className="z-50 fixed left-0 top-0 w-full h-full flex justify-center items-center">
            {/* Background */}
            <div onClick={() => hidden(true)} className="absolute left-0 top-0 w-full h-full"></div>

            {/* Content */}
            <div
                className={`relative w-[700px] h-[350px] px-[50px] bg-[${theme.primary2}] rounded-[10px] shadow-sm flex justify-around items-center flex-wrap`}
            >
                {/* Btn Close */}
                <div
                    className="absolute right-[20px] top-[10px] cursor-pointer text-[25px] hover:scale-[1.5]"
                    onClick={() => hidden(true)}
                >
                    <i class="fa-solid fa-xmark"></i>
                </div>
                {/* Sáng */}
                <div
                    className="w-[140px] h-[80px] bg-gradient-to-br from-[rgb(242,242,242)] via-[rgb(202,202,202)] to-[rgb(220,220,220)] cursor-pointer hover:opacity-75"
                    onClick={() => handlerTheme(dataThemes[0])}
                >
                    {/* Color */}
                    <div className={`w-full h-full shadow-sm rounded-[8px] overflow-hidden flex`}>
                        {/* <div className="w-[50%] h-full bg-[rgb(242,242,242)]"></div>
                    <div className="w-[50%] h-full bg-[rgb(220,220,220)]"></div>
                    <div className="w-[50%] h-full bg-[rgb(202,202,202)]"></div> */}
                    </div>

                    {/* Color Name */}
                    <div className={`text-center text-[${theme.coText1}] font-bold`}>Sáng</div>
                </div>

                {/* Tối */}
                <div
                    className="w-[140px] h-[80px] cursor-pointer hover:opacity-75"
                    onClick={() => handlerTheme(dataThemes[1])}
                >
                    {/* Color */}
                    <div
                        className={`w-full h-full bg-gradient-to-br from-[rgb(16,14,14)] via-[rgb(56,56,56)] to-[rgb(32,30,32)] shadow-sm rounded-[8px] overflow-hidden flex`}
                    >
                        {/* <div className="w-[50%] h-full bg-[rgb(16,14,14)]"></div>
                    <div className="w-[50%] h-full bg-[rgb(32,30,32)]"></div>
                    <div className="w-[50%] h-full bg-[rgb(56,56,56)]"></div> */}
                    </div>
                    {/* Color Name */}
                    <div className={`text-center text-[${theme.coText1}] font-bold`}>Tối</div>
                </div>

                {/* Hồng */}
                <div
                    className="w-[140px] h-[80px] cursor-pointer hover:opacity-75"
                    onClick={() => handlerTheme(dataThemes[2])}
                >
                    {/* Color */}
                    <div
                        className={`w-full h-full bg-gradient-to-br from-[rgb(224,29,61)] via-[rgb(255,87,87)] to-[rgb(255,176,190)] shadow-sm rounded-[8px] overflow-hidden flex`}
                    >
                        {/* <div className="w-[50%] h-full bg-[rgb(224,29,61)]"></div>
                    <div className="w-[50%] h-full bg-[rgb(255,176,190)]"></div>
                    <div className="w-[50%] h-full bg-[rgb(255,87,87)]"></div> */}
                    </div>
                    {/* Color Name */}
                    <div className={`text-center text-[${theme.coText1}] font-bold`}>Hồng</div>
                </div>

                {/* Tím */}
                <div
                    className="w-[140px] h-[80px] cursor-pointer hover:opacity-75"
                    onClick={() => handlerTheme(dataThemes[3])}
                >
                    {/* Color */}
                    <div
                        className={`w-full h-full bg-gradient-to-br from-[rgb(67,7,67)] via-[rgb(117,10,67)] to-[rgb(175,59,175)] shadow-sm rounded-[8px] overflow-hidden flex`}
                    >
                        {/* <div className="w-[50%] h-full bg-[rgb(67,7,67)]"></div>
                    <div className="w-[50%] h-full bg-[rgb(175,59,175)]"></div>
                    <div className="w-[50%] h-full bg-[rgb(117,10,67)]"></div> */}
                    </div>
                    <div className={`text-center text-[${theme.coText1}] font-bold`}>Tím</div>
                    {/* Color Name */}
                </div>

                {/* Cam đỏ */}
                <div
                    className="w-[140px] h-[80px] cursor-pointer hover:opacity-75"
                    onClick={() => handlerTheme(dataThemes[4])}
                >
                    {/* Color */}
                    <div
                        className={`w-full h-full bg-gradient-to-br from-[rgb(250,175,8)] via-[rgb(250,64,50)] to-[rgb(250,129,47)] shadow-sm rounded-[8px] overflow-hidden flex`}
                    >
                        {/* <div className="w-[50%] h-full bg-[rgb(250,175,8)]"></div>
                    <div className="w-[50%] h-full bg-[rgb(250,129,47)]"></div>
                    <div className="w-[50%] h-full bg-[rgb(250,64,50)]"></div> */}
                    </div>
                    {/* Color Name */}
                    <div className={`text-center text-[${theme.coText1}] font-bold`}>Cam - đỏ</div>
                </div>

                {/* Chàm */}
                <div
                    className="w-[140px] h-[80px] cursor-pointer hover:opacity-75"
                    onClick={() => handlerTheme(dataThemes[5])}
                >
                    {/* Color */}
                    <div
                        className={`w-full h-full bg-gradient-to-br from-[rgb(30,31,38)] via-[rgb(77,100,141)] to-[rgb(40,54,85)] shadow-sm rounded-[8px] overflow-hidden`}
                    >
                        {/* <div className="w-[50%] h-full bg-[rgb(30,31,38)]"></div>
                    <div className="w-[50%] h-full bg-[rgb(40,54,85)]"></div>
                    <div className="w-[50%] h-full bg-[rgb(77,100,141)]"></div> */}
                    </div>
                    <div className={`text-center text-[${theme.coText1}] font-bold`}>Chàm</div>
                    {/* Color Name */}
                </div>

                {/* Xanh dương */}
                <div
                    className="w-[140px] h-[80px] cursor-pointer hover:opacity-75"
                    onClick={() => handlerTheme(dataThemes[6])}
                >
                    {/* Color */}
                    <div
                        className={`w-full h-full bg-gradient-to-br from-[rgb(16,31,63)] via-[rgb(138,123,252)] to-[rgb(60,123,179)] shadow-sm rounded-[8px] overflow-hidden flex`}
                    >
                        {/* <div className="w-[50%] h-full bg-[rgb(16,31,63)]"></div>
                    <div className="w-[50%] h-full bg-[rgb(60,123,179)]"></div>
                    <div className="w-[50%] h-full bg-[rgb(138,123,252)]"></div> */}
                    </div>
                    {/* Color Name */}
                    <div className={`text-center text-[${theme.coText1}] font-bold`}>Xanh dương</div>
                </div>

                {/* Xanh lá */}
                <div
                    className="w-[140px] h-[80px] cursor-pointer hover:opacity-75"
                    onClick={() => handlerTheme(dataThemes[7])}
                >
                    {/* Color */}
                    <div
                        className={`w-full h-full bg-gradient-to-br from-[rgb(8,70,40)] via-[rgb(27,191,82)] to-[rgb(5,172,114)] shadow-sm rounded-[8px] overflow-hidden flex`}
                    >
                        {/* <div className="w-[50%] h-full bg-[rgb(8,70,40)]"></div>
                    <div className="w-[50%] h-full bg-[rgb(5,172,114)]"></div>
                    <div className="w-[50%] h-full bg-[rgb(27,191,82)]"></div> */}
                    </div>
                    {/* Color Name */}
                    <div className={`text-center text-[${theme.coText1}] font-bold`}>Xanh lá</div>
                </div>
            </div>
        </div>
    );
}

export default Theme;
