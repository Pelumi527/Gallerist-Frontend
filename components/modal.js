import { Modal, ModalBody, ModalContent, ModalHeader, ModalOverlay , ModalCloseButton} from "@chakra-ui/modal";
import { connectors } from "./connector";
import {useWeb3React} from "@web3-react/core"
import { HStack } from "@chakra-ui/layout";
import {Button, Image, Text} from "@chakra-ui/react"

export default function SelectWalletModal({isOpen, closeModal}){

    const {activate} = useWeb3React()

    const setProvider = (type) => {
        window.localStorage.setItem("provider", type);
    };


    return(
        <Modal isOpen={isOpen} onClose={closeModal}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Select Wallet</ModalHeader>
                <ModalCloseButton
                    _focus={{
                        boxShadow: "none"
                    }}
                />
                <ModalBody>
                    <HStack>
                        <Button
                            variant="outline"
                            onClick={() => {
                                activate(connectors.walletConnect);
                                setProvider("walletConnect");
                                closeModal();
                            }}
                            w="100%"
                            >
                            <HStack w="100%" justifyContent="center">
                                <Image
                                src="/wc.png"
                                alt="Wallet Connect Logo"
                                width={26}
                                height={26}
                                borderRadius="3px"
                                />
                                <Text>Wallet Connect</Text>
                            </HStack>
                        </Button>
                        <Button
                            variant="outline"
                            onClick={() => {
                                activate(connectors.injected);
                                setProvider("injected");
                                closeModal();
                            }}
                            w="100%"
                            >
                            <HStack w="100%" justifyContent="center">
                                <Image
                                src="/mm.png"
                                alt="Metamask Logo"
                                width={25}
                                height={25}
                                borderRadius="3px"
                                />
                                <Text>Metamask</Text>
                            </HStack>
                        </Button>
                    </HStack>
                </ModalBody>
            </ModalContent>
        </Modal>
    )
}