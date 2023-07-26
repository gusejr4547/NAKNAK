// axios.defaults.baseURL = 'http://192.168.30.161:8080';
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap';
import axios from 'axios';

function Singup(props) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [nickname, setNickname] = useState('');

    const handleRegister =  async () => {
        // API 요청을 보낼 URL
        // const apiUrl = 'http://192.168.30.161:8080/api/members/register';
        const apiUrl = '/api/members/register';
        // const apiUrl = '/members/register/';
        try {
            // 요청에 보낼 데이터
            const requestData = {
                    email: email,
                    password: password,
                    name: name,
                    nickname: nickname
                };
            const response = await axios.post(apiUrl, requestData);
            // setPostData(response.data);
            console.log(response.data)
            }catch (error) {
                console.error("Error posting data:", error);
            }
        // // 요청에 보낼 데이터
        // const requestData = {
        //     email: email,
        //     password: password,
        //     name: name,
        //     nickname: nickname
        // };

        // // Axios를 사용하여 API 요청 보내기
        // axios.post(apiUrl, requestData, { withCredentials: true })
        //     .then(response => {
        //         // 회원가입 성공 시 처리
        //         console.log('회원가입 성공:', response.data);
        //         // 회원가입 성공 시, 필요한 처리를 하세요.
        //     })
        //     .catch(error => {
        //         // 회원가입 실패 시 처리
        //         console.error('회원가입 실패:', error);
        //         // 회원가입 실패 시, 에러 메시지를 사용자에게 보여주거나 필요한 처리를 하세요.
        //     });
    };

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
                <input type="text" placeholder='id' onChange={(e) => setEmail(e.target.value)} />
                <input type="text" placeholder='password' style={{ margin: '10px 0px 0px 0px' }} onChange={(e) => setPassword(e.target.value)} />
                <input type="text" placeholder='name' style={{ margin: '10px 0px 0px 0px' }} onChange={(e) => setName(e.target.value)} />
                <input type="text" placeholder='nickname' style={{ margin: '10px 0px 0px 0px' }} onChange={(e) => setNickname(e.target.value)} />
                
                <Button as="input" type="button" value="회원가입" style={{ margin: '10px 0px 0px 0px' }} onClick={handleRegister} />
            </div>

        </div>
    );
}

export default Singup;
