import React, { useState } from 'react';
import axios from 'axios';
import { useRecoilState} from "recoil";
import { loginuser, token } from "./atoms";
import { Button } from 'react-bootstrap';

function Getfish(props) {
    const [fishData, setFishData] = useState({})
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [accesstoken, setToken] = useRecoilState(token);
    // const [loginUser, setloginuser] = useRecoilState(loginuser);
    // const header = headers: {
    //     Authorization: `Bearer ${accessToken}`, // 인증 헤더에 액세스 토큰 추가
    //   },
    const header = {Authorization: accesstoken}
    // console.log(header)
    // console.log(fishData,123)
    const fishHandleclick = async () => {
        try {
          setLoading(true);
          const response = await axios.post("/api/fishes/catch", fishData, {headers: header});
          setFishData(response.data);
          console.log(fishData,123)
          console.log(response,456)
          setLoading(false);
        } catch (error) {
          console.error("Error posting data:", error);
          setError("데이터 전송에 실패했습니다.");
          setLoading(false);
        }
      };
    
      const fishHandleChange = (event) => {
        const { name, value } = event.target;
        setFishData({ ...fishData, [name]: value });
      };
    

    return (
        <div>
            <h1>어획 등록</h1>
            <input type="text" placeholder='code' name="fishCode" onChange={fishHandleChange} />
            <input type="text" placeholder='size' style={{ margin: '10px 0px 0px 0px' }} name="size" onChange={fishHandleChange}/>
            <Button as="input" type="button" value="등록" style={{ margin: '10px 0px 0px 0px' }} onClick={fishHandleclick} />
            <pre>{JSON.stringify(fishData, null, 2)}</pre>
        </div>
    );
}

export default Getfish;