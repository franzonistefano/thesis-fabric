var apiUrl = location.protocol + '//' + location.host + "/api/";

$(document).ready(function() {
  updateUser();
});


function updateUser() {

  //display loading
  document.getElementById('loader').style.display = "block";

  $.get(apiUrl + 'userData', function(data) {

    if (data.error) {
      //alert(data.error);
      document.getElementById('errorSection').style.display = "block";
      $('.error').html(function() {
        var str = '<h2><b>Error: ' + data.error + '</b></h2>';
        return str;
      });

      return;
    } else {
      console.log(data);

      //update heading
      $('.heading').html(function() {
        var str = '<h3>' + data.userData[1] + ' ' + data.userData[2] + '</h3>';
        str = str + '<h3>' + data.userData[0] + '</h3>';
        str = str + '<h3>' + data.userData[4] + '</h3>';

        return str;
      });

      //update partners dropdown for earn points transaction
      $('.earn-user select').html(function() {
        var str = '<option value="" disabled="" selected="">select</option>';
        var userData = data.userData;
        for (var i = 0; i < userData.length; i++) {
          str = str + '<option partner-id=' + userData[i][0] + '> ' + userData[i][1] + '</option>';
        }
        return str;
      });

      /*update partners dropdown for use points transaction
      $('.use-partner select').html(function() {
        var str = '<option value="" disabled="" selected="">select</option>';
        var partnersData = data.partnersData;
        for (var i = 0; i < partnersData.length; i++) {
          str = str + '<option partner-id=' + partnersData[i][0] + '> ' + partnersData[i][1] + '</option>';
        }
        return str;
      });*/

      //update all transactions
      $('.points-transactions').html(function() {
        var str = '';
        var transactionData = data.transactionsData;
        var transactionType = '';

        for (var i = 0; i < transactionData.length; i++) {

          if(transactionData[i][1] == 0) {
            transactionType = 'Points Earned';
          } else if (transactionData[i][1] == 1) {
            transactionType = 'Points Redeemed';
          }
          str = str + '<p><b>Admin Address</b>: ' + transactionData[i][3] + '<br /><b>User Address</b>: ' + transactionData[i][2] + '<br /><b>Transaction Type</b>: ' + transactionType + '<br /><b>Points</b>: ' + transactionData[i][0] + '</p><br>';
        }
        return str;
      });

      //update all box request
      $('.box-request').html(function() {
        var str = '';
        var req = data.userBoxRequest;

        for (var i = 0; i < req.length; i++) {

          str = str + '<p><b>User Address</b>: ' + req[i][0] + '<br /><b>T-Shirt</b>: ' + req[i][1] + '<br /><b>Pants</b>: ' + req[i][2] + '<br /><b>Jackets</b>: ' + req[i][3];
          str = str + '<br /><b>Other</b>: ' + req[i][4] + '<br /><b>Evaluated</b>: ' + req[i][5] + '<br /><b>Points</b>: ' + req[i][6] + '</p><br>';

        }
        return str;
      });

      //display member page
      document.getElementById('transactionSection').style.display = "block";

      //hide loading
      document.getElementById('loader').style.display = "none";
    }

  });

}

$('.earn-points-30').click(function() {
  sendBox(30);
});

$('.earn-points-80').click(function() {
  sendBox(80);
});

$('.earn-points-200').click(function() {
  sendBox(200);
});


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
  //var formPartnerId = $('.earn-partner select').find(":selected").attr('partner-id');

  //create json data
  var inputData = '{' + '"proxy" : "' + formProxy + '", ' + '"tshirt" : "' + tshirt + '", ' + '"pants" : "' + pants + '", ' + '"jackets" : "' + jackets + '", ' + '"other" : "' + other + '", ' + '"contractaddress" : "' + formContractAddress +'"}';
  console.log(inputData)

  //make ajax call
  $.ajax({
    type: 'POST',
    url: apiUrl + 'sendBox',
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
        updateUser();
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

$('.use-points-50').click(function() {
  usePoints(50);
});

$('.use-points-150').click(function() {
  usePoints(100);
});

$('.use-points-200').click(function() {
  usePoints(150);
});


//check user input and call server
$('.use-points-transaction').click(function() {
  var formPoints = $('.usePoints input').val();
  usePoints(formPoints);
});


function usePoints(formPoints) {

  //get user input data
  var formProxy = $('.proxy input').val();
  var formContractAddress = $('.contractAddress input').val();

  //create json data
  var inputData = '{' + '"proxy" : "' + formProxy + '", ' + '"points" : "' + formPoints + '", ' + '"contractaddress" : "' + formContractAddress + '"}';

  //make ajax call
  $.ajax({
    type: 'POST',
    url: apiUrl + 'usePoints',
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
        updateUser();
        alert('Transaction successful');
      }

    },
    error: function(jqXHR, textStatus, errorThrown) {
      document.getElementById('loader').style.display = "none";
      alert("Error: Try again");
      console.log(errorThrown);
      console.log(textStatus);
      console.log(jqXHR);
    },
    complete: function() {}
  });

}
