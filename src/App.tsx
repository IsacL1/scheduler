import React from 'react';
import './App.css';

import { Inject, ScheduleComponent, Day, Week, WorkWeek, Month, Agenda, EventSettingsModel, 
          ViewsDirective, ViewDirective, TimelineViews, TimelineMonth, DragAndDrop, Resize,
         DragEventArgs, ResizeEventArgs, ScrollOptions, NavigateOptions, Timezone, CellClickEventArgs, Schedule } from '@syncfusion/ej2-react-schedule';
import { DataManager, WebApiAdaptor } from '@syncfusion/ej2-data';
import { TreeViewComponent, DragAndDropEventArgs } from '@syncfusion/ej2-react-navigations';
/******
NOTE: this calender is following US holidays
********/

/* 
1. Create new appointment
2. Cstomize appointments
  a. Can drag and resize the appointment
  b. Change Navigate when drag appointment and hold it to side extreme for few seconds
3. 
*/
export default class App extends React.Component<{}, {}> {
//class App extends React.Component{
  public scheduleObj!: ScheduleComponent; // add ! to solve "Property 'scheduleObj' has no initializer and is not definitely assigned in the constructor."

  private localData: EventSettingsModel = {
    dataSource: [
      {Subject: 'Work',
      EndTime: new Date(2022, 10, 10, 10, 30),
      StartTime: new Date(2022, 10, 10, 9, 0),
      Localtion: 'HKMU'
      },
      {Subject: 'Live',
      StartTime: new Date(2022, 10, 10, 10, 30),
      EndTime: new Date(2022, 10, 10, 23, 30),
      Localtion: 'HKMU'}
    ]
  };

  // local data of appointment for test
  private localDataList = [
    // the month begin from 0, Jan=0, Feb=1
    {
      Id: 1,
      Subject: 'Work',
      StartTime: new Date(2022, 9, 10, 9, 0),
      EndTime: new Date(2022, 9, 10, 10, 30),
      Localtion: 'HKMU'
    },
    {
      Id: 2,
      Subject: 'Live',
      StartTime: new Date(2022, 9, 10, 10, 30),
      EndTime: new Date(2022, 9, 10, 18, 30),
      Localtion: 'HKMU'
    },
    {
      Id: 3,
      Subject: 'Balance',
      StartTime: new Date(2022, 9, 10, 18, 30),
      EndTime: new Date(2022, 9, 10, 23, 30),
      Localtion: 'HKMU'
    }
  ];

  // drag an appointment object
  private onDragStart(args: DragEventArgs): void {
     (args.scroll as ScrollOptions).enable = false;
     (args.scroll as ScrollOptions).scrollBy = 1500;
     args.interval = 10;
     (args.navigation as NavigateOptions).enable = true;
     args.excludeSelectors = 'e-all-day-cells, e-work-cells';
  }

  // resize time an appointment object
  private onResizeStart(args: ResizeEventArgs): void{
    (args.scroll as ScrollOptions).enable = false;
    (args.scroll as ScrollOptions).scrollBy = 500;
    args.interval = 10; //interval by 10mins
  }

private remoteData = new DataManager({
  url: 'https://js.syncfusion.com/demos/ejservices/api/Schedule/LoadData',
  adaptor: new WebApiAdaptor,
  crossDomain: true
});

private treeViewData: {[key: string]: Object}[] = [
  {Id:1, Name: 'Mary'},
  {Id:2, Name: 'John'},
  {Id:3, Name: 'Shirley'},
  {Id:4, Name: 'Leo'}
];

public field: Object = { dataSource: this.treeViewData, id:'Id', text:'Name'}

public onTreeDragStop(args: DragAndDropEventArgs): void{
  let cellData: CellClickEventArgs = this.scheduleObj.getCellDetails(args.target);
  let eventData:{[key: string]: Object} = {
    Subject: args.draggedNodeData.text,
    StartTime: cellData.startTime,
    EndTime: cellData.endTime,
    IsAllDay: cellData.isAllDay,
    Location: "HKMU"
  }
  this.scheduleObj.openEditor(eventData, "Add", true); // eventData: An appointment object; Add: action indicationg the new event creation; true: identifies the eventData
  //this.scheduleObj.addEvent(eventData); // create a new appointment
}


private eventTemplate(props: { [key: string]: Object }): JSX.Element {
  return (<div className='template-wrap'> <>{ props.Subject }</> </div>); 
  /*return (<div className="template-wrap" style={{ background: props.SecondaryColor }}>
    <div className='subject' style={{ background: props.PrimaaryColor }}> <>{ props.Subject }</> </div>
    <div className='time' style={{ background: props.PrimaryColor }}>
      Time:{ this.getTime(props.StartTime as Date) } - { this.getTime(props.EndTime as Date) }
      </div>  
    </div>);*/
};

private weekEventTemplate(props: {[key: string]: Object}): JSX.Element{
  return (<div className='template-wrap'> <>{ props.Subject }</> </div>);
}

  public render(){
    return (<div>

      <div className='treeview-title-container'></div>
      <div className='treeview-component'>
        <p>Client List</p>
        <TreeViewComponent fields={this.field} allowDragAndDrop={true} nodeDragStop={this.onTreeDragStop.bind(this)} />
      </div>

      <div className='scheduler-title-container'>Worker Appointment</div>
      <div className='scheduler-component'>
        <ScheduleComponent height="100%" width="80%" currentView='Month' timezone='Asia/HongKong' selectedDate={new Date()}
                            //eventSettings={{ dataSource: this.remoteData }}
                            //eventSettings={ this.localData }
                            eventSettings={{ dataSource: this.localDataList }}
                            dragStart={(this.onDragStart.bind(this))} 
                            resizeStart={(this.onResizeStart.bind(this))}
                            ref={ schedule=> this.scheduleObj = schedule as ScheduleComponent }
                            >
          <ViewsDirective>
            <ViewDirective option="Day" interval={3} displayName='3 days' />
            <ViewDirective option="Week" interval={2} displayName='2 weeks' 
                            eventTemplate={ this.weekEventTemplate.bind(this)}/>
            <ViewDirective option="WorkWeek" isSelected={true} startHour='09:00' endHour='18:00'/>
            <ViewDirective option="Month"  showWeekNumber={true} showWeekend={true} 
                            eventTemplate={ this.eventTemplate.bind(this)} />
            <ViewDirective option="TimelineDay" />
            <ViewDirective option="TimelineMonth" />
          </ViewsDirective>
          
          <Inject services={[ Day, Week, WorkWeek, Month, Agenda, TimelineViews, TimelineMonth, DragAndDrop, Resize ]} />
        </ScheduleComponent>
      </div>
  </div>)
  }
}

//export default App;
