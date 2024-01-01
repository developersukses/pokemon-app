import React from 'react';

const LoadingComponent = () => {
    return (
        <div className='pokemon-card rounded-3'>
            <div className='image-card bg-loading bg-gradient rounded-top-3'></div>
            <div className='body-card'>
                <h4 className='bg-loading bg-gradient rounded-3'></h4>
            </div>
            <div className='footer-card'>
                <span className='footer-loading bg-loading bg-gradient rounded-3'></span>
            </div>
        </div>
    );
};

export default LoadingComponent;
