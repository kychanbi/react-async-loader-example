import React from "react";
import Loading from "Scenes/Components/Loading";
import PropTypes from "prop-types";
class AsyncComp extends React.Component{
    static propTypes={
        componentFunc: PropTypes.func.isRequired,
        loader:PropTypes.node,
        propData:PropTypes.any,
    };

    state= {
        isLoading: true,
        nodesToRender: <div/>,
    };
    async componentDidMount(){
        const {componentFunc, loader, ...propData}=this.props;
        const nodes = await componentFunc(propData);
        this.setState({
            isLoading:false,
            nodesToRender: nodes
        });
    }
    render(){
        return(
            this.state.isLoading?
                this.props.loader:
                this.state.nodesToRender
        );
    }
}

export default function LoadAsyncCompFunc(componentFunc,loader){
    AsyncComp.defaultProps={
        componentFunc:componentFunc,
        loader: loader?loader:Loading
    };
    return AsyncComp;
}
