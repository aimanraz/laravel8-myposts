import React, { Component } from "react";
import ReactDOM from "react-dom";

import { BrowserRouter, Route, Switch, Link, Redirect } from "react-router-dom";

import Navbar from "../components/Navbar";
import AllPostPage from "./AllPostPage";
import CreatePage from "./CreatePage";
import UpdatePage from "./UpdatePage";
import PostPage from "./PostPage";

class WelcomePage extends Component {
    render() {
        return (
            <>
                <Navbar />
                <div className="container">
                    <Switch>
                        <Route exact path="/">
                            <MainPage />
                        </Route>
                        <Route path="/create">
                            <CreatePage />
                        </Route>
                        <Route path="/update">
                            <UpdatePage />
                        </Route>
                        <Route path="/posts/:id">
                            <PostPage />
                        </Route>
                        <Route path="/posts">
                            <AllPostPage />
                        </Route>
                    </Switch>
                </div>
            </>
        );
    }
}

function MainPage() {
    return (
        <div>
            <h1>Welcome Home</h1>
            <p className="lead">
                This app will do CRUD for Post model with Laravel.
            </p>
            <hr />

            <Link to="/posts" className="btn btn-info me-2">
                View Posts
            </Link>
            <Link to="/create" className="btn btn-primary">
                Add New Post
            </Link>
        </div>
    );
}

export default WelcomePage;

const element = document.getElementById("WelcomePage");
if (element) {
    const props = Object.assign({}, element.dataset);
    ReactDOM.render(
        <BrowserRouter>
            <WelcomePage {...props} />
        </BrowserRouter>,
        element
    );
}