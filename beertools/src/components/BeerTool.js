import React, { PureComponent } from 'react'
import IngredientCard from './IngredientCard'
import YieldCard from './YieldCard'
import './IngredientCard.sass'

class BeerTool extends PureComponent {
  constructor() {
    super()

    this.state = {
      recipe: {
        targetYield: 25
      }
    }

    this.updateRecipeState = this.updateRecipeState.bind(this)
    this.handleRecipeInput = this.handleRecipeInput.bind(this)
    this.handleLitersInput = this.handleLitersInput.bind(this)
    this.convertToMetric = this.convertToMetric.bind(this)
    this.calculateNewRecipe = this.calculateNewRecipe.bind(this)
  }

  updateRecipeState(newValues = {}) {
    this.setState({
      recipe: Object.assign(
        {},
        this.state.recipe,
        newValues)
      })
  }

  handleRecipeInput(event) {
    const recipeInput = event.target.value
    const newValues = {}

    const yieldMatch = recipeInput.match(/Yield: ([\s\S]*?)\n/)

    if(yieldMatch) {
      //we expect the string to begin with the value, e.g. 5.75 US gallons
      const yieldValue = yieldMatch[1].split(" ")[0]

      if(!isNaN(yieldValue)) {
        newValues.originalYield = parseFloat(yieldValue) * 3.78541
        newValues.originalYieldText = yieldMatch[1]
      }
    }

    const ingredientsMatch = recipeInput.match(/Ingredients:([\s\S]*?)Additional Instructions/)

    if(ingredientsMatch) {
      const ingredients = ingredientsMatch[1]
        //remove preceding and trailing white spaces, new lines, carriage returns
        .replace(/^\s+|\s+$/g, '')
        //remove white spaces before every line of ingredients
        .replace(/\n\s+/g, '\n')

      newValues.ingredients = ingredients
      newValues.textAreaValue = event.target.value
    }

    this.updateRecipeState(newValues)
  }

  calculateNewRecipe() {
    const ingrList = this.state.recipe.ingredients.split(/\n/)

    let convertedIngr = ""

    for(let i=0; i<ingrList.length;i++) {
      let item = ingrList[i]

      convertedIngr += this.convertToMetric(item) + '\n'
    }

    this.updateRecipeState({metricIngredients: convertedIngr})
  }

  convertToMetric(item) {
    var amountInGrams = parseFloat(item.split(' ')[0])
    var splitOn = '';
    if(item.contains('lb')) {
      amountInGrams *= 453.6
      splitOn = 'lb'
    } else if(item.contains('oz')) {
      amountInGrams *= 28.35
      splitOn = 'oz'
    } else if(item.contains('cup')) {
      amountInGrams *= 340
      splitOn = 'cup'
    } else if(item.contains('tbs')) {
      amountInGrams *= 4.929
      splitOn = 'tbs'
    } else if(item.contains('tsp')) {
      amountInGrams *= 4.929
      splitOn = 'tsp'
    } else {
      return item
    }

    const parts = item.split(splitOn)
    const { originalYield, targetYield } = this.state.recipe

    return parseInt(amountInGrams / parseFloat(originalYield) * parseFloat(targetYield))  + " gram" + parts[1]
  }

  handleLitersInput(event) {
    this.updateRecipeState({
      targetYield: event.target.value
    })
  }

  render() {
    const { textAreaValue, ingredients, metricIngredients, originalYield, originalYieldText, targetYield } = this.state.recipe

    return (
      <div>
        <div style={{marginLeft: '40%', textAlign: 'left'}}>
          <h1>INSTRUCTIONS</h1>
          <ul>
            <li>Find a recipe you like on beerrecipes.org</li>
            <li>Select ALL the text on that page (ctrl+a)</li>
            <li>Paste text here:</li>
            <li>Put in desired yield in litres</li>
            <li>Press calculate</li>
          </ul>
        </div>
        <textarea
          rows='10'
          cols='50'
          placeholder='Paste recipe here'
          ref='recipeTextArea'
          value={ textAreaValue }
          onChange={this.handleRecipeInput}
        >
        </textarea>

        <div>
          {
            ingredients ? (
              <div className="ingredientCard">
                <IngredientCard ingredients={ ingredients } />
                <div>
                  { originalYield ? (
                    <YieldCard
                      targetYield={targetYield}
                      originalYieldText={originalYieldText}
                      literCallback={this.handleLitersInput}
                      calculateCallback={this.calculateNewRecipe}
                    />
                    ) : null
                  }
                </div>
                { this.state.recipe.metricIngredients ? <IngredientCard ingredients={metricIngredients} /> : null }
              </div>
            ) : null
          }
        </div>
      </div>
    );
  }
}

export default BeerTool;
