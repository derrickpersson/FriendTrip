const express = require('express');
const router = express.Router();
const bodyParser = require("body-parser");
const nlp = require('./classification.js');
const place = require('./placehelpers.js')();
require('dotenv').config();


module.exports = (datahelper) => {
  router.get('/', (req, res) => {
    return res.send('home page');
  });

  router.get('/friends/:tid', (req, res) => {
    let trip_id = req.params.tid;
    datahelper.getFriends(trip_id).then((data) => {
      return res.json(data);
    })
  });


  // get all trips that belong to a given user
  router.get('/users/:uid/trips', (req, res) => {
    let user_id = req.params.uid
    datahelper.queryUserTrips(user_id).then((data) => {
      return res.json(data);
    });
  });

  // create a new trip for the user
  router.post('/users/:uid/trips', (req, res) => {
    let trip = {
      location: req.body.location,
      owner_id: req.params.uid,
      start_date: req.body.start_date,
      end_date: req.body.end_date
    };

    console.log(trip);
    datahelper.addTrip(trip).then((data) =>{
      trip.id = data[0];
      res.send(trip);
    });
  });


  // select a single trip
  router.get('/trips/:tid', (req, res) => {

    let trip_id = req.params.tid;
    console.log(trip_id);
    datahelper.queryTrip(trip_id)
      .then((data) => {
        res.json(data);
    })
  });

  // update a trip
  router.put('/trips/:tid', (req, res) =>{
    let trip = {
      id: req.params.tid,
      name: req.body.name,
      location: req.body.location
    }
  });

  // delete a trip
  router.delete('/trips/:tid', (req, res) => {
    datahelper.deleteTrip(req.params.tid).then(()=>{
      return res.status(200);
    });
  });

  // get activities within a trip
  router.get('/trips/:tid/activities', (req, res) => {
    let trip_id = req.params.tid;
    console.log(trip_id);
    datahelper.getActivities(trip_id).
    then((data) => {
      console.log(data);
      return res.json(data);
    });
  });

  // add activities within a trip
  router.post('/trips/:tid/activities', (req, res) => {
    let activity = {
      // start_date: req.body.start,
      // end_date: req.body.end,
      description: req.body.description,
      trip_id: req.params.tid,
      owner_id: req.session.user_id,
      category: nlp.getCategory(req.body.description)
    };
    datahelper.addActivities(activity).then((data) =>{
      activity.id = data[0];
      res.send(activity);
      //res.redirect(`/trips/${req.params.tid}`)
    });
  });

  router.get('/recommendations/:tid', (req, res) => {
    let tripid = req.params.tid;

    let name = '';
    datahelper.queryTrip(tripid).then((data) => {
      // console.log(data[0].location);
      name = data[0].location;
      //  console.log(name);
      place.getPlaceID(`things to do in ${name}`).then((data) => {
        return res.json(data);
      })
    })
  })

  // get comments from an activity
  router.get('/activities/:aid/comments', (req, res) => {
    let activity_id = req.params.tid;
    console.log(activity_id);
    datahelper.getComments(activity_id).
    then((data) => {
      return res.json(data);
    });
  });

  // add a new comment for an activity
  router.post('/activites/:aid/comments', (req, res) => {
    let comment = {
      description: req.body.description,
      activity_id: req.params.aid,
      owner_id: req.session.user_id
    };
    datahelper.postComments(comment).then(() =>{
      return res.status(200);
    });
  });

  return router;
}
