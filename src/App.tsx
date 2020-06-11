import React from 'react';
import './App.css';
import 'bulma';
import Navbar from './components/Navbar';
import TimerControls from './components/TimerControls';
import TimerGraphic from './components/TimerGraphic';
import TimerContext, {TimerController} from './contexts/TimerContext';
import TimerRecords from './components/TimerRecords';

// eslint-disable-next-line require-jsdoc
function App() {
  return (<div className={'container'}>
    <TimerContext.Provider value={new TimerController()}>
      <Navbar title={'Pugodoro'} />
      <div className={'columns'}>
        <div className={'column'}>
          <section className={'section'}>
            <div className={'container'}>
              <TimerGraphic />
              <TimerControls />
            </div>
          </section>
        </div>
        <div className={'column'}>
          <section className={'section'}>
            <div className={'container'}>
              <TimerRecords />
            </div>
          </section>
        </div>
      </div>
    </TimerContext.Provider>
  </div>);
}

export default App;
