<?php

namespace BadEggCup\Tools;

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

        if($settings) {
            if($group && array_key_exists($group, $settings)) {
                $groupSettings = $settings[$group];

                if($field && array_key_exists($field, $groupSettings)) {
                    return $groupSettings[$field];
                } else {
                    return false;
                }
            } elseif($field && array_key_exists($field, $settings)){
                return $settings[$field];
            } else {
                return false;
            }
        }
    }

    public function companySocials() {
        if(current_theme_supports('badeggcup-companySocials')) {
            $socials = $this->lookup('socials', 'company');

            $socials = array_filter($socials, function($social){
                if(filter_var($social['link'], FILTER_VALIDATE_URL)) {
                    return isset($social['link']) && filter_var($social['link'], FILTER_VALIDATE_URL);
                }
            });

            return $socials;

        } else {
            return false;
        }
    }

    public function companyAddress() {
        if(current_theme_supports('badeggcup-companyAddress')) {
            return $this->lookup('address', 'company');
        } else {
            return false;
        }
    }

    public function companyAddressMailing()
    {
        if(current_theme_supports('badeggcup-companyAddressMailing')) {
            return $this->lookup('addressMailing', 'company');
        } else {
            return false;
        }
    }
}
