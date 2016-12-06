import React from 'react';
import { connect } from 'react-redux';

const App = connect(state => ({count: state}))(React.createClass({
  propTypes: {
    count: React.PropTypes.object.isRequired
  },
  render() {
    const { count } = this.props;
    return (
      <div>
        <h1>Demo</h1>
        <p>{count.num}</p>
        <button>
          +1
        </button>
        <p>
        </p>
      </div>
    );
  },
}));

export default App;