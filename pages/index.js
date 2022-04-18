import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import tokenSaleAbi from './config/abi/TokenSaleContract.json'
import {
  ChakraProvider,
  Box,
  Spacer,
  Link,
  HStack,
  Code,
  Flex,
  Button,
  useDisclosure,
  Text,
  Tooltip,
  Input,
  List,
  ListItem,
} from '@chakra-ui/react';
import SelectWalletModal from '../components/modal'
import { useWeb3React } from '@web3-react/core';
import {ethers} from "ethers";
import {Col,Row} from "react-bootstrap"
import { useState, useEffect, useMemo} from 'react';
import { ToastContainer, toast } from "react-toastify";
import Web3Modal from 'web3modal';
import Logo from '../images/logo.png'
import theme from '../components/theme';
import Footer from '../components/footer';




export default function Home() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [buyAmount, setBuyAmount] = useState(0)
  const {
    library,
    chainId,
    account,
    activate,
    deactivate,
    active
  } = useWeb3React();
  const [price, setPrice] = useState(0)
  const [SaleMode, setSaleMode] = useState(0)
  const [PublicPrice, setPublicPrice] = useState(0)
  const [PrivatePrice, setPrivatePrice] = useState(0)

  const disconnect = () => {
    //refreshState();
    deactivate();
  };



  const handleBuyAmount = (e) => {
    setBuyAmount(e.target.value);
  }

  const handlePrice = () => {
    if(SaleMode){
      const a = (buyAmount*PrivatePrice)/1000;
      setPrice(a)
    }

    if(!SaleMode){
      const a =(buyAmount*PublicPrice)/1000;
      setPrice(a)
    }
  }





  console.log(price, "price2")
  console.log(buyAmount, 'buy')
  console.log(PublicPrice, PrivatePrice, "price")
  console.log(chainId, 'chain')

  async function loader (){
    const provider = new ethers.providers.JsonRpcProvider("https://rinkeby.infura.io/v3/fc14a52483224deebaafcbcc2b1059f1")
    const keepersContract = new ethers.Contract("0x59C586Ef2fd5117c0C5e7F90342DfA1ebE79EFAe", tokenSaleAbi.abi, provider);
    const isPrivateSale = await keepersContract.isPrivateSale();
    setSaleMode(isPrivateSale)
    const privatePrice = await keepersContract.privateSalePrice()
    setPrivatePrice(ethers.utils.formatEther(privatePrice.toString()))
    const publicPrice = await keepersContract.publicSalePrice();
    setPublicPrice(ethers.utils.formatEther(publicPrice.toString()))

    
  }


  async function buy() {
    const web3Modal = new Web3Modal()
    const connection = await web3Modal.connect()
    const provider = new ethers.providers.Web3Provider(connection)
    const signer = provider.getSigner()
    const keepersContract = new ethers.Contract("0x59C586Ef2fd5117c0C5e7F90342DfA1ebE79EFAe", tokenSaleAbi.abi, signer);

    try {
      const counter = await keepersContract.buy(buyAmount, {
        value:ethers.utils.parseEther(price.toString()),
        gasLimit:3000000
      })
      toast.info(`Buying ${buyAmount} GAL`,{
        position: "top-right",
        autoClose:15000,
        hideProgressBar:false,
        closeOnClick:true,
        pauseOnHover:true,
        draggable: true,
        progress: undefined,
        theme:"colored"
      })
      await counter.wait()
      toast.success(`Successfully Bought ${buyAmount} GAL`,{
        position: "top-right",
        autoClose:5000,
        hideProgressBar:false,
        closeOnClick:true,
        pauseOnHover:true,
        draggable: true,
        progress: undefined,
        theme:"colored"
      })
    } catch (error) {
      toast.error(`${error.message}`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme:"colored"
      });
    }
}

console.log(SaleMode, "gggg")

useEffect(() => {
 loader();
 handlePrice();
})


// useMemo(() =>
//  {loader()}
// , [loader])

  return (
    <ChakraProvider theme={theme}>
      <Head>
        <title>Gallerist|Buy</title>
        <meta name="description" content="Gallerist|Buy" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <Box  textAlign="center" fontSize="xl">
        <Flex color='white' bg='blue' p={3}>
          <Box>
            <Link href='https://gallerist.me/'>
              <Image
                src={Logo}
                height={35} 
                width={35}
                alt='Gallerist Logo'/>
            </Link>
           </Box>
         <Spacer />
          <Box>
            {!active ? (<Button colorScheme='teal' onClick={onOpen}>Connect Wallet</Button>):
                chainId != 4 ? <Box bg='red.400' p={3} color='white'> <Text as='cite' fontSize='md'> You are on the wrong network</Text> </Box> : 
                <HStack>
                 <Button colorScheme='teal' onClick={disconnect}>Disconnect</Button>
                 <Tooltip label={account} placement='right'>
                   <Text as='cite' fontSize="md">{`${account.slice(0,5) + '....'+ account.slice(40, 48)}`}</Text>
                 </Tooltip>
              </HStack>
              }
          </Box>
        </Flex>
        <Box m={15}>
          <Row >
            <Col>
              <h2 >How to Buy Gallerist Token</h2>
            <List spacing={5}>
              <ListItem>
                <Text fontSize="lg"><b>Step 1:</b> Make sure you have installed a Wallet on browser.</Text>
              </ListItem>
              <ListItem>
                <Text fontSize="lg"><b>Step 2:</b> Make you have ether deposited in your wallet.</Text>
              </ListItem>
              <ListItem>
                <Text fontSize="lg"><b>Step 3:</b> Import the token into you wallet. <a rel="noreferrer" href='https://www.alphr.com/add-token-metamask/' target="_blank">Click here to know more</a></Text>
              </ListItem>
              <ListItem>
                <Text fontSize="lg"><b>Step 4:</b> Connect your wallet.</Text>
              </ListItem>
              <ListItem>
                <Text fontSize="lg"><b>Step 5:</b> Enter the amount of token you want and click the buy button.</Text>
              </ListItem>
              <ListItem>
                <Text fontSize="lg" as='em'>Note: The minimum you can purchase is 1000 GAL</Text>
              </ListItem>
            </List>
            </Col>
            <Col>
                <h2>Buy Gallerist Token</h2>
                {active ? (<div>
                  <Box p='4'>
                  <Input placeholder='Enter Token Amount'  onChange={handleBuyAmount} htmlSize={12} width='auto' size="md"></Input>
                </Box>
               {price != 0 ?  <Button colorScheme='teal' onClick={buy}>{`Buy with ${price}`}</Button>:
               <Button colorScheme='teal'>Buy</Button>}
                </div>) : <Button colorScheme='teal' onClick={onOpen}>Connect Wallet</Button>}
            </Col>
          </Row>
        </Box>
        <Footer />
        <SelectWalletModal isOpen={isOpen} closeModal={onClose} />
      </Box>
      <ToastContainer
        position="top-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </ChakraProvider>
  )
}
