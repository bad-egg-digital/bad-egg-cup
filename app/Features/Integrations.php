<?php

namespace BadEggCup\Features;
use BadEggCup\Tools;

class Integrations
{
    public function __construct()
    {
        if(current_theme_supports('badeggcup-integrationsPlausible')) {
            add_action('wp_head', [$this, 'plausibleAnalytics']);
        }

        if(current_theme_supports('badeggcup-integrationsFathom')) {
            add_action( 'wp_head',  [$this, 'FathomAnalytics']);
        }
    }

    public function PlausibleAnalytics()
    {
        $Settings = new Tools\Settings;

        $host = $Settings->lookup('plausibleHost', 'integrations');
        $id = $Settings->lookup('plausibleID', 'integrations');

        if(filter_var($host, FILTER_VALIDATE_URL) && $host && $id): ?>

<!-- Privacy-friendly analytics by Plausible -->
<script async src="<?= rtrim($host, '/') ?>/js/pa-<?= $id ?>.js"></script>
<script>
window.plausible=window.plausible||function(){(plausible.q=plausible.q||[]).push(arguments)},plausible.init=plausible.init||function(i){plausible.o=i||{}};
plausible.init()
</script>

        <?php endif;
    }

    public function FathomAnalytics()
    {
        $Settings = new Tools\Settings;
        $fathomID = $Settings->lookup('fathomID', 'integrations');

        if($fathomID && WP_ENV == 'production'): ?>

<!-- Fathom - beautiful, simple website analytics -->
<script src="https://cdn.usefathom.com/script.js" data-site="<?= $fathomID ?>" defer></script>
<!-- / Fathom -->

        <?php endif;
    }
}
