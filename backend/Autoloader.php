<?php

spl_autoload_register(function ($class) {
    $folders = ['config', 'controllers', 'models'];

    foreach ($folders as $folder) {
        $filePath = __DIR__ . '/' . $folder . '/' . $class . '.php';

        if (file_exists($filePath)) {
            require_once $filePath;
            return;
        }
    }
});
