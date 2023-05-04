import React, { Component } from 'react';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import KG from 'date-fns/locale/en-AU';
import PropTypes from 'prop-types';

export default class Task extends Component {
  render() {
    const { description, creatingTime, onDeleted, onToggleCompleted, completed } = this.props;

    let classNames = '';
    if (completed) {
      classNames += 'completed';
    }

    return (
      <li className={classNames}>
        <div className="view">
          <input className="toggle " type="checkbox" onClick={onToggleCompleted} />
          <label>
            <span className="description" onClick={onToggleCompleted}>
              {description}
            </span>
            <span className="created">
              {`created ${formatDistanceToNow(creatingTime, {
                includeSeconds: true,
                locale: KG,
                addSuffix: true,
              })}`}
            </span>
          </label>

          <button class="icon icon-edit"></button>
          <button className="icon icon-destroy" onClick={onDeleted}></button>
        </div>
      </li>
    );
  }
}

Task.propTypes = {
  id: PropTypes.number,
  description: PropTypes.string,
  completed: PropTypes.bool,
  creatingTime: PropTypes.instanceOf(Date),

  onDeleted: PropTypes.func.isRequired,
  onToggleCompleted: PropTypes.func.isRequired,
};

Task.defaultProps = {
  id: 7,
  description: 'Купить джип в Москве',
  completed: false,
  creatingTime: new Date(),
};
