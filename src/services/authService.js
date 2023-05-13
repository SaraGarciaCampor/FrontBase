import jwtDecode from 'jwt-decode';
import axios from 'axios';


const URI = 'https://jordan-eval-test.apigee.net/txaas-eauth/token';
const qs = require('querystring');

const instance = axios.create();

class AuthService {

  loginWithEmailAndPassword2 = (email, password) => new Promise((resolve, reject) => {
    //aqui podria poner el header que necesito en el axios quizas
    let config = {
      headers: {
        "Authorization": "Basic NGwwODdPS21LN1JHZ1Z6N1NXSkdVaFBYV3llQTZndW06MFdlR2RMdU1NOFlMdHY1Tw==",
        "Content-type": "application/x-www-form-urlencoded"
      }
    }


    let data = {
      grant_type: "password",
      username: email,
      password: password,
      scope: "urn:txaas:manage:users"
    }
    console.log(data)
    instance.post(URI, qs.stringify(data), config).then(response => {
      this.setSession(response.data.access_token, email);
      resolve(email);
    }).catch(err => {
      console.log(err.response);
    });;

  })

  logout = () => {
    this.setSession(null);
  }

  setSession = (accessToken,email) => {
    if (accessToken) {

      localStorage.setItem('email', email);
      localStorage.setItem('accessToken', accessToken);
      instance.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
    } else {
      localStorage.removeItem('accessToken');
      delete instance.defaults.headers.common.Authorization;
    }
  }

}

const authService = new AuthService();

export default authService;
