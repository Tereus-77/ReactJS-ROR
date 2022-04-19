import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from 'axios'
import NavBar from "./NavBar";
import { useParams } from "react-router-dom";
import "./Style.css"

const ViewTag = () => {

    const history = useNavigate();
    const [galleries, setGalleries] = useState([])
    const [IsLoading, setIsLoading] = useState(false);
    const [photos, setPhotos] = useState([])
    const params = useParams();


    useEffect(() => {
        if (localStorage.getItem("token") === null) {
            history("/login")
        } else {

            axios.get('/tags/' + params.id, {
                headers: {
                    'Content-Type': 'application/json',
                    Accept: "*/*",
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
                .then(res => {
                    setIsLoading(false)
                    setGalleries(res.data.data.galleries)
                    setPhotos(res.data.data.photos)
                })

        }
    }, [localStorage.getItem('token')])



    return (
        <div>
            <NavBar/>
            <div className="container mx-auto mt-5">

                <h2 className="text-muted mt-5 mb-5 text-center">Galleries</h2>

                <table className="table table-hover">
                    <thead>
                    <tr>
                        <th scope="col">
                            Name
                        </th>
                        <th scope="col">
                            Description
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    { galleries.map(gallery =>

                        <tr key={gallery.id}>
                            <td>
                                {gallery.name}
                            </td>
                            <td>
                                {gallery.description}
                            </td>
                        </tr>
                    )}
                    </tbody>
                </table>


                <h2 className="text-muted mt-5 mb-5 text-center">Photos</h2>

                <table className="table table-hover">
                    <thead>
                    <tr>
                        <th scope="col">
                            Image
                        </th>
                        <th scope="col">
                            Name
                        </th>
                        <th scope="col">
                            Description
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    {photos.map(photo =>

                        <tr key={photo.id}>
                            <td>
                                <img src={photo.image} alt="None" style={{width: "100px", height: "70px"}} />
                            </td>
                            <td>
                                {photo.name}
                            </td>
                            <td>
                                {photo.description}
                            </td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>
        </div>
    );

}

export default ViewTag;