import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useContext } from 'react';
import { Data } from '../../Context';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import RowNavbar from '../../components/RowNavbar/RowNavbar';
import Card from '../../components/Card';

function Artists() {
    const { artistsFollow, setArtistsFollow } = useContext(Data);
    const { artistsId } = useParams();

    const [showAllRelatedArts, setShowAllRelatedArts] = useState(5);
    const [artistData, setArtistData] = useState();
    const [artistAlbum, setArtistsAlbum] = useState();
    const [relatedArtists, setRelatedArtists] = useState();

    // Handler Artists Follow
    const addArtistFollow = (dataArtistFollow) => {
        setArtistsFollow((prev) => [...prev, dataArtistFollow]);
    };
    const removeArtistFollow = (artistId) => {
        let newList = artistsFollow.filter((item) => {
            return item.id !== artistId;
        });
        setArtistsFollow([...newList]);
    };
    localStorage.setItem('artistsFollow', JSON.stringify(artistsFollow));

    const CLIENT_ID = '360b3682710348698d1992386de2dd6a';
    const CLIENT_SECRET = '25a196bf0119450c84e8ed819ebc5f9b';

    useEffect(() => {
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
                fetch(`https://api.spotify.com/v1/artists/${artistsId}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: 'Bearer ' + token,
                    },
                })
                    .then((res) => res.json())
                    .then((data) => setArtistData(data));
                return token;
            })
            .then((token) => {
                fetch(`https://api.spotify.com/v1/artists/${artistsId}/albums`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: 'Bearer ' + token,
                    },
                })
                    .then((res) => res.json())
                    .then((data) => setArtistsAlbum(data));
                return token;
            })
            .then((token) => {
                fetch(`https://api.spotify.com/v1/artists/${artistsId}/related-artists`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: 'Bearer ' + token,
                    },
                })
                    .then((res) => res.json())
                    .then((data) => setRelatedArtists(data));
            });
    }, [artistsId]);

    // Toastify
    const Toastify = (title) => {
        toast.success(title, {
            position: 'top-right',
            autoClose: 2000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'colored',
        });
    };

    return (
        <div className="px-[30px]">
            <RowNavbar />
            <ToastContainer
                position="top-right"
                autoClose={2000}
                hideProgressBar
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
            />
            {/* Header - Start */}
            <div className="mt-[20px] pb-[20px] border-b-[1px] border-[rgba(255,255,255,0.8)] flex justify-start items-stretch">
                {/* Artist Img */}
                <div className="w-[300px] h-[300px] rounded-[8px] overflow-hidden">
                    <img src={artistData?.images[0].url} alt="" className="w-full h-full" />
                </div>

                {/* Artist Info */}
                <div className="ml-[50px]">
                    <div className="text-[30px] font-black">#Nghệ sĩ</div>
                    {/* Name Artist */}
                    <div className="text-[50px] font-black mt-[20px]">{artistData?.name}</div>

                    {/* followers */}
                    <div>
                        <span className="text-[18px] font-bold">{artistData?.followers?.total}</span>{' '}
                        <span className="text-[16px] font-bold">lượt theo dõi</span>
                    </div>

                    <div className="mt-[20px]">
                        {artistsFollow.map((data) => data?.id).includes(artistData?.id) === false ? (
                            <button
                                onClick={() => {
                                    addArtistFollow(artistData);
                                    Toastify(`Đã lưu vào Danh sách theo dõi!`);
                                }}
                                className={`px-[30px] py-[5px] border-[3px] border-[#6b6b6b] rounded-[5px] text-[16px] font-semibold hover:border-[#fff]`}
                            >
                                Theo dõi
                            </button>
                        ) : (
                            <button
                                onClick={() => {
                                    removeArtistFollow(artistData?.id);
                                    Toastify(`Đã xoá khỏi Danh sách theo dõi!`);
                                }}
                                className={`px-[30px] py-[5px] border-[3px] border-[#6b6b6b] rounded-[5px] text-[16px] font-semibold hover:border-[#fff]`}
                            >
                                Bỏ theo dõi
                            </button>
                        )}
                    </div>
                </div>
            </div>
            {/* Header - End */}

            {/* Content - Start*/}
            {/* Album */}
            <div className="mt-[30px]">
                <div className="text-[25px] font-bold">Danh sách Album </div>
                <div className="mt-[20px] grid grid-cols-5 gap-x-[10px] gap-y-[50px]">
                    {artistAlbum?.items?.map((data, index) => (
                        <Link to={`/album/${data.id}`}>
                            <Card key={index} data={data} albumDisplay releaseDate />
                        </Link>
                    ))}
                </div>
            </div>

            {/* Nghệ sĩ liên quan */}
            <div className="mt-[70px] pt-[20px] border-t-[1px] border-[#cecece]">
                <div className="text-[25px] font-bold">Nghệ sĩ liên quan</div>
                <div className="mt-[20px] grid grid-cols-5 gap-x-[10px] gap-y-[50px]">
                    {relatedArtists?.artists?.slice(0, showAllRelatedArts).map((data, index) => (
                        <Link to={`/artists/${data?.id}`}>
                            <Card key={index} data={data} artistsDisplay w220_h300 />
                        </Link>
                    ))}
                </div>
                <div className="text-[18px] font-semibold text-right mt-[10px]  ">
                    {showAllRelatedArts === 5 ? (
                        <span onClick={() => setShowAllRelatedArts(20)} className="hover:underline cursor-pointer">
                            Xem tất cả
                        </span>
                    ) : (
                        <span onClick={() => setShowAllRelatedArts(5)} className="hover:underline cursor-pointer">
                            Ẩn bớt
                        </span>
                    )}
                </div>
            </div>
            {/* Content - End*/}
        </div>
    );
}

export default Artists;
