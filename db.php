<?php
$servername = 'localhost';
$username = 'root';
// $password = 'anarchy_1526101';
$password = '';
$dbname = "anarchy";
$conn = mysqli_connect($servername, $username, $password, "$dbname");
if (!$conn) {
  die('Could not Connect MySql Server:');
}
