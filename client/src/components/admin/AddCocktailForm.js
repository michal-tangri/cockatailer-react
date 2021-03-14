import React, { useRef, useState } from "react";

export default function AddCocktailForm() {

    const [error, setError] = useState();
    const [success, setSuccess] = useState();
    const fileInput = useRef();

    const saveCocktails = async file => {
        const data = new FormData();
        data.append('file', file);
        await fetch(`${process.env.REACT_APP_API_URL}/cocktails?apikey=${process.env.REACT_APP_API_KEY}`, {
            method: 'POST',
            body: data,
        }).then(response => {
            if (response.status === 200)
                return setSuccess('New cocktails added!')
            setError('Something went wrong. Please try again later.')
        }).catch(error => error);
    };

    const onSubmit = e => {
        e.preventDefault();
        setError(undefined);
        setSuccess(undefined);
        const file = fileInput.current.files[0];
        if (file.type !== 'application/json')
            return setError('Only JSON files are supported!')
        saveCocktails(file)
    }

    return (
        <form onSubmit={onSubmit} encType="multipart/form-data">
            { success !== undefined ? <div className="alert alert-success">{success}</div> : <></>}
            { error !== undefined ? <div className="alert alert-danger">{error}</div> : <></>}
            <h3>Add cocktails from JSON file</h3>
            <div class="form-group files color">
                <input ref={fileInput} type="file" multiple="" name="files" />
            </div>
            <button className="common-button" style={{border: "none", width: "100%"}}>Submit</button>
        </form>
    );
}