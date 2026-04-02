<?php

namespace BadEggCup\Utilities;

class Settings
{
    public function __construct()
    {

    }

    public function loadJSON($json = '')
    {
        $file = BADEGGCUP_DIR . '/src/json/' . $json . '.json';

        if(file_exists($file)) {
            return json_decode(file_get_contents($file), true);

        } else {
            return [];

        }
    }

    public function lookup($field = null, $group = null)
    {
        $settings = get_option('badeggcup');

        if(!$settings) return false;

        if($group && isset($settings[$group]) && isset($settings[$group][$field])) {
            return $settings[$group][$field];
        } elseif(isset($settings[$field])) {
            return $settings[$field];
        } else {
            return false;
        }
    }
}
