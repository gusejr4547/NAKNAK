import React from 'react';

function Home(props) {
    return (
        <div style={{
            display: 'flex',         // 수직 정렬을 위해 flex 사용
            alignItems: 'center',    // 세로 중앙 정렬
            justifyContent: 'center' // 가로 중앙 정렬
        }}>
			<h3>안녕하세요. 메인페이지 입니다.</h3>

		</div>
    );
}

export default Home;