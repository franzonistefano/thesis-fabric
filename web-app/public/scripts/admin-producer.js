var apiUrl = location.protocol + '//' + location.host + "/api/";

$(document).ready(function() {
  updateAdmin();
});


function updateAdmin() {

  //display loading
  document.getElementById('loader').style.display = "block";

  $.get(apiUrl + 'adminProducerData', function(data) {

    //check data for error
    if (data.error) {
      //alert(data.error);
      document.getElementById('errorSection').style.display = "block";
      $('.error').html(function() {
        var str = '<h2><b>Error: ' + data.error + '</b></h2>';
        return str;
      });
      return;
    } else {

      //update heading
      $('.heading').html(function() {
        var str = '<h3>' + data.adminData[1] + ' </h3>';
        str = str + '<h3>' + data.adminData[0] + ' </h3>';

        return str;
      });

      //update dashboard
      $('.dashboards').html(function() {
        var str = '';
        var totPointsProvided = data.totPointsProvided;
        var totBoxOld = data.totBoxOld;
        var totBoxNew = data.totBoxNew;
        var regenerationCredits = data.totRegenerationCredits;

        console.log('Tot Box Old: ' + totBoxOld);
        console.log('Tot Box New: ' + totBoxNew);
        console.log('Tot Points Provided: ' + totPointsProvided);
        console.log('Regeneration Credits: ' + regenerationCredits);

        str = str + '<h3>' + regenerationCredits + ' </h3>';
        str = str + '<h3>' + totBoxOld + ' </h3>';
        str = str + '<h3>' + totBoxNew + ' </h3>';
        return str;
      });

      //update all pending-box
      $('.pending-box').html(function() {
        var str = '';
        var pendingRequest = data.pPendingRequest;

        for (var i = 0; i < pendingRequest.length; i++) {

          str = str + '<p><b>User Address</b>: ' + pendingRequest[i][0] + '<br /><b>T-Shirt</b>: ' + pendingRequest[i][1] + '<br /><b>Pants</b>: ' + pendingRequest[i][2] + '<br /><b>Jackets</b>: ' + pendingRequest[i][3];
          str = str + '<br /><b>Other</b>: ' + pendingRequest[i][4] + '<br /><b>Evaluated</b>: ' + pendingRequest[i][5] + '<br /><b>Points</b>: ' + pendingRequest[i][6] + '</p><br>';

        }
        return str;
      });

      //update all pending-box
      $('.evaluated-box').html(function() {
        var str = '';
        var evaluatedRequest = data.pEvaluatedRequest;

        for (var i = 0; i < evaluatedRequest.length; i++) {

          str = str + '<p><b>User Address</b>: ' + evaluatedRequest[i][0] + '<br /><b>T-Shirt</b>: ' + evaluatedRequest[i][1] + '<br /><b>Pants</b>: ' + evaluatedRequest[i][2] + '<br /><b>Jackets</b>: ' + evaluatedRequest[i][3];
          str = str + '<br /><b>Other</b>: ' + evaluatedRequest[i][4] + '<br /><b>Evaluated</b>: ' + evaluatedRequest[i][5] + '<br /><b>Points</b>: ' + evaluatedRequest[i][6] + '</p><br>';

        }
        return str;
      });

      //update all upcycled-box
      $('.upcycled-box').html(function() {
        var str = '';
        var upCycledBox = data.upCycledRequest;

        for (var i = 0; i < upCycledBox.length; i++) {

          str = str + '<p><b>User Address</b>: ' + upCycledBox[i][0] + '<br /><b>T-Shirt</b>: ' + upCycledBox[i][1] + '<br /><b>Pants</b>: ' + upCycledBox[i][2] + '<br /><b>Jackets</b>: ' + upCycledBox[i][3];
          str = str + '<br /><b>Other</b>: ' + upCycledBox[i][4] + '<br /><b>Evaluated</b>: ' + upCycledBox[i][5] + '<br /><b>Points</b>: ' + upCycledBox[i][6] + '</p><br>';

        }
        return str;
      });

      //display transaction section
      document.getElementById('transactionSection').style.display = "block";
      //hide loading
      document.getElementById('loader').style.display = "none";
    }

  });

}

$('.small-box').click(function() {
  var tshirt = 5;
  var pants = 5;
  var jackets = 5;
  var other = 5;
  var points = 50;
  spendRegenerationCredits(tshirt, pants, jackets, other, points);
});

$('.medium-box').click(function() {
  var tshirt = 15;
  var pants = 15;
  var jackets = 15;
  var other = 15;
  var points = 150;
  spendRegenerationCredits(tshirt, pants, jackets, other, points);
});

$('.big-box').click(function() {
  var tshirt = 40;
  var pants = 40;
  var jackets = 40;
  var other = 40;
  var points = 300;
  spendRegenerationCredits(tshirt, pants, jackets, other, points);
});

function spendRegenerationCredits(tshirt, pants, jackets, other, points) {

  //get user input data
  var formProxy = $('.proxy input').val();
  var formContractAddress = $('.contractAddress input').val();

  //create json data
  var inputData = '{' + '"proxy" : "' + formProxy + '", ' + '"tshirt" : "' + tshirt + '", ' + '"pants" : "' + pants + '", ' + '"jackets" : "' + jackets + '", ' + '"other" : "' + other + '", ' + '"points" : "' + points + '", ' + '"contractaddress" : "' + formContractAddress +'"}';
  console.log('Buy Upcycled Box: ' + inputData);

  //make ajax call
  $.ajax({
    type: 'POST',
    url: apiUrl + 'buyUpcycledBox',
    data: inputData,
    dataType: 'json',
    contentType: 'application/json',
    beforeSend: function() {
      //display loading
      document.getElementById('loader').style.display = "block";
      document.getElementById('infoSection').style.display = "none";
    },
    success: function(data) {
      console.log(data);
      document.getElementById('loader').style.display = "none";
      document.getElementById('infoSection').style.display = "block";

      //check data for error
      if (data.error) {
        alert(data.error);
        return;
      } else {
        //update member page and notify successful transaction
        updateAdmin();
        alert('Transaction successful');
      }


    },
    error: function(jqXHR, textStatus, errorThrown) {
      document.getElementById('loader').style.display = "none";
      alert("Error: Try again")
      console.log(errorThrown);
      console.log(textStatus);
      console.log(jqXHR);
    }
  });
}

//check user input and call server
$('.send-box-transaction').click(function() {

  var tshirt = $('.sendTshirt input').val();
  var pants = $('.sendPants input').val();
  var jackets = $('.sendJacket input').val();
  var other = $('.sendOther input').val();
  sendBox(tshirt, pants, jackets, other);
});

function sendBox(tshirt, pants, jackets, other) {

  //get user input data
  var formProxy = $('.proxy input').val();
  var formContractAddress = $('.contractAddress input').val();

  //create json data
  var inputData = '{' + '"proxy" : "' + formProxy + '", ' + '"tshirt" : "' + tshirt + '", ' + '"pants" : "' + pants + '", ' + '"jackets" : "' + jackets + '", ' + '"other" : "' + other + '", ' + '"contractaddress" : "' + formContractAddress +'"}';
  console.log('Sending Old Box' + inputData);

  //make ajax call
  $.ajax({
    type: 'POST',
    url: apiUrl + 'sendBoxOld',
    data: inputData,
    dataType: 'json',
    contentType: 'application/json',
    beforeSend: function() {
      //display loading
      document.getElementById('loader').style.display = "block";
      document.getElementById('infoSection').style.display = "none";
    },
    success: function(data) {
      console.log(data);
      document.getElementById('loader').style.display = "none";
      document.getElementById('infoSection').style.display = "block";

      //check data for error
      if (data.error) {
        alert(data.error);
        return;
      } else {
        //update member page and notify successful transaction
        updateAdmin();
        alert('Transaction successful');
      }


    },
    error: function(jqXHR, textStatus, errorThrown) {
      document.getElementById('loader').style.display = "none";
      alert("Error: Try again")
      console.log(errorThrown);
      console.log(textStatus);
      console.log(jqXHR);
    }
  });
}
