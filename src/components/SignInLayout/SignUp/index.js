import { useState } from 'react';

function SignUp() {
    const [hiddenPW1, setHiddenPW1] = useState(true);
    const [hiddenPW2, setHiddenPW2] = useState(true);
    const [signUp, setSignUp] = useState(1);
    return (
        <div className="w-full h-full flex flex-col items-center">
            {/* Tiêu đề */}
            <h1 className="text-[30px] font-semibold mt-[10px]">
                Đăng kí tài khoản KMusic{' '}
                <span className="text-[40px] text-[#501717]">
                    <i class="fa-brands fa-napster"></i>
                </span>
            </h1>

            {/* Nhập tên của bạn */}
            <div className="mt-[20px]">
                <input
                    type="text"
                    placeholder="Nhập tên của bạn"
                    className="inputSignIn w-[350px] h-[50px] p-[20px] rounded-[5px] bg-[#e55050] text-[#1e1c1c] font-semibold"
                />
            </div>

            {/* Đăng kí với */}
            <div className="mt-[20px]">
                <div className="w-[350px] flex">
                    <span
                        className={`w-full bg-[#e62626] text-center py-[10px] rounded-tl-[5px] cursor-pointer ${
                            signUp === 1 && 'bg-[#741919]'
                        }`}
                        onClick={() => {
                            setSignUp(1);
                        }}
                    >
                        Đăng kí với SĐT
                    </span>
                    <span
                        className={`w-full bg-[#e62626] text-center py-[10px] rounded-tr-[5px] cursor-pointer ${
                            signUp === 2 && 'bg-[#741919]'
                        }`}
                        onClick={() => {
                            setSignUp(2);
                        }}
                    >
                        Đăng kí với Email
                    </span>
                </div>

                <div>
                    {(signUp === 1 && (
                        <input
                            type="text"
                            placeholder="Nhập số điện thoại"
                            className="inputSignIn w-[350px] h-[50px] p-[20px] rounded-b-[5px] bg-[#e55050] text-[#1e1c1c] font-semibold"
                        />
                    )) ||
                        (signUp === 2 && (
                            <input
                                type="text"
                                placeholder="Nhập số Email"
                                className="inputSignIn w-[350px] h-[50px] p-[20px] rounded-b-[5px] bg-[#e55050] text-[#1e1c1c] font-semibold"
                            />
                        ))}
                </div>
            </div>

            {/* Tạo PW */}
            <div className="relative mt-[10px]">
                <input
                    className="inputSignIn w-[350px] h-[50px] mt-[20px] pl-[20px] pr-[50px] py-[20px] rounded-[5px] bg-[#e55050] text-[#1e1c1c] font-semibold"
                    type={`${hiddenPW1 ? 'password' : 'text'}`}
                    placeholder="Tạo mật khẩu"
                />
                <div
                    className="absolute top-[45%] right-[15px] text-[20px] text-clip text-[1e1c1c]"
                    onClick={() => {
                        setHiddenPW1(!hiddenPW1);
                    }}
                >
                    {/* Hidden Password */}
                    {hiddenPW1 ? (
                        <i class="fa-solid fa-eye-slash text-[#1e1c1c]"></i>
                    ) : (
                        <i class="fa-solid fa-eye text-[#1e1c1c]"></i>
                    )}
                </div>
            </div>

            {/* Nhập lại PW */}
            <div className="relative">
                <input
                    className="inputSignIn w-[350px] h-[50px] mt-[20px] pl-[20px] pr-[50px] py-[20px] rounded-[5px] bg-[#e55050] text-[#1e1c1c] font-semibold"
                    type={`${hiddenPW2 ? 'password' : 'text'}`}
                    placeholder="Nhập lại mật khẩu"
                />
                <div
                    className="absolute top-[45%] right-[15px] text-[20px] text-clip text-[1e1c1c]"
                    onClick={() => {
                        setHiddenPW2(!hiddenPW1);
                    }}
                >
                    {/* Hidden Password */}
                    {hiddenPW1 ? (
                        <i class="fa-solid fa-eye-slash text-[#1e1c1c]"></i>
                    ) : (
                        <i class="fa-solid fa-eye text-[#1e1c1c]"></i>
                    )}
                </div>
            </div>

            {/* Tiếp tục */}
            <span className="w-[200px] h-[40px] bg-[#e55050] rounded-[5px] mt-[20px] flex justify-center items-center text-[18px] font-semibold cursor-pointer hover:bg-[#ca2b78]">
                Tiếp tục
            </span>
        </div>
    );
}

export default SignUp;
