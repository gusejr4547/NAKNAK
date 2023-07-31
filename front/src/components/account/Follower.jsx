import React, { useEffect, useState } from 'react';
import axios from "axios";
import { useRecoilState } from "recoil";
import { loginuser } from "../../utils/atoms";

function Follower(props) {
    const [userData] = useRecoilState(loginuser);
    const [followerData, setFollowerData] = useState(null);

    useEffect(() => {
        const getFllowing = async () => {
            try {
                const response = await axios.get(`api/members/following/${userData.memberId}`);
                setFollowerData(response.data);
            } catch (error) {
                console.error("Error getting data:", error);
            }
        };
        getFllowing();
    }, [userData.memberId]);

    if (!followerData) {
        return <div>Loading...</div>;
    }

    return (
        <div> 
            <p>팔로잉: {followerData.count}</p>
            {followerData.data.map((item) => (
              <p key={item.nickname}>{}</p>
            ))}
        </div>
    );
}

export default Follower;

