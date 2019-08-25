import * as React from "react";
import Modal from "wdpcCommon/modal";
import Button from "wdpcCommon/button";

export default class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            show: false,
            iosshow: false
        };
    }

    render(){
        return(
            <div>
                <div>
                    <Button onClick={()=>{
                        Modal.show({
                            maskClick: function(){
                                Modal.hide();
                            },
                            buttons: [{
                                text: "确定",
                                click: function(){
                                    alert("确定");
                                }
                            }, {
                                text: "关闭",
                                click: function(){
                                    Modal.hide();
                                }
                            }],
                            title: "123",
                            content: <a>123</a>
                        })
                    }}>{"Modal.show()"}</Button>
                </div>
                <div style={{marginTop: "10px"}}>
                    <Button onClick={()=>{
                        this.setState({
                            show: true
                        })
                    }}>{"<Modal></Modal>"}</Button>
                </div>
                <Modal show={this.state.show} maskClick={()=>{
                    this.setState({
                        show: false
                    })
                }}>描述文字的字数尽量控制在三行 内，并且单行最右侧尽量不要是 标点符号。</Modal>
                <div style={{marginTop: "10px"}}>
                    <Button onClick={()=>{
                        this.setState({
                            iosshow: true
                        })
                    }}>ios系统</Button>
                </div>
                <Modal type="ios" buttons = {[{
                    text: "确定",
                    click: ()=>{
                        this.setState({
                            iosshow: false
                        })
                    }
                }]}
                show={this.state.iosshow}
                maskClick={()=>{
                    this.setState({
                        iosshow: false
                    })
                }}>描述文字的字数尽量控制在三行 内，并且单行最右侧尽量不要是 标点符号。</Modal>
            </div>
        )
    }
}