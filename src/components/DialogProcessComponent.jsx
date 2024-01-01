import React, { useEffect, useState } from 'react';
import SpinLoading from './SpinLoading';
import PokemonRequest from '../util/PokemonRequest';
import Alert from 'react-bootstrap/Alert';
import Form from 'react-bootstrap/Form';
import axios from 'axios'

const DialogProcessComponent = ({ pokemonName, title, results, onClose, pokemonId, image, form }) => {
    if (typeof image == 'undefined' && typeof pokemonId != 'undefined') {
        const { data, error } = PokemonRequest('/pokemon', pokemonId);
        image = data.sprites.other.home.front_shiny;
    }

    const [validated, setValidated] = useState({
        validate : false,
        text: 'Nickname must be required',
        isInvalid : false,
        disabledButton : false,
        isLoading : false,
        isResults: false,
        isTitle:false,
        isMessage: ''
    })

    const [nickname, setNickname] = useState('')

    const handleSubmit = async (event) => {
        event.preventDefault();
        if(nickname == ""){
            setValidated( prev => ({...prev, text: 'Nickname must be required', isInvalid:true}))
        }

        if(nickname != ""){
            //check name on API 
            const results = await axios.get(`https://said-pokemon-api.vercel.app/pokemons/${nickname}`)
            if(results.data != null){
                setValidated( prev => ({...prev, text: 'Nickname are ready exist', isInvalid:true}))
            }else{
                setValidated(prev => ({...prev, isLoading: true}))
                const catching = await axios.post(`https://said-pokemon-api.vercel.app/pokemons`,{
                    nickname: nickname,
                    pokemon_id: pokemonId
                })
                setTimeout(() => {
                    if(catching.data != null){
                        setValidated(prev => ({...prev, isLoading: false, isResults: true, isTitle: true, isMessage: 'Successfully catching this pokemon'}))

                    }else{
                        setValidated(prev => ({...prev, isLoading: false, isResults: true, isTitle: false, isMessage: 'Oops, processing failed, please try again'}))
                    }
                }, 1000);
            }
        }
        
    };

    useEffect(() => {
        if(nickname != ""){
            setValidated(prev => ({...prev, isInvalid: false}))
        }
    },[nickname])


    return (
        <div className={`dialog show`}>
            <div className='dialog-content'>
                <div className='dialog-process'>
                    <h2 className='dialog-title text-capitalize text-center'>{pokemonName}</h2>
                </div>
                <div className='dialog-body'>
                    <div className='dialog-img-body mb-5'>
                        <img src={image} alt='' />
                    </div>
                    {results === '' || validated.isLoading ? (
                        <>
                            <div className='dialog-message'>
                                <SpinLoading />
                            </div>
                            <p className='dialog-message mb-4' style={{ fontSize: '14px' }}>
                                Process {validated.isLoading ? `Saving` : title}...
                            </p>
                        </>
                    ) : typeof form == 'undefined' || form == ''  ? (
                        <>
                            <div className='dialog-message mb-4' style={{ fontSize: '14px' }}>
                                <Alert variant={results ? 'success' : 'danger'}>{title}</Alert>
                            </div>
                            <div className='dialog-footer'>
                                <button className='btn-dialog btn-dialog-cancel' onClick={() => onClose()}>
                                    Cancel
                                </button>
                            </div>
                        </>
                    ) : !validated.isResults ?  (
                        <>
                            <div className='dialog-message mb-4' style={{ fontSize: '14px' }}>
                                <Form noValidate validated={validated.validate} onSubmit={handleSubmit}>
                                    <Form.Control type='text' placeholder='Nickname' value={nickname} onChange={(e) => setNickname(e.target.value)}  isInvalid={validated.isInvalid} />
                                    <Form.Control.Feedback type='invalid'>{validated.text}</Form.Control.Feedback>

                                    <button className='btn-dialog btn-dialog-cancel mt-4 mx-3' onClick={() => onClose()}>
                                        Cancel
                                    </button>
                                    <button type='submit' className='btn-dialog btn-dialog-continue mt-4' disabled={validated.disabledButton}>
                                        Save
                                    </button>
                                </Form>
                            </div>
                        </>
                        ) : (
                            <>
                                <div className='dialog-message mb-4' style={{ fontSize: '14px' }}>
                                    <Alert variant={validated.isTitle ? 'success' : 'danger'}>{validated.isMessage}</Alert>
                                </div>
                                <div className='dialog-footer'>
                                    <button className='btn-dialog btn-dialog-cancel' onClick={() => onClose()}>
                                        Cancel
                                    </button>
                                </div>
                            </>
                        )}
                </div>
            </div>
        </div>
    );
};

export default DialogProcessComponent;
