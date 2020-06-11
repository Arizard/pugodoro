import React, {useContext, useEffect, useState} from 'react';
import TimerContext from '../contexts/TimerContext';

interface OwnProps {
}

type Props = OwnProps;

const TimerGraphic: React.FunctionComponent<Props> = (props: Props) => {
  const TimerController = useContext(TimerContext);
  const [timeLeft, setTimeLeft] = useState(TimerController.initialTime() / 1000);
  const [tomatoStatus, setTomatoStatus] = useState(TimerController.tomatoStatus());
  const [timerStatus, setTimerStatus] = useState(TimerController.status());
  useEffect(() => {
    console.log('registering listeners for timergraphic');
    setTimeLeft(TimerController.initialTime() / 1000);
    TimerController.setOnTick((ms) => {
      setTimeLeft(ms/1000);
    });
    TimerController.setOnSkip((nextDuration) => {
      setTimeLeft(nextDuration/1000);
    });
    TimerController.setOnInitialTimeUpdated((initialTime) => {
      console.log(initialTime);
      setTimeLeft(initialTime/1000);
    });
    TimerController.setOnStatusChanged((status) => {
      console.log(status);
      setTimerStatus(status);
    });
  }, []);

  const minutes = Math.floor(timeLeft/60);
  const seconds = Math.floor(timeLeft % 60);

  const stateToShow = `${tomatoStatus} time remaining (${timerStatus}):`;

  return (<>
    <p className={'is-capitalized'}>{stateToShow}</p>
    <span className={'is-size-1'}>{minutes}m {seconds}s</span>
  </>);
};

export default TimerGraphic;
