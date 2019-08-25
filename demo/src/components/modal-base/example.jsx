import React from "react";
import ModalBase from "wdpcCommon/modal-base";
export default class App extends React.Component {
   constructor(props) {
       super(props);

       this.state = {
           show: false
       };
   }

   render(){
       return(
           <div>
               <button onClick={()=>{
                   this.setState({
                       show: true
                   })
               }}>点击显示</button>
               <ModalBase show={this.state.show} maskClick={()=>{
                   this.setState({
                       show: false
                   })
               }}>模态窗口容器，可完全自定义封装</ModalBase>
           </div>
       )
   }
}