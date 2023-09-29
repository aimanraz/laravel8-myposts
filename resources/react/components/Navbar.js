import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Link } from "react-router-dom";

class Navbar extends Component {
    constructor(props) {
        super(props);

        this.state = {};
    }
    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-light bg-light mb-4">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">
                        BlogPost
                    </Link>
                    <hr className="my-0 mx-4 border-primary" />
                    <div className="d-flex flex-row ml-auto">
                        <Link className="nav-link me-3" to="/">
                            Home
                        </Link>
                        <Link className="nav-link" to="/posts">
                            Posts
                        </Link>
                    </div>
                </div>
            </nav>
        );
    }
}

export default Navbar;
