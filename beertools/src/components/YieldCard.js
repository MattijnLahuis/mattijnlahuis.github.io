import React, { Component } from 'react'
import PropTypes from 'prop-types'

class YieldCard extends Component {
  render() {

    const { originalYieldText, targetYield, literCallback, calculateCallback } = this.props

    return (
      <div>
        <h3>Yield</h3>
        <div>Original yield: { originalYieldText }</div>
        <div>
          Desired yield in not stupid system:
          <input
            type="text"
            ref='targetYield'
            value={targetYield}
            onChange={literCallback}
          />
          <button onClick={calculateCallback}>Calculate</button>
        </div>
      </div>
    );
  }
}

YieldCard.PropTypes = {
  originalYieldText: PropTypes.string.isRequired,
  targetYield: PropTypes.number.isRequired,
  literCallback: PropTypes.func.isRequired,
  calculateCallback: PropTypes.func.isRequired
}

export default YieldCard;
