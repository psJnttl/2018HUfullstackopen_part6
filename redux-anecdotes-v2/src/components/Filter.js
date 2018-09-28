import React from 'react';
import { setFilter, resetFilter } from '../reducers/filterReducer';

class Filter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filterInput: ''
    };
  }
  handleChange = (event) => {
    const value = event.target.value;
    this.props.store.dispatch(setFilter(value));
    this.setState({ filterInput: value });
  }
  handleClear = () => {
    this.props.store.dispatch(resetFilter());
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

export default Filter;
