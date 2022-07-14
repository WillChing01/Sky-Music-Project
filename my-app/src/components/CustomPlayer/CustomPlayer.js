import { useState } from 'react';
import './CustomPlayer.css'

const CustomPlayer = ({ songProgress, songDuration }) => {

    const handleMouseDown = (e) => {
        //get position of mouse.
        const box = e.target.getBoundingClientRect();
        const x = e.clientX - box.left;

        const fraction = x/(box.right-box.left);
        console.log('target: '+e.target);
        console.log('x: '+x);
        
        if (!(songDuration === 0 || isNaN(songDuration)))
        {
            //only set position if there is something playing.
            const playerAudio = document.getElementById('player-audio');
            playerAudio.currentTime = fraction * playerAudio.duration;
            console.log(fraction*playerAudio.duration);
        }
    }

    const formatTime = () => {
        let formattedTime = '';

        let x = Math.round(songDuration-songDuration*songProgress/100);
        const seconds = x%60;
        
        x = Math.floor(x/60);
        const minutes = x%60;

        x = Math.floor(x/60);
        const hours = x%60;

        if (hours !== 0) {
            if (hours < 10) {formattedTime += '0';}
            formattedTime += String(hours) + ':';
        }

        if (minutes === 0) {formattedTime += '00:';}
        else if (minutes < 10) {formattedTime += '0' + String(minutes) + ':';}
        else {formattedTime += String(minutes) + ':';}
        
        if (seconds === 0) {formattedTime += '00';}
        else if (seconds < 10) {formattedTime += '0' + String(seconds);}
        else {formattedTime += String(seconds);}

        let start = '';
        for (var i=0; i < formattedTime.length; i++)
        {
            if (!isNaN(formattedTime.charAt(i))) {start += '0';}
            else {start += formattedTime.charAt(i);}
        }

        return [ start, formattedTime ];
    }

    return (
        <div className='spread-bar'>
            <div className='time-format'>{formatTime()[0]}</div>
            <div className='progress progress-style' onMouseDown={handleMouseDown}>
                <div className='progress-bar progress-bar-style' style={{'width': String(songProgress)+'%'}} aria-valuenow={String(songProgress)} aria-valuemin='0' aria-valuemax='100'></div>
            </div>
            <div className='time-format'>{formatTime()[1]}</div>
        </div>
    );
}

export default CustomPlayer;