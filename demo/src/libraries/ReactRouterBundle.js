/**
 * React Router 4.0 异步加载 bundle
 */
import React, {Component} from 'react'
class ReactRouterBundle extends Component {
    constructor(props) {
        super(props)
    }
    componentWillMount() {
        this.load(this.props)
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.load !== this.props.load) {
            this.load(nextProps)
        }
    }
    load(props) {
        this.setState({
            mod:null
        })
        props.load((mod) => {
            this.setState({
                mod:mod.default?mod.default:mod
            })
        })
    }
    render() {
        return this.state.mod ? this.props.children(this.state.mod) : null
    }
}

export default function ReactRouterBundleLoader(componentContainer){
    return (props) => (
        <ReactRouterBundle load={componentContainer}>
            {(Container) => <Container {...props} />}
        </ReactRouterBundle>
    )
}