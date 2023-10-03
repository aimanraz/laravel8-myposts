<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class PostController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        // If 'id' parameter is not provided, return all posts
        $posts = Post::orderBy('id', 'desc')->get();
        return response()->json(['posts' => $posts]);

    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */

    public function store(Request $request)
    {

        $validator = Validator::make($request->all(),[
            'title' => 'required|string|max:255',
            'category' => 'required|string|max:255',
            'content' => 'required|string',
        ]);

        // $validator = Validator::make($request->all(),[
        //     'title' => 'required|string|max:255',
        //     'category' => 'required|string|max:255',
        //     'content' => 'required|string',
        //     'file' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:5000',
        // ]);

        if ($validator->fails()){
            return response()->json(['errors'=>$validator->errors()], 422);
        }

        $post = new Post();

        $post->title = $request->title;
        $post->category = $request->category;
        $post->content = $request->content;
        $post->save();

        // Return a JSON response indicating success
        return response()->json(['message' => 'Post added successfully', 'status' => 'success']);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
            $post = Post::find($id);

            if (!$post) {
                return response()->json(['error' => 'Post not found'], 404);
            }

            return response()->json(['post' => $post]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */

    public function update(Request $request, $id)
    {
        $post = Post::find($id);

        $validator = Validator::make($request->all(),[
            'title' => 'required|string|max:255',
            'category' => 'required|string|max:255',
            'content' => 'required|string',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:5000',
        ]);

        if ($validator->fails()){
        return response()->json(['errors'=>$validator->errors()], 422);
        }

        // $imageName = '';
        // if ($request->hasFile('image')) {
        //     $imageName = time() . '.' . $request->file->extension();
        //     $request->file->storeAs('public/images', $imageName);
        //     if ($post->image) {
        //         Storage::delete('public/images/' . $post->image);
        //     }
        // } else {
        //     $imageName = $post->image;
        // }

        // Update the post data
        $post->title = $request->title;
        $post->category = $request->category;
        $post->content = $request->content;

        // Save the updated post
        $post->save();

        return response()->json(['message' => 'Post updated successfully'], 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Post $post) {
        // Check if the post exists
        if (!$post) {
            return response()->json(['message' => 'Post not found'], 404);
        }

        // Delete the image file
        Storage::delete('public/images/' . $post->image);

        // Delete the post
        $post->delete();

        return response()->json(['message' => 'Post deleted successfully']);
    }
}
