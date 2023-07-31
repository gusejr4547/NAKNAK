import React, { useEffect, useState } from 'react';
import axios from "axios";
import { useRecoilState } from "recoil";
import { loginuser } from "../../utils/atoms";

function Following(props) {
    const [userData] = useRecoilState(loginuser);
    const [followingData, setFollowingData] = useState(null);

    useEffect(() => {
        const getFllowing = async () => {
            try {
                const response = await axios.get(`/api/members/follow/${userData.memberId}`);
                setFollowingData(response.data);
            } catch (error) {
                console.error("Error getting data:", error);
            }
        };
        getFllowing();
    }, [userData.memberId]);

    if (!followingData) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <p>팔로잉: {followingData.count}</p>
            {followingData.data.map((item) => (
              <p key={item.nickname}>{}</p>
            ))}
        </div>
    );
}

export default Following;

