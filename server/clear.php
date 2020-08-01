<?php
session_start();

if (isset($_SESSION['history'])) {
    $_SESSION['history'] = array();
}

include "table.php";
