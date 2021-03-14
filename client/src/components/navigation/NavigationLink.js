import React from "react";

import { Link } from "react-router-dom";

export default function NavigationLink({href, text, onClick= f => f }) {
    return (
        <li className="nav-item">
            <Link className="nav-link" to={href} onClick={onClick}>{text}</Link>
        </li>
    );
}