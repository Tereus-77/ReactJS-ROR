import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios'
import NavBar from "./NavBar";
import { useParams } from "react-router-dom";

const tag = {
    name: '',
    name_error: '',
    error: ""
}

const NewPhotoTag = () => {

    const params = useParams();
    const history = useNavigate();
    const [tagObject, setTagObject] = useState(tag);
    const [IsLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (localStorage.getItem("token") === null) {
            history("/login")
        }

    }, [localStorage.getItem('token')])

    const handleGallerySubmit = (event) => {
        event.preventDefault();

        const tag = {
            tag: {
                name: tagObject.name
            },
            photo_id: params.id
        }

        if (tagObject.name === '') {

            setTagObject({
                ...tagObject,
                name_error: 'Name is Required'
            })
        } else {
            setIsLoading(true)
            axios.post('/tags', tag, { headers: { 'Content-Type': 'application/json', Accept: "*/*", Authorization: `Bearer ${localStorage.getItem('token')}` } })
                .then(response => {

                    console.log("hello")
                    setIsLoading(false)
                    history('/photos/' + params.id + "/comments");


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

            <div className="container mt-5">
                <h2 className="text-muted mb-3">New Tag</h2>

                <div className="row">
                    <div className="col-md-4"></div>
                    <div className="col-md-4">
                        <form onSubmit={handleGallerySubmit}>
                            <div className="mb-3">
                                <label htmlFor="exampleInputEmail1" className="form-label">Name</label>
                                <input type="text" className="form-control"
                                       placeholder="Enter name"
                                       onChange={event => setTagObject({
                                           ...tagObject, name: event.target.value,
                                           name_error: '', error: ''
                                       })}
                                       id="exampleInputEmail1"
                                       aria-describedby="emailHelp" />
                            </div>

                            <button type="submit" className="btn btn-primary">{IsLoading ? "Please Wait...." : "Create"}</button>
                            <p className="text-red">{tagObject.error}</p>
                        </form>
                    </div>
                </div>

            </div>
        </div>
    );

}

export default NewPhotoTag;