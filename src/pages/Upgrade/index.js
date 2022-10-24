import { useContext } from 'react';
import { Data } from '../../Context';
import RowNavbar from '../../components/RowNavbar/RowNavbar';
function Upgrade() {
    const { theme } = useContext(Data);
    return (
        <div className={`text-[${theme.coText1}] pt-[10px] pb-[120px] duration-500`}>
            <RowNavbar />
            {/* Tiêu đề */}
            <h1 className="text-center text-[40px] font-bold">
                Nâng cấp VIP <i class={`fa-brands fa-napster text-[70px] text-[${theme.coText}] mr-[10px]`}></i>
            </h1>
            <div className="mt-[20px]">
                <h2 className="text-center text-[30px] font-semibold">Âm nhạc không giới hạn</h2>
                <p className="text-center text-[20px]">
                    Dịch vụ nghe nhạc Online chất lượng cao, kết hợp cùng các tiện ích dành riêng cho thành viên VIP
                </p>
            </div>

            {/* Nội dung */}
            {/* Mua VIP - Start */}
            <div className="w-full py-[40px] ">
                <h3 className={`text-center text-[40px] text-[${theme.coText1}] font-black pb-[30px]`}>Các gói VIP</h3>
                <div className="flex justify-evenly">
                    {/* Items VIP */}
                    <div
                        className={`w-[320px] h-[380px] bg-[${theme.primary1}] rounded-[20px] border-[1px] border-[#3f3f3f] flex flex-col justify-between items-center`}
                    >
                        <p
                            className={`text-center text-[30px] text-[${theme.coText1}] font-semibold border-b-[3px] border-[#297b94] py-[20px]`}
                        >
                            Gói 1 tháng
                        </p>
                        <div className="flex flex-col items-center text-[red]">
                            <span>
                                <span className="relative text-[50px] font-bold">
                                    129.000 <span className="absolute bottom-[0px] text-[15px] left-[100%]">VNĐ</span>
                                </span>
                            </span>

                            <span className="text-[25px] text-[gray] line-through">160.000 VNĐ</span>
                        </div>
                        <button className="w-[200px] h-[50px] rounded-[999px] bg-[#ffd138] text-[20px] font-semibold hover:bg-[#cfa108] mb-[30px] duration-300">
                            Mua VIP
                        </button>
                    </div>
                    <div
                        className={`w-[320px] h-[380px] bg-[${theme.primary1}] rounded-[20px] border-[1px] border-[#3f3f3f] flex flex-col justify-between items-center`}
                    >
                        <p
                            className={`text-center text-[30px] text-[${theme.coText1}] font-semibold border-b-[3px] border-[#297b94] py-[20px]`}
                        >
                            Gói 6 tháng
                        </p>
                        <div className="flex flex-col items-center text-[red]">
                            <span>
                                <span className="relative text-[50px] font-bold">
                                    599.000 <span className="absolute bottom-[0px] text-[15px] left-[100%]">VNĐ</span>
                                </span>
                            </span>

                            <span className="text-[25px] text-[gray] line-through">650.000 VNĐ</span>
                        </div>
                        <button className="w-[200px] h-[50px] rounded-[999px] bg-[#ffd138] text-[20px] font-semibold hover:bg-[#cfa108] mb-[30px] duration-300">
                            Mua VIP
                        </button>
                    </div>
                    <div
                        className={`w-[320px] h-[380px] bg-[${theme.primary1}] rounded-[20px] border-[1px] border-[#3f3f3f] flex flex-col justify-between items-center`}
                    >
                        <p
                            className={`text-center text-[30px] text-[${theme.coText1}] font-semibold border-b-[3px] border-[#297b94] py-[20px]`}
                        >
                            Gói 1 năm
                        </p>
                        <div className="flex flex-col items-center text-[red]">
                            <span>
                                <span className="relative text-[50px] font-bold">
                                    1199.000 <span className="absolute bottom-[0px] text-[15px] left-[100%]">VNĐ</span>
                                </span>
                            </span>

                            <span className="text-[25px] text-[gray] line-through">1350.000 VNĐ</span>
                        </div>
                        <button className="w-[200px] h-[50px] rounded-[999px] bg-[#ffd138] text-[20px] font-semibold hover:bg-[#cfa108] mb-[30px] duration-300">
                            Mua VIP
                        </button>
                    </div>
                </div>
            </div>
            {/* Mua VIP - End */}

            {/* Nhập code VIP - Start*/}
            <div className="w-full h-[500px] flex justify-center items-center">
                <div className={`bg-[${theme.primary1}] flex rounded-[20px] overflow-hidden`}>
                    <div>
                        <img
                            className="w-[400px]"
                            src="https://previews.123rf.com/images/tribalium123/tribalium1231210/tribalium123121000046/15575595-vip-design-vip-symbol-very-important-person-sign-.jpg"
                            alt=""
                        />
                    </div>
                    <div className="px-[50px] flex flex-col justify-center items-center">
                        <p className={`text-center text-[30px] text-[${theme.coText1}] font-bold duration-300`}>
                            Đã có Code VIP?
                        </p>
                        <p
                            className={`text-center text-[20px] text-[${theme.coText1}] font-semibold mb-[30px] duration-300`}
                        >
                            Nhập vào đây đẻ kích hoạt
                        </p>
                        <form className="flex flex-col ">
                            <input
                                className="w-[400px] h-[50px] px-[20px] rounded-[10px] text-[18px] text-[#000] font-semibold"
                                type="text"
                            />
                            <input
                                className={`w-[150px] h-[40px] rounded-[10px] bg-[${theme.primary2}] text-[18px] text-[${theme.coText2}] font-semibold mt-[10px] cursor-pointer`}
                                type="submit"
                                value="Nhận VIP"
                            />
                        </form>
                    </div>
                </div>
            </div>
            {/* Nhập code VIP - End*/}

            {/* Thông tin gói VIP - Start */}
            <div className={`text-[${theme.coText}] py-[30px]`}>
                <h2 className="text-center text-[40px] font-bold">KMusic VIP là gì?</h2>
                <p className="text-center text-[20px] font-semibold mt-[30px]">
                    KMusic VIP là dịch vụ nghe nhạc Online chất lượng cao, kết hợp cùng các tiện ích dành riêng cho
                    thành viên VIP như:
                </p>
                <div className="flex justify-evenly items-center mt-[50px]">
                    <div
                        className={`w-[200px] bg-[${theme.primary1}] p-[20px] flex flex-col items-center rounded-[20px]`}
                    >
                        <i class="fa-solid fa-rectangle-ad text-[40px]"></i>
                        <span className="text-center text-[18px] mt-[10px]">Không bị làm phiền bởi quảng cáo</span>
                    </div>
                    <div
                        className={`w-[200px] bg-[${theme.primary1}] p-[20px] flex flex-col items-center rounded-[20px]`}
                    >
                        <i class="fa-solid fa-headphones-simple text-[40px]"></i>
                        <span className="text-center text-[18px] mt-[10px]">Nghe nhạc offline chất lượng Lossless</span>
                    </div>
                    <div
                        className={`w-[200px] bg-[${theme.primary1}] p-[20px] flex flex-col items-center rounded-[20px]`}
                    >
                        <i class="fa-solid fa-cloud-arrow-up text-[40px]"></i>
                        <span className="text-center text-[18px] mt-[10px]">Upload lên đến 1000 bài hát</span>
                    </div>
                    <div
                        className={`w-[200px] bg-[${theme.primary1}] p-[20px] flex flex-col items-center rounded-[20px]`}
                    >
                        <i class="fa-solid fa-circle-info text-[40px]"></i>
                        <span className="text-center text-[18px] mt-[10px]">Và nhiều dịch vụ tiện ích khác</span>
                    </div>
                </div>
            </div>
            {/* Thông tin gói VIP - End */}
        </div>
    );
}

export default Upgrade;
