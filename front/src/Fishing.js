import React from 'react';


function Fishing(props) {
    return (
        <div style={{
            display: 'inline',         // 수직 정렬을 위해 flex 사용
            alignItems: 'center',    // 세로 중앙 정렬
            justifyContent: 'center' // 가로 중앙 정렬
        }}>
            <h1>피싱모드입니다</h1>
            <div
            style={{
                width: '200px',
                height: '200px',
                borderRadius: '50%',
                background: 'blue'
            }}></div>
        </div>
    );
}

export default Fishing;