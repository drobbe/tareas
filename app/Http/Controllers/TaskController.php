<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Illuminate\Http\Request;

class TaskController extends Controller {


    public function index() {
        $task = Task::all();

        return response()->json(['status'=>'ok','data'=>$task]);

    }

    public function get($id){
        
        $task = Task::find($id);

        if($task){
            return response()->json(['status'=>'ok','data'=>$task]);
        }else{
            return response()->json(['status'=>'ok','data'=>null]);
        }
    }

    public function create(Request $request){
        $request = $request->json()->all();

        $task = new Task;
        $task->name = $request['name'];
        $task->completed = $request['completed'];
        $task->save();
        return  response()->json(['status'=>'ok','data'=>$task],201);
       
    }

    public function updateTask(Request $request,$id){
        $task = Task::find($id);
        $request = $request->json()->all();
        if (isset($request['name'])) {
            $task->name = $request['name'];
        }
        if (isset($request['completed'])) {
            $task->completed = $request['completed'];
        }
        $task->save();

        return  response()->json(['status'=>'ok','data'=>$task],201);
        
    }
    
    public function delete($id){
        $task = Task::find($id);
        $task->delete();
        return  response()->json(['status'=>'ok','data'=>null],200);
        
    }

    public function findByName($request){
        
        $task = Task::where('name', 'like', '%');
        return  response()->json(['status'=>'ok','data'=>$task]);
        
        

    }

}