import React from 'react';
import logo from './logo.svg';
import './App.css';

import { Inject, ScheduleComponent, Day, Week, WorkWeek, Month, Agenda, EventSettingsModel } from '@syncfusion/ej2-react-schedule'; 
import { DataManager, WebApiAdaptor } from '@syncfusion/ej2-data';

class App extends React.Component{
  private localData: EventSettingsModel = {
    dataSource:[{
      EndTime: new Date(2022, 0, 10, 9, 30),
      StartTime: new Date(2022, 0, 10, 7, 0)
    }]
  }

private remoteData = new DataManager({
  url: 'http://js.syncfusion.com/demos/ejservices/api/Schedule/LoadData',
  adaptor: new WebApiAdaptor,
  crossDomain: true
});

  public render(){
    return (
      <div>
        <br></br>
        <br></br>
        <br></br>
        <br></br><br></br><br></br><br></br><br></br>
        <div>
          <ScheduleComponent currentView='Month' selectedDate={new Date()}
                              /*eventSettings={{ dataSource: this.remoteData }}>*/
                              eventSettings={this.localData}>
            <Inject services={[Day, Week, WorkWeek, Month, Agenda]} />
          </ScheduleComponent>
        </div>
      </div>
    )
  }
}

/*
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}
*/
export default App;
