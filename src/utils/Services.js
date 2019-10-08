import axios from 'axios';
import {apiUrl} from './Const';
import {appStore} from '../../App';

function buildDataRequest(inpobj) {
  var reqData = '';
  for (var prop in inpobj) {
    reqData = reqData + '&' + prop + '=' + inpobj[prop];
  }
  return reqData.substr(1);
}

function getHeaders() {
  return {'Content-Type': 'application/x-www-form-urlencoded'};
}

function getSecuredHeaders() {
  return {'Content-Type': 'application/x-www-form-urlencoded'};
}

export function callService(inpobj, uri, secured = false) {
  let svcHeaders = secured ? getSecuredHeaders() : getHeaders();
  return new Promise((resolve, reject) => {
    let axiosInp = {
      method: 'post',
      url: apiUrl + uri,
      data: buildDataRequest(inpobj),
      config: {headers: svcHeaders},
    };
    console.log(axiosInp);
    axios(axiosInp)
      .then(resp => {
        //handle success
        console.log(resp);
        resolve(resp.data);
      })
      .catch(error => {
        console.log(error);
        //handle error
        reject(error);
      });
  });
}
