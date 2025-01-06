<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\DB;

// Route::get('/', function () {
//     return view('welcome');
// });


Route::get('/test-mongo', function () {
    try {
        $databases = DB::connection('mongodb')->getMongoClient()->listDatabases();
        return response()->json($databases);
    } catch (\Exception $e) {
        return response()->json(['error' => $e->getMessage()], 500);
    }
});