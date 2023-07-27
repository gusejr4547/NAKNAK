import React, { useState, useEffect  } from 'react';
import axios from 'axios';
import { useRecoilState} from "recoil";
import { loginuser } from "../atoms";

function Dogam(props) {
    const [dogamData, setDogamData] = useState({})
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [loginUser, setloginuser] = useRecoilState(loginuser);

    useEffect(() => {
        const getDogam = async () => {
            try {
            setLoading(true);
            const response = await axios.get("/api/books/1");
            setDogamData(response.data);
            console.log(dogamData,123)
            console.log(response.data,456)
            setLoading(false);
            } catch (error) {
            console.error("Error posting data:", error);
            setError("데이터 전송에 실패했습니다.");
            setLoading(false);
            }
            };
            getDogam();
            }, [])

    return (
        <div>
            <h1>의 도감입니다</h1>
            {/* <input type="submit" value="도감" onClick={getDogam} /> */}
            {dogamData.fishCheck?.all.map(fish => (
            <div key={fish.fishId}>
                <img src={fish.imgUrl} alt={fish.imgUrl} width='200' height='200'/>
                <p>{fish.name}</p>
            </div>
            ))}
        </div>
    );
}

export default Dogam;