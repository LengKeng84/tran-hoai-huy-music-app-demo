import { useEffect, useState } from 'react';

import { useContext } from 'react';
import { Data } from '../../Context';

function Searcher({ callback }) {
    const { theme } = useContext(Data);

    const [searchResult, setSearchResult] = useState('');

    const [data, setData] = useState();

    // Get Token
    const CLIENT_ID = '360b3682710348698d1992386de2dd6a';
    const CLIENT_SECRET = '25a196bf0119450c84e8ed819ebc5f9b';
    const [token, setToken] = useState();
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
            .then((data) => setToken(data.access_token));
    }, []);

    useEffect(() => {
        fetch('https://api.spotify.com/v1/search?q=' + searchResult + '&type=track,artist,album,playlist', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token,
            },
        })
            .then((res) => res.json())
            .then((data) => setData(data))
            .then(() => callback(data));
    }, [searchResult]);

    return (
        <div className="w-[700px] h-[40px] relative flex justify-start items-center">
            {/* <audio autoPlay controls>
                <source src="spotify:track:09mEdoA6zrmBPgTEN5qXmN" />
            </audio> */}
            {/* Logo search */}
            <div className="absolute left-[15px] top-[50%] translate-y-[-50%] text-[25px]">
                <i class="fa-brands fa-searchengin"></i>
            </div>
            {/* Clear Btn */}
            {searchResult.length > 0 && (
                <div
                    className="absolute left-[370px] top-[50%] translate-y-[-50%] text-[20px] cursor-pointer "
                    onClick={() => setSearchResult('')}
                >
                    <i class="fa-solid fa-xmark"></i>
                </div>
            )}
            {/* Input */}
            <input
                autoFocus
                className={`inputSearch bg-[${theme.primary2}] w-[400px] h-full rounded-full px-[50px] text-[14px] text-[${theme.coText1}] font-semibold placeholder:text-[#959595]`}
                placeholder="Nhập tên bài hát, nghệ sĩ"
                value={searchResult}
                onChange={(e) => setSearchResult(e.target.value)}
            />
        </div>
    );
}

export default Searcher;
