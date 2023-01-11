const express = require("express");

// houseRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path/house.
const houseRoutes = express.Router();

// This will help us connect to the database
const dbo = require("../db/conn");

// This helps convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;

var { Parser } = require("json2csv");

const fields = [
  {
    label: "externalId",
    value: "externalId",
  },
  {
    label: "areaSqm",
    value: "areaSqm",
  },
  {
    label: "city",
    value: "city",
  },
  {
    label: "latitude",
    value: "latitude",
  },
  {
    label: "longitude",
    value: "longitude",
  },
  {
    label: "postalCode",
    value: "postalCode",
  },
  {
    label: "rent",
    value: "rent",
  },
  {
    label: "title",
    value: "title",
  },
  {
    label: "deposit",
    value: "deposit",
  },
];

const json2csv = new Parser({ fields: fields });

// This section will help you get a list of all the houses.
houseRoutes.route("/properties").get(function (req, res) {
  let db_connect = dbo.getDb();
  let type = req.headers["Content-Type"] || "application/json";
  db_connect
    .collection("houseData")
    .find({})
    .limit(3000) 
    // limiting the amount of houses because our db is hosted online 
    // and retreaving all the houses would take very long
    .toArray(function (err, result) {
      if (err) throw err;
      if (type == "application/json") res.json(result);
      else {
        let csv = json2csv.parse(result);
        res.attachment("result.csv");
        res.status(200).send(csv);
      }
    });
});

//////////// FUNCTIONALITY 1: ////////////

// This section will help you get a single house by externalId
houseRoutes.route("/properties/:externalId").get(function (req, res) {
  let db_connect = dbo.getDb();
  let type = req.headers["Content-Type"] || "application/json";
  let myquery = { externalId: req.params.externalId };
  db_connect.collection("houseData").findOne(myquery, function (err, result) {
    if (err) throw err;
    if (type == "application/json") res.json(result);
    else {
      let csv = json2csv.parse(result);
      res.attachment("result.csv");
      res.status(200).send(csv);
    }
  });
});

// This section will help you create a new house.
houseRoutes.route("/properties/add").post(function (req, res) {
  let db_connect = dbo.getDb();
  let type = req.headers["Content-Type"] || "application/json";
  let myobj = {
    externalId: req.body.externalId,
    areaSqm: parseInt(req.body.areaSqm),
    city: req.body.city,
    latitude: req.body.latitude,
    longitude: req.body.longitude,
    postalCode: req.body.postalCode,
    rent: parseInt(req.body.rent),
    title: req.body.title,
    deposit: parseInt(req.body.deposit),
  };
  db_connect.collection("houseData").insertOne(myobj, function (err, result) {
    if (err) throw err;
    if (type == "application/json") res.json(result);
    else {
      let csv = json2csv.parse(result);
      res.attachment("result.csv");
      res.status(200).send(csv);
    }
  });
});

// This section will help you update a house by id.
houseRoutes.route("/properties/:externalId").put(function (req, res) {
  let db_connect = dbo.getDb();
  let type = req.headers["Content-Type"] || "application/json";
  let myquery = { externalId: req.params.externalId };
  let newvalues = {
    $set: {
      externalId: req.body.externalId,
      areaSqm: parseInt(req.body.areaSqm),
      city: req.body.city,
      latitude: req.body.latitude,
      longitude: req.body.longitude,
      postalCode: req.body.postalCode,
      rent: parseInt(req.body.rent),
      title: req.body.title,
      deposit: parseInt(req.body.deposit),
    },
  };
  db_connect
    .collection("houseData")
    .updateOne(myquery, newvalues, function (err, result) {
      if (err) throw err;
      console.log("1 document updated");
      if (type == "application/json") res.json(result);
      else {
        let csv = json2csv.parse(result);
        res.attachment("result.csv");
        res.status(200).send(csv);
      }
    });
});

// This section will help you delete a house
houseRoutes.route("/properties/:externalId").delete((req, response) => {
  let db_connect = dbo.getDb();
  let myquery = { externalId: req.params.externalId };
  db_connect.collection("houseData").deleteOne(myquery, function (err, obj) {
    if (err) throw err;
    console.log("1 document deleted");
    response.status(obj);
  });
});

//////////// FUNCTIONALITY 2: ////////////

// This section will help you get a list of all the properties with a given longitude and latitude.
houseRoutes
  .route("/properties/byCoord/:longitude/:latitude")
  .get(function (req, res) {
    let db_connect = dbo.getDb();
    let type = req.headers["Content-Type"] || "application/json";
    db_connect
      .collection("houseData")
      .find({ longitude: req.params.longitude, latitude: req.params.latitude })
      .toArray(function (err, result) {
        if (err) throw err;
        if (type == "application/json") res.json(result);
        else {
          let csv = json2csv.parse(result);
          res.attachment("result.csv");
          res.status(200).send(csv);
        }
      });
  });

// This section will help you update a list of houses.
houseRoutes
  .route("/properties/byCoord/:longitude/:latitude")
  .put(function (req, res) {
    let db_connect = dbo.getDb();
    let type = req.headers["Content-Type"] || "application/json";
    let myquery = {
      longitude: req.params.longitude,
      latitude: req.params.latitude,
    };

    let newvalues = {
      $set: {
        externalId: req.body.externalId,
        areaSqm: parseInt(req.body.areaSqm),
        city: req.body.city,
        latitude: req.body.latitude,
        longitude: req.body.longitude,
        postalCode: req.body.postalCode,
        rent: parseInt(req.body.rent),
        title: req.body.title,
        deposit: parseInt(req.body.deposit),
      },
    };

    db_connect
    .collection("houseData")
    .updateMany(myquery, newvalues, function (err, result) {
      if (err) throw err;
      console.log("Documents updated");
      if (type == "application/json") res.json(result);
      else {
        let csv = json2csv.parse(result);
        res.attachment("result.csv");
        res.status(200).send(csv);
      }
    });
  });

// This section will help you delete all the properties with a given longitude and latitude.
houseRoutes
  .route("/properties/byCoord/:longitude/:latitude")
  .delete((req, response) => {
    let db_connect = dbo.getDb();
    let myquery = {
      longitude: req.params.longitude,
      latitude: req.params.latitude,
    };
    db_connect.collection("houseData").deleteMany(myquery, function (err, obj) {
      if (err) throw err;
      console.log("Many documents deleted");
      response.status(obj);
    });
  });

//////////// FUNCTIONALITY 3: ////////////

// This section will help you get a list of all the properties within a city based on a minimum and maximum rental price
houseRoutes
  .route("/properties/byBudget/:city/:min/:max")
  .get(function (req, res) {
    let db_connect = dbo.getDb();
    let type = req.headers["Content-Type"] || "application/json";
    let inmin = parseInt(req.params.min);
    let inmax = parseInt(req.params.max);
    let incity = req.params.city;
    db_connect
      .collection("houseData")
      .find({ city: incity, rent: { $gte: inmin, $lte: inmax } })
      .limit(3000)
      .toArray(function (err, result) {
        if (err) throw err;
        if (type == "application/json") res.json(result);
        else {
          let csv = json2csv.parse(result);
          res.attachment("result.csv");
          res.status(200).send(csv);
        }
      });
  });

//////////// FUNCTIONALITY 4/5: ////////////

// This section will help you get a list of all the properties within a city
houseRoutes.route("/properties/:city/list").get(function (req, res) {
  let db_connect = dbo.getDb();
  let type = req.headers["Content-Type"] || "application/json";
  let orderBy = req.query.orderBy || "rent";
  let orderDir = parseInt(req.query.orderDir) || 1;
  let selection = parseInt(req.query.selection) || 10;
  if (orderBy == "rent") {
    db_connect
      .collection("houseData")
      .find({ city: req.params.city })
      .sort({ rent: orderDir })
      .limit(selection)
      .toArray(function (err, result) {
        if (err) throw err;
        if (type == "application/json") res.json(result);
        else {
          let csv = json2csv.parse(result);
          res.attachment("result.csv");
          res.status(200).send(csv);
        }
      });
  } else {
    let city = db_connect.collection("houseData");
    let agg = city.aggregate([
      { $match: { city: req.params.city } },
      {
        $project: {
          externalId: 1,
          areaSqm: 1,
          city: 1,
          latitude: 1,
          longitude: 1,
          postalCode: 1,
          rent: 1,
          title: 1,
          deposit: 1,
          smc: { $divide: ["$rent", "$areaSqm"] },
        },
      },
    ]);
    agg
      .sort({ smc: orderDir })
      .limit(selection)
      .toArray(function (err, result) {
        if (err) throw err;
        if (type == "application/json") res.json(result);
        else {
          let csv = json2csv.parse(result);
          res.attachment("result.csv");
          res.status(200).send(csv);
        }
      });
  }
});

//////////// FUNCTIONALITY 6: ////////////
// Returns the statistics on rent and deposit for a selected city
houseRoutes.route("/properties/statistics/:city").get(function (req, res) {
  let db_connect = dbo.getDb();
  let type = req.headers["Content-Type"] || "application/json";
  let coll = db_connect.collection("houseData");
  let inCity = coll.find({ city: req.params.city });
  let colsize = coll.count({ city: req.params.city });
  //Rent
  let medRent = inCity
    .sort({ rent: 1 })
    .skip(colsize / 2 - 1)
    .limit(1).rent;
  //Deposit
  let medDep = inCity
    .sort({ deposit: 1 })
    .limit(colsize / 2)
    .sort({ deposit: -1 })
    .limit(1).deposit;

  console.log(colsize);
  let agg = coll.aggregate([
    {
      $group: {
        _id: "$city",
        avgRent: { $avg: "$rent" },
        sdRent: { $stdDevSamp: "$rent" },
        avgDep: { $avg: "$deposit" },
        sdDep: { $stdDevSamp: "$deposit" },
      },
    },
    { $match: { _id: req.params.city } },
    {
      $project: {
        _id: 1,
        avgRent: 1,
        sdRent: 1,
        avgDep: 1,
        sdDep: 1,
        medRent: { $floor: medRent },
        medDep: { $floor: medDep },
      },
    },
  ]);

  agg.toArray(function (err, result) {
    if (err) throw err;
    if (type == "application/json") res.json(result);
    else {
      let csv = json2csv.parse(result);
      res.attachment("result.csv");
      res.status(200).send(csv);
    }
  });
});
module.exports = houseRoutes;
