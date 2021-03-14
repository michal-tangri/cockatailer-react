import React from "react";

import CommentCard from "../comments/CommentCard";

export default function CommentApproval({ commentsState, setCommentsState }) {

    const apikey = process.env.REACT_APP_API_KEY;
    const onApprove = id => {
        fetch(`${process.env.REACT_APP_API_URL}/comments/unapproved/${id}?apikey=${apikey}`, {
            method: "POST"
        }).then(response => {
            if (response.status === 200) {
                let updatedComments = commentsState.filter(comment => comment.commentId !== id)
                setCommentsState(updatedComments);
            }
        })
    }

    const onDelete = id => {
        fetch(`${process.env.REACT_APP_API_URL}/comments/unapproved/${id}?apikey=${apikey}`, {
            method: "DELETE"
        }).then(response => {
            if (response.status === 200) {
                let updatedComments = commentsState.filter(comment => comment.commentId !== id)
                setCommentsState(updatedComments);
            }
        })

    }

    if (commentsState.length === 0) {
        return (
            <>
                <h3>Comments to approve</h3>
                <div className="alert alert-success">No comments to approve :)</div>
            </>
        )
    }

    return (
        <>
            <h3>Comments to approve</h3>
            <div style={{ maxHeight: "600px", overflow: "auto" }}>
                {
                    commentsState.map((comment, i) => {
                        return (
                            <>
                                <CommentCard key={i} name={comment.name} content={comment.content} rating={comment.rating} />
                                <p className="btn btn-success" style={{width: "50%"}} onClick={() => onApprove(comment.commentId)}>Approve</p>
                                <p className="btn btn-danger" style={{width: "50%"}} onClick={() => onDelete(comment.commentId)}>Delete</p>
                            </>
                        );
                    })
                }
            </div>
        </>

    );
}