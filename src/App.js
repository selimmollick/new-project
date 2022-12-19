// import './App.css';
import Banner from './Components/Banner';
import Connection from './Components/Connection';
import Navbar from './Components/Navbar';
import PreviewData from './Components/PreviewData';

import { Routes, Route, } from "react-router-dom";

import { Web3ReactProvider } from '@web3-react/core'
import Web3 from 'web3'
import Submit from './Components/Submit';

// function getLibrary(provider) {
//   return new Web3(provider)
// }

function App({ Component, pageProps }) {
  return (
    <>
    {/* <Navbar />
    <Banner /> */}
    {/* <Connection /> */}
    {/* <Web3ReactProvider getLibrary={getLibrary}>
      <Component {...pageProps} />
    </Web3ReactProvider> */}
    <Routes>
        <Route path="/" element={<Navbar />} />
        {/* <Route path="Banner" element={<Banner />} /> */}
        <Route path="Connection" element={<Connection />} />
        <Route path="PreviewData" element={<PreviewData />} />
        <Route path="Submit" element={<Submit name="Saiashish" />} />


      </Routes>

    </>
  );
}

export default App;
