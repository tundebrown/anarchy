<?php

require_once "db.php";

if ($_SERVER['REQUEST_METHOD'] == 'POST' && isset($_POST['email_check']) && $_POST['email_check'] == 1) {

    // validate email

    $email = mysqli_real_escape_string($conn, $_POST['email']);

    $sqlcheck = "SELECT email FROM user WHERE email = '$email' ";

    $checkResult = $conn->query($sqlcheck);

    // check if email already taken
    if ($checkResult->num_rows > 0) {
        echo "Sorry! this email already exist";
    }
}