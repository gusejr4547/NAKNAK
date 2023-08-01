// import React, { useEffect } from 'react';
import axios from 'axios';
// import { useRecoilState } from "recoil";
// import { loginuser, token } from "../../utils/atoms";


const instance = axios.create({
  withCredentials: true,
});

// const [loginData, setloginData] = useRecoilState(loginuser);
// const [accessToken, setAccessToken] = useRecoilState(token);

const authorizedRequest = async (config) => {
  let response;
  try {
    // 클라이언트 사이드 저장소에서 액세스 토큰 가져옴
    const accessToken = localStorage.getItem('key');

    // 액세스 토큰을 이용해 인증 헤더를 설정
    config.headers = {
      // authorization: `Bearer ${accessToken}`
      authorization: accessToken
    };

    // Axios를 이용하여 요청
    response = await instance(config)
    console.log('토큰멀쩡')
    return response

  } catch (err) {
    // 토큰 만료
    if (err.response.status === 401) {
      try {
        // 액세스 토큰 갱신 요청
        const response = await instance.post('/api/reissue', {})

        // 액세스 토큰 업데이트
        console.log("재발급 완료");
        console.log(localStorage.getItem('key'));

        // let token = response.headers.authorization.replace('Bearer ', '');
        let token = response.headers.authorization;

        localStorage.setItem('key', token)
        console.log(localStorage.getItem('key'));

        // 새로운 액세스 토큰으로 원래의 요청을 다시 시도
        config.headers = {
          // authorization: `Bearer ${token}`
          authorization: token
        };
        
        const retryResponse = await instance(config)

        return retryResponse

      } catch (err) {
        console.log('재발급 실패', err);
        throw err
      }

    } else {
      console.log(err)
      throw err
    }
  }
}

export default instance;
export { authorizedRequest };








// import React, { useEffect } from 'react';
// import axios from 'axios';
// import { useRecoilState } from "recoil";
// import { loginuser, token } from "../../utils/atoms";

// const AxiosInterceptor = () => {
//   const [loginData, setloginData] = useRecoilState(loginuser);
//   const [accessToken, setAccessToken] = useRecoilState(token);

//   useEffect(() => {
//     // Axios 인스턴스를 생성
//     const instance = axios.create({
//       baseUrl: '/api',
//       timeout: 1000,
//       withCredentials: true,
//     });

//     // 액세스 토큰을 사용하여 인증된 요청을 만드는 함수
//     const authorizedRequest = async (config) => {
//       try {
//         // 클라이언트 측의 저장소 (localStorage)에서 액세스 토큰을 가져옴
//         // const accessToken = localStorage.getItem('key');
//         // accesstoken

//         // 헤더에 엑세스 토큰 설정
//         config.headers = {
//           // authorization: `Bearer ${accessToken}`
//           authorization: accessToken
//         };

//         // Axios를 사용하여 요청
//         const response = await instance(config);

//         // 응답 객체를 반환
//         return response;
//       } catch (err) {

//         // 만료된 토큰으로 에러
//         if (err.response.status === 401) {
//           // 토큰 새로 고침
//           try {
//             // 토큰을 새로 고치기 위해 재요청
//             const refreshResponse = await instance.post('/reissue', {});

//             // 액세스 토큰을 로컬스토리지나 리코일에 저장
//             const token = refreshResponse.headers.authorization.replace('Bearer ', '');
//             localStorage.setItem('key', token);
//             setAccessToken(token)
//             console.log(token)

//             // 새 토큰으로 헤더 업데이트
//             config.headers = {
//               authorization: `Bearer ${token}`
//             };

//             // 재요청
//             const retryResponse = await instance(config);

//             // 반환
//             return retryResponse;

//           } catch (err) {
//             // 토큰 새로 고침 요청이 실패.
//             console.log('토큰 새로 고침 실패');
//             // 에러를 다시 던져서 호출하는 코드에서 처리
//             throw err;
//           }
//         } else {
//           // 기타 다른 종류의 에러
//           // 에러를 다시 던져서 호출하는 코드에서 처리
//           throw err;
//         }
//       }
//     };

//     const fetchData = async () => {
//       try {
//         // authorizedRequest 함수를 호출 > '/data'에 대한 GET 요청
//         const data = await authorizedRequest({ method: 'get', url: '/data' });

//         console.log(data.headers);

//         // 로그인 데이터와 액세스 토큰을 Recoil 업데이트
//         setloginData(data);
//         setAccessToken(data.headers.authorization.replace('Bearer ', ''));
//       } catch (err) {
//         console.log(err)
//       }
//     };

//     fetchData();
//   }, []);

//   return null
// };

// export default AxiosInterceptor;






// import axios from "axios";
// import Vue from 'vue';
// import Vuex from 'vuex';

// Vue.use(Vuex);

// export default {
//     name: 'AxiosInterceptor',
//     async created() {
//         try {
//             // 1. authorizedRequest 함수를 호출하여 '/data'에 대한 GET 요청을 만듭니다.
//             const data = await authorizedRequest({ method: 'get', url: '/data' });
//             // 2. 응답 헤더를 콘솔에 출력합니다.
//             console.log(data.headers);
//             // 3. 응답 데이터를 반환합니다. (반환된 데이터는 호출하는 코드에서 처리할 수 있습니다.)
//             return data;
//         } catch (error) {
//             // 4. 에러가 발생한 경우, 여기서 처리합니다.
//             // 예를 들어 사용자에게 에러 메시지를 표시하거나 에러 종류에 따라 적절한 조치를 취할 수 있습니다.
//         }
//     }
// }

// // 기본 설정이 적용된 Axios 인스턴스를 생성합니다.
// const instance = axios.create({
//     /*headers: {
//         'Content-Type': 'application/json'
//     },*/
//     withCredentials: true,
// });

// // 액세스 토큰을 사용하여 인증된 요청을 만드는 함수입니다.
// export const authorizedRequest = async (config) => {
//     let response;
//     try {
//         // 클라이언트 측의 저장소 (localStorage)에서 액세스 토큰을 가져옵니다.
//         const accessToken = window.localStorage.getItem('access-token');

//         // 인증 헤더에 액세스 토큰을 설정합니다.
//         config.headers = {
//             authorization: `Bearer ${accessToken}`
//         };

//         // Axios를 사용하여 요청을 보냅니다. 제공된 구성(config)을 사용합니다.
//         response = await instance(config);

//         // 5. 응답 객체를 반환합니다. 응답은 데이터, 헤더, 상태 등의 정보를 포함합니다.
//         return response;
//     } catch (error) {
//         // 6. 요청을 보내는 도중 에러가 발생한 경우, 여기서 처리합니다.

//         // 에러가 만료된 토큰으로 인한 것인지 확인합니다 (HTTP 상태 코드 401 - 인증 실패).
//         if (error.response.status === 401) {
//             // 7. 토큰이 만료된 경우, 토큰을 새로 고침(refresh)합니다.

//             // 클라이언트 측의 저장소 (localStorage)에서 리프레시 토큰을 가져옵니다.
//             // eslint-disable-next-line no-useless-catch
//             try {
//                 // 토큰을 새로 고치기 위해 다시 요청을 보냅니다.
//                 const response = await instance.post('/api/reissue', {});

//                 // 액세스 토큰을 클라이언트 측의 저장소 (localStorage)에 업데이트합니다.
//                 console.log("토큰 재발급");
//                 console.log(window.localStorage.getItem('access-token'));

//                 let token = response.headers.get("Authorization").replace('Bearer ', '');

//                 window.localStorage.setItem('access-token', token);
//                 console.log(window.localStorage.getItem('access-token'));

//                 // 새로 고친 토큰을 이용하여 원래의 요청을 다시 시도합니다.

//                 // 새로운 토큰으로 인증 헤더를 업데이트합니다.
//                 config.headers = {
//                     authorization: `Bearer ${token}`
//                 };

//                 // 업데이트된 구성으로 다시 요청을 보냅니다.
//                 const retryResponse = await instance(config);

//                 // 8. 데이터, 헤더, 상태 등을 포함한 응답 객체를 반환합니다.
//                 return retryResponse;
//             } catch (error) {
//                 // 9. 토큰 새로 고침 요청이 실패한 경우, 에러를 처리합니다.

//                 // 예를 들어, 에러를 로그에 기록하고 사용자 데이터를 지우고 로그아웃 메시지를 표시합니다.
//                 console.log('토큰 새로 고침 실패');
//                 // Vuex 스토어가 있다고 가정하고, 'logout' 뮤테이션을 호출하여 사용자 데이터를 초기화합니다.
//                 this.$store.commit('logout');
//                 // localStorage에 저장된 모든 데이터를 지웁니다.
//                 window.localStorage.clear();
//                 // 에러를 다시 던져서 호출하는 코드에서 처리하도록 합니다.
//                 throw error;
//             }
//         } else {
//             // 10. 기타 다른 종류의 에러를 처리합니다.

//             // 예를 들어, 에러를 로그에 기록하고 다시 던져서 호출하는 코드에서 처리하도록 합니다.
//             throw error;
//         }
//     }
// }
