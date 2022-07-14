import { useState, useEffect } from 'react';
import './CustomPlayer.css'

const CustomPlayer = () => {
    //songDuration is length in seconds.
    //songProgress is percentage of way through song.
    const [ songDuration, setSongDuration ] = useState(0);
    const [ songProgress, setSongProgress ] = useState(0);
    const [ isDragging, setDragging ] = useState(false);

    const updateSongProgress = () => {
        const playerAudio = document.getElementById('player-audio');
        const currentSongTime = playerAudio.currentTime;
        const newSongDuration = playerAudio.duration;
        const newSongProgress = 100*(currentSongTime/newSongDuration);

        setSongDuration(newSongDuration);
        setSongProgress(newSongProgress);
    };

    const setTimeUpdate = () => {
        const playerAudio = document.getElementById('player-audio');
        playerAudio.ontimeupdate = () => {updateSongProgress()};
    }

    const setSongPosition = (e) => {
        //get position of mouse.
        const box = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - box.left;

        const fraction = x/(box.right-box.left);
        
        if (!(songDuration === 0 || isNaN(songDuration)))
        {
            //only set position if there is something playing.
            const playerAudio = document.getElementById('player-audio');
            playerAudio.currentTime = fraction * playerAudio.duration;
        }
    }

    const handleMouseDown = (e) => {
        setSongPosition(e);
        setDragging(true);
        console.log('Mouse down!');
    }

    const handleMouseUp = (e) => {
        setDragging(false);
        console.log('Mouse up!');
    }

    useEffect(() => {
        setTimeUpdate();
    },[]);

    const formatTime = () => {
        let formattedTime = '';

        let secondsLeft = Math.round(songDuration*(1-songProgress/100));
        const seconds = secondsLeft%60;
        
        secondsLeft = Math.floor(secondsLeft/60);
        const minutes = secondsLeft%60;

        secondsLeft = Math.floor(secondsLeft/60);
        const hours = secondsLeft%60;

        if ((isNaN(hours) || isNaN(minutes)) || isNaN(seconds))
        {
            return ['00:00','00:00'];
        }

        else {
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
    }

    return (
        <div className='spread-bar'>
            <div className='time-format'>{formatTime()[0]}</div>
            <div className='progress progress-style' onMouseDown={handleMouseDown} onMouseUp={handleMouseUp}>
                <div className='progress-bar progress-bar-style' style={{'width': String(songProgress)+'%'}} aria-valuenow={String(songProgress)} aria-valuemin='0' aria-valuemax='100'></div>
            </div>
            <div className='time-format'>{formatTime()[1]}</div>
        </div>
    );
}

export default CustomPlayer;