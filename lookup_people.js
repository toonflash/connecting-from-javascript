const pg = require("pg");
const settings = require("./settings"); // settings.json
const moment = require("./node_modules/moment"); 
const input = process.argv.slice(2); // accpt argv from command line 
const client = new pg.Client(settings, moment);

client.connect((err) => {
  if (err) {
    return console.error("Connection Error", err);
  }

  // build query string to search database for people with input name
  client.query('SELECT * FROM famous_people WHERE first_name = $1 OR last_name = $1', input, (err, result) => {
    if (err) {
      return console.error("error running query", err);
    }

    console.log("Searching..."); 
    // run query and return result row(s)
    console.log(`Found ${result.rows.length} person(s) by the name ${input}`); 
    searchResults(result.rows);
    client.end();
  });

  // for (let key in result.rows) {
  //   console.log("key: ", key);
  //   console.log("result: ", result.rows);
  //   console.log("result[key]: ", result.rows[key]);
  // }  REASONS NOT TO USE FOR IN!!!!!!!!!

  // create a function that will accept an array of records and loop through and print each record
  function searchResults(results){
    let counter = 1;
    results.forEach(item => {
      console.log(`${counter++} - ${item.first_name} ${item.last_name} born ${moment(item.birthdate).format("dddd, MMMM Do YYYY")}`);
    });
  }
});