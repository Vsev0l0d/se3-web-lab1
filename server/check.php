<?php

function checkArea($x, $y, $r){
    if (($x <= $r && $x >= 0 && $y <= $r && $y >= 0) ||
        ($y <= ($x + $r) && $y >= 0 && $x <= 0) ||
        (($x*$x + $y*$y) <= $r*$r && $x <= 0 && $y <= 0)){
        return "<span style='color: green'>True</span>";
    } else {
        return "<span style='color: red'>False</span>";
    }
}

function check($x, $y, $r){
    return !in_array($x, array(-3, -2, -1, 0, 1, 2, 3, 4, 5)) ||
        !is_numeric($y) || $y <= -3 || $y >= 5 ||
        !is_numeric($r) || $r <= 2 || $r >= 5;
}

session_start();

date_default_timezone_set('Europe/Moscow');
$currentTime = date("H:i:s");
$start = microtime(true);

$x = (int) $_POST['x_value'];
$y = (float) $_POST['y_value'];
$r = (double) $_POST['r_value'];

if (check($x, $y, $r)) {
    http_response_code(400);
    return;
}

$res = checkArea ($x, $y, $r);

$time = microtime(true) - $start;

$result = array($x, $y, $r, $res, $currentTime, $time);

if (!isset($_SESSION['history'])) {
    $_SESSION['history'] = array();
}

array_push($_SESSION['history'], $result);

include "table.php";