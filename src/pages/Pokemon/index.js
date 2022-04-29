import React, { useState, useEffect } from 'react';
import {
  ChakraProvider,
  Center,
  theme,
  Stack,
  Box,
  CircularProgress,
  SimpleGrid,
  Spacer,
  Flex,
  Progress,
  Divider
} from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { colorBackGround } from '../../functions';

function Pokemon() {

  const params = useParams();
  const id = params.id;

  const [isLoadding, setIsLoading] = useState(true);
  const [dataPokemon, setDataPokemon] = useState([]);
  const [dataPokemonSpeccies, setDataPokemonSpecies] = useState([]);

  function initData() {
    fetch("https://pokeapi.co/api/v2/pokemon/" + id)
      .then(res => res.json())
      .then(
        (result) => {
          setDataPokemon(result);
          getDataSpecies(result.id);
        },
        (error) => {
          //error
        }
      )
  }

  function getDataSpecies(id) {
    fetch("https://pokeapi.co/api/v2/pokemon-species/" + id)
      .then(res => res.json())
      .then(
        (result) => {
          setDataPokemonSpecies(result);
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
        <Box bg='Gray 200' w='100%' height='100vh' color='Gray 200'>
          <Center bg='Gray 200' h='90vh' color='white'>
            <CircularProgress isIndeterminate color='tomato' />
          </Center>
        </Box>
        :
        <Box style={{ backgroundColor: colorBackGround(dataPokemon.types) }} w='100vw' className='pokemon-box' p={4} color='Gray 200'>
          <Center>
            <Stack direction='column' className='pokemon-view'>
              <SimpleGrid columns={1} spacing={10}>
                <Center>
                  <div className='header-info'>
                    <SimpleGrid columns={1} spacing={2}>
                      <Box>
                        <Flex>
                          <Box>
                            <h1 className='name-pokemon-detail'>{dataPokemon.name}</h1>
                          </Box>
                          <Spacer />
                          <Box>
                            <b className='id-pokemon-detail'>#{dataPokemon.id}</b>
                          </Box>
                        </Flex>
                      </Box>
                      <Box>
                        <Stack direction='row'>
                          {dataPokemon.types.map((item) =>
                            <div key={item.slot} className='item-types'>
                              <span className='text-type' style={{ color: colorBackGround(dataPokemon.types) }}> {item.type.name}</span>
                            </div>
                          )}
                        </Stack>
                      </Box>
                      <Box>
                        <Center>
                          <img src={dataPokemon.sprites.other.home.front_default} alt='' className='image-header' title='' />
                        </Center>

                      </Box>
                      <Box className='info-pokemon'>
                        <Tabs>
                          <TabList>
                            <Tab>Sobre</Tab>
                            <Tab>Base status</Tab>
                          </TabList>

                          <TabPanel>
                            <h2>{dataPokemonSpeccies.flavor_text_entries[0].flavor_text}</h2>
                          </TabPanel>
                          <TabPanel>
                            <Flex direction='column'>
                              {dataPokemon.stats.map((item) =>
                                <Box>
                                  {item.stat.name}
                                  <br />
                                  {item.base_stat}
                                  <Progress value={item.base_stat} colorScheme='orange' />
                                  <Divider />
                                </Box>
                              )}
                            </Flex>
                          </TabPanel>
                        </Tabs>
                      </Box>
                    </SimpleGrid>
                  </div>
                </Center>

              </SimpleGrid>
            </Stack>
          </Center>
        </Box>
      }
    </ChakraProvider>
  );
}

export default Pokemon;