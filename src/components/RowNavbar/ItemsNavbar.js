function ItemsNavbar({ title, icon, button = false, event }) {
    return (
        <div
            className={`flex justify-center items-center w-[140px] text-slate-400 font-semibold h-full cursor-pointer duration-300 hover:text-white ${
                button && 'bg-slate-200 h-[40px] rounded-[20px] text-gray-900 hover:text-red-600'
            }`}
            onClick={() => {
                document.querySelector('.signIn').style.display = 'flex';
            }}
        >
            <div className="text-[17px] mr-[10px]">{icon}</div>
            <div className="text-[14px]">{title}</div>
        </div>
    );
}

export default ItemsNavbar;
