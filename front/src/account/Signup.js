import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap';
import axios from 'axios';
// import { Link  } from 'react-router-dom';

function Signup(props) {
    const [signupData, setSignupData] = useState({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [postData, setPostData] = useState({});


      const signupHandleClick = async () => {
        try {
          setLoading(true);

        const formData = new FormData();
        formData.append('email', signupData.email);
        formData.append('password', signupData.password);
        formData.append('name', signupData.name);
        formData.append('nickname', signupData.nickname);
          const response = await axios.post("/api/members/register", formData);
          setPostData(response.data);
          console.log(postData, 123)
          console.log(response, 456)
          setLoading(false);
        } catch (error) {
          console.log(signupData)
          console.error("Error posting data:", error);
          setError("데이터 전송에 실패했습니다.");
          setLoading(false);
        }
      };
    
      const signupHandleChange = (event) => {
        const { name, value } = event.target;
        setSignupData({ ...signupData, [name]: value });
      };
    
      if (loading) {
        return <div>Loading...</div>;
      }
    
      if (error) {
        return <div>{error}</div>;
      }

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            height: '100vh',
        }}>
            <h1 style={{ margin: '30px 0px 0px 0px' }}>회원가입 페이지</h1>
            <img src="./assets/cat.png" alt="" style={{ width: '150px', height: '150px', }} />

            <div style={{
                display: 'inline-block',
                width: '200px',
                height: '120px',
                margin: '30px 0px 0px 0px',
            }}>
                <input type="text" placeholder='id' name="email" onChange={signupHandleChange} />
                <input type="text" placeholder='password' style={{ margin: '10px 0px 0px 0px' }} name="password" onChange={signupHandleChange}/>
                <input type="text" placeholder='name' style={{ margin: '10px 0px 0px 0px' }} name="name" onChange={signupHandleChange}/>
                <input type="text" placeholder='nickname' style={{ margin: '10px 0px 0px 0px' }} name="nickname" onChange={signupHandleChange}/>
                <Button as="input" type="button" value="회원가입" style={{ margin: '10px 0px 0px 0px' }} onClick={signupHandleClick} />
            </div>
        </div>
    );
}

export default Signup;
