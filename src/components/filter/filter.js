import React, { Component } from 'react';
import PropTypes from 'prop-types';

import css from './filter.module.css';

class Filter extends Component {

  state = {
    filter: ''
  }

  handleFilter = (e) => {
    e.preventDefault();

    const target = e.target;

    this.setState({
      filter: target.value
    });

    this.props.onFilter(target.value.trim().toLowerCase());
  }

  render() {

    const { filter } = this.state;

    return (
      <div className={css.container}>
        <h3>Find contacts by name</h3>
        <input
          className={css.field}
          type='text'
          name='filter'
          value={filter}
          onChange={this.handleFilter}
        />
      </div>
    );
  }
}

Filter.propTypes = {
  onFilter: PropTypes.func.isRequired,
};

export default Filter;
