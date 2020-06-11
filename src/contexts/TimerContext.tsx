import React from 'react';
import Timer from 'tiny-timer';

type timerRecord = {
  duration: number,
  tomatoStatus: 'work' | 'rest',
  timeStarted: Date,
}

/** TimerController centralises the timer logic **/
class TimerController {
  private timer: any;
  public onSkip: {(nextDuration: number): void};
  private onInitialTimeUpdated: {(initialTime: number): void};
  private onRecordsUpdated: {(records: timerRecord[]): void};
  private timerInitialTime: number = 0;
  private timerRecords: timerRecord[] = [];
  private lastDuration: number = 0;
  private lastStartTime: Date = new Date();
  private timerTomatoStatus: 'work' | 'rest' = 'work';

  constructor() {
    this.timer = new Timer({interval: 50});
    this.onSkip = () => {};
    this.onInitialTimeUpdated = (initialTime) => {};
    this.onRecordsUpdated = () => {};
  }

  setOnTick(onTick: {(ms: number): void}) {
    this.timer.on('tick', onTick);
  }

  setOnDone(onDone: {(): void}) {
    return this.timer.on('done', onDone);
  }

  removeOnDone(onDone: {(): void}) {
    return this.timer.off('done', onDone);
  }

  start(ms: number) {
    this.lastDuration = ms;
    this.lastStartTime = new Date(Date.now());
    this.timer.start(ms);
  }

  pause() {
    this.timer.pause();
  }

  resume() {
    this.timer.resume();
  }

  stop() {
    this.timer.stop();
  }

  setOnStatusChanged(onStatusChanged: {(status: string): void}) {
    this.timer.on('statusChanged', onStatusChanged);
  }

  status() {
    return this.timer.status;
  }

  time() {
    return this.timer.time;
  }

  setInitialTime(ms: number) {
    this.timerInitialTime = ms;
    console.log(this.timerInitialTime);
    this.onInitialTimeUpdated(ms);
  }

  setOnInitialTimeUpdated(onInitialTimeUpdated: {(initialTime: number): void}) {
    this.onInitialTimeUpdated = onInitialTimeUpdated;
  }

  initialTime() {
    return this.timerInitialTime;
  }

  setOnSkip(onSkip: {(nextDuration: number): void}) {
    this.onSkip = onSkip;
  }

  createRecord(status: 'work' | 'rest') {
    const record: timerRecord = {
      duration: this.lastDuration - this.timer.time,
      tomatoStatus: status,
      timeStarted: this.lastStartTime,
    };

    this.timerRecords.push(record);

    this.onRecordsUpdated(this.records());

    console.log(this.records());
  }

  records() {
    return this.timerRecords;
  }

  setOnRecordsUpdated(onRecordsUpdated: {(records: timerRecord[]): void}) {
    this.onRecordsUpdated = onRecordsUpdated;
  }

  setTomatoStatus(status: 'work' | 'rest') {
    this.timerTomatoStatus = status;
  }

  tomatoStatus() {
    return this.timerTomatoStatus;
  }
}

const TimerContext = React.createContext(new TimerController());
export {TimerController};
export default TimerContext;
