import express from 'express';
import fetch from 'node-fetch';
import redisMiddleware from './middlewares/redisMiddleware';
import accessControlMiddleware from './middlewares/accessControlMiddleware';

const app = express();

const PORT = process.env.APP_SERVER_PORT;
const BASE_URL = process.env.API_HOST;
const DARKSKY_API_KEY = process.env.DARKSKY_API_KEY;

const fetch_retry = (url, options, n) => fetch(url, options).catch(function(error) {
  if (n === 1) throw error;
  return fetch_retry(url, options, n - 1);
});

const getCountry = (data, countryCode) => {
  let country = {};
  data.forEach(countryData => {
    if (countryData.CountryCode.toLowerCase() === countryCode.toLowerCase()) {
      country = countryData;
    }
  });
  return country;
}

app.use(redisMiddleware);
app.use(accessControlMiddleware);

app.get('/api/weather', (req, res) => {
  const countryCode = req.query.countryCode;
  if (!countryCode) {
    res.status(500).send({error: 'countryCode required.'});
  } else {
    fetch(`${BASE_URL}:${PORT}/api/country-capitals`)
      .then(response => response.json())
      .then(data => getCountry(data, countryCode))
      .then(country => {
        fetch_retry(`https://api.darksky.net/forecast/${DARKSKY_API_KEY}/${country.CapitalLatitude},${country.CapitalLongitude}?lang=es`, {}, 10)
          .then(response => response.json())
          .then(data => res.json({
            countryData: country,
            weather: data
          }))
      })
      .catch(err => res.send(err));
  }
});

app.get('/api/country-capitals', (req, res) => {
  fetch('http://techslides.com/demos/country-capitals.json')
    .then(res => res.json())
    .then(data => {
      return res.status(200).json(data);
    });
});

app.listen(PORT, () => console.log(`Server running at ${BASE_URL}:${PORT}`))
