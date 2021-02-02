export  var sideNav = function () {
    $('#sidenav').click(function() {
        $('body').toggleClass('sidenavopened');
    })
    if ($(window).width() < 991) {
        $('body').addClass('sidenavopened');
    } else {
        $('body').removeClass('msidenavopened');
    }
}

export var emailConfirm = function(email){
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

export var enterNumber = function(email){
    $(".enterNumber").keypress(function (e) {
        //if the letter is not digit then display error and don't type anything
        if (e.which != 8 && e.which != 0 && (e.which < 48 || e.which > 57)) {
           //display error message
           $("#errmsg").html("Digits Only").show().fadeOut("slow");
                  return false;
       }
      });
}

// export var datetimepicker = function(){
// $('#datetimepicker1').datetimepicker();
// }

export var timer = function () {

    $('input[name="datetimes"]').daterangepicker({
      singleDatePicker: true,
      timePicker: true,
      startDate: moment().startOf('hour'),
    //   endDate: moment().startOf('hour').add(32, 'hour'),
      locale: {
        format: 'YYYY-MM-DD hh:mm A'
      }
    });
    $('input[name="datetimesAdd"]').daterangepicker({
        singleDatePicker: true,
        timePicker: true,
        startDate: moment().startOf('hour'),
      //   endDate: moment().startOf('hour').add(32, 'hour'),
        locale: {
          format: 'YYYY-MM-DD hh:mm A'
        }
      });

    
  
    }

