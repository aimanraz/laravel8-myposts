<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;

class PostController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        if ($request->has('id')) {
            // If 'id' parameter exists, fetch a single post by ID
            $postId = $request->input('id');
            $post = Post::find($postId);

            if (!$post) {
                return response()->json(['error' => 'Post not found'], 404);
            }

            return response()->json(['post' => $post]);
        } else {
            // If 'id' parameter is not provided, return all posts
            $posts = Post::orderBy('id', 'desc')->get();
            return response()->json(['posts' => $posts]);
        }
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required',
            'category' => 'required',
            'content' => 'required|min:10',
            'file' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:5000',
        ]);

        $imageName = time() . '.' . $request->file->extension();
        $request->file->storeAs('public/images', $imageName);

        $post = new Post();

        $post->title = $request->title;
        $post->category = $request->category;
        $post->content = $request->content;
        $post->image = $imageName;
        $post->title = $request->title;
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
        //
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
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
