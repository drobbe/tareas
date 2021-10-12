<?php

/** @var \Laravel\Lumen\Routing\Router $router */

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It is a breeze. Simply tell Lumen the URIs it should respond to
| and give it the Closure to call when that URI is requested.
|
*/

$router->get('/', function () use ($router) {
    return "Saludos";
});

$router->get('/tasks','TaskController@index');
$router->get('/task/{id}','TaskController@get');
$router->post('/tasks','TaskController@create');
$router->put('/tasks/{id}','TaskController@updateTask');
$router->delete('/tasks/{id}','TaskController@delete');
$router->get('/tasks/find','TaskController@findByName');





