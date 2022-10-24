import SignWithAcc from '../SignWithAcc';

function SignIn() {
    return (
        <div className="relative w-full h-full">
            <div className="signInChoose w-full h-full flex flex-col items-center">
                {/* Tiêu đề */}
                <div className="text-[30px] text-[#fff] font-bold mt-[20px]">Chào mừng đến với KMusic</div>

                {/* Main Logo */}
                <div className="text-[70px] text-[#aecfeb]">
                    <i class="fa-brands fa-napster"></i>
                </div>

                {/* Lựa chọn cách đăng nhập */}
                {/* User Account */}
                <div
                    className="w-[300px] h-[50px] text-[16px] text-[#1e1c1c] font-semibold flex items-center bg-[#4682B4] px-[20px] py-[10px] rounded-[10px] cursor-pointer border-[#7d76cc] hover:bg-[#5f56c6]"
                    onClick={() => {
                        document.querySelector('.signInChoose').style.display = 'none';
                        document.querySelector('.signWithAcc').style.display = 'flex';
                    }}
                >
                    <i class="fa-solid fa-user"></i>
                    <div className="ml-[15px]">Tiếp tục với tài khoản của bạn</div>
                </div>
                {/* hoặc */}
                <span className="text-[20px] text-[#fff] font-semibold mt-[5px]">Hoặc:</span>

                {/* Facebook */}
                <div className="w-[300px] h-[50px] text-[16px] text-[#1e1c1c] font-semibold flex items-center bg-[#4682B4] px-[20px] py-[10px] mt-[5px] rounded-[10px] cursor-pointer hover:bg-[#5f56c6]">
                    <i class="fa-brands fa-google"></i>
                    <div className="ml-[15px]">Tiếp tục với Facebook</div>
                </div>

                {/* Google */}
                <div className="w-[300px] h-[50px] text-[16px] text-[#1e1c1c] font-semibold flex items-center bg-[#4682B4] px-[20px] py-[10px] mt-[10px] rounded-[10px] cursor-pointer hover:bg-[#5f56c6]">
                    <i class="fa-brands fa-facebook"></i>
                    <div className="ml-[15px]">Tiếp tục với Google</div>
                </div>

                {/* Twitter */}
                <div className="w-[300px] h-[50px] text-[16px] text-[#1e1c1c] font-semibold flex items-center bg-[#4682B4] px-[20px] py-[10px] mt-[10px] rounded-[10px] cursor-pointer hover:bg-[#5f56c6]">
                    <i class="fa-brands fa-twitter"></i>
                    <div className="ml-[15px]">Tiếp tục với Twitter</div>
                </div>

                {/* Note */}
                <div className="text-[14px] text-[#fff] mt-[30px] mb-[20px]">
                    Việc bạn tiếp tục sử dụng trang web này đồng nghĩa bạn đồng ý với{' '}
                    <span className="underline cursor-pointer">Điều khoản sử dụng</span> của chúng tôi
                </div>
            </div>

            <SignWithAcc />
        </div>
    );
}

export default SignIn;
