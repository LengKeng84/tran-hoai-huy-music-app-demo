import { Data } from '../../Context';
import { useContext, useState } from 'react';

function OnTopBtn() {
    const { theme } = useContext(Data);
    const [hiddenBtn, setHiddenBtn] = useState(true);

    const hiddenBtnHandler = () => {
        if (window.scrollY > 0) {
            setHiddenBtn(false);
        } else {
            setHiddenBtn(true);
        }
    };

    window.addEventListener('scroll', hiddenBtnHandler);

    return (
        <button
            onClick={() => {
                window.scrollTo(0, 0);
            }}
            className={`${
                hiddenBtn ? 'bottom-[80%] opacity-0' : 'bottom-[20px] opacity-100'
            } z-[1000] fixed  right-[20px] w-[50px] h-[50px] bg-[${
                theme.primary3
            }] rounded-full border-[3px] border-[#484848] duration-300`}
        >
            <i class="fa-solid fa-angles-up text-[18px] text-[#000000]"></i>
        </button>
    );
}

export default OnTopBtn;
