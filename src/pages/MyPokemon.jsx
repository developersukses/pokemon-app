import React, {useState, useEffect} from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import MyPokemonCardComponent from '../components/MyPokemonCardComponent';
import { LoadInfinitePokeDex } from '../util/LoadInfinite';
import axios from 'axios'
import DialogProcessComponent from '../components/DialogProcessComponent';

const MyPokemon = () => {
    const { data, error, isLoading, loadMore, mutate } = LoadInfinitePokeDex('/pokemons', 20);
    const [loadingButtonRename, setLoadingButtonRename] = useState({
      isLoading : false,
      id : ''
    })

    const [dialog, setDialog] = useState({
      pokemonName: '',
      results: '',
      isLoading: false,
      title: '',
      pokemonId: ''
    })

    const handleDialog = (isLoading, title, pokemonName,results,pokemonId) => {
      setDialog(prev => ({...prev, isLoading : isLoading, title: title,results: results, pokemonName: pokemonName, pokemonId:pokemonId}))
    }

    if(isLoading || error) return <div>Loading ...</div>

    const handleRename = async (id) => {
      try {
        setLoadingButtonRename({isLoading: true, id : id})
        await axios.patch(`http://localhost/pokemons/${id}`,{
          id: id
        })
        mutate()
        setLoadingButtonRename({isLoading: false, id : id})
      } catch (error) {
        console.log(error.message)
      }
      
    }


    const handleRelease = async (id,pokemonId,pokemonName) => {
        handleDialog(true, 'Release',pokemonName,"", pokemonId)
        
        const release = await axios.delete(`http://localhost/pokemons/release/${id}`)
        setTimeout(() => {
          release.data.release ? handleDialog(true,'Release Successfully',pokemonName,true,pokemonId) : handleDialog(true,release.data.msg,pokemonName,false,pokemonId)
        }, 1000);
    }

    const handleClose = () => {
      setDialog(prev => ({...prev, isLoading : false }))
      dialog.results && mutate()
    }
    
    return (
        <>
        {dialog.isLoading && (<DialogProcessComponent title={dialog.title}  pokemonId={dialog.pokemonId} pokemonName={dialog.pokemonName} results={dialog.results} onClose={handleClose}/>) }
        <div className='pokemon-list'>
            <Container>
                <Row>
                    <Col>
                        <h1 className='text-center fw-bold pb-5'>My Pokemon</h1>
                    </Col>
                </Row>
                {
                  data[0].length > 0 && (
                    <>
                      <Row>
                          <div className='pokemon-content'>
                            {
                              data.map((pokemons) => {
                                return pokemons.map((pokemon,index) => (
                                  <MyPokemonCardComponent key={index} pokemon={pokemon} onHandleRename={() => handleRename(pokemon.id)} isLoadingButtonRename = {loadingButtonRename} onHandleRelease={() => handleRelease(pokemon.id, pokemon.pokemon_id, (pokemon.fib_nickname == null ? pokemon.nickname : pokemon.fib_nickname) )}/>
                                ))
                              })
                            }
                          </div>
                      </Row>
                      <Row>
                        <Col>
                          <div className="next">
                            <button className="next-btn" onClick={loadMore}>
                              Load More &darr;
                            </button>
                          </div>
                        </Col>
                      </Row>
                    </>
                  )
                }
            </Container>
        </div>
        </>
    );
};

export default MyPokemon;
