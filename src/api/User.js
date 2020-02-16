import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://cc83189a.ngrok.io'
});

export default instance;