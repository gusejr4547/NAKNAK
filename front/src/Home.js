import React from 'react';

function Home(props) {
    return (
        <div style={{
            backgroundImage:"url(./assets/main.png)",
            backgroundSize: "cover",
            height:"100%",
            // display: 'flex',         // 수직 정렬을 위해 flex 사용
            alignItems: 'center',    // 세로 중앙 정렬
            justifyContent: 'center' // 가로 중앙 정렬
        }}>
			<h3>안녕하세요. 홈 입니다.</h3>
            <div style={{
            display: 'inline',
            // alignItems: 'center',    // 세로 중앙 정렬
            justifyContent: 'center' // 가로 중앙 정렬
        }}>
                <img src="./assets/cl1.png" alt="asd" style={{width:'400px', height:'300px', margin:'100px 0px 0px 20px', }}/>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <svg width="35" height="35" 
                    viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg"
                    style={{ transform: "translateX(80px)" }}>
                            <circle cx="50" cy="50" r="40" fill="yellow" />
                    </svg>
                    <svg width="25" height="25" 
                    viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg"
                    style={{ transform: "translateX(100px)" }}>
                            <circle cx="50" cy="50" r="40" fill="yellow" />
                    </svg>
                    <svg width="15" height="15" 
                    viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg"
                    style={{ transform: "translateX(90px)" }}>
                            <circle cx="50" cy="50" r="40" fill="yellow" />
                    </svg>
                    
                </div>
                {/* <img src="./assets/cat.png" alt="" style={{width:"200px", height:"200",
            position: "fixed",
            bottom: 100,
            right: 100,
            width: 100,
            height: 100,}}/> */}
                <div style={{
                position: "fixed",
                bottom: 50,
                right: 0,
                width: 0,
                height: 0,
                borderTop: "50px solid transparent",
                borderLeft: "50px solid transparent",
                borderRight: "120px solid #FFDF77",
                borderBottom: "120px solid #FFDF77",
                zIndex: 1, // 필요에 따라 조정
             }} >
                <img src="./assets/cat.png" alt="" style={{width:"200px", height:"200px", position: 'absolute', top:'-120px', left:'-70px',}}/>
                    </div>
            </div>
        </div>
    );
}

export default Home;




// import React, { useEffect } from 'react';

// function draw() {
//   var canvas = document.getElementById('canvas');
//   if (canvas.getContext) {
//     var ctx = canvas.getContext('2d');

//     // Quadratic curves example
//     ctx.beginPath();
//     ctx.moveTo(75, 25);
//     ctx.quadraticCurveTo(25, 25, 25, 62.5);
//     ctx.quadraticCurveTo(25, 100, 50, 100);
//     ctx.quadraticCurveTo(50, 120, 30, 125);
//     ctx.quadraticCurveTo(60, 120, 65, 100);
//     ctx.quadraticCurveTo(125, 100, 125, 62.5);
//     ctx.quadraticCurveTo(125, 25, 75, 25);
//     ctx.stroke();
//   }
// }

// function Home(props) {
//   useEffect(() => {
//     draw(); // Call the draw function once the component is mounted
//   }, []);

//   return (
//     <div style={{
//       // display: 'flex',         // 수직 정렬을 위해 flex 사용
//       alignItems: 'center',    // 세로 중앙 정렬
//       justifyContent: 'center' // 가로 중앙 정렬
//     }}>
//       <h3>안녕하세요. 홈 입니다.</h3>

//       {/* Replace the SVG with the canvas element */}
//       <canvas id="canvas" width="360" height="331" style={{ border: '1px solid black' }}></canvas>

//     </div>
//   );
// }

// export default Home;