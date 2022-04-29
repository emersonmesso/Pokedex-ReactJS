import React, { useState, useEffect } from 'react';
import {
    ChakraProvider,
    Center,
    theme,
    Text,
    Box,
    Flex,
    CircularProgress,
    Button,
    Wrap,
} from '@chakra-ui/react';
import PokemonItem from '../../components/pokemon_item';
import '../../App.css';
import InfiniteScroll from "react-infinite-scroll-component";


function Home() {
    const [listPokemon, setListPokemon] = useState([]);
    const [isLoadding, setIsLoading] = useState(true);
    const [page, setPage] = useState(20);

    function initData() {
        fetch("https://pokeapi.co/api/v2/pokemon/?offset=0&limit=10")
            .then(res => res.json())
            .then(
                (result) => {
                    setListPokemon(result.results);
                    setIsLoading(false);
                },
                (error) => {
                    //error
                }
            )
    }

    function getMore() {
        fetch("https://pokeapi.co/api/v2/pokemon/?offset=0&limit=" + page)
            .then(res => res.json())
            .then(
                (result) => {
                    setListPokemon(result.results);
                    setPage(page + 10);
                },
                (error) => {
                    //error
                }
            )
    }


    function onClickPage(offset, limit) {

        fetch("https://pokeapi.co/api/v2/pokemon/?offset=" + offset + "&limit=" + limit)
            .then(res => res.json())
            .then(
                (result) => {
                    setListPokemon(result.results);
                    setIsLoading(false);
                },
                (error) => {
                    //error
                }
            )
    }

    useEffect(() => {
        initData();
    }, []);


    return (
        <ChakraProvider theme={theme}>
            {isLoadding ?
                <Box bg='Gray 200' w='100%' height='100vh' p={4} color='Gray 200'>
                    <Center bg='Gray 200' h='90vh' color='white'>
                        <CircularProgress isIndeterminate color='tomato' />
                    </Center>
                </Box>
                :
                <Box bg='Gray 200' w='100%' height='100vh' p={4} color='Gray 200'>
                    <Center>
                        <Flex direction='column'>
                            <Text fontSize='6xl' color='tomato'>Pokedex</Text>
                            <Box w='60' height='1' bg="tomato"></Box>
                            <Box height='15' />
                            <Flex direction='row'>
                                <Center>
                                    <Button colorScheme='orange' variant='outline' onClick={() => onClickPage(0, 10)}>1</Button>
                                    <Button colorScheme='orange' variant='outline' onClick={() => onClickPage(10, 10)}>2</Button>
                                    <Button colorScheme='orange' variant='outline' onClick={() => onClickPage(20, 10)}>3</Button>
                                    <Button colorScheme='orange' variant='outline' onClick={() => onClickPage(30, 10)}>4</Button>
                                    <Button colorScheme='orange' variant='outline' onClick={() => onClickPage(40, 10)}>5</Button>
                                    <Button colorScheme='orange' variant='outline' onClick={() => onClickPage(50, 10)}>6</Button>
                                </Center>

                            </Flex>
                        </Flex>
                    </Center>
                    <Box height='50' />

                    <Center bg='Gray 200' color='white'>


                        <InfiniteScroll
                            dataLength={listPokemon.length}
                            next={getMore}
                            hasMore={true}
                            loader={<h4>Loading...</h4>}
                        >
                            <Wrap spacing='40px' justify='center'>
                                {listPokemon.map((item) =>
                                    <PokemonItem key={item.url} data={item} />
                                )}
                            </Wrap>

                        </InfiniteScroll>

                    </Center>
                </Box>
            }
        </ChakraProvider>
    );
}

export default Home;
