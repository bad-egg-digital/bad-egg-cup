<?php

/**
 * Plugin main file.
 *
 * @package   badeggdigital\bad-egg-cup
 *
 * @wordpress-plugin
 * Plugin Name:       Bad Egg Cup
 * Plugin URI:        https://github.com/bad-egg-digital/bad-egg-cup
 * Description:       Companion plugin to the Bad Egg Digital Wordpress Theme
 * Version:           1.0.1
 * Requires at least: 6.9
 * Requires PHP:      8.1
 * Author:            Bad Egg Digital
 * Author URI:        https://www.badegg.digital
 * Text Domain:       badeggcup
 * License:           GPL-3.0-or-later
 */

namespace BadEggCup;

if (!defined('ABSPATH')) {
    exit; // Exit if accessed directly.
}

define("BADEGGCUP_FILE", __FILE__);
define("BADEGGCUP_DIR", __DIR__);

foreach (glob(__DIR__ . '/*/*.php') as $badeggcup_file) {
    $badeggcup_pathinfo = pathinfo($badeggcup_file);
    $badeggcup_filename = $badeggcup_pathinfo['filename'];

    if($badeggcup_filename == 'index') continue;

    $badeggcup_dirname = str_replace(__DIR__ . '/', '', $badeggcup_pathinfo['dirname']);

    $badeggcup_classname = __NAMESPACE__ . '\\' . $badeggcup_dirname . '\\' . $badeggcup_filename;

    require_once($badeggcup_file);

    if (class_exists($badeggcup_classname)) {
        new $badeggcup_classname();
    }
}

add_action('wp_footer', function(){
    echo '<pre>',print_r(get_option('badeggcup')),'</pre>';
});
