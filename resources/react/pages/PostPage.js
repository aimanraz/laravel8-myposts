import React, { Component } from "react";
import moment from "moment";

import axios from "axios";
import { Link, withRouter } from "react-router-dom";

class PostPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            post: undefined,
            csrf: this.props.csrf,
        };
    }
    componentDidMount() {
        console.log(this.state.csrf);
        this.callAPI();
    }

    callAPI() {
        const { id } = this.props.match.params;

        let url = `/api/posts`;

        console.log(`url`, url);

        axios
            .get(url, {
                params: {
                    id: id,
                },
            })
            .then((res) => {
                console.log(url, res.data.post);

                this.setState({
                    post: res.data.post,
                });
            })
            .catch((e) => {});
    }

    handleDelete = () => {
        const { id } = this.props.match.params;
        const { csrf } = this.state;
        // Include the CSRF token in the headers when making the DELETE request.
        axios
            .delete(`/api/posts/${id}`, {
                headers: {
                    "X-CSRF-TOKEN": csrf,
                },
            })
            .then((res) => {
                // Handle the successful deletion, e.g., redirect to another page.
                // You may want to add error handling here as well.
                this.props.history.push("/posts"); // Redirect to the home page or another appropriate location.
            })
            .catch((error) => {
                console.error("Delete request error: ", error);
            });
    };

    render() {
        const { post } = this.state;
        if (!post) {
            // Render a loading message or spinner while waiting for the API response.
            return <div>Loading...</div>;
        }
        return (
            <div className="row my-4">
                <div className="col-lg-8 mx-auto">
                    <div className="card shadow">
                        {/* <img
                            src={`/storage/images/${post.image}`}
                            className="img-fluid card-img-top"
                            alt={post.title}
                        /> */}
                        <div className="card-body p-5">
                            <div className="d-flex justify-content-between align-items-center">
                                <p className="btn btn-dark rounded-pill">
                                    {post.category}
                                </p>
                                <p className="lead">
                                    {moment(post.created_at).fromNow()}
                                </p>
                            </div>

                            <hr />
                            <h3 className="fw-bold text-primary">
                                {post.title}
                            </h3>
                            <p>{post.content}</p>
                        </div>
                        <div className="card-footer px-5 py-3 d-flex justify-content-end">
                            <Link
                                to={`/posts/${post.id}/edit`}
                                className="btn btn-success rounded-pill me-2"
                            >
                                Edit
                            </Link>
                            <button
                                onClick={this.handleDelete}
                                className="btn btn-danger rounded-pill"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(PostPage);
