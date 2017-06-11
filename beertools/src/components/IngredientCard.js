import React, { Component } from 'react'
import PropTypes from 'prop-types'
import MultiLine from './MultiLine'
import './IngredientCard.sass'

class IngredientCard extends Component {
  static PropTypes = {
    ingredients: PropTypes.array.isRequired
  }

  render() {

    return (
      <div className='ingredients'>
        <h1>Ingredients:</h1>
        <MultiLine text={this.props.ingredients} />
      </div>
    );
  }
}

export default IngredientCard;
