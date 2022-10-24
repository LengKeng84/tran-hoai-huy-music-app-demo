import { useState } from 'react';

function SignWithAcc() {
    const [hiddenPW, setHiddenPW] = useState(true);
    return (
        <div className="absolute top-0 left-0 w-full h-full signWithAcc flex-col justify-between items-center bg-[#0c0c32] hidden">
            <div
                className="absolute top-0 left-0 w-[50px] h-[50px] text-[30px] flex justify-center items-center cursor-pointer"
                onClick={() => {
                    document.querySelector('.signInChoose').style.display = 'flex';
                    document.querySelector('.signWithAcc').style.display = 'none';
                }}
            >
                <i class="fa-solid fa-angle-left"></i>
            </div>
            {/* Tiêu đề */}
            <h1 className="text-[25px] text-[#fff] font-semibold mt-[20px]">
                <span className="text-[30px]">Hello!</span> Đăng nhập vào tài khoản của bạn!
            </h1>

            {/* User Logo */}
            <div className="w-[70px] h-[70px] bg-[#4682B4] text-[40px] text-[#fff] border-[0px] rounded-[999px] flex justify-center items-center mt-[20px]">
                <i class="fa-solid fa-user"></i>
            </div>

            {/* Form đăng nhập */}
            <form className="flex flex-col items-center justify-between mt-[20px]">
                {/* Nhập tên tài khoản */}
                <input
                    className="inputSignIn w-[350px] h-[50px] p-[20px] rounded-[5px] bg-[#4682B4] text-[#1e1c1c] font-semibold"
                    type="text"
                    placeholder="Nhập tên tài khoản của bạn"
                />

                {/* Nhập mật khẩu */}
                <div className="relative">
                    <input
                        className="inputSignIn w-[350px] h-[50px] mt-[20px] pl-[20px] pr-[50px] py-[20px] rounded-[5px] bg-[#4682B4] text-[#1e1c1c] font-semibold"
                        type={`${hiddenPW ? 'password' : 'text'}`}
                        placeholder="Nhập mật khẩu"
                    />
                    <div
                        className="absolute top-[45%] right-[15px] text-[20px] text-clip text-[1e1c1c]"
                        onClick={() => {
                            setHiddenPW(!hiddenPW);
                        }}
                    >
                        {/* Hidden Password */}
                        {hiddenPW ? (
                            <i class="fa-solid fa-eye-slash text-[#1e1c1c]"></i>
                        ) : (
                            <i class="fa-solid fa-eye text-[#1e1c1c]"></i>
                        )}
                    </div>
                </div>

                <input
                    className="w-[200px] h-[45px] bg-[#4682B4] text-[#1e1c1c] font-semibold mt-[20px] rounded-[5px] cursor-pointer hover:bg-[#809cb4]"
                    type="submit"
                    value="Đăng nhập"
                />
            </form>

            {/* Phần trợ giúp */}
            <div className="mt-[30px] mb-[20px]">
                <div className="text-center text-[18px] text-[#a78d95]">
                    <span>Bạn chưa có tài khoản?</span>

                    <button className="ml-[10px] hover:text-[#fff]">
                        <i class="fa-solid fa-hand-point-right"></i> Tạo tài khoản
                    </button>
                </div>
                <div className="text-center text-[18px] text-[#a78d95] mt-[10px]">
                    <span>Bạn quên mất mật khẩu?</span>

                    <button className="ml-[10px] hover:text-[#fff]">
                        <i class="fa-solid fa-hand-point-right"></i> Tìm lại mật khẩu
                    </button>
                </div>
            </div>
        </div>
    );
}

export default SignWithAcc;
