import tokenSaleAbi from '../config/abi/TokenSaleContract.json'
import { ethers } from "ethers";
import {AddressZero} from '@ethersproject/constants'
import {useMemo} from 'react'

const provider = ethers.getDefaultProvider("https://rinkeby.infura.io/v3/fc14a52483224deebaafcbcc2b1059f1")

const getContract = (address, abi) => {
    return new ethers.Contract(address, abi, provider)
}


export const getSaleContract = (address, abi) => {
    return useMemo(() => {
        if (!address || address == AddressZero || !abi) return null
        try {
            return getContract(address, abi)
        } catch (error) {
            console.error("failed to get contract", error)
        }
    }, [address, abi])
}

