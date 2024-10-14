<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
  // Check if all variables are present
  if (!isset($_POST['name']) || !isset($_POST['website']) || !isset($_POST['phone'])) {
    http_response_code(400);
    exit();
  }

  $name = strip_input($_POST['name']);
  $website = strip_input($_POST['website']);
  $phone = strip_input($_POST['phone']);

  $nameRegex = '/^[a-zа-яё\ ]{0,}$/i';
  $siteRegex =  '/^[^@\ ]+\.[^@\ ]{2,}$/i';
  $phoneRegex = '/^[+]?[ 0-9()-]+$/';

  // Validate values
  if (!preg_match($nameRegex, $name) || !preg_match($siteRegex, $website) || !preg_match($phoneRegex, $phone)) {
    http_response_code(400);
    exit();
  }

  // Write to logfile
  $logfile = fopen("logfile.csv", "a") or die("Unable to open file!");
  $string = date("H:i:s Y-m-d") . "," . $name . "," . $website . "," . $phone . "\n";
  fwrite($logfile, $string);
  fclose($logfile);
}

function strip_input($data) {
  $data = trim($data);
  $data = htmlspecialchars($data);

  return $data;
}
