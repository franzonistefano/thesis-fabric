'use strict';

//get libraries
const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const path = require('path');

//create express web-app
const app = express();
const router = express.Router();

//get the libraries to call
var dapp = require('./dapp.js');
var validate = require('./validate.js');

//bootstrap application settings
app.use(express.static('./public'));
app.use('/scripts', express.static(path.join(__dirname, '/public/scripts')));
app.use(bodyParser.json());

//get home page
app.get('/home', function(req, res) {
  res.sendFile(path.join(__dirname + '/public/index.html'));
});

//get user page
app.get('/user', function(req, res) {
  res.sendFile(path.join(__dirname + '/public/user.html'));
});

//get user registration page
app.get('/registerUser', function(req, res) {
  res.sendFile(path.join(__dirname + '/public/registerUser.html'));
});

//get partner page
app.get('/admin', function(req, res) {
  res.sendFile(path.join(__dirname + '/public/admin.html'));
});

//get partner registration page
app.get('/registerAdmin', function(req, res) {
  res.sendFile(path.join(__dirname + '/public/registerAdmin.html'));
});

//get about page
app.get('/about', function(req, res) {
  res.sendFile(path.join(__dirname + '/public/about.html'));
});


//post call to register user on the network
app.post('/api/registerUser', function(req, res) {

  console.log('registerUser');

  //declare variables to retrieve from request
  var firstName = req.body.firstname;
  var lastName = req.body.lastname;
  var email = req.body.email;

  //print variables
  console.log('Using param - firstname: ' + firstName + ' lastname: ' + lastName + ' email: ' + email);

  var validateResponse = validate.validateUserRegistration(firstName, lastName, email);

  if (validateResponse.error != null) {
    res.json({
      error: validateResponse.error
    });
  } else {

    var response = dapp.registerUser(firstName, lastName, email);

    if (response.error != null) {
      res.json({
        error: response.error
      });
    } else {
      res.json({
        success: response
      });
    }
  }

});

//post call to register admin on the network
app.post('/api/registerAdmin', function(req, res) {

  //declare variables to retrieve from request
  var name = req.body.name;

  //print variables
  console.log('Using param - name: ' + name );

  var validateResponse = validate.validateAdminRegistration(name);

  if (validateResponse.error != null) {
    res.json({
      error: validateResponse.error
    });
  } else {

    var response = dapp.registerAdmin(name);

    if (response.error != null) {
      res.json({
        error: response.error
      });
    } else {
      res.json({
        success: response
      });
    }
  }

});


//post call to retrieve user data, transactions data and admin
app.get('/api/userData', function(req, res) {

  //declare return object
  var returnData = {};

  //get user's data
  var userData = dapp.userData();
  if (userData.error != null) {
    res.json({
      error: userData.error
    });
  } else {
    returnData.userData = userData;
  }

  var transactionsData = dapp.userTransactionsData();
  if (transactionsData.error != null) {
    res.json({
      error: transactionsData.error
    });
  } else {
    returnData.transactionsData = transactionsData;
  }

  var userBoxRequest = dapp.userBoxRequest();
  if (userBoxRequest.error != null) {
    res.json({
      error: userBoxRequest.error
    });
  } else {
    returnData.userBoxRequest = userBoxRequest;
  }

  res.json(returnData);

});

//post call to perform sendBox transaction on the network
app.post('/api/sendBox', function(req, res) {

  //declare variables to retrieve from request
  var tshirt = req.body.tshirt;
  var pants = req.body.pants;
  var jackets = req.body.jackets;
  var other = req.body.other;

  //print variables
  console.log('Send Box - tshirt: ' + tshirt + ' pants: ' + pants + ' jackets: ' + jackets + ' other: ' + other);

  var validateResponse = validate.validateBox(tshirt, pants, jackets, other);

  if (validateResponse.error != null) {
    res.json({
      error: validateResponse.error
    });
  } else {

    var response = dapp.sendBox(tshirt, pants, jackets, other);

    if (response.error != null) {
      res.json({
        error: response.error
      });
    } else {
      res.json({
        success: response
      });
    }
  }

});

//post call to retrieve admin data and transactions data from the network
app.get('/api/adminData', function(req, res) {

  //declare return object
  var returnData = {};

  //get admin's data
  var adminData = dapp.adminData();
  if (adminData.error != null) {
    res.json({
      error: adminData.error
    });
  } else {
    returnData.adminData = adminData;
    console.log(adminData);
  }

  //get transactions data
  var transactionsData = dapp.adminTransactionsData();
  if (transactionsData.error != null) {
    res.json({
      error: transactionsData.error
    });
  } else {
    returnData.transactionsData = transactionsData;
  }

  //get pending request
  var pendingRequest = dapp.pendingRequests();
  if (pendingRequest.error != null) {
    res.json({
      error: pendingRequest.error
    });
  } else {
    returnData.pendingRequest = pendingRequest;
  }

  //get evaluated request
  var evaluatedRequest = dapp.evaluatedRequests();
  if (evaluatedRequest.error != null) {
    res.json({
      error: evaluatedRequest.error
    });
  } else {
    returnData.evaluatedRequest = evaluatedRequest;
  }

  //get next request
  var nextRequest = dapp.nextPendingRequest();
  /*if (nextRequest.error != null) {
    res.json({
      error: nextRequest.error
    });
  } else {*/
  if (nextRequest != null) {
    returnData.nextRequest = nextRequest;
  }else {
    returnData.nextRequest = 0;
  }

  //return returnData
  res.json(returnData);
});

//post call to perform UsePoints transaction on the network
app.post('/api/usePoints', function(req, res) {

  //declare variables to retrieve from request
  var points = req.body.points;

  //print variables
  console.log('Use Points - points: ' + points);

  var validateResponse = validate.validatePoints(points);

  if (validateResponse.error != null) {
    res.json({
      error: validateResponse.error
    });
  } else {

    var response = dapp.usePoints(points);

    if (response.error != null) {
      res.json({
        error: response.error
      });
    } else {
      res.json({
        success: response
      });
    }
  }

});

//post call to perform evaluateBox transaction on the network
app.post('/api/evaluateBox', function(req, res) {

  //declare variables to retrieve from request
  var points = req.body.points;

  //print variables
  console.log('Evaluate Box - points: ' + points);

  var validateResponse = validate.validatePoints(points);

  if (validateResponse.error != null) {
    res.json({
      error: validateResponse.error
    });
  } else {

    var response = dapp.evaluateBox(points);

    if (response.error != null) {
      res.json({
        error: response.error
      });
    } else {
      res.json({
        success: response
      });
    }
  }

});

//post call to retrieve all the transactions data from the network
app.get('/api/transactionsData', function(req, res) {

  //declare return object
  var returnData = {};

  var transactionsData = dapp.adminTransactionsData();
  if (transactionsData.error != null) {
    res.json({
      error: transactionsData.error
    });
  } else {
    returnData.transactionsData = transactionsData;
  }

  //return returnData
  res.json(returnData);
});

//declare port
var port = process.env.PORT || 8000;
if (process.env.VCAP_APPLICATION) {
  port = process.env.PORT;
}

//run app on port
app.listen(port, function() {
  console.log('app running on port: %d', port);
});
