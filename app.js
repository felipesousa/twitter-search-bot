const Twitter	= require("twitter");
const config  = require("./config.js");

const T = new Twitter(config);

const params = {
	q: "#something", count: 15, result_type: 'recent', lang: 'en'
}

T.get('search/tweets', params, function(err, data, response) {
  if(!err){

    for(let i = 0; i < data.statuses.length; i++){

      let id = { id: data.statuses[i].id_str }

      T.post('favorites/create', id, function(err, response){

        if(err){
          console.log(err[0].message);
        } else{
          let user = response.user.screen_name;
          let id = response.id_str;
          console.log('Favorited: ', `https://twitter.com/${user}/status/${id}`)
        }

      });
    }
  } else {
    console.log(err);
  }
})