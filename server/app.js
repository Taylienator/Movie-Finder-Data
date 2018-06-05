const express = require('express');
const morgan = require('morgan');
const app = express();
const axios = require('axios');
const url = 'http://www.omdbapi.com/?apikey=8730e0e&';

const cache = {};
const encode = encodeURI;

app.use(morgan('dev'));
app.get('/',(req, res)=>{
    let key = '';
    let pMeter='';

if(req.query.hasOwnProperty('i')){  //checks for i in the query string
    key = req.query.i;                 //query string with i is stored into the key variable
    pMeter = 'i=' + encode(key);        //parameter is then concatenated by using'i=' + encode(key)
} else if(req.query.hasOwnProperty('t')){       //now checks for t in query string
                                            
    key = req.query.t;                      //stores the newly acquired t into the key variable
    pMeter ='t=' + encode(key);             //parameter then concatenates by using 'i=' + encode(key)
}
if (cache.hasOwnProperty(key)){             //if the cache has an object key, then respond with json using cache with the array "key"
    res.json(cache[key]);                   
}else{                                      
    console.log(url + pMeter);          //console.log url + paramater
    axios.get(url + pMeter).then(function(response){                //axios will then get the url and paramter, use call back function that will store response.data into the cache array, then it will respond with the json file 
        cache[key] = response.data;
        res.json(cache[key]);
    });
};
});
app.get('/data', (req, res)=>{          //getting data from the user and returning the cache json file
    res.json(cache);
})

// When making calls to the OMDB API make sure to append the '&apikey=8730e0e' parameter

module.exports = app;