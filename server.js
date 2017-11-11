// ================================
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");

// ================================
var app = express();
var PORT = 4000;

app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

// ===============================

var seatings = [];
var waitlist = [];
var reservations = [];


// ==============================

app.get("/", function(req, res)  {
	res.sendFile(path.join(__dirname, "view.html"));
});

app.get("/make", function(req, res) {
	res.sendFile(path.join(__dirname, "make.html"));
});

app.get("/reservation", function(req, res) {
	res.json(reservations);
});

app.get("/seatings", function(req, res) {
	res.json(seatings);
});

app.get("/waitlist", function(req, res) {
	res.json(waitlist);
});

app.get("/api/:reservations?", function(req, res) {
  var chosen_reserv = req.params.reservations;

  if (chosen_reserv) {
    console.log(chosen_reserv);

    for (var i = 0; i < reservations.length; i++) {
      if (chosen_reserv === reservations[i].routeName) {
        return res.json(reservations[i]);
      }
    }
    return res.json(false);
  }
  return res.json(reservations);
});

app.get("/api/:seatings?", function(req, res) {
  var chosen_seat = req.params.seatings;

  if (chosen_seat) {
    console.log(chosen_seat);

    for (var i = 0; i < seatings.length; i++) {
      if (chosen_seat === seatings[i].routeName) {
        return res.json(seatings[i]);
      }
    }
    return res.json(false);
  }
  return res.json(seatings);
});

app.get("/api/:waitlist?", function(req, res) {
  var chosen_wait = req.params.waitlist;

  if (chosen_wait) {
    console.log(chosen_wait);

    for (var i = 0; i < waitlist.length; i++) {
      if (chosen_wait === waitlist[i].routeName) {
        return res.json(waitlist[i]);
      }
    }
    return res.json(false);
  }
  return res.json(waitlist);
});

// ==============================

app.post("/api/new", function(req, res) {
	var newReservation = req.body;
	newReservation.routeName = newReservation.group_name.replace(/\s+/g, "").toLowerCase();

	console.log(newReservation);

	reservations.push(newReservation);
	res.json(newReservation);


});

// ==============================

app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});