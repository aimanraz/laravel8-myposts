import React, { Component } from "react";
import moment from "moment";

import axios from "axios";
import { withRouter } from "react-router-dom";

class PostPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            post: undefined,
        };
    }
    componentDidMount() {
        this.callAPI();
    }

    callAPI() {
        const { id } = this.props.match.params;
        console.log(id);
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
                        <img
                            src={`/storage/images/${post.image}`}
                            className="img-fluid card-img-top"
                            alt={post.title}
                        />
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
                            <a
                                href={`/posts/${post.id}/edit`}
                                className="btn btn-success rounded-pill me-2"
                            >
                                Edit
                            </a>
                            <form action={`/posts/${post.id}`} method="POST">
                                {/* You should replace this with the appropriate React way of handling CSRF tokens */}
                                {/* For example, you can use a library like axios to make the DELETE request */}
                                {/* Also, you should handle the form submission using React state and methods */}
                                {/* This form is a simple conversion for demonstration purposes */}
                                <input
                                    type="hidden"
                                    name="_method"
                                    value="DELETE"
                                />
                                <button
                                    type="submit"
                                    className="btn btn-danger rounded-pill"
                                >
                                    Delete
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(PostPage);
