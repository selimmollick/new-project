import React from 'react'
import './Navbar.css'
import img from '../Components/images/logo_.png'
import { Link } from "react-router-dom";
import Banner from './Banner';


function Navbar() {
    // function launch(){
    //     document
    // }
    return (
        <>
            <nav className="navbar navbar-expand-lg" id='Nav'>
                <div className="container-fluid">
                    <a className="navbar-brand" href="#">
                    <Link to="/">   <img src={img} id="logo" alt="" /></Link>
                    </a>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon" />
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto  mb-2 mb-lg-0 mx-md-auto">
                            <li className="nav-item">
                                <a className="nav-link active" aria-current="page" href="#" style={{color: "white"}}>
                                    Home
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">
                                    Team
                                </a>
                            </li>
                            <li className="nav-item dropdown">
                                <a
                                    className="nav-link dropdown-toggle"
                                    href="#"
                                    role="button"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                >
                                    Dropdown
                                </a>
                                <ul className="dropdown-menu">
                                    <li>
                                        <a className="dropdown-item" href="#">
                                            Action
                                        </a>
                                    </li>
                                    <li>
                                        <a className="dropdown-item" href="#">
                                            Another action
                                        </a>
                                    </li>
                                    <li>
                                        <hr className="dropdown-divider" />
                                    </li>
                                    <li>
                                        <a className="dropdown-item" href="#">
                                            Something else here
                                        </a>
                                    </li>
                                </ul>
                            </li>

                        </ul>
                        <form className="d-flex" role="search">
                            {/* <input
          className="form-control me-2"
          type="search"
          placeholder="Search"
          aria-label="Search"
        /> */}
                         <Link to="/Connection"><button id='Launch' className="btn btn-outline-success text-white" type="submit"> Launch                               
                            </button>
                            </Link>
                            </form>
                    </div>
                </div>
            </nav>
            <Banner />
        </>
    )
}

export default Navbar