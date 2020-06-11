import React, {useContext, useEffect, useState} from 'react';
import TimerContext from '../contexts/TimerContext';

interface OwnProps {
}

type Props = OwnProps;

const minutes25 = 25 * 60 * 1000;
const minutes5 = 5 * 60 * 1000;

const TimerControls: React.FunctionComponent<Props> = (props: Props) => {
  const TimerController = useContext(TimerContext);
  const [timerStatus, setTimerStatus] = useState(TimerController.status());
  const [nextDuration, setNextDuration] = useState(minutes25);
  const [tomatoStatus, setTomatoStatus] = useState(TimerController.tomatoStatus());
  useEffect(() => {
    console.log(timerStatus);
    TimerController.setInitialTime(nextDuration);
    TimerController.setOnStatusChanged((status) => {
      console.log(status);
      setTimerStatus(status);
    });
  }, []);

  useEffect(() => {
    const timerOnDone = () => {
      if (tomatoStatus === 'work') {
        setNextDuration(minutes5);
        TimerController.setInitialTime(minutes5);
        setTomatoStatus('rest');
        TimerController.createRecord('work');
        TimerController.start(minutes5);
      } else if (tomatoStatus === 'rest') {
        setNextDuration(minutes25);
        TimerController.setInitialTime(minutes25);
        setTomatoStatus('work');
        TimerController.createRecord('rest');
        TimerController.start(minutes25);
      }
    };
    TimerController.setOnDone(timerOnDone);
    return () => {
      TimerController.removeOnDone(timerOnDone);
    };
  }, [tomatoStatus]);
  useEffect(() => {
    console.log(tomatoStatus);
  }, [tomatoStatus]);

  return (
    <div className={'level'}>
      <div className={'level-left'}>
        <span
          className={`button level-item is-primary ${timerStatus !== 'stopped' && 'is-static'}`}
          onClick={() => TimerController.start(nextDuration)}>
          Start
        </span>
        <span
          className={'button level-item'}
          onClick={() => {
            timerStatus === 'paused' ? TimerController.resume() : TimerController.pause();
          }}>
          {timerStatus === 'paused' ? 'Resume' : 'Pause'}
        </span>
        <span
          className={'button level-item'}
          onClick={() => {
            TimerController.createRecord(tomatoStatus);
            TimerController.stop();
            TimerController.onSkip(minutes25);
            setNextDuration(minutes25);
          }}>
          Skip
        </span>
      </div>
    </div>);
};

export default TimerControls;
