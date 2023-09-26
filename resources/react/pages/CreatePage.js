import React, { Component } from "react";
import axios from "axios";

class CreatePostForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "",
            category: "",
            content: "",
            file: null,
            errors: {},
            showFileInput: true, // Initially set to true
        };
    }

    handleInputChange = (e) => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    };

    handleFileChange = (e) => {
        this.setState({ file: e.target.files[0] });
    };

    validateForm = () => {
        const { title, category, content, file } = this.state;
        const errors = {};

        if (!title.trim()) {
            errors.title = "Title is required";
        }

        if (!category.trim()) {
            errors.category = "Category is required";
        }

        if (!content.trim()) {
            errors.content = "Content is required";
        }

        if (!file) {
            errors.file = "Image is required";
        }

        this.setState({ errors });
        return Object.keys(errors).length === 0;
    };

    handleSubmit = (e) => {
        e.preventDefault();
        if (this.validateForm()) {
            const formData = new FormData();
            formData.append("title", this.state.title);
            formData.append("category", this.state.category);
            formData.append("content", this.state.content);
            formData.append("file", this.state.file);

            axios
                .post("/api/posts", formData)
                .then((response) => {
                    console.log("Post created successfully:", response.data);
                    // Reload the page to clear the form fields
                    window.location.reload();
                })
                .catch((error) => {
                    if (error.response && error.response.data) {
                        this.setState({ errors: error.response.data.errors });
                    }
                    console.error("Error creating post:", error);
                });
        }
    };

    render() {
        const { errors } = this.state;

        return (
            <div className="row my-3">
                <div className="col-lg-8 mx-auto">
                    <div className="card shadow">
                        <div className="card-header bg-primary">
                            <h3 className="text-light fw-bold">Add New Post</h3>
                        </div>
                        <div className="card-body p-4">
                            <form
                                onSubmit={this.handleSubmit}
                                encType="multipart/form-data"
                            >
                                <div className="my-2">
                                    <input
                                        type="text"
                                        name="title"
                                        value={this.state.title}
                                        onChange={this.handleInputChange}
                                        className={`form-control ${
                                            errors.title ? "is-invalid" : ""
                                        }`}
                                        placeholder="Title"
                                    />
                                    {errors.title && (
                                        <div className="invalid-feedback">
                                            {errors.title}
                                        </div>
                                    )}
                                </div>

                                <div className="my-2">
                                    <input
                                        type="text"
                                        name="category"
                                        value={this.state.category}
                                        onChange={this.handleInputChange}
                                        className={`form-control ${
                                            errors.category ? "is-invalid" : ""
                                        }`}
                                        placeholder="Category"
                                    />
                                    {errors.category && (
                                        <div className="invalid-feedback">
                                            {errors.category}
                                        </div>
                                    )}
                                </div>

                                <div className="my-2">
                                    <input
                                        type="file"
                                        name="file"
                                        accept="image/*"
                                        onChange={this.handleFileChange}
                                        className={`form-control ${
                                            errors.file ? "is-invalid" : ""
                                        }`}
                                    />
                                    {errors.file && (
                                        <div className="invalid-feedback">
                                            {errors.file}
                                        </div>
                                    )}
                                </div>

                                <div className="my-2">
                                    <textarea
                                        name="content"
                                        value={this.state.content}
                                        onChange={this.handleInputChange}
                                        rows="6"
                                        className={`form-control ${
                                            errors.content ? "is-invalid" : ""
                                        }`}
                                        placeholder="Post Content"
                                    />
                                    {errors.content && (
                                        <div className="invalid-feedback">
                                            {errors.content}
                                        </div>
                                    )}
                                </div>

                                <div className="my-2">
                                    <input
                                        type="submit"
                                        value="Add Post"
                                        className="btn btn-primary"
                                    />
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default CreatePostForm;
