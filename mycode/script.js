'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

//////////////////////////////////////////////////////////////
//AJAX CALL: XMLHTTPREQUEST
/*
const getCountryData = function (country) {
  //xml http request (old school)
  const request = new XMLHttpRequest();
  request.open('GET', `https://restcountries.com/v2/name/${country}`);
  request.send();
  //console.log(request.responseText);//nothing

  request.addEventListener('load', function () {
    console.log(this.responseText); //this is JSON

    //destructure [] = get the object
    const [data] = JSON.parse(this.responseText);
    console.log(data);

    //create card
    //convert population to a number +, make it to the million, fix decimal point to 1
    //lang & cur = use first element in array & get the name
    const html = `
  <article class="country">
    <img class="country__img" src="${data.flag}" />
    <div class="country__data">
      <h3 class="country__name">${data.name}</h3>
      <h4 class="country__region">${data.region}</h4>
      <p class="country__row"><span>👫</span>${(
        +data.population / 1000000
      ).toFixed(1)} million people</p>
      <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
      <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
    </div>
  </article>
  `;

    countriesContainer.insertAdjacentHTML('beforeend', html);

    countriesContainer.style.opacity = 1;
  });
};

//appear in different order depending on when data is recieved
getCountryData('portugal');
getCountryData('usa');
//getCountryData('germany');
//getCountryData('china');
//getCountryData('dominica');

///////////////////////////////////////////////////////////////////////
//CALLBACK HELL

const renderCountry = function (data, className = '') {
  //create card
  //convert population to a number +, make it to the million, fix decimal point to 1
  //lang & cur = use first element in array & get the name
  const html = `
  <article class="country ${className}">
    <img class="country__img" src="${data.flag}" />
    <div class="country__data">
      <h3 class="country__name">${data.name}</h3>
      <h4 class="country__region">${data.region}</h4>
      <p class="country__row"><span>👫</span>${(
        +data.population / 1000000
      ).toFixed(1)} million people</p>
      <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
      <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
    </div>
  </article>
  `;

  countriesContainer.insertAdjacentHTML('beforeend', html);

  countriesContainer.style.opacity = 1;
};

//nested callbacks
//turns into callback hell when you have a lot of nested callbacks...
//in order to execute asynchronous tasks in sequence
const getCountryAndNeighbor = function (country) {
  //AJAX call country 1
  const request = new XMLHttpRequest();
  request.open('GET', `https://restcountries.com/v2/name/${country}`);
  request.send();
  //console.log(request.responseText);//nothing

  request.addEventListener('load', function () {
    //console.log(this.responseText); //this is JSON

    //destructure [] = get the object
    const [data] = JSON.parse(this.responseText);
    console.log(data);
    //render country 1
    renderCountry(data);

    //Get neighbor country 2
    const [neighbour] = data.borders;

    if (!neighbour) return;

    //AJAX call country 2
    const request2 = new XMLHttpRequest();
    request2.open('GET', `https://restcountries.com/v2/alpha/${neighbour}`);
    request2.send();

    request2.addEventListener('load', function () {
      //console.log(this.responseText); //JSON
      const data2 = JSON.parse(this.responseText);
      //console.log(data2);

      renderCountry(data2, 'neighbour');
    });
  });
};

//getCountryAndNeighbor('portugal');
getCountryAndNeighbor('usa');

//callback hell (nested callbacks)
//harder to understand & harder to work with = more bugs
setTimeout(() => {
  console.log('1 second passed');
  setTimeout(() => {
    console.log('2 second passed');
    setTimeout(() => {
      console.log('3 second passed');
      setTimeout(() => {
        console.log('4 second passed');
      }, 1000);
    }, 1000);
  }, 1000);
}, 1000);
*/

/////////////////////////////////////////////////////////
//PROMISES AND THE FETCH API

//old way:
//const request = new XMLHttpRequest();
//request.open('GET', `https://restcountries.com/v2/name/${country}`);
//request.send();

//new way:
//fetch can also take in an object {} of options as well
const request = fetch(`https://restcountries.com/v2/name/portugal`);
console.log(request);
//promise stored in request variable
//object used as a placeholder for the future result of an asynchronous operation
//ie a container for a future value (response from AJAX call)
//no longer need to rely on events and callbacks passed into...
//...asynchronous functions to handle asynchronous results
//***Can CHAIN PROMISES for a sequence of asynchronous operations: escaping callback hell
//PROMISES LIFECYCLE:
//PENDING
////before future value is available
//SETTLED (FULFILLED/REJECTED)
////asynchronous task has finished
//////success: value now available
/////error: value not abailable
//CONSUME PROMISE(build promise first with Fetch API)
////when we already have a promise(promise returned from Fetch API)

////////////////////////////////////////////////////////////////
//CONSUMING PROMISES
//use then method on the promise (callback function)
const getCountryData = function (country) {
  fetch(`https://restcountries.com/v2/name/${country}`)
    .then(function (response) {
      console.log(response);
      //use json method on response(resolved value)
      return response.json(); //new promise
    })
    .then(function (data) {
      console.log(data);
    });
};

getCountryData('portugal');
