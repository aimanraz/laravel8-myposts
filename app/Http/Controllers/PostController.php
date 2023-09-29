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
        $post = Post::find($id);

        $validator = Validator::make($request->all(),[
            'title' => 'required|string|max:255',
            'category' => 'required|string|max:255',
            'content' => 'required|string',
            'file' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:5000', // Adjust file validation rules as needed
        ]);

        if ($validator->fails()){
        return response()->json(['errors'=>$validator->errors()], 422);
        }

        // Handle file upload if a new file is provided
        if ($request->hasFile('file')) {
            $file = $request->file('file');
            $imageName = time() . '.' . $file->getClientOriginalExtension();
            $file->storeAs('public/images', $imageName);

            // Delete the old image if it exists
            if ($post->image) {
                Storage::delete('public/images/' . $post->image);
            }

            $post->image = $imageName;
        }

        // Update the post data
        $post->title = $request->title;
        $post->category = $request->category;
        $post->content = $request->content;

        // Save the updated post
        $post->save();

        return response()->json(['message' => 'Post updated successfully'], 200);


        // try {
        //     // Validate the incoming request data
        //     $validatedData = $request->validate([
        //         'title' => 'required|string|max:255',
        //         'category' => 'required|string|max:255',
        //         'content' => 'required|string',
        //         'file' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:5000', // Adjust file validation rules as needed
        //     ]);

        //     // Handle file upload if a new file is provided
        //     if ($request->hasFile('file')) {
        //         $file = $request->file('file');
        //         $imageName = time() . '.' . $file->getClientOriginalExtension();
        //         $file->storeAs('public/images', $imageName);

        //         // Delete the old image if it exists
        //         if ($post->image) {
        //             Storage::delete('public/images/' . $post->image);
        //         }

        //         $post->image = $imageName;
        //     }

        //     // Update the post data
        //     $post->title = $validatedData['title'];
        //     $post->category = $validatedData['category'];
        //     $post->content = $validatedData['content'];

        //     // Save the updated post
        //     $post->save();

        //     return response()->json(['message' => 'Post updated successfully'], 200);
        // } catch (\Exception $e) {
        //     return response()->json(['error' => 'Error updating post'], 500);
        // }
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
