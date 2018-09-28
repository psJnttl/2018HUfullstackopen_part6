import React from 'react';
import { setFilter, resetFilter } from '../reducers/filterReducer';
import { connect } from 'react-redux';

class Filter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filterInput: ''
    };
  }
  handleChange = (event) => {
    const value = event.target.value;
    this.props.setFilter(value);
    this.setState({ filterInput: value });
  }
  handleClear = () => {
    this.props.resetFilter();
    this.setState({ filterInput: '' });
  }
  render() {
    const style = {
      marginBottom: 10
    };
    const clrBtn = this.state.filterInput ?
      <button onClick={this.handleClear} title="clear input">x</button> : null;

    return (
      <div style={style}>
        filter:
        <input
          onChange={this.handleChange}
          value={this.state.filterInput}
          placeholder='type to find...'
        />
        {clrBtn}
      </div>
    );
  }
}

const mapDispatchToProps = {
  setFilter: setFilter,
  resetFilter: resetFilter
};
const ConnectedFilter = connect(null, mapDispatchToProps)(Filter);
export default ConnectedFilter;
