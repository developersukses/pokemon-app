import React from 'react';

const DialogComponent = ({ message, name, onDialog , image }) => {
    return (
        <div className={`dialog ${onDialog ? 'show' : 'hide'}`}>
            <div className='dialog-content'>
                <div className='dialog-header'>
                    <h2 className='dialog-title'>Confirmation</h2>
                    <button className='btn-dialog-close' onClick={() => onDialog(false)}>
                        <span>&#10005;</span>
                    </button>
                </div>
                <div className='dialog-body'>
                    <div className='dialog-img-body'>
                        <img src={image} alt='' />
                    </div>
                    <p className='dialog-message' style={{ fontSize: '14px' }}>
                        {message}
                    </p>
                    <p className='dialog-message'>{name}</p>
                </div>
                <div className='dialog-footer'>
                    <button className='btn-dialog btn-dialog-cancel' onClick={() => onDialog(false)}>
                        Cancel
                    </button>
                    <button className='btn-dialog btn-dialog-delete' onClick={() => onDialog(true)}>
                        Yes
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DialogComponent;
