import React from 'react'
import './Connection.css'
import $ from 'jquery';
import { Link } from "react-router-dom";
import img from '../Components/images/logo_.png'
import { useState, useRef } from 'react';
import { ethers } from 'ethers'

import ErrorMessage from "../ErrorMessage";

// import { useWeb3React } from "@web3-react/core"
import { useEffect } from "react"
// import { injected } from "./connector"



function Connection() {

    const [errorMessage, setErrorMessage] = useState(null);
    const [defaultAccount, setDefaultAccount] = useState(null);
    const [userBalance, setUserBalance] = useState(null);

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    // const [connButtonText, setConnButtonText] = useState(title);

    const [data, setdata] = useState({
        address: "",
        Balance: null,
    });

    const [toggel, setToggel] = useState();


    const btnhandler = () => {
        if (window.ethereum) {
            window.ethereum.request({ method: "eth_requestAccounts" })
                .then((res) => { accountChangeHandler(res[0]) }
                );
        } else {
            console.log("install metamask extension!!");
        }
    };

    const accountChangeHandler = (account) => {
        setdata({ address: account, });
        getbalance(account);
    };

    const inputFile = useRef(null)

    const onButtonClick = () => {
        // `current` points to the mounted file input element
        inputFile.current.click();
    };

    const getbalance = (address) => {
        window.ethereum
            .request({
                method: "eth_getBalance",
                params: [address, "latest"]
            })
            .then((balance) => {
                setdata({
                    Balance: ethers.utils.formatEther(address),
                    Balance: ethers.utils.formatEther(balance),
                    connButtonText: 'Disconnecte'
                });
                // alert(ethers.utils.formatEther(address));
                document.getElementById("show").style.display = 'none';
                document.getElementById("hide").style.display = 'none';
            });
    };

    function setcmdShow(e) {
        alert(e);
        if (e != 'show') {
            // alert(document.getElementById("show").style.display);
            document.getElementById("show").style.display = 'block';
            document.getElementById("hide").style.display = 'none';
        } else {
            btnhandler();

            // alert(document.getElementById("show").style.display);
        }

    }

    // switching 
    const networks = {
        polygon: {
            chainId: `0x${Number(137).toString(16)}`,
            chainName: "Polygon Mainnet",
            nativeCurrency: {
                name: "MATIC",
                symbol: "MATIC",
                decimals: 18
            },
            rpcUrls: ["https://polygon-rpc.com/"],
            blockExplorerUrls: ["https://polygonscan.com/"]
        },
        bsc: {
            chainId: `0x${Number(56).toString(16)}`,
            chainName: "Binance Smart Chain Mainnet",
            nativeCurrency: {
                name: "Binance Chain Native Token",
                symbol: "BNB",
                decimals: 18
            },
            rpcUrls: [
                "https://bsc-dataseed1.binance.org",
                "https://bsc-dataseed2.binance.org",
                "https://bsc-dataseed3.binance.org",
                "https://bsc-dataseed4.binance.org",
                "https://bsc-dataseed1.defibit.io",
                "https://bsc-dataseed2.defibit.io",
                "https://bsc-dataseed3.defibit.io",
                "https://bsc-dataseed4.defibit.io",
                "https://bsc-dataseed1.ninicoin.io",
                "https://bsc-dataseed2.ninicoin.io",
                "https://bsc-dataseed3.ninicoin.io",
                "https://bsc-dataseed4.ninicoin.io",
                "wss://bsc-ws-node.nariox.org"
            ],
            blockExplorerUrls: ["https://bscscan.com"]
        }
    };

    const changeNetwork = async ({ networkName, setError }) => {
        try {
            if (!window.ethereum) throw new Error("No crypto wallet found");
            await window.ethereum.request({
                method: "wallet_addEthereumChain",
                params: [
                    {
                        ...networks[networkName]
                    }
                ]
            });
        } catch (err) {
            setError(err.message);
        }
    };


    const [error, setError] = useState();

    const handleNetworkSwitch = async (networkName) => {
        setError();
        await changeNetwork({ networkName, setError });
    };

    const networkChanged = (chainId) => {
        console.log({ chainId });
    };

    useEffect(() => {
        window.ethereum.on("chainChanged", networkChanged);

        return () => {
            window.ethereum.removeListener("chainChanged", networkChanged);
        };
    }, []);
    // Data preview 
    // var x = document.getElementById("projectName");
    // var y = document.getElementById("textArea");
    // var z = document.getElementById("FB");
    // var a = document.getElementById("twtr");
    // var b = document.getElementById("insta");
    // var c = document.getElementById("linkdin");

    // function abc(){
    // console.log("Project Name: " + x.value)
    // console.log("Project_details: " + y.value)
    // console.log( "Facebook: "+ z.value)
    // console.log("Twitter: " + a.value)
    // console.log("Instragram: " + b.value)
    // console.log("Linkedin: " + c.value)
    // $(this).show("Project Name: " + x.value);
    //     var s = document.getElementsByTagName("form");
    //     var a = (x.value);
    //     console.log(a);
    //     if(x.style.display = "block"){
    //         x.style.display = "none"
    //         // a.style.display = "block"
    //         document.write(a)
    //     }
    // }

    const [previewData, setPreviewData] = useState([]);
    const [formHide, setFormHide] = useState(false);

    const previewHandler =  (event) => {
        setFormHide(true)
        console.log(event.target.project_name.value)
        event.preventDefault();
        let payload = [{
            project_name : event.target.project_name.value,
            project_details : event.target.project_details.value,
            facebook_link : event.target.facebook_link.value,
            twitter_link : event.target.twitter_link.value,
            instagram_link : event.target.instagram_link.value,
            linkedin_link : event.target.linkedin_link.value
        }]
        console.log("payload",payload)
        setPreviewData(payload);
    }

    return (
        <>
            <section>
                <nav className="navbar navbar-expand-lg bg-dark navbar-dark" id='connect-navbar' style={{ marginTop: "1%" }}>
                    <div className="container-fluid">
                        <a className="navbar-brand" href="#">
                            <Link to="/"><img src={img} id="logo" alt="" /></Link>

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
                            <span className="navbar-toggler-icon"/>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                {/* <li className="nav-item">
                                <a className="nav-link active" aria-current="page" href="#">
                                    Home
                                </a>
                            </li> */}
                                {/* <li className="nav-item">
                                <a className="nav-link" href="#">
                                    Link
                                </a>
                            </li> */}

                            </ul>
                            <form className="d-flex" role="search id='connect_Butn'" style={{ marginRight: "5%" }}>
                                {/* <input
                                className="form-control me-2"
                                type="search"
                                placeholder="Search"
                                aria-label="Search"
                            /> */}
                                <div className="dropdown" style={{ marginRight: "17px" }}>
                                    <button className="btn btn-warning text-white dropdown-toggle" type="button" data-bs-toggle="dropdown" style={{ backgroundColor: "black" }}>#...Account
                                    </button>
                                    <ul className="dropdown-menu">
                                        <li>
                                            <a className="dropdown-item" href="#" onClick={() => handleNetworkSwitch("polygon")}>
                                                <img id='polygen' src="https://polygonscan.com/images/logo.svg?v=0.0.3" alt="" />
                                            </a>
                                        </li>
                                        <li>
                                            <a className="dropdown-item" href="" onClick={() => handleNetworkSwitch("bsc")}>BSC</a>
                                        </li>
                                        <li>
                                            <a className="dropdown-item" href="#">
                                                Sepolia
                                            </a>
                                        </li>
                                    </ul>
                                </div>

                                <button id='show' className="btn btn-outline-success connectionBtn" type="submit" onClick={() => setcmdShow('show')}>
                                    Connect
                                </button>
                            </form>
                        </div>
                    </div>
                </nav>
            <div className="container-fluid" export divData>
                <div className="row justify-content-left mt-5 mb-4">
                <div className='container-fluid col-md-5'>
                <table>
                {previewData && previewData.map((item, index) => (
                <tbody key={index}>
                    <tr>
                    <td style={{fontSize:"30px"}}>Project Name : {item?.project_name} </td>
                    </tr>
                    <tr>
                    <td style={{fontSize:"30px"}}>Project Details : {item?.project_details} </td>
                    </tr>
                    <tr>
                    <td style={{fontSize:"30px"}}>Facebook link : {item?.facebook_link} </td>
                    </tr>
                    <tr>
                    <td style={{fontSize:"30px"}}>Twitter Link : {item?.twitter_link} </td>
                    </tr>
                    <tr>
                    <td style={{fontSize:"30px"}}>Instagram Link : {item?.instagram_link} </td>
                    </tr>
                    <tr>
                    <td style={{fontSize:"30px"}}>Linked in Link : {item?.linkedin_link} </td>
                    </tr>
                 </tbody>
                ))}       
                </table>
            </div>

                    {/* table_create */}

                    <div className='row justify-content-evenly'>

                        <div className='col-md-6'>
                        {previewData && previewData.map((item, index) => (
                        
                        <table className="table lable_td" key={index}>
                        <thead className="thead-white ">
                            <tr>
                            <th scope="col">Project Name</th>
                            <th scope="col">Project_Details</th>
                            <th scope="col">File</th>
                            <th scope="col">Facebook</th>
                            <th scope="col">Twitter</th>
                            <th scope="col">Instragram</th>
                            <th scope="col">Linkedin</th>
                            </tr>
                        </thead>
                       
                        <tbody>
                            <tr>
                            {/* <th scope="row">1</th> */}
                            <td key={item?.project_name}></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            </tr>
                        </tbody>
                       
                       
                        </table>
                          ))}
                       

                        {/* <table className="table">
                        <thead className="thead-light">
                            <tr>
                            <th scope="col">#</th>
                            <th scope="col">First</th>
                            <th scope="col">Last</th>
                            <th scope="col">Handle</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                            <th scope="row">1</th>
                            <td>Mark</td>
                            <td>Otto</td>
                            <td>@mdo</td>
                            </tr>
                            <tr>
                            <th scope="row">2</th>
                            <td>Jacob</td>
                            <td>Thornton</td>
                            <td>@fat</td>
                            </tr>
                            <tr>
                            <th scope="row">3</th>
                            <td>Larry</td>
                            <td>the Bird</td>
                            <td>@twitter</td>
                            </tr>
                        </tbody>
                        </table> */}


                        </div>
                    </div>
                    


                    {/* table_create */}
                   





                    {false === formHide &&(
                    <div className="col-md-6" style={{ marginLeft: "12%" }}>
                        <div id='Metamask'>
                            <form onSubmit={previewHandler}>
                                <h2 className='text-center'>Form</h2> <br />
                                <span className='mb-5' style={{ marginLeft: "5px", fontSize: "20px", fontWeight: "700", }}>Project Name</span> <i style={{color:"red"}}>*</i> <br />
                                <input 
                                   className='mt-3 ' 
                                   name="project_name" 
                                   type="text" 
                                   /> 
                                   <br /> <br />
                                <span style={{ marginLeft: "5px", fontSize: "20px", fontWeight: "700", }}>Project_Details</span> <i style={{color:"red"}}>*</i> <br />
                                <textarea className='mt-3' name="project_details" id="textArea" cols="30" rows="8"></textarea>
                                 <br /> <br />
                                <input name="file"  type="file" id='' /> <br /> <br />

                                <span className='mb-5' style={{ marginLeft: "5px", fontSize: "20px", fontWeight: "700", }}>Facebook</span> <br />
                                <input name="facebook_link"  type="text" placeholder='https//www.facebook.com' /> <br />

                                <span className='mb-5' style={{ marginLeft: "5px", fontSize: "20px", fontWeight: "700", }}>Twitter</span> <br />
                                <input  name="twitter_link"  type="text" placeholder='https//www.twitter.com' /><br />
                                <span className='mb-5' style={{ marginLeft: "5px", fontSize: "20px", fontWeight: "700", }}>Instragram</span> <br />
                                <input type="text" name="instagram_link"  placeholder='https//www.instragram.com' /> <br />
                                <span className='mb-5' style={{ marginLeft: "5px", fontSize: "20px", fontWeight: "700", }}>Linkedin</span> <br />
                                <input name="linkedin_link"  type="text" placeholder='https//www.linkedin.com' /> <br /> <br />
                                <button id='previewBTN' type="submit" className='text-center justify-content-center'>Preview</button>

                                {/* <button type="submit" onClick={hide}>Preview</button> */}
                            </form>
                        </div>

                    </div>
                    )}

                        <div className="col-md-3 col-12 justify-content-center text-center" id='fixedCol'>
                            <div id='second-DIV' className='justify-content-center'>
                                {/* <Link to="/PreviewData">
                                <button id='previewBTN' onClick={abc}>Preview</button> <br /> */}
                                 {/* </Link>  */}
                                 <Link to="/Submit"> <button id='Continue'>Submit</button> </Link>
                            </div>

                        </div>
                    </div>
                    
                </div>
            </section>
        </>
    )
}

export default Connection