import axios from "axios";
import {useNavigate} from "react-router-dom";

const NavBar = () => {

    const history = useNavigate();

    const handleLogout = () => {
        axios.delete('/logout', {
            headers: {
                'Content-Type': 'application/json',
                Accept: "*/*",
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        }).then(res => {
            localStorage.removeItem("token")
            history("/login")
        })
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <a className="navbar-brand" href="/">Gallery</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText"
                        aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarText">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <a className="nav-link active" aria-current="page" href="/">Home</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/galleries/new">New Gallery</a>
                        </li>
                    </ul>
                    <span className="navbar-text">
         <button onClick={handleLogout} className="btn btn-sm btn-danger">Logout</button>
      </span>
                </div>
            </div>
        </nav>
    )
}

export default NavBar;