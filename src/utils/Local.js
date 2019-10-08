import LocalizedStrings from 'react-native-localization';
let Local = new LocalizedStrings({
  English: {
    home: 'Home',
    categories: 'Categories',
    deals: 'Deals',
    profile: 'Profile',
  },
  Telugu: {
    home: 'హోమ్',
    categories: 'కేటగిరీలు',
    deals: 'డీల్స్',
    profile: 'ప్రొఫైల్',
  },
});

export const LocalWithParams = (key, ...params) => {
  let localizedKey = Local[key];
  if (params && params.length > 0) {
    params.forEach((param, index) => {
      localizedKey = localizedKey.replace('{' + index + '}', param);
    });
  }
  return localizedKey;
};

export default Local;
