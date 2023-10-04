import React, { Component } from "react";
import axios from "axios";
import moment from "moment";
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
                <div className="d-flex flex-direction-row justify-content-between align-items-center">
                    <h1 className="mb-4">Post List</h1>
                    <Link className="btn btn-primary" to={"/create"}>
                        Add a new one?
                    </Link>
                </div>
                <hr />
                <div className="row g-4 mt-1">
                    {posts !== undefined && posts.length > 0 ? (
                        posts.map((post, index) => {
                            return (
                                <div
                                    className="col-lg-4"
                                    key={post.id}
                                    id={index}
                                >
                                    <div className="card shadow">
                                        <img
                                            src={`storage/images/${post.image}`}
                                            className="card-img-top img-fluid"
                                        />
                                        <div className="card-body">
                                            <p className="btn btn-success rounded-pill btn-sm">
                                                {post.category}
                                            </p>
                                            <Link
                                                to={`/posts/${post.id}`}
                                                style={{
                                                    textDecoration: "none",
                                                }}
                                            >
                                                <div className="card-title fw-bold text-primary h4">
                                                    {post.title}
                                                </div>
                                            </Link>
                                            <p className="text-secondary">
                                                {`${post.content.substring(
                                                    0,
                                                    30
                                                )}${
                                                    post.content.length > 30
                                                        ? "... "
                                                        : ""
                                                }`}
                                                {post.content.length > 30 && (
                                                    <Link
                                                        to={`/posts/${post.id}`}
                                                        style={{
                                                            textDecoration:
                                                                "none",
                                                        }}
                                                    >
                                                        Read More
                                                    </Link>
                                                )}
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
            </div>
        );
    }
}

export default AllPostPage;

// function groupList(){
//     return (<div>
//                         {posts !== undefined && posts.length > 0 ? (
//                     <ul className="list-group">
//                         {posts.map((post, index) => {
//                             return (
//                                 <li
//                                     key={post.id}
//                                     className="list-group-item list-group-item-action"
//                                 >
//                                     <Link
//                                         to={`/posts/${post.id}`}
//                                         style={{ textDecoration: "none" }}
//                                     >
//                                         <div className="d-flex w-100 justify-content-between align-items-center">
//                                             <h5 className="mb-1">
//                                                 {post.title}
//                                             </h5>
//                                             <span className="badge bg-success rounded-pill">
//                                                 {post.category}
//                                             </span>
//                                         </div>
//                                     </Link>
//                                 </li>
//                             );
//                         })}
//                     </ul>
//                 ) : (
//                     <p className="text-center text-secondary mt-4">
//                         No posts found in the database!
//                     </p>
//                 )}
//     </div>)
// }
