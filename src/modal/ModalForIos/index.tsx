import "./index.less";
import * as React from "react";
import classnames from "../../_util/classnames/classnames";
import { ModalBaseProps, ModalBase} from "../../modal-base";

export class ModalForIosProps extends ModalBaseProps {
    /**
    * 弹窗标题
    */
    title = null;
    /**
    * 弹窗内容
    */
    children = null;
    /**
    * 按钮
    */
    buttons = [{
        text: "确定",
        click: function () {
            alert("ios")
        }
    }];
}

/**
 * @internal
 */
export class ModalForIos extends React.Component<any, any> {
    static defaultProps = new ModalForIosProps();

    /**
     * 设置按钮
     */
    setButtons() {
        let btnArr = [];
        let btnAmount = this.props.buttons.length;
        for (let i = 0; i < btnAmount; i++) {
            btnArr.push(
                <button key={i} className={i + 1 == btnAmount ? "wdmb-ModalForIos-button-main" : ""} onClick={() => {
                    this.props.buttons[i].click();
                }}>{this.props.buttons[i].text}</button>
            )
        }
        return btnArr;
    }

    render() {

        const baseProps = {
            show: this.props.show,
            ani: this.props.ani,
            popup: this.props.popup,
            maskClick: this.props.maskClick,
            showMask: this.props.showMask,
            className: this.props.className
        }

        return (
            <ModalBase {...baseProps}>
                <div className={classnames("wdmb-ModalForIos", {
                    [this.props.className]: this.props.className,
                })}>
                    <div className="wdmb-ModalForIos-container">
                        {
                            this.props.title && <div className={"wdmb-ModalForIos-title"}>{this.props.title}</div>
                        }
                        <div className={"wdmb-ModalForIos-content"}>
                            {this.props.children}
                        </div>
                    </div>
                    <div className={"wdmb-ModalForIos-button"}>
                        {this.setButtons()}
                    </div>
                </div>
            </ModalBase>
        );
    }
}

export default ModalForIos;

