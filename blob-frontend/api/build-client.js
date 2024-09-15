import axios from 'axios';
import baseUrl  from './base-url'
export default ({ req }) => {
  if (typeof window === 'undefined') {
    // We are on the server

    return axios.create({
      baseURL: baseUrl,
      headers: req.headers,
    });
  } else {
    // We must be on the browser
    return axios.create({
      baseUrl: baseUrl,
    });
  }
  
};