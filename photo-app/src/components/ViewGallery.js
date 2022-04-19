import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from 'axios'
import NavBar from "./NavBar";
import { useParams } from "react-router-dom";
import "./Style.css"

const ViewGallery = () => {

    const history = useNavigate();
    const [photoObject, setPhotoObject] = useState([]);
    const [tags, setTags] = useState([])
    const [IsLoading, setIsLoading] = useState(false);
    const params = useParams();
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPage, setTotalPage] = useState(1)
    let curr_page = 1

    const handlePhotoEdit = (id) => {
        history("/galleries/" + params.id + "/photos/" + id + "/edit")
    }

    const handleTagEdit = (id) => {
        history("/galleries/" + params.id + "/tags/" + id + "/edit")
    }

    const handlePageChange = (e) => {
        e.preventDefault()
        let page_val = e.target.href.split('/')[e.target.href.split('/').length - 1]
        if(page_val === "#next") {
            setCurrentPage(currentPage + 1)
        }
        else if(page_val === "#previous"){
            setCurrentPage(currentPage - 1)
        }
        else if(page_val === 1){
            setCurrentPage(1)
        }
        else if(page_val === 2){
            setCurrentPage(2)
        }
        else if(page_val === 3){
            setCurrentPage(3)
        }
        else if(page_val === 4){
            setCurrentPage(4)
        }
        else if(page_val === 5){
            setCurrentPage(5)
        }

        axios.get('/galleries/' + params.id + "/photos?page=" + currentPage, {
            headers: {
                'Content-Type': 'application/json',
                Accept: "*/*",
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then(response => {
                setIsLoading(false)
                setPhotoObject(response.data.data.photos)
                setTotalPage(response.data.data.total_pages)
            })
    }

    const render_paginate = () => {
        var links_array = []
        for(var i = 1; i <= totalPage; i++){
            var val = "/galleries/" + params.id + "?page=" + i
            links_array.push(<li key={i} className="page-item"><a className="page-link"  href={val}>{i}</a></li>)
        }

        return links_array;
    }


    useEffect(() => {
        if (localStorage.getItem("token") === null) {
            history("/login")
        } else {
            if(window.location.href.split("?").length > 1){

                curr_page = parseInt(window.location.href?.split("?")[1]?.split("=")[1])
            }
            axios.get('/galleries/' + params.id + "/photos?page=" + curr_page, {
                headers: {
                    'Content-Type': 'application/json',
                    Accept: "*/*",
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
                .then(response => {
                    setIsLoading(false)
                    setPhotoObject(response.data.data.photos)
                    setTotalPage(response.data.data.total_pages)


                    axios.get('/tags?gallery_id=' + params.id, {
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

    const handleNewPhoto = () => {
      history("/galleries/" + params.id + "/photos/new")
    }

    const handleNewTag = () => {
        history("/galleries/" + params.id + "/tags/new")
    }

    const handleSearch = (e) => {
        axios.get('/galleries/' + params.id + "/photos?q[name_or_description_cont]=" + e.target.value, {
            headers: {
                'Content-Type': 'application/json',
                Accept: "*/*",
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then(response => {
                setIsLoading(false)
                setPhotoObject(response.data.data.photos)
                setTotalPage(response.data.data.total_pages)
            })
    }

    const handlePageNext = () => {

        history("/galleries/" + params.id)
        if(window.location.href.split("?").length > 1){
            curr_page = (parseInt(window.location.href?.split("?")[1]?.split("=")[1]) + 1)
        }
        else{
            if(curr_page < totalPage){
                curr_page += 1
            }
        }

        axios.get('/galleries/' + params.id + "/photos?page=" + curr_page, {
            headers: {
                'Content-Type': 'application/json',
                Accept: "*/*",
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then(response => {
                setIsLoading(false)
                setPhotoObject(response.data.data.photos)
                setTotalPage(response.data.data.total_pages)
        })

    }

    const handlePagePrevious = () => {

        history("/galleries/" + params.id)
        if(window.location.href.split("?").length > 1){
            curr_page = (parseInt(window.location.href?.split("?")[1]?.split("=")[1]) - 1)
        }
        else{
            if (curr_page !== 1){
                curr_page -= 1
            }
        }

        axios.get('/galleries/' + params.id + "/photos?page=" + curr_page, {
            headers: {
                'Content-Type': 'application/json',
                Accept: "*/*",
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then(response => {
                setIsLoading(false)
                setPhotoObject(response.data.data.photos)
                setTotalPage(response.data.data.total_pages)
        })

    }

    const deletePhoto = (id) => {
        if (window.confirm("Are you sure?")) {
            axios.delete('/galleries/' + params.id + "/photos/" + id, {
                headers: {
                    'Content-Type': 'application/json',
                    Accept: "*/*",
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            }).then(res => {
                setPhotoObject(photoObject.filter(photo => photo.id !== id))
            })
        }
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

    const handleView = (id) => {
        localStorage.setItem("gallery_id", params.id)
        history("/photos/" + id + "/comments")
    }

    const handleViewTag = (id) => {
        history("/tags/" + id )
    }

    const handleNameSort = () => {
        axios.get('/galleries/' + params.id + "/photos?q[sorts]=" + "name%20asc", {
            headers: {
                'Content-Type': 'application/json',
                Accept: "*/*",
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then(response => {
                setIsLoading(false)
                setPhotoObject(response.data.data.photos)
            })
    }

    const handleDescriptionSort = () => {
        axios.get('/galleries/' + params.id + "/photos?q[sorts]=" + "description%20asc", {
            headers: {
                'Content-Type': 'application/json',
                Accept: "*/*",
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then(response => {
                setIsLoading(false)
                setPhotoObject(response.data.data.photos)
            })
    }

    const handleShootingDateSort = () => {
        axios.get('/galleries/' + params.id + "/photos?q[sorts]=" + "shooting_date%20asc", {
            headers: {
                'Content-Type': 'application/json',
                Accept: "*/*",
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then(response => {
                setIsLoading(false)
                setPhotoObject(response.data.data.photos)
            })
    }

    return (
        <div>
            <NavBar/>
            <div className="container mt-5">

                <div className="mb-5 row mt-3">
                    <div className="col-md-7"></div>
                    <div className="col-md-2"><button onClick={handleNewPhoto} className="btn btn-primary">New Photo</button></div>
                    <div className="col-md-3 d-flex">
                        <input type="text" placeholder="Search" onChange={handleSearch}
                               className="ml-3 form-control"/>
                    </div>
                </div>

                <table className="table table-hover">
                    <thead>
                    <tr>
                        <th scope="col">Image</th>
                        <th scope="col" className="mark-cursor" onClick={handleNameSort}>Name</th>
                        <th scope="col" className="mark-cursor" onClick={handleDescriptionSort}>Description</th>
                        <th scope="col" className="mark-cursor" onClick={handleDescriptionSort}>Shooting Date</th>
                        <th scope="col" colSpan="3">Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    { photoObject.map(photo =>

                        <tr key={photo.id}>
                            <td>
                                <img src={photo.image} alt="None" style={{width: "100px", height: "70px"}} />
                            </td>
                            <td>{photo.name}</td>
                            <td>{photo.description}</td>
                            <td>{photo.shooting_date}</td>
                            <td colSpan="3">
                                <button onClick={e =>  handleView(photo.id) }
                                        className="btn btn-sm btn-info">View</button>
                                <button onClick={e =>  handlePhotoEdit(photo.id) }
                                        className="ml-3 btn btn-sm btn-secondary mar-left-5">Edit</button>
                                <a onClick={e =>  deletePhoto(photo.id) }
                                   className="ml-3 btn btn-sm btn-danger mar-left-5" >Delete</a>
                            </td>
                        </tr>
                    )}
                    </tbody>
                </table>

                <div className="mt-3 float-right">
                    <nav aria-label="Page navigation example">
                        <ul className="pagination">
                            <li className="page-item"><a className="page-link mark-cursor" onClick={handlePagePrevious}>Previous</a></li>
                            {render_paginate()}
                            <li className="page-item"><a className="page-link mark-cursor" onClick={handlePageNext}>Next</a></li>
                        </ul>
                    </nav>
                </div>


                <h2 className="text-muted text-center mt-3">Tags</h2>

                <div className="mb-5 row">
                    <div className="col-md-10"></div>
                    <div className="col-md-2"><button onClick={handleNewTag} className="btn btn-primary">New Tag</button></div>
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
            <a href="/" className="btn btn-primary float-left">Back</a>
        </div>
    );

}

export default ViewGallery;