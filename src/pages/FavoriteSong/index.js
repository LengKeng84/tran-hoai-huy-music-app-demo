import { useContext } from 'react';
import { Data } from '../../Context';

import Card from '../../components/Card';

function FavoriteSong() {
    const { favoriteSongs } = useContext(Data);

    return (
        <div className="">
            {/* Header - Start*/}
            <div className=" flex justify-start items-center">
                <div className="w-[180px] h-[180px] bg-[rgba(154,154,154,0.2)] border-[1px] border-[#b6b6b6] flex justify-center items-center">
                    <i class="fa-solid fa-heart text-[80px] text-[red]"></i>
                </div>
                <div className="pl-[20px]">
                    <div className="text-[50px] font-black">Bài hát đã thích</div>
                    <div className="text-[20px] font-semibold flex justify-start items-center ml-[10px]">
                        <i class="fa-solid fa-music"></i>{' '}
                        <span className="ml-[10px]">{favoriteSongs.length} bài hát</span>
                    </div>
                </div>
            </div>
            {/* Header - End*/}
            {/* Line */}
            <div className="flex justify-center mt-[30px]">
                <div className="w-[80%] h-[2px] bg-[rgba(170,170,170,0.2)]"></div>
            </div>
            {/* Content - Start */}
            {favoriteSongs.length > 0 ? (
                <div className="mt-[20px] ">
                    <div className="flex justify-start pb-[20px] text-[18px]">
                        <div className="ml-[20px] font-bold">#Thông tin</div>
                        <div className="ml-[410px] font-bold">#Album</div>
                        <div className="ml-[280px] font-bold">#Thời lượng</div>
                    </div>
                    {/* Container */}
                    <div className="py-[10px] border-t-[1px] border-[gray]">
                        {favoriteSongs.map((data, index) => (
                            <Card key={index} data={{ song: data, index: index, favoriteSong: true }} play wFull_h50 />
                        ))}
                    </div>
                </div>
            ) : (
                <div className="text-center mt-[50px]">
                    <div className="text-[45px] font-black">Đưa bài hát yêu thích vào danh sách</div>
                    <div className="text-[30px] font-black">Bằng cách nhấn vào nút Thích bài hát này</div>
                </div>
            )}
            {/* Content - End */}
        </div>
    );
}

export default FavoriteSong;
