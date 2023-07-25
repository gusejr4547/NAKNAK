import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap';

function Login(props) {
    return (
        <div style={{
            display: 'flex',         // 수직 정렬을 위해 flex 사용
            flexDirection: 'column', // 수직 정렬을 위해 요소들을 column 방향으로 배치
            alignItems: 'center',    // 세로 중앙 정렬
            height: '100vh',         // 화면 전체 높이에 맞게 정렬하기 위해 추가
            // justifyContent: 'center' // 가로 중앙 정렬
        }}>
            <h1 style={{margin: '30px 0px 0px 0px',}}>로그인 페이지</h1>
            <img src="./assets/cat.png" alt="" style={{width:'150px', height:'150px',}} />
            <div style={{
              display:'inline-block',
              width:'200px',
              height:'120px',
              margin: '30px 0px 0px 0px',
             }}>
            <input type="text" placeholder='id'/>
            <input type="text" placeholder='password' style={{margin:'10px 0px 0px 0px',}}/>
            <Button as="input" type="button" value="로그인" style={{margin:'10px 0px 0px 0px',}}/>{''}
            </div>
            <div className='border-top' style={{width:'200px', margin:'10px 0px 0px 0px',}}>
             <img src="./assets/google.PNG" alt="Google 로고" style={{width:'30px', height:'30px', margin:'10px 10px 0px 0px',}} />
             <img src="./assets/kakao.PNG" alt="Kakao 로고" style={{width:'30px', height:'30px', margin:'10px 0px 0px 0px',}}/>
            </div>
        </div>
    );
}

export default Login;