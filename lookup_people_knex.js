const settings = require("./settings"); // settings.json
const moment = require("./node_modules/moment");
const input = process.argv[2]; // accpt argv from command line 

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

const Query = knex.select("first_name", "last_name", "birthdate")
.from("famous_people")
.where("first_name", input)
.orWhere("last_name", input);

Query.asCallback(function(err, rows) {
  console.log("Searching..."); 
  console.log(`Found ${rows.length} person(s) by the name ${input}`);
  if (err) return console.error(err);
  searchResults(rows);
  knex.destroy();
});

function searchResults(results) {
  let counter = 1;
  results.forEach(item => {
    console.log(`${counter++} - ${item.first_name} ${item.last_name} born ${moment(item.birthdate).format("dddd, MMMM Do YYYY")}`);
  });
}