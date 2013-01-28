<?php

// Not going to bother with location headers
define('LOCATION', 'USVA0068');

/**
 * Fetch weather data from Yahoo (since they don't require an account, which is
 * awesome). Consult http://developer.yahoo.com/weather/#codes for information
 * on their condition codes.
 *
 * Unfortunately they only provide 2 days in their forecast, today and
 * tommorrow (will probably change this...)
 */
function get_forecast() {
  $query = 'select item from weather.forecast where location="'.LOCATION.'"';
  $query = urlencode($query);

  // Form URL
  $url = "http://query.yahooapis.com/v1/public/yql?q=$query&format=json";

  // Fetch
  $result = json_decode(file_get_contents($url));

  // Get rid of query metadata
  return json_encode($result->query->results->channel->item);
}

$forecast = get_forecast();

if (isset($_GET['callback'])) {
  $forecast = "{$_GET['callback']}($forecast)";
}

header('Content-Type: application/json');

echo $forecast;

?>
