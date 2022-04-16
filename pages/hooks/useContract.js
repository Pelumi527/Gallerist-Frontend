import { getSaleContract } from "./contract";
import tokenSaleAbi from '../config/abi/TokenSaleContract.json'
import { ethers, Contract } from "ethers";
import {detectEthereumProvider} from '@metamask/detect-provider'

// const provider = ethers.getDefaultProvider("https://rinkeby.infura.io/v3/fc14a52483224deebaafcbcc2b1059f1")

// const getContract = (address, abi) => {
//     return new ethers.Contract(address, abi, provider)
// }

// export const useSaleContract = () => {
//     getContract("0x59c586ef2fd5117c0c5e7f90342dfa1ebe79efae", tokenSaleAbi.abi)
// }

// const getBlockchain = () =>
//   new Promise( async (resolve, reject) => {
//     let provider = await detectEthereumProvider();
    
//     if(provider) {
//       await provider.request({ method: 'eth_requestAccounts' });
//       const networkId = await provider.request({ method: 'net_version' })
//       provider = new ethers.providers.Web3Provider(provider);
//       const signer = provider.getSigner();
//       const todo = new Contract(
//         '0x59c586ef2fd5117c0c5e7f90342dfa1ebe79efae',
//         tokenSaleAbi.abi,
//         signer
//       );
//       resolve({todo});
//       return;
//     }
//     reject('Install Metamask');
//  });

// export default getBlockchain;