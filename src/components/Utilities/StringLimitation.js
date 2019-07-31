import React from 'react'

class StringLimitation extends React.Component {
    state = {
        relatedString: this.props.text,
        limit: this.props.limit,
        styles: this.props.styles
    }
    
    render(){
        return(
            <p style={this.state.styles}>
                {this.state.relatedString.length > this.state.limit ? this.state.relatedString.substring(0, this.state.limit) + '...' : this.state.relatedString}
            </p>
        )
    }
}

export default StringLimitation