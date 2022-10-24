import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import Card from '../../components/Card';
import RowNavbar from '../../components/RowNavbar/RowNavbar';

function AnotherChoise() {
    const { categoriesId } = useParams();
    const [categoriesData, setCategoriesData] = useState();
    const [playlists, setPlaylists] = useState();

    const CLIENT_ID = '360b3682710348698d1992386de2dd6a';
    const CLIENT_SECRET = '25a196bf0119450c84e8ed819ebc5f9b';

    useEffect(() => {
        // API Access Token

        fetch('https://accounts.spotify.com/api/token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                Authorization: 'Basic ' + btoa(CLIENT_ID + ':' + CLIENT_SECRET),
            },
            body: 'grant_type=client_credentials',
        })
            .then((res) => res.json())
            .then((data) => data.access_token)
            .then((token) => {
                fetch(`https://api.spotify.com/v1/browse/categories/${categoriesId}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: 'Bearer ' + token,
                    },
                })
                    .then((res) => res.json())
                    .then((data) => setCategoriesData(data));
                return token;
            })
            .then((token) => {
                fetch(`https://api.spotify.com/v1/browse/categories/${categoriesId}/playlists`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: 'Bearer ' + token,
                    },
                })
                    .then((res) => res.json())
                    .then((data) => setPlaylists(data));
            });
    }, []);

    return (
        <div className="px-[20px] py-[30px]">
            <RowNavbar />

            {/* Header - Start */}
            <div className="flex justify-start items-center">
                <div className="w-[100px] h-[100px] rounded-full overflow-hidden">
                    <img src={categoriesData?.icons[0]?.url} alt="" className="w-full h-full" />
                </div>
                <div className="text-[30px] font-black pl-[20px]">{categoriesData?.name}</div>
            </div>
            {/* Header - End */}

            {/* Container - Start */}

            <div className="mt-[50px]">
                <div className="text-[25px] font-black">Các lựa chọn dành cho bạn</div>
                <div className="flex justify-start flex-wrap gap-x-[15px] gap-y-[20px] mt-[20px]">
                    {playlists?.playlists?.items.map((data, index) => (
                        <Link to={`/public_playlists/${data?.id}`}>
                            <Card key={index} data={data} w380_h150_display />
                        </Link>
                    ))}
                </div>
            </div>
            {/* Container - End */}
        </div>
    );
}

export default AnotherChoise;
