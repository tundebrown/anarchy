<?php

require_once "db.php";



    $query = "SELECT url FROM redirect WHERE id = 1 ";
    $result = mysqli_query($conn, $query);

    $row = mysqli_fetch_assoc($result);
    // echo $row['url'];

    header("Location: https://".$row['url']."");
    die();
?>