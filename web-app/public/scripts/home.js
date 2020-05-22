var apiUrl = location.protocol + '//' + location.host + "/api/";

/*
$(document).ready(function() {

  //chech if already registered as member
  $.get(apiUrl + 'userData', function(data) {

    //chech if already registered as partner
    if (data.error) {

      $.get(apiUrl + 'adminData', function(data) {

        if (data.error) {

          $.get(apiUrl + 'producerData', function(data) {

            if (data.error) {

            document.getElementById('register').style.display = "flex";
            $('.info').html(function() {
              var str = '<center><h4 align="center">Register as <b>User</b>, <b>Admin</b> or <b>Producer</b></h4></br></center>';
              return str;
            });
            return;
          } else {
            $('.info').html(function() {
              var str = '<h4>You are registered as <b>Producer</b> on the network </h4></br>';
              str = str + '<a class="btn btn-secondary" href="/producer" role="button">Access Portal</a>'
              return str;
            });
          }
          });

        } else {
          $('.info').html(function() {
            var str = '<h4>You are registered as <b>Admin</b> on the network </h4></br>';
            str = str + '<a class="btn btn-secondary" href="/admin" role="button">Access Portal</a>'
            return str;
          });
        }
      });

      return;
    } else {
      $('.info').html(function() {
        var str = '<h4>You are registered as <b>User</b> on the network </h4></br>';
        str = str + '<a class="btn btn-secondary" href="/user" role="button">Access Portal</a>'
        return str;
      });

    }
  });


});*/

$(document).ready(function() {

  //chech if already registered as member
  $.get(apiUrl + 'userExists', function(data) {

    //chech if already registered as partner
    if  (data.exists == false) {

      $.get(apiUrl + 'uAdminExists', function(data) {

        if (data.exists == false) {

          $.get(apiUrl + 'pAdminExists', function(data) {

            if (data.exists == false) {

          $.get(apiUrl + 'producerExists', function(data) {

            if (data.exists == false) {

                document.getElementById('register').style.display = "flex";
                $('.info').html(function() {
                  var str = '<center><h4 align="center">Register as <b>User</b>, <b>Admin</b> or <b>Producer</b></h4></br></center>';
                  return str;
                });
                return;
              } else {
                $('.info').html(function() {
                  var str = '<h4>You are registered as <b>Producer</b> on the network </h4></br>';
                  str = str + '<a class="btn btn-secondary" href="/producer" role="button">Access Portal</a>'
                  return str;
                });
              }
              });

            } else {
              $('.info').html(function() {
                var str = '<h4>You are registered as <b>Admin</b> on the network </h4></br>';
                str = str + '<a class="btn btn-secondary" href="/admin" role="button">Access Portal</a>'
                return str;
              });
            }
          });

        } else {
          $('.info').html(function() {
            var str = '<h4>You are registered as <b>Admin</b> on the network </h4></br>';
            str = str + '<a class="btn btn-secondary" href="/admin" role="button">Access Portal</a>'
            return str;
          });
        }
      });

      return;
    } else {
      $('.info').html(function() {
        var str = '<h4>You are registered as <b>User</b> on the network </h4></br>';
        str = str + '<a class="btn btn-secondary" href="/user" role="button">Access Portal</a>'
        return str;
      });

    }
  });


});
