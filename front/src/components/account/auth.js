import React, { useEffect } from 'react';
import axios from 'axios';
import { useRecoilState } from "recoil";
import { loginuser, token } from "../../utils/atoms";



const [loginData, setloginData] = useRecoilState(loginuser);
  const [accesstoken, setAccessToken] = useRecoilState(token);

const AxiosInterceptor = () => {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await authorizedRequest({ method: 'get', url: '/data' });
        console.log(res.headers);
        // Handle the response data here
      } catch (err) {
        console.log(err)
      }
    };

    fetchData();
  }, []);

  const authorizedRequest = async (config) => {
    try {
      // Get the access token from your client-side storage
      const accessToken = localStorage.getItem('access-token');

      // Set the authorization header with the access token
      config.headers = {
        authorization: `Bearer ${accessToken}`,
      };

      // Send the request using fetch API
      const response = await fetch(config.url, {
        method: config.method,
        headers: config.headers,
        credentials: 'include', // equivalent to withCredentials: true in Axios
      });

      if (!response.ok) {
        throw new Error('Request failed');
      }

      // Convert the response to JSON format
      const data = await response.json();

      return data;
    } catch (error) {
      // Check if the error was caused by an expired token
      if (error.response && error.response.status === 401) {
        try {
          // Send the reissue request to refresh the access token
          const reissueResponse = await axios.post('/api/reissue', {});

          // Update the access token in your client-side storage
          console.log('reissued');
          console.log(localStorage.getItem('access-token'));

          const token = reissueResponse.data.replace('Bearer ', '');
          localStorage.setItem('access-token', token);
          console.log(localStorage.getItem('access-token'));

          // Retry the original request with the new access token
          config.headers = {
            authorization: `Bearer ${token}`,
          };
          const retryResponse = await fetch(config.url, {
            method: config.method,
            headers: config.headers,
            credentials: 'include',
          });

          if (!retryResponse.ok) {
            throw new Error('Request failed');
          }

          // Convert the response to JSON format
          const data = await retryResponse.json();

          return data;
        } catch (error) {
          // Handle the reissue request error
          console.log('Failed to reissue token');
          // Implement your own logic for handling the logout and clearing local storage
          // this.$store.commit('logout');
          // window.localStorage.clear();
          throw error;
        }
      } else {
        // Handle other types of errors
        throw error;
      }
    }
  };

  return <div>AxiosInterceptor Component</div>;
};

export default AxiosInterceptor;







import axios from "axios";

import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default {
    name: 'AxiosInterceptor',
    async created() {
        try {
            const data = await authorizedRequest({method: 'get', url: '/data'})
            console.log(data.headers)
            return data;
            // Handle the response data here
        } catch (error) {
            // Handle the error here
        }
    }
}


const instance = axios.create({
    /*headers: {
        'Content-Type': 'application/json'
    },*/
    withCredentials: true,
})

export const authorizedRequest = async (config) => {
    let response;
    try {
        // Get the access token from your client-side storage
        const accessToken = window.localStorage.getItem('access-token');

        // Set the authorization header with the access token
        config.headers = {
            authorization: `Bearer ${accessToken}`
        };

        // Send the request using Axios
        response = await instance(config)

        return response
    } catch (error) {
        //console.log(error);
        // Check if the error was caused by an expired token
        if (error.response.status === 401) {
            // Get the refresh token from your client-side storage
            // eslint-disable-next-line no-useless-catch
            try {
                // Send the reissue request to refresh the access token
                const response = await instance.post('/api/reissue', {})

                // Update the access token in your client-side storage
                console.log("reissued");
                console.log(window.localStorage.getItem('access-token'));

                let token = response.headers.get("Authorization").replace('Bearer ', '');

                window.localStorage.setItem('access-token', token)
                console.log(window.localStorage.getItem('access-token'));

                // Retry the original request with the new access token
                config.headers = {
                    authorization: `Bearer ${token}`
                };
                const retryResponse = await instance(config)

                return retryResponse
            } catch (error) {
                // Handle the reissue request error
                console.log('실패한 토큰');
                this.$store.commit('logout');
                window.localStorage.clear();
                throw error
            }
        } else {
            // Handle other types of errors
            throw error
        }
    }
}