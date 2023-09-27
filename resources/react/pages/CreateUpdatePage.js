import React, { Component } from "react";
import axios from "axios";
import { withRouter } from "react-router-dom";

class CreateUpdatePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "",
            category: "",
            content: "",
            file: null,
            errors: {},
            isEdit:
                props.match.params.id &&
                props.location.pathname.includes("edit"),
        };
    }

    componentDidMount() {
        const { isEdit } = this.state;
        if (isEdit) {
            this.fetchPostData();
        }
    }

    fetchPostData = () => {
        const { match } = this.props;
        axios
            .get(`/api/posts`, {
                params: {
                    id: match.params.id,
                },
            })
            .then((response) => {
                const { title, category, content } = response.data.post;
                this.setState({ title, category, content });
            })
            .catch((error) => {
                console.error("Error fetching post data:", error);
            });
    };

    handleInputChange = (e) => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    };

    handleFileChange = (e) => {
        this.setState({ file: e.target.files[0] });
    };

    validateForm = () => {
        const { title, category, content, file, isEdit } = this.state;
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

        if (!isEdit && !file) {
            errors.file = "Image is required";
        }

        this.setState({ errors });
        return Object.keys(errors).length === 0;
    };

    handleSubmit = (e) => {
        e.preventDefault();
        if (this.validateForm()) {
            const { title, category, content, file, isEdit } = this.state;
            const formData = new FormData();
            formData.append("title", title);
            formData.append("category", category);
            formData.append("content", content);
            formData.append("file", file);

            const { match, history } = this.props;

            const apiUrl = isEdit
                ? `/api/posts/${match.params.id}`
                : "/api/posts";

            const httpMethod = isEdit ? "patch" : "post";

            console.log("message", isEdit, formData, title);

            // return;

            axios({
                method: httpMethod,
                url: apiUrl,
                data: formData,
            })
                .then((response) => {
                    console.log(
                        "Post created/updated successfully:",
                        response.data
                    );

                    // After a successful post creation/update, navigate to the /posts page
                    history.push("/posts");
                })
                .catch((error) => {
                    if (error.response && error.response.data) {
                        this.setState({ errors: error.response.data.errors });
                    }
                    console.error("Error creating/updating post:", error);
                });
        }
    };

    render() {
        const { errors, isEdit } = this.state;
        const buttonText = isEdit ? "Update Post" : "Add Post";

        // Check if 'post' is defined before accessing its properties
        const title = this.state.title || "";
        const category = this.state.category || "";
        const content = this.state.content || "";

        return (
            <div className="row my-3">
                <div className="col-lg-8 mx-auto">
                    <div className="card shadow">
                        <div className="card-header bg-primary">
                            <h3 className="text-light fw-bold">
                                {isEdit ? "Update Post" : "Add New Post"}
                            </h3>
                        </div>
                        <div className="card-body p-4">
                            <form
                                onSubmit={this.handleSubmit}
                                encType="multipart/form-data"
                            >
                                {/* ... Input fields for title, category, file, and content ... */}
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
                                        value={buttonText}
                                        className={`btn ${
                                            isEdit
                                                ? "btn-success"
                                                : "btn-primary"
                                        }`}
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

export default withRouter(CreateUpdatePage);