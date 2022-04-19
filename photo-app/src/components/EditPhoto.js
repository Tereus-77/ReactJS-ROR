import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios'
import NavBar from "./NavBar";
import { useParams } from "react-router-dom";

const photo = {
    name: '',
    desc: '',
    name_error: '',
    desc_error: '',
    shooting_date: "",
    error: '',
    image: ""
}

const EditPhoto = () => {

    const history = useNavigate();
    const params = useParams();
    const [photoObject, setPhotoObject] = useState(photo);
    const [IsLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (localStorage.getItem("token") === null) {
            history("/login")
        }else{
            axios.get('/galleries/' + params.gallery_id + "/photos/" + params.id, {
                headers: {
                    'Content-Type': 'application/json',
                    Accept: "*/*",
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            }).then(response => {
                setPhotoObject(response.data.data.photo)
            })

        }

    }, [localStorage.getItem('token')])

    const handlePhotoSubmit = (event) => {
        event.preventDefault();

        if (photoObject.name === '' && photoObject.desc === '') {

            setPhotoObject({
                ...photoObject,
                name_error: 'Name is Required',
                desc_error: 'Description is Required'
            })
        } else if (photoObject.name === '') {
            setPhotoObject({ ...photoObject, name_error: 'Name is Required' })
        } else if (photoObject.desc === '') {
            setPhotoObject({ ...photoObject, desc_error: 'Description is Required' })
        }
        else if (photoObject.image === "") {
            alert("Please select an image")

        } else {
            let data = new FormData();
            data.append("image", photoObject.image)
            data.append("name", photoObject.name)
            data.append("description", photoObject.desc)
            data.append("shooting_date", photoObject.shooting_date)
            setIsLoading(true)
            axios.put('/galleries/' + params.gallery_id + "/photos/" + params.id,  data , { headers: { 'Content-Type': 'application/json', Accept: "*/*", Authorization: `Bearer ${localStorage.getItem('token')}` } })
                .then(response => {

                    setIsLoading(false)
                    let state_value = response.data.status
                    if (state_value === "success") {

                        history('/galleries/' + params.gallery_id);
                    }


                }).catch(error => {
                setIsLoading(false)
                let state_value = error.response && error.response.status
                if (state_value === 400) {
                    setPhotoObject({
                        ...photoObject,
                        name_error: error.response.data.errors[0], error: ''
                    })
                }
            });
        }

    }

    return (
        <div>
            <NavBar />

            <div className="container mt-5">
                <h2 className="text-muted font-bold mb-3">Edit Photo</h2>

                <div className="row">
                    <div className="col-md-4"></div>
                    <div className="col-md-4">
                        <form onSubmit={handlePhotoSubmit}>
                            <div className="mb-3">
                                <label htmlFor="exampleInputEmail1" className="form-label">Name</label>
                                <input type="text" className="form-control"
                                       placeholder="Enter name"
                                       defaultValue={photoObject.name}
                                       onChange={event => setPhotoObject({
                                           ...photoObject, name: event.target.value,
                                           name_error: '', error: ''
                                       })}
                                       aria-describedby="emailHelp" />
                                <p className="text-danger">{photoObject.name_error}</p>

                            </div>

                            <div className="mb-3">
                                <label htmlFor="exampleInputPassword1" className="form-label">Description</label>
                                <input type="text" className="form-control"
                                       placeholder="Enter description"
                                       defaultValue={photoObject.description}
                                       onChange={event => setPhotoObject({
                                           ...photoObject, desc: event.target.value,
                                           desc_error: '', error: ''
                                       })}
                                />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="exampleInputPassword1" className="form-label">Shooting Date</label>
                                <input type="date" className="form-control"
                                       placeholder={photoObject.shooting_date}
                                       defaultValue={photoObject.shooting_date}
                                       onChange={event => setPhotoObject({
                                           ...photoObject, shooting_date: event.target.value
                                       })}
                                />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="exampleInputPassword1" className="form-label">Image</label>
                                <input type="file" className="form-control"
                                       onChange={event => setPhotoObject({
                                           ...photoObject, image: event.target.files[0],
                                           desc_error: '', error: ''
                                       })}
                                       id="exampleInputPassword1" />
                            </div>

                            <button type="submit" className="btn btn-primary">{IsLoading ? "Please Wait...." : "Update"}</button>
                            <p className="text-red">{photoObject.error}</p>
                        </form>
                    </div>
                </div>

            </div>
        </div>
    );

}

export default EditPhoto;