import axios from 'axios';

// const KEY = 'xsTRQrs68IYNfCxOJN7e98iJAuHoGV5a';

const instance = axios.create({
  baseURL: 'https://api.apilayer.com/exchangerates_data',
});

export const getBaseRate = async () => {
  const { data } = await instance.get(
    '/latest?base=UAH&symbols=EUR,USD&apikey=xsTRQrs68IYNfCxOJN7e98iJAuHoGV5a'
  );
  return data;
};

export const getMainRate = async (rateFirst, rateSecond) => {
  const { data } = await instance.get(
    `/latest?base=${rateFirst}&symbols=${rateSecond}&apikey=xsTRQrs68IYNfCxOJN7e98iJAuHoGV5a`
  );
  return data;
};
