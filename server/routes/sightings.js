const express = require("express");
const router = express.Router();
const Sighting = require("../models/sighting");

router.get("/", (req, res, next) => {
  Sighting.find({}, (error, allSightingFromDB) => {
    if (error) {
      res.status(500);
      return;
    } else {
      res.status(200).json({ sightings: allSightingFromDB });
    }
  });
});

router.get("/:sighting_id", (req, res, next) => {
  Sighting.find({_id: req.params.sighting_id}, (error, sightingFromDB) => {
    if (error) {
      res.status(500);
      return;
    } else {
      res.status(200).json({ sighting: sightingFromDB });
    }
  });
});

router.post("/", (req, res, next) => {
  let location = {
    type: "Point",
    coordinates: [req.body.sighting.latitude, req.body.sighting.longitude],
  };

  const newSighting = new Sighting({
    title: req.body.sighting.title,
    classification: req.body.sighting.classification,
    location,
  });

  newSighting.save((error) => {
    if (error) {
      res.status(500);
      return;
    } else {
      res.status(200);
    }
  });
});

router.post("/:sighting_id/delete", (req, res, next) => {
  Sighting.deleteOne({ _id: req.params.sighting_id }, (err, deletedUser) => {
    if (err) {
      res.status(500);
      return;
    } else {
      res.status(200);
    }
  });
});

router.post("/:sighting_id", (req, res, next) => {
  Sighting.findById(req.params.sighting_id, (error, sighting) => {
    if (error) {
      res.status(500);
      return;
    } else {
      let location = {
        type: "Point",
        coordinates: [req.body.latitude, req.body.longitude],
      };

      sighting.title = req.body.title;
      sighting.classification = req.body.classification;
      sighting.location = location;
      sighting.save((error) => {
        if (error) {
          res.status(500);
          return;
        } else {
          res.status(200);
        }
      });
    }
  });
});

module.exports = router;
