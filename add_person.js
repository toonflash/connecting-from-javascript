const settings = require("./settings"); // settings.json
const moment = require("./node_modules/moment");

var knex = require('knex')({
  client: 'pg',
  version: '7.2',
  connection: {
    host : settings.host,
    user : settings.user,
    password : settings.password,
    database : settings.database
  }
});

// take in 3 agrvs from user
// INSERT INTO famous_people (first_name, last_name, birthdate) VALUES ('first_name', 'last_name', '2012-01-12')

const query = knex('famous_people').insert({
    first_name: process.argv[2],
    last_name: process.argv[3],
    birthdate: process.argv[4]
});

// use knex to insert into database
query.asCallback((err, rows) => {
  if(err){
    console.log(err)
  }
  else {
    console.log('String inserted!')
  }
  knex.destroy();
})

console.log(query.toString());

