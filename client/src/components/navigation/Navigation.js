import React from "react";
import logo from "../../logo.png";

import NavigationLink from "./NavigationLink";

function AuthDependentComponents() {

    const onLogout = () => {
        sessionStorage.clear();
        window.location.reload();
    }

    if (sessionStorage.getItem("token") !== null) {
        return (
            <>
                <NavigationLink href="/admin" text="Admin Panel" />
                <NavigationLink href="/" text="Logout" onClick={onLogout} />
            </>
        )
    }
    return (<NavigationLink href="/login" text="Admin login" />);
}

export default function Navigation() {

    return (
        <div className="row">
            <div className="col-md-12">
                <ul className="nav">
                    <img src={logo} alt="Logo" />
                    <NavigationLink href="/" text="Cocktails" />
                    <NavigationLink href="/statistics" text="Statistics" />
                    <AuthDependentComponents />
                </ul>
            </div>
        </div>
    );
}   