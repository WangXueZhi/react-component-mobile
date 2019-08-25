import * as React from "react";
import TimeOut from 'wdpcCommon/timeout';
import * as ReactDOM from "react-dom";

export default class App extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <TimeOut title="点我试试" nextTitle="再点我试试" time={10} begin={()=>{ alert('ready'); return true;}} end={()=>{alert('end')}}/>
        );
    }
}