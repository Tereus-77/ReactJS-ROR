import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from 'axios'
import NavBar from "./NavBar";
import { useParams } from "react-router-dom";
import "./Style.css"

const ViewPhoto = () => {

    const history = useNavigate();
    const [photoObject, setPhotoObject] = useState("")
    const [tags, setTags] = useState([])
    const [commentObject, setCommentObject] = useState([]);
    const [IsLoading, setIsLoading] = useState(false);
    const params = useParams();

    const handleCommentEdit = (id) => {
        history("/photos/" + params.id + "/comments/" + id + "/edit")
    }

    const handleNewPhotoTag = () => {
        history("/photos/" + params.id + "/tags/new")
    }

    const handleTagEdit = (id) => {
        history("/photos/" + params.id + "/tags/" + id + "/edit")
    }

    const handleViewTag = (id) => {
        history("/tags/" + id)
    }

    useEffect(() => {
        if (localStorage.getItem("token") === null) {
            history("/login")
        } else {

            axios.get('/galleries/' + localStorage.getItem("gallery_id") + "/photos/" + params.id, {
                headers: {
                    'Content-Type': 'application/json',
                    Accept: "*/*",
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
                .then(res => {
                    setIsLoading(false)
                    setPhotoObject(res.data.data.photo)
                })

            axios.get('/comments?photo_id=' + params.id, {
                headers: {
                    'Content-Type': 'application/json',
                    Accept: "*/*",
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
                .then(response => {
                    setIsLoading(false)
                    setCommentObject(response.data.data.comments)

                    axios.get('/tags?photo_id=' + params.id, {
                        headers: {
                            'Content-Type': 'application/json',
                            Accept: "*/*",
                            Authorization: `Bearer ${localStorage.getItem('token')}`
                        }
                    }).then(res => {
                        setTags(res.data.tags)
                    })

                }).catch(error => {
                    setIsLoading(false)

                    if (!error.response) {
                        history('/');
                    } else {
                        let state_value = error.response.status
                        if (state_value === 500) {
                            history("/error")
                        }
                    }
                }
            )
        }
    }, [localStorage.getItem('token')])

    const handleNewComment = () => {
        history("/photos/" + params.id + "/comments/new")
    }

    const deleteTag = (id) => {
        if (window.confirm("Are you sure?")) {
            axios.delete('/tags/' + id, {
                headers: {
                    'Content-Type': 'application/json',
                    Accept: "*/*",
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            }).then(res => {
                setTags(tags.filter(tag => tag.id !== id))
            })
        }
    }

    const deleteComment = (id) => {
        if (window.confirm("Are you sure?")) {
            axios.delete('/comments/' + id + "?photo_id=" + params.id, {
                headers: {
                    'Content-Type': 'application/json',
                    Accept: "*/*",
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            }).then(res => {
                setCommentObject(commentObject.filter(comment => comment.id !== id))
            })
        }
    }

    const handleBack = () => {
      history("/galleries/" + localStorage.getItem("gallery_id"))
    }


    return (
        <div>
            <NavBar/>
            <div className="container mt-5">
                <div className="mt-5 mb-5">
                    <img src={photoObject.image}  className="image-photo" />
                </div>

                <div className="mb-5 row mt-3">
                    <div className="col-md-10"></div>
                    <div className="col-md-2"><button onClick={handleNewComment} className="btn btn-primary">New Comment</button></div>
                </div>

                <table className="table table-hover">
                    <thead>
                    <tr>
                        <th scope="col">Comment</th>
                        <th scope="col">User name</th>
                        <th scope="col" colSpan="3">Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    { commentObject.map(comment =>

                        <tr key={comment.id}>
                            <td>{comment.comment}</td>
                            <td>{comment.user_name}</td>
                            <td colSpan="3" >
                                <button onClick={e =>   handleCommentEdit(comment.id) }
                                        className="ml-3 btn btn-sm btn-secondary mar-left-5" >Edit</button>
                                <a onClick={e =>  deleteComment(comment.id) }
                                   className="ml-3 btn btn-sm btn-danger mar-left-5" >Delete</a>
                            </td>
                        </tr>
                    )}
                    </tbody>
                </table>


                <h2 className="text-muted text-center mt-4">Tags</h2>

                <div className="mb-5 row">
                    <div className="col-md-10"></div>
                    <div className="col-md-2"><button onClick={handleNewPhotoTag} className="btn btn-primary">New Tag</button></div>
                </div>

                <table className="table table-hover">
                    <thead>
                    <tr>
                        <th scope="col">Name</th>
                        <th scope="col" colSpan="3">Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    { tags.map(tag =>

                        <tr key={tag.id}>
                            <td>{tag.name}</td>
                            <td colSpan="3">
                                <button onClick={e =>  handleViewTag(tag.id) }
                                        className="btn btn-sm btn-info">View</button>
                                <button onClick={e =>  handleTagEdit(tag.id) }
                                        className="ml-3 btn btn-sm btn-secondary mar-left-5" >Edit</button>
                                <a onClick={e =>  deleteTag(tag.id) }
                                   className="ml-3 btn btn-sm btn-danger mar-left-5" >Delete</a>
                            </td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>
            <button onClick={handleBack}  className="btn btn-primary float-left">Back</button>
        </div>
    );

}

export default ViewPhoto;