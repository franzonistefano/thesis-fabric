var apiUrl = location.protocol + '//' + location.host + "/api/";

$(document).ready(function() {
  updateProducer();
});


function updateProducer() {

  //display loading
  document.getElementById('loader').style.display = "block";

  $.get(apiUrl + 'producerData', function(data) {

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
        var str = '<h3>' + data.producerData[1] + ' </h3>';
        str = str + '<h3>' + data.producerData[0] + ' </h3>';

        return str;
      });

      //update dashboard
      $('.dashboards').html(function() {
        var str = '';
        var totBoxOld = data.totBoxOld;
        var totBoxNew = data.totBoxNew;
        var totPointsProvided = data.totPointsProvided;
        var regenerationCredits = data.totRegenerationCredits;

        console.log('Tot Box Old: ' + totBoxOld);
        console.log('Tot Box New: ' + totBoxNew);
        console.log('Tot Points Provided: ' + totPointsProvided);
        console.log('Regeneration Credits: ' + regenerationCredits);

        str = str + '<h3>' + totPointsProvided + ' </h3>';
        str = str + '<h3>' + regenerationCredits + ' </h3>';
        str = str + '<h3>' + totBoxOld + ' </h3>';
        str = str + '<h3>' + totBoxNew + ' </h3>';
        return str;
      });

      //check input and call server
      $('.evaluate-box-transaction').click(function() {

        var points = $('.boxPoints input').val();
        evaluateBox(points);
      });

      //next box
      $('.next-box').html(function() {
        var str = '';
        var nextRequest = data.nextRequest;

        if(nextRequest != 0){
          str = str + '<p><b>Admin Address</b>: ' + nextRequest[0] + '<br /><b>T-Shirt</b>: ' + nextRequest[1] + '<br /><b>Pants</b>: ' + nextRequest[2] + '<br /><b>Jackets</b>: ' + nextRequest[3];
          str = str + '<br /><b>Other</b>: ' + nextRequest[4] + '<br /><b>Evaluated</b>: ' + nextRequest[5] + '<br /><b>Points</b>: ' + nextRequest[6] + '</p><br>';
        } else {
          str = str + '<p>No More Pending Requests to Evaluate</p>'
        }
        return str;
      });

      //update all pending-box
      $('.pending-box').html(function() {
        var str = '';
        var pendingRequest = data.pendingRequest;

        for (var i = 0; i < pendingRequest.length; i++) {

          str = str + '<p><b>Admin Address</b>: ' + pendingRequest[i][0] + '<br /><b>T-Shirt</b>: ' + pendingRequest[i][1] + '<br /><b>Pants</b>: ' + pendingRequest[i][2] + '<br /><b>Jackets</b>: ' + pendingRequest[i][3];
          str = str + '<br /><b>Other</b>: ' + pendingRequest[i][4] + '<br /><b>Evaluated</b>: ' + pendingRequest[i][5] + '<br /><b>Points</b>: ' + pendingRequest[i][6] + '</p><br>';

        }
        return str;
      });

      //update all pending-box
      $('.upcycled-box').html(function() {
        var str = '';
        var upCycledRequest = data.upCycledRequest;

        for (var i = 0; i < upCycledRequest.length; i++) {

          str = str + '<p><b>Admin Address</b>: ' + upCycledRequest[i][0] + '<br /><b>T-Shirt</b>: ' + upCycledRequest[i][1] + '<br /><b>Pants</b>: ' + upCycledRequest[i][2] + '<br /><b>Jackets</b>: ' + upCycledRequest[i][3];
          str = str + '<br /><b>Other</b>: ' + upCycledRequest[i][4] + '<br /><b>Evaluated</b>: ' + upCycledRequest[i][5] + '<br /><b>Points</b>: ' + upCycledRequest[i][6] + '</p><br>';

        }
        return str;
      });

  //update all pending-box
  $('.evaluated-box').html(function() {
    var str = '';
    var evaluatedRequest = data.evaluatedRequest;

    for (var i = 0; i < evaluatedRequest.length; i++) {

      str = str + '<p><b>Admin Address</b>: ' + evaluatedRequest[i][0] + '<br /><b>T-Shirt</b>: ' + evaluatedRequest[i][1] + '<br /><b>Pants</b>: ' + evaluatedRequest[i][2] + '<br /><b>Jackets</b>: ' + evaluatedRequest[i][3];
      str = str + '<br /><b>Other</b>: ' + evaluatedRequest[i][4] + '<br /><b>Evaluated</b>: ' + evaluatedRequest[i][5] + '<br /><b>Points</b>: ' + evaluatedRequest[i][6] + '</p><br>';

    }
    return str;
  });

  //display transaction section
  document.getElementById('transactionSection').style.display = "block";

  //hide loading
  document.getElementById('loader').style.display = "none";
}
});

  function evaluateBox(points) {

    //get user input data
    var formProxy = $('.proxy input').val();
    var formContractAddress = $('.contractAddress input').val();

    //create json data
    var inputData = '{' + '"proxy" : "' + formProxy + '", ' + '"points" : "' + points + '"}';
    console.log(inputData)

    //make ajax call
    $.ajax({
      type: 'POST',
      url: apiUrl + 'evaluateOldBox',
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
          updateProducer();
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

}