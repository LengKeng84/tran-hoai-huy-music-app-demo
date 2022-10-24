import { useState } from 'react';
import SignIn from './SignIn';
import SignUp from './SignUp';

function SignInLayout() {
    const [layout, setLayout] = useState(1);
    const handleClose = () => {
        document.querySelector('.signIn').style.display = 'none';
    };
    return (
        <div className="signIn fixed top-0 left-0 w-full h-full z-[100] hidden justify-center items-center ">
            {/* Background */}
            <div
                className="absolute w-full h-full bg-[rgba(0,0,0,0.5)]"
                onClick={() => {
                    handleClose();
                }}
            ></div>

            {/* Container */}
            <div className="w-800px text-[#fff] rounded-[20px] z-[60]">
                {/* header */}
                <div className="h-[55px] relative flex items-end">
                    <div
                        className={`w-[150px] h-[40px] bg-[#0c0c32] text-[16px] font-semibold flex justify-center items-center cursor-pointer rounded-tl-[20px] duration-500 ${
                            layout === 1 && 'activeSignIn'
                        }`}
                        onClick={() => {
                            setLayout(1);
                        }}
                    >
                        Đăng nhập
                    </div>

                    <div
                        className={`w-[150px] h-[40px] flex justify-center items-center bg-[#a11717] text-[16px] font-semibold cursor-pointer rounded-tr-[20px] duration-500 ${
                            layout === 2 && 'activeSignIn'
                        }`}
                        onClick={() => {
                            setLayout(2);
                        }}
                    >
                        Đăng kí
                    </div>
                </div>

                {/* content */}
                <div
                    className={`relative w-[800px] h-[500px] rounded-b-[10px] rounded-tr-[10px] overflow-hidden duration-500 ${
                        (layout === 1 && 'bg-[#0c0c32]') || (layout === 2 && 'bg-[#a11717]')
                    }`}
                >
                    {/* Close button */}
                    <div className="absolute top-0 right-[15px] text-[40px] cursor-pointer z-10 hover:text-[#808080]">
                        <i
                            class="fa-solid fa-xmark"
                            onClick={() => {
                                handleClose();
                            }}
                        ></i>
                    </div>
                    {/* Layout */}
                    {(layout === 1 && <SignIn />) || (layout === 2 && <SignUp />)}
                </div>
            </div>
        </div>
    );
}

export default SignInLayout;
