import '../styles/globals.css'
import {Web3ReactProvider} from '@web3-react/core'
import {ethers} from 'ethers'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import {useEffect, useState} from 'react'

const getLibrary = (provider) => {
  const library = new ethers.providers.Web3Provider(provider);
  library.pollingInterval = 8000; // frequency provider is polling
  return library;
};

function MyApp({ Component, pageProps }) {
  const [showing, setShowing] = useState(false);

      useEffect(() => {
        setShowing(true);
      }, []);

      if (!showing) {
        return null;
      }

      if (typeof window === 'undefined') {
        return <></>;
      } else {
  
  return (
  <Web3ReactProvider getLibrary={getLibrary}>
    <Component {...pageProps} />
  </Web3ReactProvider>
  )
}
}

export default MyApp
