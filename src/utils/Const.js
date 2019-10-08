export const apiUrl = 'http://reformupdated.marvij.com/';
import {Dimensions} from 'react-native';

var deviceWidth = Dimensions.get('window').width;
var deviceHeight = Dimensions.get('window').height;
export const ADMIN_ERROR = 'ADMIN_ERROR';

export const appTheme = {
  primaryColor: '#0D5677',
  appGradientColor: '#E35025',

  primaryBtn: {
    height: 42,
    alignSelf: 'center',
    justifyContent: 'center',
    backgroundColor: '#0D5677',
    borderRadius: 22,
  },
  primaryBtnText: {
    color: '#fff',
    fontWeight: '500',
    fontSize: 16,
    textAlign: 'center',
  },
  cartBadge: {
    borderRadius: 20,
    height: 20,
    width: 20,
    position: 'absolute',
    left: '30%',
    alignItems: 'center',
    justifyContent: 'center',
    top: -5,
  },
  cartCount: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 10,
    fontWeight: '700',
  },
  txtInp: {
    fontSize: 14,
    width: (deviceWidth * 90) / 100,
    backgroundColor: '#fff',
    padding: 6,
    borderRadius: 4,
    fontWeight: '500',
    marginTop: 10,
    alignSelf: 'center',
    borderColor: '#c3c3c3',
    borderWidth: 1,
  },
  button: {
    marginTop: 15,
    height: 40,
    width: (deviceWidth * 90) / 100,
    alignSelf: 'center',
    justifyContent: 'center',
    backgroundColor: '#0D5677',
    borderRadius: 4,
  },
};
