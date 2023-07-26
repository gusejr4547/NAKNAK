import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap';
import axios from 'axios';

function Login(props) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    // const [postData, setPostData] = useState({});

    const handleLogin = async () => {
        // API 요청을 보낼 URL
        // const apiUrl = 'http://localhost:8080/api/login';
        const apiUrl = '/api/login';
        try {
        // 요청에 보낼 데이터
        const requestData = {
            email: email,
            password: password
        };
        const response = await axios.post(apiUrl, requestData);
        // setPostData(response.data);
        console.log(response.data)
        }catch (error) {
            console.error("Error posting data:", error);
        }
        // // Axios를 사용하여 API 요청 보내기
        // axios.post(apiUrl, requestData, { withCredentials: true })
        //     .then(response => {
        //         // 로그인 성공 시 처리
        //         console.log('로그인 성공:', response.data);
        //         // 로그인 성공 시, 다음 페이지로 이동하거나 필요한 처리를 하세요.
        //     })
        //     .catch(error => {
        //         // 로그인 실패 시 처리
        //         console.error('로그인 실패:', error);
        //         // 로그인 실패 시, 에러 메시지를 사용자에게 보여주거나 필요한 처리를 하세요.
        //     });
    };

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            height: '100vh',
        }}>
            <h1 style={{ margin: '30px 0px 0px 0px' }}>로그인 페이지</h1>
            <img src="./assets/cat.png" alt="" style={{ width: '150px', height: '150px', }} />

            <div style={{
                display: 'inline-block',
                width: '200px',
                height: '120px',
                margin: '30px 0px 0px 0px',
            }}>
                <input type="text" placeholder='id' onChange={(e) => setEmail(e.target.value)} />
                <input type="text" placeholder='password' style={{ margin: '10px 0px 0px 0px' }} onChange={(e) => setPassword(e.target.value)} />
                <Button as="input" type="button" value="로그인" style={{ margin: '10px 0px 0px 0px' }} onClick={handleLogin} />
            </div>

            <div className='border-top' style={{ width: '200px', margin: '10px 0px 0px 0px' }}>
                <img src="./assets/google.PNG" alt="Google 로고" style={{ width: '30px', height: '30px', margin: '10px 10px 0px 0px' }} />
                <img src="./assets/kakao.PNG" alt="Kakao 로고" style={{ width: '30px', height: '30px', margin: '10px 0px 0px 0px' }} />
            </div>
        </div>
    );
}

export default Login;




// const loginHandleClick = async () => {
//     try {
//       setLoading(true);
//       const response = await axios.post("/api/login", loginData);
//       setPostData(response.data);
//       setLoading(false);
//     } catch (error) {
//       console.error("Error posting data:", error);
//       setError("데이터 전송에 실패했습니다.");
//       setLoading(false);
//     }
//   };

//   const loginHandleChange = (event) => {
//     const { name, value } = event.target;
//     setLoginData({ ...loginData, [name]: value });
//   };
//   const [loginData, setLoginData] = useState({});
//   const [postData, setPostData] = useState({});


// {/* <input type="text" name="email" onChange={loginHandleChange} />
// <input type="password" name="password" onChange={loginHandleChange} />
// <button onClick={loginHandleClick}>post</button>


// const loginHandleChange = (event) => {
// const { name, value } = event.target;
// setLoginData({ ...loginData, [name]: value });
// }; */}


// import React, { useState } from 'react';
// import axios from 'axios';

// function Login() {
//   const [loginData, setLoginData] = useState({});
//   const [postData, setPostData] = useState({});
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');

//   const loginHandleClick = async () => {
//     try {
//       setLoading(true);
//       const response = await axios.post('/api/login', loginData);
//       setPostData(response.data);
//       setLoading(false);
//     } catch (error) {
//       console.error('Error posting data:', error);
//       setError('데이터 전송에 실패했습니다.');
//       setLoading(false);
//     }
//   };

//   const loginHandleChange = (event) => {
//     const { name, value } = event.target;
//     setLoginData({ ...loginData, [name]: value });
//   };

//   return (
//     <div>
//       <input
//         type="text"
//         name="email"
//         placeholder="이메일"
//         onChange={loginHandleChange}
//       />
//       <input
//         type="password"
//         name="password"
//         placeholder="비밀번호"
//         onChange={loginHandleChange}
//       />
//       <button onClick={loginHandleClick}>로그인</button>
//       {loading && <p>Loading...</p>}
//       {error && <p>{error}</p>}
//       {postData && <pre>{JSON.stringify(postData, null, 2)}</pre>}
//     </div>
//   );
// }

// export default Login;
