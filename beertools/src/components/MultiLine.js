import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

class MultiLine extends PureComponent {
  static PropTypes = {
    text: PropTypes.string.isRequired
  }

  render() {
    return (
      <ul>
        {this.props.text.split("\n").map((i, index) => {
            return <li key={index}>{i}</li>;
        })}
      </ul>
    )
  }
}

export default MultiLine;
