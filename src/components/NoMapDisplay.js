import React, { Component } from 'react';
 
export default class NoMapDisplay extends Component {
  state = {
    show: false,
    timeout: null
  }

  componentDidMount = () => {
    let timeout = window.setTimeout(this.showMessage, 1500);
    this.setState({timeout});
  }
  componentWill = () => {
    window.clearTimeout(this.state.timeout);
  }

  showMessage = () => {
    this.setState({show: true});
  }

  render = () => {
    return (
    <div> 
      {this.state.show ? (
        <div className="errormsg">
        <h2>Map Loading Error</h2>
        <p>Network Error. Could not load map.  Please try again.</p>
        </div>
      ) : (
        <div className="errormsg"><h2>Loading...</h2></div>
      )}
    </div>
    )
  }
};
// export default NoMapDisplay