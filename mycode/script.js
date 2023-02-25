'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

const renderCountry = function (data, className = '') {
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

  countriesContainer.style.opacity = 1; //put into finally method
};

const renderError = function (msg) {
  countriesContainer.insertAdjacentText('beforeend', msg);
  countriesContainer.style.opacity = 1; //to see the container
  //put into finally method
};

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
*/
/*
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
//const request = fetch(`https://restcountries.com/v2/name/portugal`);
//console.log(request);
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
//const getCountryData = function (country) {
//  fetch(`https://restcountries.com/v2/name/${country}`)
//    .then(function (response) {
//      console.log(response);
//      //use json method on response(resolved value)
//      return response.json(); //new promise
//    })
//    .then(function (data) {
//      console.log(data);
//      renderCountry(data[0]);
//    });
//};
/*
//easier to read/understand/work with = less bugs
const getCountryData = function (country) {
  fetch(`https://restcountries.com/v2/name/${country}`)
    .then(response => response.json())
    .then(data => renderCountry(data[0]));
};

getCountryData('portugal');


//////////////////////////////////////////////////////////////
//CHAINING PROMISES (flat chain of promises)

const getCountryData = function (country) {
  //Country 1
  fetch(`https://restcountries.com/v2/name/${country}`)
    .then(response => response.json())
    .then(data => {
      renderCountry(data[0]);
      //use optional chaining to account for countries with no borders property
      const neighbour = data[0].borders?.[0];
      //Country 2
      //return promise from fetch & continue then chain outside
      return fetch(`https://restcountries.com/v2/alpha/${neighbour}`);
    })
    .then(response => response.json())
    .then(data => renderCountry(data, 'neighbour'));
};

//getCountryData('portugal');
getCountryData('germany');


/////////////////////////////////////////////////////////////
//HANDLING REJECTED PROMISES (ERRORS)

//offline error
const getCountryData = function (country) {
  //Country 1
  fetch(`https://restcountries.com/v2/name/${country}`)
    //pass in a second callback for when the promise is rejected
    .then(
      response => response.json()
      //handle error (catch error)
      //, err => alert(err) //typeError: failed to fetch
    )
    .then(data => {
      renderCountry(data[0]);
      //use optional chaining to account for countries with no borders property
      const neighbour = data[0].borders?.[0];
      //Country 2
      //return promise from fetch & continue then chain outside
      return fetch(`https://restcountries.com/v2/alpha/${neighbour}`);
    })
    .then(
      response => response.json()
      //handle error (catch error)
      //, err => alert(err) //typeError: failed to fetch
    )
    .then(data => renderCountry(data, 'neighbour'))
    //handle all errors no matter where happen in chain: add catch method at end of chain
    //.catch(err => alert(err));//typeError: failed to fetch
    .catch(err => {
      console.error(`${err} 💥💥💥`);
      //any error = JS object = contains message property (only print message)
      renderError(`Something went wrong 💥 ${err.message} 💥. Try again!`);
    })
    //always called (fulfilled or rejected promise)
    .finally(() => {
      countriesContainer.style.opacity = 1;
    });
};

btn.addEventListener('click', function () {
  //getCountryData('portugal');
  getCountryData('germany');
});
*/

////////////////////////////////////////////////////////////////
//THROWING ERRORS MANUALLY

/*
//helper function:
const getJSON = function (url, errorMsg = 'Something went wrong.') {
  return fetch(url).then(response => {
    if (!response.ok) throw new Error(`${errorMsg} (${response.status}).`);

    return response.json();
  });
};
*/
/*
const getCountryData = function (country) {
  //Country 1
  fetch(`https://restcountries.com/v2/name/${country}`)
    //pass in a second callback for when the promise is rejected
    .then(response => {
      console.log(response); //ok:false
      //reject the promise manually:
      if (!response.ok)
        //ok:false
        throw new Error(`Country not found (${response.status}).`);
      //rejected promise (propogates down to the catch method for errors)
      return response.json();
      //handle error (catch error)
      //, err => alert(err) //typeError: failed to fetch
    })
    .then(data => {
      renderCountry(data[0]);
      //use optional chaining to account for countries with no borders property
      ////const neighbour = data[0].borders?.[0];
      const neighbour = 'lsdkj'; //error!!!
      //Something went wrong💥Cannot read properties of undefined(reading '0')💥...
      //400 ERROR

      //Country 2
      //return promise from fetch & continue then chain outside
      return fetch(`https://restcountries.com/v2/alpha/${neighbour}`);
    })
    .then(
      response => {
        //reject the promise manually:
        if (!response.ok)
          //ok:false
          throw new Error(`Country not found (${response.status}).`);
        //rejected promise (propogates down to the catch method for errors)

        response.json();
      }
      //handle error (catch error)
      //, err => alert(err) //typeError: failed to fetch
    )
    .then(data => renderCountry(data, 'neighbour'))
    //handle all errors no matter where happen in chain: add catch method at end of chain
    //.catch(err => alert(err));//typeError: failed to fetch
    .catch(err => {
      console.error(`${err} 💥💥💥`);
      //any error = JS object = contains message property (only print message)
      renderError(`Something went wrong 💥 ${err.message} 💥. Try again!`);
    })
    //always called (fulfilled or rejected promise)
    .finally(() => {
      countriesContainer.style.opacity = 1;
    });
};
*/
/*
const getCountryData = function (country) {
  //Country 1
  getJSON(`https://restcountries.com/v2/name/${country}`, `Country not found`)
    .then(data => {
      renderCountry(data[0]);
      //use optional chaining to account for countries with no borders property
      const neighbour = data[0].borders?.[0];
      //const neighbour = 'lsdkj'; //error!!!
      //Something went wrong💥Cannot read properties of undefined(reading '0')💥...
      //400 ERROR

      //Country 2
      //return promise from fetch & continue then chain outside
      return getJSON(
        `https://restcountries.com/v2/alpha/${neighbour}`,
        `Country not found.`
      );
    })
    .then(data => renderCountry(data, 'neighbour'))
    //handle all errors no matter where happen in chain: add catch method at end of chain
    //.catch(err => alert(err));//typeError: failed to fetch
    .catch(err => {
      console.error(`${err} 💥💥💥`);
      //any error = JS object = contains message property (only print message)
      renderError(`Something went wrong 💥 ${err.message} 💥. Try again!`);
    })
    //always called (fulfilled or rejected promise)
    .finally(() => {
      countriesContainer.style.opacity = 1;
    });
};

btn.addEventListener('click', function () {
  //getCountryData('portugal');
  getCountryData('germany');
});

//error searching for a country that does not exist
////getCountryData('lsdkjf');
//Something went wrong 💥Cannot read properties of undefined(reading 'flag')💥. Try again!
//may not reflect true error (API can not find any country matching this)
//404 ERROR (promise still fulfilled)

//no bordering countries (error: country not found)
//if(!neighbour) throw new Error(`No neighbour found!`);
getCountryData('australia');
*/
/////////////////////////////////////////////////////////////
//CODING CHALLENGE #1

/* 
In this challenge you will build a function 'whereAmI' which renders a country ONLY based on GPS coordinates. For that, you will use a second API to geocode coordinates.

Here are your tasks:

PART 1
1. Create a function 'whereAmI' which takes as inputs a latitude value (lat) and a longitude value (lng) (these are GPS coordinates, examples are below).
2. Do 'reverse geocoding' of the provided coordinates. Reverse geocoding means to convert coordinates to a meaningful location, like a city and country name. Use this API to do reverse geocoding: https://geocode.xyz/api.
The AJAX call will be done to a URL with this format: https://geocode.xyz/52.508,13.381?geoit=json. Use the fetch API and promises to get the data. Do NOT use the getJSON function we created, that is cheating
3. Once you have the data, take a look at it in the console to see all the attributes that you recieved about the provided location. Then, using this data, log a messsage like this to the console: 'You are in Berlin, Germany'
4. Chain a .catch method to the end of the promise chain and log errors to the console
5. This API allows you to make only 3 requests per second. If you reload fast, you will get this error with code 403. This is an error with the request. Remember, fetch() does NOT reject the promise in this case. So create an error to reject the promise yourself, with a meaningful error message.

PART 2
6. Now it's time to use the received data to render a country. So take the relevant attribute from the geocoding API result, and plug it into the countries API that we have been using.
7. Render the country and catch any errors, just like we have done in the last lecture (you can even copy this code, no need to type the same code)

TEST COORDINATES 1: 52.508, 13.381 (Latitude, Longitude)
TEST COORDINATES 2: 19.037, 72.873
TEST COORDINATES 2: -33.933, 18.474

GOOD LUCK!!!
*/
/*
const whereAmI = function (lat, lng) {
  fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`)
    .then(response => {
      if (!response.ok)
        throw new Error(`Problem with geocoding ${response.status}`);
      return response.json();
    })
    .then(data => {
      console.log(data);
      console.log(`You are in ${data.city}, ${data.country}.`);

      return fetch(`https://restcountries.com/v2/name/${data.country}`);
    })
    .then(response => {
      if (!response.ok)
        throw new Error(`Country not found (${response.status})`);

      return response.json();
    })
    .then(data => renderCountry(data[0]))
    .catch(err => console.error(`💥${err.message}💥`))
    .finally(() => {
      countriesContainer.style.opacity = 1;
    });
};

//whereAmI(52.508, 13.381);
//whereAmI(19.037, 72.873);//India (first instance is British Indian...)
whereAmI(-33.933, 18.474);


//////////////////////////////////////////////////////////////
//EVENT LOOP IN PRACTICE
console.log('Test start!');
setTimeout(() => console.log('0 sec timer!'), 0);
//create a promise that is imediately resolved
Promise.resolve('Resolved promise 1').then(res => console.log(res));

Promise.resolve('Resolved promise 2').then(res => {
  //simulate a task that will take a long time
  for (let i = 0; i < 1000000000; i++) {}
  console.log(res);
});

console.log('Test end!');

//code outside any callback will run first:
//Test start!
//Test end!
//next two finish at same time:
//Resolved promise 1 //micro-tasks queue (priority over callback queue)
//Resolved promise 2
//0 sec timer!

//can not do high precision using JS timers


///////////////////////////////////////////////////////////////
//BUILDING A SIMPLE PROMISE
//promise = special object in JS
//use promise constructor
//takes one argument = executor function (takes in resolve & reject)
const lotteryPromise = new Promise(function (resolve, reject) {
  console.log('Lottery draw is happening!');
  setTimeout(function () {
    //contains asynchronous behavior
    //produce result value = future value of promise
    if (Math.random() >= 0.5) {
      //fulfilled promise
      resolve('You WIN!!!');
    } else {
      reject(new Error('You lost your money :('));
    }
  }, 2000);
});

lotteryPromise.then(res => console.log(res)).catch(err => console.error(err));

//in practice, most of the time all we actually do is to consume promises
//usually only build promises to basically wrap old callback based functions into promises
//process called PROMISIFYING:
//convert callback based asynchronous behavior to promise based
//PROMISIFYING SETTIMEOUT
const wait = function (seconds) {
  //executor function: only needs resolve (not able to be rejected)
  return new Promise(function (resolve) {
    setTimeout(resolve, seconds * 1000);
  });
};
//consume promise (with chaining)
wait(2)
  .then(() => {
    console.log('I waited for 2 seconds.');
    return wait(1);
  })
  .then(() => console.log('I waited for 1 second.'));

//callback hell (nested callbacks)
//harder to understand & harder to work with = more bugs
//setTimeout(() => {
//  console.log('1 second passed');
//  setTimeout(() => {
//    console.log('2 second passed');
//    setTimeout(() => {
//      console.log('3 second passed');
//      setTimeout(() => {
//        console.log('4 second passed');
//      }, 1000);
//    }, 1000);
//  }, 1000);
//}, 1000);
//same as:
//without callback hell
//wait(1)
//  .then(() => {
//    console.log('1 second passed');
//    return wait(1);
//  })
//  .then(() => {
//    console.log('2 seconds passed');
//    return wait(1);
//  })
//  .then(() => {
//    console.log('3 seconds passed');
//    return wait(1);
//  })
//  .then(() => console.log('4 seconds passed'));

//way to very easily create a fulfilled or a rejected promise immediately
//pass in resolved value(consume next)
//pass in reject value(catch next)
Promise.resolve('abc').then(x => console.log(x));
Promise.reject(new Error('Problem!')).catch(x => console.error(x));
*/

/*
//////////////////////////////////////////////////////////////
//PROMISIFYING THE GEOLOCATION API

//callback based API
//navigator.geolocation.getCurrentPosition(
//  position => console.log(position),
//  err => console.error(err)
//);
//console.log('Getting position:');

//promisifying
const getPosition = function () {
  return new Promise(function (resolve, reject) {
    //navigator.geolocation.getCurrentPosition(
    //  position => resolve(position),
    //  err => reject(err)
    //);
    //callbacks automatically assigned to resolve & reject
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};
//consuming the promise
//getPosition().then(pos => console.log(pos));

//geocoding
const whereAmI = function (lat, lng) {
  getPosition()
    .then(pos => {
      //console.log(position.coords);//look at how grouped
      const { latitude: lat, longitude: lng } = pos.coords;

      return fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`);
    })
    .then(response => {
      if (!response.ok)
        throw new Error(`Problem with geocoding ${response.status}`);
      return response.json();
    })
    .then(data => {
      console.log(data);
      console.log(`You are in ${data.city}, ${data.country}.`);

      return fetch(`https://restcountries.com/v2/name/${data.country}`);
    })
    .then(response => {
      if (!response.ok)
        throw new Error(`Country not found (${response.status})`);

      return response.json();
    })
    .then(data => renderCountry(data[0]))
    .catch(err => console.error(`💥${err.message}💥`))
    .finally(() => {
      countriesContainer.style.opacity = 1;
    });
};

btn.addEventListener('click', whereAmI);
*/

///////////////////////////////////////////////////////////////
//CODING CHALLENGE #2

/* 
Build the image loading functionality that I just showed you on the screen.

Tasks are not super-descriptive this time, so that you can figure out some stuff on your own. Pretend you're working on your own.

PART 1
1. Create a function 'createImage' which receives imgPath as an input. This function returns a promise which creates a new image (use document.createElement('img')) and sets the .src attribute to the provided image path. When the image is done loading, append it to the DOM element with the 'images' class, and resolve the promise. The fulfilled value should be the image element itself. In case there is an error loading the image ('error' event), reject the promise.

If this part is too tricky for you, just watch the first part of the solution.

PART 2
2. Comsume the promise using .then and also add an error handler;
3. After the image has loaded, pause execution for 2 seconds using the wait function we created earlier;
4. After the 2 seconds have passed, hide the current image (set display to 'none'), and load a second image (HINT: Use the image element returned by the createImage promise to hide the current image. You will need a global variable for that);
5. After the second image has loaded, pause execution for 2 seconds again;
6. After the 2 seconds have passed, hide the current image.

TEST DATA: Images in the img folder. Test the error handler by passing a wrong image path. Set the network speed to 'Fast 3G' in the dev tools Network tab, otherwise images load too fast.

GOOD LUCK!!!
*/

/*
const wait = function (seconds) {
  return new Promise(function (resolve) {
    setTimeout(resolve, seconds * 1000);
  });
};

const imgContainer = document.querySelector('.images');

const createImage = function (imgPath) {
  return new Promise(function (resolve, reject) {
    const img = document.createElement('img');
    img.src = imgPath;

    img.addEventListener('load', function () {
      imgContainer.append(img);
      resolve(img);
    });

    img.addEventListener('error', function () {
      reject(new Error('Image not found!'));
    });
  });
};

let currentImg;

createImage('img/img-1.jpg')
  .then(img => {
    currentImg = img;
    console.log('Image 1 loaded.');
    return wait(2);
  })
  //wait does not have a defined value ()=no specified parameter in then
  .then(() => {
    currentImg.style.display = 'none';
    return createImage('img/img-2.jpg');
  })
  .then(img => {
    currentImg = img;
    console.log('Image 1 loaded.');
    return wait(2);
  })
  .then(() => {
    currentImg.style.display = 'none';
    return createImage('img/img-3.jpg');
  })
  .then(img => {
    currentImg = img;
    console.log('Image 1 loaded.');
    return wait(2);
  })
  .then(() => {
    currentImg.style.display = 'none';
  })
  .catch(err => console.error(err));
*/

///////////////////////////////////////////////////////////
//CONSUMING PROMISES WITH ASYNC/AWAIT

//ASYNC funtion
const whereAmI = async function (country) {
  //fetch(`https://restcountries.com/v2/name/${country}`).then(response =>
  //console.log(response)
  //);

  const response = await fetch(`https://restcountries.com/v2/name/${country}`);
  //returns a promise (await the result of the promise)
  //not blocking the call stack (running asynchronously behind scence)
  //console.log(response); //value assigned to response variable
  const data = await response.json();
  console.log(data);
  renderCountry(data[0]);
};

whereAmI('portugal'); //response logged 2nd
console.log('FIRST!'); //logged first
