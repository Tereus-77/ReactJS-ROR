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

const EditPhotoTag = () => {

    const params = useParams();
    const history = useNavigate();
    const [tagObject, setTagObject] = useState(tag);
    const [IsLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (localStorage.getItem("token") === null) {
            history("/login")
        }
        else{
            axios.get('/tags/' + params.id , {
                headers: {
                    'Content-Type': 'application/json',
                    Accept: "*/*",
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            }).then(response => {
                setTagObject(response.data.data.tag)
            })

        }

    }, [localStorage.getItem('token')])

    const handleTagSubmit = (event) => {
        event.preventDefault();

        const tag = {
            tag: {
                name: tagObject.name
            },
            photo_id: params.photo_id
        }

        if (tagObject.name === '') {

            setTagObject({
                ...tagObject,
                name_error: 'Name is Required'
            })
        } else {
            setIsLoading(true)
            axios.put('/tags/' + params.id, tag, { headers: { 'Content-Type': 'application/json', Accept: "*/*", Authorization: `Bearer ${localStorage.getItem('token')}` } })
                .then(response => {

                    setIsLoading(false)
                    let state_value = response.data.status
                    if (state_value === "success") {

                        history('/photos/' + params.photo_id + "/comments");
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

            <div className="container mt-5">
                <h2 className="text-muted mb-3">Edit Tag</h2>

                <div className="row">
                    <div className="col-md-4"></div>
                    <div className="col-md-4">
                        <form onSubmit={handleTagSubmit}>
                            <div className="mb-3">
                                <label htmlFor="exampleInputEmail1" className="form-label">Name</label>
                                <input type="text" className="form-control"
                                       placeholder="Enter name"
                                       onChange={event => setTagObject({
                                           ...tagObject, name: event.target.value,
                                           name_error: '', error: ''
                                       })}
                                       defaultValue={tagObject.name}
                                       id="exampleInputEmail1"
                                       aria-describedby="emailHelp" />
                            </div>

                            <button type="submit" className="btn btn-primary">{IsLoading ? "Please Wait...." : "Update"}</button>
                            <p className="text-red">{tagObject.error}</p>
                        </form>
                    </div>
                </div>

            </div>
        </div>
    );

}

export default EditPhotoTag;