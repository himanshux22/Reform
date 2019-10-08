import AsyncStorage from '@react-native-community/async-storage';
import {appStore} from '../../App';

export function setUserData(inpobj, objname) {
  AsyncStorage.getItem(objname).then(obj => {
    if (obj) {
      obj = JSON.parse(obj);
      for (let [key, value] of Object.entries(inpobj)) {
        obj[key] = value;
      }
      AsyncStorage.setItem(objname, JSON.stringify(obj));
    } else {
      let a = new Object();
      for (let [key, value] of Object.entries(inpobj)) {
        a[key] = value;
      }
      AsyncStorage.setItem(objname, JSON.stringify(a));
    }
  });
}

export function getItemQuan(prdid, prditid) {
  console.log(prdid + '   ' + prditid);
  let cartList = appStore.getState().cartList;
  console.log(cartList);
  if (cartList.length == 0) {
    return 0;
  } else {
    let a = cartList.filter(it => it.prdid == prdid && it.prditid == prditid);
    console.log(a);
    if (a.length > 0) return a[0].prdquan;
    else return 0;
  }
}
