//import logo from './logo.svg';
import './App.css';
import React from 'react';


function App() {

    const [hours, setHours] = React.useState(0);
    const [minutes, setMinutes] = React.useState(0);
    const [seconds, setSeconds] = React.useState(0);
    const [hoursShuffle, setHoursShuffle] = React.useState(true);
    const [minutesShuffle, setMinutesShuffle] = React.useState(true);
    const [secondsShuffle, setSecondsShuffle] = React.useState(true);


    const AnimatedCard = ({ animation, digit }) => {
        return (
            <div className={"flipCard " + animation}>
                <span>{digit}</span>
            </div>
        )
    }

    const StaticCard = ({ position, digit }) => {
        return (
            <div className={position}>
                <span>{digit}</span>
            </div>
        )
    }

    const FlipUnitContainer = ({ digit, shuffle, unit }) => {

        let currentDigit = digit;
        let previousDigit = digit - 1;

        if (unit !== "hours") {
            previousDigit = previousDigit === -1 ? 59 : previousDigit;
        } else {
            previousDigit = previousDigit === -1 ? 23 : previousDigit;
            
        }

        currentDigit = (currentDigit < 10) ? "0" + currentDigit : currentDigit;
        previousDigit = (previousDigit < 10) ? "0" + previousDigit : previousDigit;

        const digit1 = shuffle ? previousDigit : currentDigit;
        const digit2 = !shuffle ? previousDigit : currentDigit;

        const animation1 = shuffle ? "fold" : "unfold"
        const animation2 = !shuffle ? "fold" : "unfold"

        // console.log(unit, hours, minutes, seconds, hoursShuffle, minutesShuffle, secondsShuffle, digit1, animation1, digit2, animation2)

        return (
            <div className="flipUnitContainer">
                <StaticCard position="upperCard" digit={currentDigit} />
                <StaticCard position="lowerCard" digit={previousDigit} />
                <AnimatedCard digit={digit1} animation={animation1} />
                <AnimatedCard digit={digit2} animation={animation2} />
            </div>
        )
    }

    React.useEffect(() => {
        const timerId = setInterval(updateTime, 1000);

        return function clearnup() {
            clearInterval(timerId);
        }
    }, []);
    // hours, minutes, seconds, hoursShuffle, minutesShuffle, secondsShuffle


    const updateTime = () => {

        const time = new Date;
        const hh = time.getHours();
        const mm = time.getMinutes();
        const ss = time.getSeconds();    

        if (hours !== hh) {
            console.log("hour", hours, hh)
            const hhShuffle = !hoursShuffle;
            setHours(hh);
            setHoursShuffle(hhShuffle);
        }

        if (minutes !== mm) {
            console.log("mm", minutes, mm)
            const mmShuffle = !minutesShuffle;
            setMinutes(mm);
            setMinutesShuffle(mmShuffle);
        }
        if (seconds !== ss) {
            console.log("ss", seconds, ss)
            const ssShuffle = !secondsShuffle;
            setSeconds(ss);            
            setSecondsShuffle(ssShuffle);
        }
    }
    
    return (
        <div className="flipClock">
            <FlipUnitContainer unit="hours" digit={hours} shuffle={hoursShuffle} />
            <FlipUnitContainer unit="minutes" digit={minutes} shuffle={minutesShuffle} />
            <FlipUnitContainer unit="seconds" digit={seconds} shuffle={secondsShuffle} />
        </div>
    );
}

export default App;

