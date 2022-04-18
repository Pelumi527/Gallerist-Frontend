import { Box, Flex, Stack, Text } from "@chakra-ui/react";
import { FaTwitter, FaTelegramPlane, FaMediumM, FaDiscord } from 'react-icons/fa';


export default function Footer(){
    return (
        <Box p={8} color='white' bg='blue'>
            <Flex direction='column'>
                <Box>
                    <Stack spacing={3}>
                        <Text fontSize="lg">Join our community for updates</Text>
                        <Text fontSize="lg">Only these accounts are official and represents our team’s communication!</Text>
                    </Stack>
                </Box>
                <Box p={15}>
                    <Flex justifyContent='space-evenly'>
                        <Text fontSize='xx-large'> <a href="https://www.twitter.com/GalleristToken" target='_blank' rel="noreferrer"><FaTwitter className='mx-5'/></a></Text>
                        <Text fontSize='xx-large'><a href="https://t.me/GalleristToken" target='_blank' rel="noreferrer"><FaTelegramPlane className='mx-5'/></a></Text>
                        <Text fontSize='xx-large'><a href="https://www.medium.com/@GalleristToken" target='_blank' rel="noreferrer"><FaMediumM className='mx-5'/></a></Text>
                        <Text fontSize='xx-large'><a href="https://discord.gg/cvxRnmMP" target='_blank' rel="noreferrer"><FaDiscord className='mx-5'/></a></Text>
                    </Flex>
                </Box>
               <Box p={15}>
                    <Text fontSize="sm"><p>Copyright Gallerist Foundation © 2022 All Rights Reserved.</p></Text>
               </Box>
            </Flex>
        </Box>
    )

}