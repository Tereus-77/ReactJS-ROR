import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from 'axios'
import NavBar from "./NavBar";
import "./Style.css"


const Gallery = () => {

    const history = useNavigate();
    const [galleryObject, setGalleryObject] = useState([]);
    const [IsLoading, setIsLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPage, setTotalPage] = useState(1)
    let curr_page = 1

    const handleGalleryEdit = (id) => {
      history("/galleries/" + id + "/edit")
    }

    useEffect(() => {
        if (localStorage.getItem("token") === null) {
            history("/login")
        } else {
            if(window.location.href.split("?").length > 1){

               curr_page = parseInt(window.location.href?.split("?")[1]?.split("=")[1])
            }

            axios.get('/galleries?page=' + curr_page, {
                headers: {
                    'Content-Type': 'application/json',
                    Accept: "*/*",
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
                .then(response => {
                    setIsLoading(false)
                    setGalleryObject(response.data.data.galleries)
                    setTotalPage(response.data.data.total_pages)
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

    const handleView = (id) => {
      history("/galleries/" + id)
    }

    const  handlePageChange = (e) => {
        e.preventDefault()
      let page_val = e.target.href.split('/')[e.target.href.split('/').length - 1]
        if(page_val == "#next") {
            setCurrentPage(currentPage + 1)
        }
        else if(page_val == "#previous"){
            setCurrentPage(currentPage - 1)
        }
        else if(page_val == 1){
            setCurrentPage(1)
        }
        else if(page_val == 2){
            setCurrentPage(2)
        }
        else if(page_val == 3){
            setCurrentPage(3)
        }
        else if(page_val == 4){
            setCurrentPage(4)
        }
        else if(page_val == 5){
            setCurrentPage(5)
        }
       paginate_api_call()
    }

    const paginate_api_call = async () => {
        if(window.location.href.split("?").length > 1){

            curr_page = parseInt(window.location.href?.split("?")[1]?.split("=")[1])
        }
        await axios.get('/galleries?page=' + curr_page, {
            headers: {
                'Content-Type': 'application/json',
                Accept: "*/*",
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        }).then(response => {
            setIsLoading(false)
            setGalleryObject(response.data.data.galleries)
            setTotalPage(response.data.data.total_pages)
        })
    }

    const handlePageNext = () => {

        history("/")
        if(window.location.href.split("?").length > 1){
            curr_page = (parseInt(window.location.href?.split("?")[1]?.split("=")[1]) + 1)
        }
        else{
            if(curr_page < totalPage) {
                curr_page += 1
            }
        }

         axios.get('/galleries?page=' + curr_page, {
            headers: {
                'Content-Type': 'application/json',
                Accept: "*/*",
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        }).then(response => {
            setIsLoading(false)
            setGalleryObject(response.data.data.galleries)
            setTotalPage(response.data.data.total_pages)
        })

    }

    const handlePagePrevious = () => {

        history("/")
        if(window.location.href.split("?").length > 1){
            curr_page = (parseInt(window.location.href?.split("?")[1]?.split("=")[1]) - 1)
        }
        else{
            if (curr_page !== 1) {
                curr_page -= 1
            }
        }

        axios.get('/galleries?page=' + curr_page, {
            headers: {
                'Content-Type': 'application/json',
                Accept: "*/*",
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        }).then(response => {
            setIsLoading(false)
            setGalleryObject(response.data.data.galleries)
            setTotalPage(response.data.data.total_pages)
        })

    }

    const handleSearch = (e) => {
        if(window.location.href.split("?").length > 1){

            curr_page = parseInt(window.location.href?.split("?")[1]?.split("=")[1])
        }

        axios.get('/galleries?q[name_or_description_cont]=' +  e.target.value, {
            headers: {
                'Content-Type': 'application/json',
                Accept: "*/*",
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then(response => {
                setIsLoading(false)
                setGalleryObject(response.data.data.galleries)
                setTotalPage(response.data.data.total_pages)
            })
    }

    const deleteGallery = (id) => {
        if (window.confirm("Are you sure?")) {
            axios.delete('/galleries/' + id, {
                headers: {
                    'Content-Type': 'application/json',
                    Accept: "*/*",
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            }).then(res => {
                setGalleryObject(galleryObject.filter(gallery => gallery.id !== id))
            })
        }
    }

    const handleNameSort = () => {
        axios.get('/galleries?q[sorts]=' + "name%20asc", {
            headers: {
                'Content-Type': 'application/json',
                Accept: "*/*",
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then(response => {
                setIsLoading(false)
                setGalleryObject(response.data.data.galleries)
                setTotalPage(response.data.data.total_pages)
            })
    }

    const handleDescriptionSort = () => {
        axios.get('/galleries?q[sorts]=' + "description%20asc", {
            headers: {
                'Content-Type': 'application/json',
                Accept: "*/*",
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then(response => {
                setIsLoading(false)
                setGalleryObject(response.data.data.galleries)
                setTotalPage(response.data.data.total_pages)
            })
    }

    const render_paginate = () => {
      var links_array = []
        for(var i = 1; i <= totalPage; i++){
            var val = "/?page=" + i
           links_array.push(<li key={i} className="page-item"><a className="page-link" href={val}>{i}</a></li>)
        }

        return links_array;
    }


    return (
        <div>
            <NavBar/>
            <div className="container mt-2">

                <div className="mb-5 row mt-3">
                    <div className="col-md-7"></div>
                    <div className="col-md-2"><a href="/galleries/new" className="btn btn-primary">New Gallery</a></div>
                    <div className="col-md-3 d-flex">
                        <input type="text" placeholder="Search" onChange={handleSearch}
                               className="ml-3 form-control"/>
                    </div>
                </div>


                <table className="table table-hover">
                    <thead>
                    <tr>
                        <th scope="col" className="mark-cursor" onClick={handleNameSort}>Name</th>
                        <th scope="col" className="mark-cursor" onClick={handleDescriptionSort}>Description</th>
                        <th scope="col" colSpan="3">Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    { galleryObject.map(gallery =>

                        <tr key={gallery.id}>
                        <td>{gallery.name}</td>
                        <td>{gallery.description}</td>
                        <td colSpan="3">
                            <button onClick={e =>  handleView(gallery.id) }
                               className="btn btn-sm btn-info">View</button>
                            <button onClick={e =>  handleGalleryEdit(gallery.id) }
                               className="ml-3 btn btn-sm btn-secondary mar-left-5" >Edit</button>
                            <a onClick={e =>  deleteGallery(gallery.id) }
                               className="ml-3 btn btn-sm btn-danger mar-left-5"  >Delete</a>
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
                            <li className="page-item"><a className="page-link mark-cursor" onClick={handlePageNext} >Next</a></li>
                        </ul>
                    </nav>
                </div>

            </div>
        </div>
    );

}

export default Gallery;