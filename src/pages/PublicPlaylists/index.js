import { useState, useEffect, useContext } from 'react';
import { Data } from '../../Context';
import { useParams } from 'react-router-dom';

import RowNavbar from '../../components/RowNavbar/RowNavbar';
import Card from '../../components/Card';

function PublicPlaylists() {
    const { playlistId } = useParams();
    const { theme } = useContext(Data);

    const [playlistData, setPlaylistData] = useState();
    const [tracks, setTracks] = useState();

    // Get API data

    const CLIENT_ID = '360b3682710348698d1992386de2dd6a';
    const CLIENT_SECRET = '25a196bf0119450c84e8ed819ebc5f9b';

    // API Access Token
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
                // Get Track
                fetch(`https://api.spotify.com/v1/playlists/${playlistId}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: 'Bearer ' + token,
                    },
                })
                    .then((res) => res.json())
                    .then((data) => {
                        setPlaylistData(data);
                    });
                return token;
            })
            .then((token) => {
                // Get Track
                fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: 'Bearer ' + token,
                    },
                })
                    .then((res) => res.json())
                    .then((data) => {
                        setTracks(data);
                    });
            });
    }, []);

    return (
        <div>
            <RowNavbar />

            {/* Header - Start */}
            <div
                className={`flex justify-start items-stretch bg-gradient-to-b from-[${theme.primary1}] via-[${theme.primary3}] to-[${theme.primary2}] px-[30px] py-[20px] border-b-[1px] border-[rgba(255,255,255,0.8)]`}
            >
                <div className="w-[300px] h-[300px] rounded-[8px] overflow-hidden">
                    <img src={playlistData?.images[0].url} alt="" className="w-full h-full" />
                </div>
                <div className="pl-[30px] ">
                    <div className="text-[30px] font-black ">#Playlist</div>
                    <div className="text-[45px] font-black mt-[10px] overflow-ellipsis">{playlistData?.name}</div>
                    <div className="text-[25px] font-bold flex justify-start items-center">
                        <span>Của {playlistData?.owner.display_name}</span>
                        <i class="fa-solid fa-circle text-[8px] ml-[30px]"></i>
                        <span className="ml-[10px] text-[20px]">
                            {playlistData?.tracks?.items?.filter((song) => song?.track.preview_url !== null).length} bài
                            hát
                        </span>
                    </div>
                    <div className="mt-[10px] text-[18px] overflow-y-clip">{playlistData?.description}</div>
                </div>
            </div>
            {/* Header - End */}

            {/* Content - Start */}
            <div className={`px-[30px] pt-[30px]`}>
                {/* Header */}
                <div className="flex justify-start items-center pb-[20px] border-b-[1px] border-[rgba(255,255,255,0.6)]">
                    {/* Play */}
                    <button className="flex justify-center items-center duration-300 hover:scale-[1.05]">
                        <i
                            class={`fa-solid fa-play text-[25px] w-[50px] h-[50px] bg-[${theme.primary1}] rounded-full flex justify-center items-center`}
                        ></i>
                        <span className="text-[25px] font-semibold pl-[10px]">Phát tất cả</span>
                    </button>
                </div>

                {/* Container - Start */}
                <div>
                    {tracks?.items
                        ?.filter((song) => song?.track.preview_url !== null)
                        .map((data, index) => (
                            <Card
                                key={index}
                                data={{
                                    song: data?.track,
                                    index: index,
                                    likeSong_Btn: true,
                                }}
                                play
                                wFull_h50
                            />
                        ))}
                </div>
                {/* Container - End */}
            </div>
            {/* Content - End */}
        </div>
    );
}

export default PublicPlaylists;
