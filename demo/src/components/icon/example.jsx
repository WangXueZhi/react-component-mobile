import React from "react";import Icon from "wdpcCommon/icon";const style = {   float: "left",   width: "33.33%",   textAlign: "center",   padding: "10px 0"};const nameStyle = {   marginTop: "5px",   fontSize: "10px",   textAlign: "center"};export default class App extends React.Component {     constructor(props) {         super(props);         this.state = {};     }     render() {         return(             <div>               <div style={style}>                   <Icon name="xianshi" />                   <div style={nameStyle}>xianshi</div>               </div>               <div style={style}>                   <Icon name="yincang" />                   <div style={nameStyle}>yincang</div>               </div>               <div style={style}>                   <Icon name="chenggong" />                   <div style={nameStyle}>chenggong</div>               </div>               <div style={style}>                   <Icon name="shibai" />                   <div style={nameStyle}>shibai</div>               </div>               <div style={style}>                   <Icon name="jiazai" />                   <div style={nameStyle}>jiazai</div>               </div>               <div style={style}>                   <Icon name="youbianjiantou" />                   <div style={nameStyle}>youbianjiantou</div>               </div>               <div style={style}>                   <Icon name="zuobianjiantou" />                   <div style={nameStyle}>zuobianjiantou</div>               </div>               <div style={style}>                   <Icon name="guanbihoveranniu" />                   <div style={nameStyle}>guanbihoveranniu</div>               </div>               <div style={style}>                   <Icon name="queding" />                   <div style={nameStyle}>queding</div>               </div>             </div>         )     }}