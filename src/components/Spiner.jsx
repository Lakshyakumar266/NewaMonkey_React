import React, { Component } from 'react'
import SpinerGif from './loading.gif' 
export class Spiner extends Component {
    render() {
        return (
            <div className='text-center my-3'>
                <img src={SpinerGif} alt={SpinerGif} width="80" />
            </div>
        )
    }
}

export default Spiner
