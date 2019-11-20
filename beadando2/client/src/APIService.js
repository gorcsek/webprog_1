import axios from 'axios';
const API_URL = 'http://localhost:4000';
import { EventBus } from './event-bus.js';



var token = localStorage.getItem('token');
var http = axios.create({
  baseURL: API_URL,
  timeout: 3000,
  headers:{
    "Content-Type": 'application/json',
    "Authorization": token,
  },
});
EventBus.$on('login', function(val){
  token = localStorage.getItem('token');
  http = axios.create({
  baseURL: API_URL,
  timeout: 3000,
  headers:{
    "Content-Type": 'application/json',
    "Authorization": token,
  },
});
}.bind(this))



export class APIService{
  
  constructor(){

  }

  getMoneyList() {
    const url = `${API_URL}/api/money/`;
    return http.get(url).then(response => response.data);
  }

  getMoney(_id) {
    const url = `${API_URL}/api/money/${_id}`;
    return axios.get(url).then(response => response.data);
  }

  deleteMoney(money){
    const url = `${API_URL}/api/money/${money._id}`;
    return axios.delete(url);
  }

  createMoney(money){
    const url = `${API_URL}/api/money/create`;
    return axios.post(url,money);
  }

  updateMoney(money){
    const url = `${API_URL}/api/money/${money._id}`;
    return axios.put(url,money);
  }

  login(user){
    const url = `${API_URL}/api/login`;
    return axios.post(url,user);
  }

  logout(user){
    const url = `${API_URL}/api/logout`;
    return axios.post(url,user);
  }
}
