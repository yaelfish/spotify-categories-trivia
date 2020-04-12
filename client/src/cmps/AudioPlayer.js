import React from 'react';
import utils from '../services/utils';

export default function AudioPlayer(props) {

    return (
        <div className="audio-container">
            <audio controls volume="0.3" autoPlay key={utils.getRandomId()}>
                <source src={props.src} type="audio/mpeg">
                </source>
                Your browser does not support the audio element.
            </audio>
        </div>
    )
}
