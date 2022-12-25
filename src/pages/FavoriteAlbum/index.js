import { useContext } from 'react';
import { Data } from '../../Context';
import { Link } from 'react-router-dom';

import Card from '../../components/Card';

function FavoriteAlbum() {
    const { favoriteAlbums } = useContext(Data);

    return (
        <div>
            {/* Display Album */}
            {favoriteAlbums.length > 0 ? (
                <div className="">
                    <div className="text-[25px] font-bold">{favoriteAlbums.length} Album đã lưu</div>
                    <div className="grid grid-cols-5 gap-x-[10px] gap-y-[30px] mt-[20px]">
                        {favoriteAlbums.map((data, index) => (
                            <Link to={`/album/${data.id}`} className="relative group">
                                <Card key={index} data={data} albumDisplay />
                            </Link>
                        ))}
                    </div>
                </div>
            ) : (
                <div className=" text-center mt-[200px]">
                    <div className="text-[40px] font-black">Đưa Album bạn yêu thích vào thư viện </div>
                    <div className="text-[25px] font-black">Bằng cách nhấn vào nút Lưu Album này</div>
                    <div className="">
                        <span class="material-icons-outlined text-[80px]">library_music</span>
                    </div>
                </div>
            )}
        </div>
    );
}

export default FavoriteAlbum;
