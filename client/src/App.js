import './App.scss';
import './FileUpload.scss';

import React from "react";
import dotenv from "dotenv";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";

import CocktailsList from "./components/cocktails/CocktailsList";
import CocktailPage from "./components/cocktails/CocktailPage";
import Navigation from "./components/navigation/Navigation";
import LoginForm from "./components/admin/LoginForm";
import AdminPanel from "./components/admin/AdminPanel";
import StatCategories from "./components/statistics/StatCategories";
import NotFound from "./components/NotFound";

dotenv.config()

function App() {

    return (
        <div className="container">
            <Router>
                <Navigation />

                <Switch>
                    <Route exact path="/">
                        <CocktailsList />
                    </Route>

                    <Route exact path="/cocktails/:id">
                        <CocktailPage />
                    </Route>

                    <Route exact path="/login">
                        {sessionStorage.getItem("token") === null ? <LoginForm /> : <Redirect to="/" /> }
                    </Route>

                    <Route path="/admin" component={AdminPanel} />
                        
                    <Route path="/statistics" component={StatCategories} />

                    <Route component={NotFound} />

                </Switch>

            </Router>
        </div>
    );
}

export default App;