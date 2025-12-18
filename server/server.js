const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
const app = express();
const axios = require("axios");
require("dotenv").config();

// middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// session
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
  })
);

const PARAFIN_BASE_URL = "https://api.parafin.com/v1";
const PARAFIN_DEV_BASE_URL = "https://api.dev.parafin.com/v1";
const constants = require("./constants.js");
const { off } = require("process");
const { url } = require("inspector");

// route for fetching Parafin token with person paylod
app.get("/parafin/token/:id/:isDev?", async (req, res) => {
  const personId = req.params.id;
  const isDev = req.params.isDev;
  const url = `${
    isDev === "true" ? PARAFIN_DEV_BASE_URL : PARAFIN_BASE_URL
  }/auth/redeem_token`;
  console.log(personId);

  let data = {};
  if (personId) {
    data.person_id = personId;
  };

  const config = {
    auth: {
      username: process.env.PARAFIN_CLIENT_ID,
      password: process.env.PARAFIN_CLIENT_SECRET,
    },
  };

  try {
    // make call to fetch Parafin token for business
    const result = await axios.post(url, data, config);
    const parafinToken = result.data.bearer_token;

    res.send({
      parafinToken: parafinToken,
    });
  } catch (error) {
    console.log(error.response.data);
    res.send({
      errorCode: error.response.status,
      message: error.response.data,
    });
  }
});

// full workflow to showcase all states of widget
// Create new anonymous business
app.post("/parafin/create_business_person", async (req, res) => {
  const urlBusiness = `${PARAFIN_BASE_URL}/businesses`;

  const config = {
    auth: {
      username: process.env.PARAFIN_CLIENT_ID,
      password: process.env.PARAFIN_CLIENT_SECRET,
    },
  };
  
  const data = {
    "address": constants.PARAFIN_ADDRESS_PAYLOAD,
    "established_date": "2023-12-25",
    "incorporation_state": "AL",
    "incorporation_type": "llc"
  };

  try {
    // make call to /businesses
    console.log(urlBusiness, data, config);
    const result = await axios.post(urlBusiness, data, config);
    var business_parafin_id = result.data.id
  } catch (error) {
    console.log(error.response.data);
    res.send({
      errorCode: error.response.status,
      message: error.response.data,
    });
  }
  
  // create anonymos person for the business
  const urlPerson = `${PARAFIN_BASE_URL}/persons`;
  const dataPerson = {
    "address": constants.PARAFIN_ADDRESS_PAYLOAD,
    "linked_businesses": [
      {
        "business_id": business_parafin_id,
        "relationship": {
          "is_beneficial_owner": true,
          "is_representative": true
        }
      }
    ]
  };

  try {
    // make call to /persons
    const resultPerson = await axios.post(urlPerson, dataPerson, config);
    var person_id = resultPerson.data.id
  } catch (error) {
    console.log(error.response.data);
    res.send({
      errorCode: error.response.status,
      message: error.response.data,
    });
  }

  res.send({
    status: "success",
    data: {
      businessParafinId: business_parafin_id,
      personId: person_id
    },
  });

});


// Create flex-loan offer for the business
app.post("/parafin/create_sandbox_offer", async (req, res) => {
  const url = `${PARAFIN_BASE_URL}/sandbox/generate_event/capital_product_offer/created`;

  const data = constants.PARAFIN_SANDBOX_CREATE_BUSINESS_PAYLOAD;

  const config = {
    auth: {
      username: process.env.PARAFIN_CLIENT_ID,
      password: process.env.PARAFIN_CLIENT_SECRET,
    },
  };
  try {
    // make call to create sandbox offer
    const result = await axios.post(url, data, config);
    res.send({
      status: "success",
      data: result.data,
    });
  } catch (error) {
    console.log(error.response.data);
    res.send({
      errorCode: error.response.status,
      message: error.response.data,
    });
  } 
});


// fund the capital product
app.post("/parafin/fund", async (req, res) => {
  const url = `${PARAFIN_BASE_URL}/sandbox/fund_capital_product`;
  const business_parafin_id = req.body.businessParafinId;

  const data = {
    "business_parafin_id": business_parafin_id,
  };
  const config = {
    auth: {
      username: process.env.PARAFIN_CLIENT_ID,
      password: process.env.PARAFIN_CLIENT_SECRET,
    },
  };

  try {
    // make call to fund capital product

    const result = await axios.post(url, data, config);
    res.send({
      status: "success",
      data: result.data,
    });
  } catch (error) {
    console.log(error.response.data);
    res.send({
      errorCode: error.response.status,
      message: error.response.data,
    });
  } 
});

// Starting Server
app.listen(process.env.PORT || 8080, () => {
  console.log(`App listening on PORT: ${process.env.PORT || 8080}`);
});
