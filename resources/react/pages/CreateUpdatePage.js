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
            image: "",
            errors: {},
            isEdit:
                props.match.params.id &&
                props.location.pathname.includes("edit"),
        };
    }

    componentDidMount() {
        if (this.state.isEdit) {
            this.fetchPostData();
        }
    }

    fetchPostData = () => {
        const { match } = this.props;
        axios
            .get(`/api/posts/${match.params.id}`)
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

    handleSubmit = (e) => {
        e.preventDefault();

        const { title, category, content, file, isEdit } = this.state;

        let params = {
            title: title,
            category: category,
            content: content,
        };

        const { match, history } = this.props;

        const apiUrl = isEdit ? `/api/posts/${match.params.id}` : "/api/posts";

        if (isEdit) {
            console.log("This is running...");
            axios
                .patch(apiUrl, params)
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
                        this.setState({
                            errors: error.response.data.errors,
                        });
                    }
                    console.error("Error creating/updating post:", error);
                });
        } else {
            axios
                .post(apiUrl, params)
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
                        this.setState({
                            errors: error.response.data.errors,
                        });
                    }
                    console.error("Error creating/updating post:", error);
                });
        }
    };

    render() {
        const { errors, isEdit } = this.state;
        const buttonText = isEdit ? "Update Post" : "Add Post";

        return (
            <div className="row my-3">
                <div className="col-lg-8 mx-auto">
                    <div className="card shadow">
                        <div className="card-header text-white bg-primary fw-bold fs-3">
                            {isEdit ? "Update Post" : "Add New Post"}
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
