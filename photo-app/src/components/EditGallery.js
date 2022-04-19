import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios'
import NavBar from "./NavBar";
import { useParams } from "react-router-dom";

const gallery = {
    name: '',
    desc: '',
    name_error: '',
    desc_error: '',
    error: ''
}


const EditGallery = () => {

    const history = useNavigate();
    const [galleryObject, setGalleryObject] = useState(gallery);
    const [IsLoading, setIsLoading] = useState(false);
    // Get ID from URL
    const params = useParams();

    useEffect(() => {
        if (localStorage.getItem("token") === null) {
            history("/login")
        }
        else{
            axios.get('/galleries/' + params.id , {
                headers: {
                    'Content-Type': 'application/json',
                    Accept: "*/*",
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            }).then(response => {
               setGalleryObject(response.data.data.gallery)
            })

        }

    }, [localStorage.getItem('token')])

    const handleGallerySubmit = (event) => {
        event.preventDefault();

        const gallery = {
            gallery: {
                name: galleryObject.name,
                description: galleryObject.desc
            }
        }

        if (galleryObject.name === '' && galleryObject.desc === '') {

            setGalleryObject({
                ...galleryObject,
                name_error: 'Name is Required',
                desc_error: 'Description is Required'
            })
        } else if (galleryObject.name === '') {
            setGalleryObject({ ...galleryObject, name_error: 'Name is Required' })
        } else if (galleryObject.desc === '') {
            setGalleryObject({ ...galleryObject, desc_error: 'Description is Required' })
        } else {
            setIsLoading(true)
            axios.put('/galleries/' + params.id, gallery, { headers: { 'Content-Type': 'application/json', Accept: "*/*", Authorization: `Bearer ${localStorage.getItem('token')}` } })
                .then(response => {

                    setIsLoading(false)
                    let state_value = response.data.status
                    if (state_value === "success") {

                        history('/');
                    }


                }).catch(error => {
                setIsLoading(false)
                let state_value = error.response && error.response.status
                if (state_value === 400) {
                    setGalleryObject({
                        ...galleryObject,
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
               <h2 className="text-muted  mb-3">Edit Gallery</h2>

               <div className="row">
                   <div className="col-md-4"></div>
                   <div className="col-md-4">
                       <form onSubmit={handleGallerySubmit}>
                           <div className="mb-3">
                               <label htmlFor="exampleInputEmail1" className="form-label">Name</label>
                               <input type="text" className="form-control"
                                      onChange={event => setGalleryObject({
                                          ...galleryObject, name: event.target.value,
                                          name_error: '', error: ''
                                      })}
                                      placeholder="Enter name"
                                      defaultValue={galleryObject.name}
                                      id="exampleInputEmail1"
                                      aria-describedby="emailHelp" />
                               <p className="text-danger">{galleryObject.name_error}</p>
                           </div>
                           <div className="mb-3">
                               <label htmlFor="exampleInputPassword1" className="form-label">Description</label>
                               <input type="text" className="form-control"
                                      onChange={event => setGalleryObject({
                                          ...galleryObject, desc: event.target.value,
                                          desc_error: '', error: ''
                                      })}
                                      defaultValue={galleryObject.description}
                                      placeholder="Enter description"
                                      id="exampleInputPassword1" />
                           </div>
                           <button type="submit" className="btn btn-primary">{IsLoading ? "Please Wait...." : "Update"}</button>
                           <p className="text-red">{galleryObject.error}</p>
                       </form>
                   </div>
               </div>

           </div>
       </div>
    );

}

export default EditGallery;