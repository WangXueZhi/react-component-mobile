import * as React from "react";
import * as ReactDOM from "react-dom";
import SideDrawer from "wdpcCommon/side-drawer";

export default class App extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            step: 0
        };
    }

    render(){
        return(
            <div>
                <button onClick={()=>{
                    this.setState({
                        step: 1
                    })
                }}>弹出抽屉</button>
                <SideDrawer side="right" renderSteps={[
                    <div onClick={()=>{
                        this.setState({
                            step : 2
                        })
                    }}>选择省</div>,
                    <div onClick={()=>{
                        this.setState({
                            step : 3
                        })
                    }}>选择市</div>,
                    <div onClick={()=>{
                        this.setState({
                            step : 0
                        })
                    }}>选择区</div>
                ]} step={this.state.step}/>
            </div>
        )
    }
}