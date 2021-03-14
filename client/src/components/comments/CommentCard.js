import React from "react";

import { FaStar } from "react-icons/fa";

export default function CommentCard({ name, content, rating }) {
    return (
        <div className="card comment-card">
            <div className="card-body">
                <h4>{name}&nbsp;{ [...Array(rating)].map((_, i) => <FaStar key={i} color="yellow" fontSize="16px" style={{marginTop: "-6px"}}/>) }</h4>
                <hr />
                <p>{content}</p>
            </div>
        </div>
    );
}