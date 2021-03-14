import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { FaCheck, FaHome, FaDownload, FaPlus } from "react-icons/fa"
import { IoClose } from "react-icons/io5"

import TableRow from "./TableRow";
import CommentForm from "../comments/CommentForm";
import CommentCard from "../comments/CommentCard";

export default function CocktailPage() {
    const [showCommentForm, setShowCommentForm] = useState(false);

    const [cocktail, setCocktail] = useState({ waitForResponse: true });
    const [comments, setComments] = useState({ waitForResponse: true });

    const { id } = useParams();

    const callAPI = async (id) => {
        await fetch(`${process.env.REACT_APP_API_URL}/cocktails/${id}?apikey=${process.env.REACT_APP_API_KEY}`)
            .then(response => response.status === 200 ? response.json() : null)
            .then(response => response !== null ? setCocktail(response): setCocktail({}))
            .catch(error => console.log(error));

        await fetch(`${process.env.REACT_APP_API_URL}/comments/${id}?apikey=${process.env.REACT_APP_API_KEY}`)
            .then(response => response.status === 200 ? response.json() : null)
            .then(response => response !== null ? setComments(response) : setComments({}))
            .catch(error => console.log(error));
    }

    useEffect(() => callAPI(id), [id]);

    /* Czy można pobierać JSON czy ma to być inny format (bardziej czytelny dla użytkownika końcowego) */
    const downloadRecipe = () => {
        const { id, ...data } = cocktail;
        const blob = new Blob([JSON.stringify(data)], { type: 'application/json' });
        const downloadURL = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.download = `${cocktail.name}.json`;
        link.href = downloadURL;
        link.click();
    }


    if (cocktail.waitForResponse !== undefined || comments.waitForResponse !== undefined) {
        return null;
    } else if (cocktail.id === undefined) {
        return (
            <>
                <div className="row">
                    <div className="col-md-12">
                        <div className="alert alert-danger">Cocktail with this ID does not exist!</div>
                    </div>
                </div>
                <div className="row text-center go-back-btn">
                    <div className="col-lg-12">
                        <Link className="common-button" to="/">Back to main page</Link>
                    </div>
                </div>
            </>
        );
    } else {
        /* comments.reduce() nie chciało współpracować więc zrobiłem to klasycznie */
        var averageRating = 0;
        for (let comment of comments) {
            averageRating += comment.rating;
        }
        averageRating /= comments.length;
        
        return (
            <>
                <div className="row cocktail-page">
                    <div className="col-md-12 text-center">
                        <h1>{cocktail.name}</h1>
                        <h4>Rating: {isNaN(averageRating) ? "no rating" : averageRating}</h4>
                        <hr />
                    </div>
                    <div className="col-lg-4">
                        <div className="cocktail-page-photo">
                            <img src={cocktail.photo} alt="Cocktail" />
                        </div>
                    </div>
                    <div className="col-lg-8">
                        <table className="table">
                            <tbody>
                                <TableRow texts={['Ingredients', 'Instructions']} />
                                <TableRow texts={[
                                    <ul>{cocktail.ingredients.map((ingredient, i) => { return (<li key={i}>{ingredient}</li>); })}</ul>,
                                    <ol>{cocktail.instructions.map((step, i) => { return (<li key={i}>{step}</li>); })}</ol>]} />
                                <TableRow texts={['Contains alcohol', 'Best served in']} />
                                <TableRow texts={[cocktail.alcohol === 'yes' ? <FaCheck fontSize="22" /> : <IoClose fontSize="36" />, cocktail.glass]} />
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="row text-center cocktail-page-btns">
                    <div className="col-lg-4">
                        <p className="common-button" onClick={downloadRecipe}><FaDownload />&nbsp;Download recipe</p>
                    </div>
                    <div className="col-lg-4">
                        <p className="common-button" onClick={() => setShowCommentForm(!showCommentForm)}><FaPlus />&nbsp;Add a comment</p>
                    </div>
                    <div className="col-lg-4">
                        <Link to="/"><p className="common-button"><FaHome />&nbsp;Back to main page</p></Link>
                    </div>
                </div>
                <div className="row text-center justify-content-center">
                    <div className="col-lg-6">
                        {showCommentForm ? <CommentForm id={cocktail.id} /> : <></>}
                    </div>
                </div>
                <div className="row text-center">
                    {
                        comments.map((comment, i) => {
                            return (
                                <div className="col-lg-6" key={i}>
                                    <CommentCard name={comment.name} content={comment.content} rating={comment.rating} />
                                </div>
                            );
                        })
                    }
                </div>
            </>
        );
    }

}