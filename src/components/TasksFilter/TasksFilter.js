import React, { Component } from 'react';
import './TasksFilter.css';
import PropTypes from 'prop-types';

export default class TasksFilter extends Component {
  state = {
    buttonFilter: 'All',
  };

  whichButton = (evt) => {
    const { onFilter } = this.props;
    onFilter(evt.target.innerHTML);
    this.setState({ buttonFilter: evt.target.innerHTML });
  };

  render() {
    const { buttonFilter } = this.state;

    let classAll = 'selected';
    let classActive = '';
    let classCompleted = '';

    if (buttonFilter === 'All') {
      classAll = 'selected';
      classActive = '';
      classCompleted = '';
    } else if (buttonFilter === 'Active') {
      classAll = '';
      classActive = 'selected';
      classCompleted = '';
    } else if (buttonFilter === 'Completed') {
      classAll = '';
      classActive = '';
      classCompleted = 'selected';
    }

    return (
      <ul className="filters">
        <li>
          <button className={classAll} onClick={this.whichButton}>
            All
          </button>
        </li>
        <li>
          <button className={classActive} onClick={this.whichButton}>
            Active
          </button>
        </li>
        <li>
          <button className={classCompleted} onClick={this.whichButton}>
            Completed
          </button>
        </li>
      </ul>
    );
  }
}

TasksFilter.propTypes = {
  onFilter: PropTypes.func.isRequired,
};
