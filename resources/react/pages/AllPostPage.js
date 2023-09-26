import React, { Component } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch, Link } from "react-router-dom";
import axios from "axios";

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
        console.log(`url`, url);

        axios
            .get(url)
            .then((res) => {
                console.log(url, res.data.posts);

                this.setState({
                    posts: res.data.posts,
                });
            })
            .catch((e) => {});
    }

    render() {
        const { posts } = this.state;
        return (
            <div className="row g-4 mt-1">
                {posts !== undefined && posts.length > 0 ? (
                    posts.map((post, index) => {
                        return (
                            <div className="col-lg-4" key={post.id} id={index}>
                                <div className="card shadow">
                                    <Link to={`/posts/${post.id}`}>
                                        <img
                                            src={`/storage/images/${post.image}`}
                                            className="img-fluid card-img-top"
                                            alt={post.title}
                                        />
                                    </Link>
                                    <div className="card-body">
                                        <p className="btn btn-success rounded-pill btn-sm">
                                            {post.category}
                                        </p>
                                        <div className="card-title fw-bold text-primary h4">
                                            {post.title}
                                        </div>
                                        <p className="text-secondary">
                                            {post.content}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        );
                    })
                ) : (
                    <h2 className="text-center text-secondary p-4">
                        No post found in the database!
                    </h2>
                )}
            </div>
        );
    }
}

export default AllPostPage;
