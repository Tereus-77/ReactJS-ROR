import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios'
import NavBar from "./NavBar";
import { useParams } from "react-router-dom";

const new_comment = {
    comment: '',
    comment_error: ''
}

const NewComment = () => {

    const params = useParams();
    const history = useNavigate();
    const [commentObject, setCommentObject] = useState(new_comment);
    const [IsLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (localStorage.getItem("token") === null) {
            history("/login")
        }

    }, [localStorage.getItem('token')])

    const handleCommentSubmit = (event) => {
        event.preventDefault();

        console.log("hello")
        const new_comment = {
            comment: {
                comment: commentObject.comment
            }
        }

        if (commentObject.comment === '' ) {

            setCommentObject({
                ...commentObject,
                comment_error: 'Comment is Required'
            })

        } else {
            setIsLoading(true)
            axios.post('/comments?photo_id=' + params.id, new_comment, { headers: { 'Content-Type': 'application/json', Accept: "*/*", Authorization: `Bearer ${localStorage.getItem('token')}` } })
                .then(response => {

                    setIsLoading(false)
                    let state_value = response.data.status
                    if (state_value === "success") {

                        history('/photos/' + params.id + "/comments");
                    }


                }).catch(error => {
                setIsLoading(false)
                let state_value = error.response && error.response.status
                if (state_value === 401) {

                }
            });
        }

    }

    return (
        <div>
            <NavBar />

            <div className="container mx-auto mt-5">
                <h2 className="text-muted mb-3">New Comment</h2>
                <div className="row">
                    <div className="col-md-4"></div>
                    <div className="col-md-4">
                        <form onSubmit={handleCommentSubmit}>
                            <div className="mb-3">
                                <label htmlFor="exampleInputEmail1" className="form-label">Comment</label>
                                <input type="text" className="form-control"
                                       onChange={event => setCommentObject({
                                           ...commentObject, comment: event.target.value,
                                           comment_error: '', error: ''
                                       })}
                                       placeholder="Enter comment"
                                       id="exampleInputEmail1"
                                       aria-describedby="emailHelp" />

                            </div>

                            <button type="submit" className="btn btn-primary">{IsLoading ? "Please Wait...." : "Create"}</button>

                            <p className="text-red">{commentObject.error}</p>
                        </form>
                    </div>
                </div>

            </div>
        </div>
    );

}

export default NewComment;