import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

class AllPostPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            posts: undefined,
        };
    }

    componentDidMount() {
        this.callAPI();
    }

    callAPI() {
        let url = `/api/posts`;

        axios
            .get(url)
            .then((res) => {
                this.setState({
                    posts: res.data.posts,
                });
            })
            .catch((e) => {});
    }

    render() {
        const { posts } = this.state;
        return (
            <div className="container mt-4">
                <h1 className="mb-4">All Posts</h1>
                {posts !== undefined && posts.length > 0 ? (
                    <ul className="list-group">
                        {posts.map((post, index) => {
                            return (
                                <li
                                    key={post.id}
                                    className="list-group-item list-group-item-action"
                                >
                                    <Link
                                        to={`/posts/${post.id}`}
                                        style={{ textDecoration: "none" }}
                                    >
                                        <div className="d-flex w-100 justify-content-between">
                                            <h5 className="mb-1">
                                                {post.title}
                                            </h5>
                                            <span className="badge bg-success rounded-pill">
                                                {post.category}
                                            </span>
                                        </div>
                                        <p className="mb-1 text-secondary">
                                            {post.content}
                                        </p>
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                ) : (
                    <p className="text-center text-secondary mt-4">
                        No posts found in the database!
                    </p>
                )}
            </div>
        );
    }
}

export default AllPostPage;
