import axios from 'axios';
import { API_URL } from '@/constants/app';

const Http = axios.create({
  baseURL: API_URL,
});

export default Http;
