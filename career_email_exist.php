<?php

require_once "db.php";

if ($_SERVER['REQUEST_METHOD'] == 'POST' && isset($_POST['career_email_check']) && $_POST['career_email_check'] == 1) {

    // validate email

    $cemail = mysqli_real_escape_string($conn, $_POST['cemail']);

    $sqlcheck = "SELECT cemail FROM talent_network WHERE cemail = '$cemail' ";

    $checkResult = $conn->query($sqlcheck);

    // check if email already taken
    if ($checkResult->num_rows > 0) {
        echo "Sorry! this email already exist";
    }
}