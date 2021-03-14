import React, { useRef, useState } from "react";

import StarRating from "../rating/StarRating"

export default function CommentForm({ id }) {
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);
    const [selectedStars, setSelectedStars] = useState(0);

    const nameField = useRef('');
    const contentField = useRef('');

    const onSubmit = e => {
        e.preventDefault();
        const name = nameField.current.value;
        const content = contentField.current.value;

        if (name !== '' && content !== '') {
            const apikey = process.env.REACT_APP_API_KEY;
            const formBody = {
                name: name,
                content: content,
                rating: selectedStars
            }

            fetch(`${process.env.REACT_APP_API_URL}/comments/${id}?apikey=${apikey}`, {
                method: 'POST',
                body: JSON.stringify(formBody),
                headers: {
                    'Content-Type': 'application/json;charset=UTF-8'
                },
            }).then(response => response.status === 200 ? setSuccess(true) : setError(true))
                .catch(error => error);
            nameField.current.value = '';
            contentField.current.value = '';
            setSelectedStars(0);
        }
    }

    return (
        <form onSubmit={onSubmit}>
            {success ? <div className="alert alert-success">Success! Your comment must be approved by moderators. Please be patient!</div> : <></>}
            {error ? <div className="alert alert-danger">Something went wrong. Please try again later.</div> : <></>}
            <div className="form-group">
                <input ref={nameField} className="form-control" type="text" placeholder="Your name" required />
            </div>
            <div className="form-group">
                <textarea ref={contentField} className="form-control" placeholder="Your opinion" maxLength="200" required></textarea>
            </div>
            <div className="form-group">
                <StarRating selectedStars={selectedStars} setSelectedStars={setSelectedStars} />
            </div>
            <div className="form-group">
                <button className="common-button" style={{ border: "none" }}>Send</button>
            </div>
        </form>
    );
}