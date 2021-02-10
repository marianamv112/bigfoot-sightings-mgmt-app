const csv = require("csv-parser");
const fs = require("fs");
const mongoose = require('mongoose');
const Sighting = require('../../models/sighting');
  
mongoose.connect('mongodb://localhost/bigfoot-sightings-mgmt', {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(x => {
  console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
})
.catch(err => {
  console.error('Error connecting to mongo', err)
});

fs.createReadStream('../bfro_report_locations.csv')
  .pipe(csv())
  .on('data', (row) => {
    const newEntry = {
      number: row.number,
      title: row.title,
      classification: row.classification,
      timestamp: row.timestamp,
      location: {
        type: "Point",
        coordinates: [row.longitude, row.latitude]
      },
    }

    Sighting.create(newEntry)
    .catch(err => console.log(`An error occurred while creating sightings from the DB: ${err}`));
  })
  .on('end', () => {
    console.log('CSV file successfully processed');
    mongoose.connection.close();
  })