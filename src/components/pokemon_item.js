import React, { useState, useEffect } from 'react';
import {
    Center,
    WrapItem,
    Stack,
    Image
} from '@chakra-ui/react';
import '../App.css';
import {
    Link
} from "react-router-dom";
import {colorBackGround} from '../functions';


function PokemonItem({ data }) {

    const [dataPokemon, setDataPokemon] = useState([]);
    const [isData, setIsData] = useState(false);

    useEffect(() => {
        initData();
    }, []);

    function initData() {
        fetch(data.url)
            .then(res => res.json())
            .then(
                (result) => {
                    setDataPokemon(result);
                    setIsData(true);
                },
                (error) => {
                    //error
                }
            )
    }

    return (
        <WrapItem>
            {isData &&
                <Link
                    to={{
                        pathname: "/pokemon/" + dataPokemon.id,
                    }}
                >
                    <div className='container-pokemon' style={{ backgroundColor: colorBackGround(dataPokemon.types), boxShadow: '0 0 1em' + colorBackGround(dataPokemon.types), }}>
                        <div className='content-pokemon'>
                            <Stack direction='row'>
                                <div className='content-name'>
                                    <b>{dataPokemon.name}</b>
                                    <div className='content-types'>
                                        {dataPokemon.types.map((item) =>
                                            <div key={item.slot} className='item-types'>
                                                <span className='text-type' style={{ color: colorBackGround(dataPokemon.types) }}> {item.type.name}</span>
                                            </div>
                                        )}
                                    </div>

                                </div>
                                <div className='content-image'>
                                    <b className='content-id'>#{dataPokemon.id}</b>
                                    <Image
                                        className='image-pokemon'
                                        boxSize='150px'
                                        objectFit='cover'
                                        src={dataPokemon.sprites.other.home.front_default}
                                        alt='Dan Abramov'
                                    />
                                </div>

                            </ Stack>
                        </div>
                    </div>
                </Link>
            }
        </WrapItem>
    );
}

export default PokemonItem;