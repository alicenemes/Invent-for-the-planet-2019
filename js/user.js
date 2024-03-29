type = ['', 'info', 'success', 'warning', 'danger'];


demo = {
  initPickColor: function() {
    $('.pick-class-label').click(function() {
      var new_class = $(this).attr('new-class');
      var old_class = $('#display-buttons').attr('data-class');
      var display_div = $('#display-buttons');
      if (display_div.length) {
        var display_buttons = display_div.find('.btn');
        display_buttons.removeClass(old_class);
        display_buttons.addClass(new_class);
        display_div.attr('data-class', new_class);
      }
    });
  },

  initDocumentationCharts: function() {
    /* ----------==========     Daily Sales Chart initialization For Documentation    ==========---------- */

    

    /* ----------==========     Daily Sales Chart initialization    ==========---------- */

  // dataDailySalesChart = {
  //   series: [
  //   [12, 17, 7, 17, 23, 18, 38]
  //   ]
  // };

  // optionsDailySalesChart = {
  //   lineSmooth: Chartist.Interpolation.cardinal({
  //     tension: 0
  //   }),
  //   low: 0,
  //   high: 50,
  //   chartPadding: {
  //     top: 0,
  //     right: 0,
  //     bottom: 0,
  //     left: 0
  //   },
  // }

  // var dailySalesChart = new Chartist.Line('#dailySalesChart', dataDailySalesChart, optionsDailySalesChart);

  // md.startAnimationForLineChart(dailySalesChart);



  /* ----------==========     Emails Subscription Chart initialization    ==========---------- */


}
}

$(document).ready(function() {
  dataDailySalesChart = {
    labels: [1,2,3,4,5,6,7],
    series: [
    [12, 17, 7, 17, 23, 18, 38]
    ]
  };

  optionsDailySalesChart = {
    lineSmooth: Chartist.Interpolation.cardinal({
      tension: 0
    }),
    low: 0,
    chartPadding: {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0
    },
  }

  var dailySalesChart = new Chartist.Line('#dailySalesChart', dataDailySalesChart, optionsDailySalesChart);

  $(document).ready(function() {
    dataDailySalesChart = {
      labels: [1,2,3,4,5,6,7],
      series: [
      [12, 17, 7, 17, 23, 18, 38]
      ]
    };

    optionsDailySalesChart = {
      lineSmooth: Chartist.Interpolation.cardinal({
        tension: 0
      }),
      low: 0,
      chartPadding: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0
      },
    }

    function update()
    {
      $.get('http://biabeniamin.go.ro/Watches.php?cmd=getWatches', function(data) {
              data = JSON.parse(data)
              console.log(data[data.length - 1]["pulse"])
              $('#pulse').html(data[data.length - 1]["pulse"]);
              $('#steps').html(data[data.length - 1]["step"]);
			  $('#temperature').html(data[data.length - 1]["temperature"]);
              var data1counter = 1;
              data1 = {
                labels: data.map(function(x){ return data1counter++}),
                series: [
                data.map(function(x){ return parseInt(x["step"])})
                ]
              };
              dailySalesChart.update(data1)

              var data2counter = 1;
              data2 = {
                labels: data.map(function(x){ return data2counter++}),
                series: [
                data.map(function(x){ return parseInt(x["pulse"])})
                ]
              };
              dailySalesChart2.update(data2)
			  
			  var data3counter = 1;
              data3 = {
                labels: data.map(function(x){ return data3counter++}),
                series: [
                data.map(function(x){ return parseInt(x["temperature"])})
                ]
              };
              dailySalesChart3.update(data3)
            })
    }

    var dailySalesChart2 = new Chartist.Line('#dailySalesChart2', dataDailySalesChart, optionsDailySalesChart);
	var dailySalesChart3 = new Chartist.Line('#dailySalesChart3', dataDailySalesChart, optionsDailySalesChart);

    md.startAnimationForLineChart(dailySalesChart);

    update();

    setInterval(function() {
      update();
    }, 5000)
	
    var flag = false;
	var init_flag;
	$.get({url: 'http://biabeniamin.go.ro/Notifications.php?cmd=getLastNotification'}, function(data, status) {
        data = JSON.parse(data);
		console.log(data[0].creationTime);
        init_flag = data;
      });
	
    setInterval(function() {
      $.get({url: 'http://biabeniamin.go.ro/Notifications.php?cmd=getLastNotification'}, function(data, status) {
        data = JSON.parse(data)
        console.log(data[0].creationTime)
		console.log(init_flag[0]);
        if (data[0].creationTime != init_flag[0].creationTime) {
          $('.content').prepend('<div class="alert alert-danger"><div class="container-fluid"><div class="alert-icon"><i class="material-icons">error_outline</i></div><button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true"><i class="material-icons">clear</i></span></button><b>Error Alert:</b> A fall was detected by the fall detector. Please send help.</div></div>')
          flag = true;
		  init_flag = data;
        }
      })
    },1000)
  }) ;
})