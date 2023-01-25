<?php

function get_url($url ) {
	$url .= "?ver=".date("Ymdhis",filemtime($url)); 
    return $url;
}

function cut_str($str, $len, $suffix="…")
{
    $arr_str = preg_split("//u", $str, -1, PREG_SPLIT_NO_EMPTY);
    $str_len = count($arr_str);

    if ($str_len >= $len) {
        $slice_str = array_slice($arr_str, 0, $len);
        $str = join("", $slice_str);

        return $str . ($str_len > $len ? $suffix : '');
    } else {
        $str = join("", $arr_str);
        return $str;
    }
}


// 편의상 임시로 root경로 잡음
$root_path = $_SERVER['DOCUMENT_ROOT'].'/my-admin';
$root_url = '//'.$_SERVER['HTTP_HOST'].'/my-admin';