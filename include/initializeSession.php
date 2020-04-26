<?php

/**
 * @global mixed $_SESSION["user"]
 * @global Timestamp $_SESSION["creationTimestamp"]
 */

session_name("Astro_v0_1");
session_start();

if (!isset($_SESSION["user"])) {
    $_SESSION["user"] = null;
}

if (!isset($_SESSION["creationTimestamp"])) {
    $_SESSION["creationTimestamp"] = time();
}

