'use strict';

const API_KEY='cb1251770bbe7c937c20a5cd9174730c';
const request = require('request');
const YAML = require('yamljs');
const async = require('async');
const fs = require('fs');

const movies = YAML.parse(fs.readFileSync('./source/_data/movies.yaml').toString());
async.eachSeries(movies.movies_2016, (movie, next) => {
  if (movie.poster && movie.imdb) {
    console.log(`Skipping ${movie.title}`);
    return next();
  }

  const updateMovie = (err, result) => {
    if (err) {
      console.log(err.status_message);
      return next();
    }
    if (!result.poster_path) {
      console.log(result);
    }
    movie.poster = 'https://image.tmdb.org/t/p/w300_and_h450_bestv2' + result.poster_path;
    movie.id = result.id;
    movie.imdb = result.imdb_id;
    next();
  };

  if (movie.id) {
    getMovieFromId(movie.id, updateMovie);
  } else {
    getMovieFromName(movie.title, updateMovie);
  }
}, (err) => {
  if (err) {
    throw err;
  }
  fs.writeFileSync('./source/_data/movies.yaml', YAML.stringify(movies));
});

function getMovieFromName(name, callback) {
  request(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${name}`, (err, res, body) => {
    if (err) {
      return callback(err);
    }
    const data = JSON.parse(body);
    if (!data.results || data.results.length <= 0) {
      console.log(data);
      return callback(new Error(`No results found for ${name}`));
    }
    return callback(null, data.results[0]);
  });
}

function getMovieFromId(id, callback) {
  request(`https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`, (err, res, body) => {
    if (err) {
      return callback(err);
    }
    const data = JSON.parse(body);
    return callback(null, data);
  });
}
