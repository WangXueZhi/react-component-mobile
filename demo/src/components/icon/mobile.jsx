import React from "react";
import Example from "./example";

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    componentDidMount() {
        this.props.didMount && this.props.didMount();
    }

    render() {
        return (
            <Example />
        )
    }
}