import React from "react";
import NumberKeyBoard from "wdpcCommon/number-keyboard";
export default class App extends React.Component {
     constructor(props) {
         super(props);
         this.state = {
             value: '',
             show: false
         };
     }
     render() {
         return(
             <div className="container">
                 <input 
                     value={this.state.value} 
                     onFocus={() => { this.setState({ show: true }); }}
                 />
                 <NumberKeyBoard 
                     show={this.state.show}
                     onChange={(num) => {
                         this.setState({
                             value: num
                         });
                     }}
                 ></NumberKeyBoard>
             </div>
         )
     }
}