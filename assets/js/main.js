$(function() {
  var $date = $('#date'), $time = $('#time'), $weather = $('#weather');
  var dateUpdater, timeUpdater, weatherUpdater;

  function timeUntilTomorrow() {
    return moment().eod().subtract('ms', Date.now()).milliseconds();
  }

  function updateDate() {
    $date.html(moment().format('dddd, MMMM Do'));

    // Update again tomorrow
    dateUpdater = setTimeout(updateDate, timeUntilTomorrow());
  }

  function updateTime() {
    var html = '';

    $.each(moment().format('HH mm ss').split(' '), function(i, value) {
      html += '<span>' + value + '</span>';

      if (i < 2) {
        html += '<span class="separator">:</span>';
      }
    });

    $time.html(html);

    if (timeUpdater == null) {
      timeUpdater = setInterval(updateTime, 3000);
    }
  }

  // Maps icons from the Meteocon set to Yahoo Weather condition codes (see
  // data/weather.php for more information)
  var weatherIconsMap = {
    'F': [0],
    'Z': [1, 2, 3],
    'O': [4, 37, 38, 39, 45, 47],
    'X': [5, 6, 7, 17, 18, 35],
    'Q': [8, 9, 10, 40],
    'R': [11, 12],
    'U': [13, 14, 15, 42, 46],
    'W': [16],
    'M': [19, 20, 21, 22],
    'F': [23, 24],
    'G': [25],
    'N': [26, 44],
    'H': [27, 29],
    'I': [28, 30],
    'C': [31, 33],
    'B': [32, 34, 36],
    'W': [41, 43],
    ')': [3200]
  };

  function weatherIcon(code) {
    var icon;
    code = parseInt(code);

    $.each(weatherIconsMap, function(key, codes) {
      if (codes.indexOf(code) != -1) {
        icon = key;
        return false;
      }
    });

    return icon;
  }


  // Display temperature, in Celsius
  function displayTemp(low, high) {
    function convert(f) {
      return '<span title="' + f + '&deg; F">' + (5/9*(f-32)).toFixed(1)
        + '</span>'
    }

    return '<span class="temperature">' + convert(low)
      + (high ? '&ndash;' + convert(high) : '') + '&deg; C</span>'
  }

  function updateWeather() {
    $.getJSON('/data/weather.php', function(data) {
      var current = data.condition;
      var html =
        '<div class="current">'
      +   '<span class="icon">' + weatherIcon(current.code) + '</span>'
      +   '<p>' + displayTemp(current.temp) + '<br />' + current.text + '</p>'
      +   '<h1>Now</h1>'
      + '</div>';

      $.each(data.forecast, function(index, forecast) {
        html +=
          '<div class="forecast forecast-' + index + '">'
        +   '<span class="icon">' + weatherIcon(forecast.code) + '</span>'
        +   '<p>' + displayTemp(forecast.low, forecast.high) + '<br />'
        +     forecast.text + '</p>'
        +   '<h1>' + moment(forecast.date).format('dddd') + '</h1>'
        + '</div>'
      });

      $weather.html(html);
    });

    if (weatherUpdater == null) {
      weatherUpdater = setInterval(updateWeather, 15 * 60 * 1000);
    }
  }

  updateDate();
  updateTime();
  updateWeather();
});
