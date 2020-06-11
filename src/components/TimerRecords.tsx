import React, {useContext, useEffect, useState} from 'react';
import TimerContext from '../contexts/TimerContext';
import moment from 'moment';

interface OwnProps {
}

type Props = OwnProps;

const TimerRecords: React.FunctionComponent<Props> = (props: Props) => {
  const TimerController = useContext(TimerContext);
  const [timerRecords, setTimerRecords] = useState([...TimerController.records()]);
  useEffect(() => {
    TimerController.setOnRecordsUpdated((records) => {
      console.log('records updated');
      setTimerRecords([...records]);
    });
  }, []);

  useEffect(() => {}, [timerRecords]);

  return (
    <table className={'table'}>
      <thead>
        <tr>
          <td>Duration</td>
          <td>Work/Rest</td>
          <td>Start Time</td>
        </tr>
      </thead>
      <tbody>
        {timerRecords.map((record) => {
          console.log(record);

          const durationSeconds = record.duration / 1000;
          const minutes = Math.floor(durationSeconds/60);
          const seconds = Math.floor(durationSeconds % 60);

          return <tr key={record.timeStarted.getTime()}>
            <td>{minutes}m {seconds}s</td>
            <td className={'is-capitalized'}>{record.tomatoStatus}</td>
            <td>{moment(record.timeStarted).format('h:mm:ss a')}</td>
          </tr>;
        })}
      </tbody>
    </table>
  );
};

export default TimerRecords;
