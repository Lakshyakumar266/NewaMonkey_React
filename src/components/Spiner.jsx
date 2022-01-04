import React from 'react'
import SpinerGif from './loading.gif'
const Spiner = () => {
    return (
        <div className='text-center my-3'>
            <img src={SpinerGif} alt={SpinerGif} width="80" />
        </div>
    )
}

export default Spiner
