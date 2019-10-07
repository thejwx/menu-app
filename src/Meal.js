import React, {Component} from 'react';
import './meal.css';

//This Component is a child Component of Customers Component
export default class Meal extends Component {

  render() {
    return (
    <div class="dailyRecord">
        <div class="day">
            {this.props.day}
        </div>
        <div class="mainIngredientStylePair">
            <MainIngredientStylePair index={this.props.index} mainIngredient={this.props.mainIngredient} style={this.props.style} mainIngredients={this.props.mainIngredients} styles={this.props.styles} mainIngredientSwitchCallback={this.props.mainIngredientSwitchCallback} styleSwitchCallback={this.props.styleSwitchCallback} lockMealCallback={this.props.lockMealCallback} />
        </div>
        <div><RefreshMeal index={this.props.index} mealSwitchCallback={this.props.mealSwitchCallback} /></div>
        <div class="meal">
            <a href={'https://www.pinterest.com/search/pins/?q='+this.props.meal+' '+this.props.style} target='new'>{this.props.meal}</a>
        </div>
    </div>)
  }
}


class RefreshMeal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {value: ''};
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    this.props.mealSwitchCallback(this.props.index);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input className='refreshImage' type='image' alt='Refresh Meal' src='./assets/images/512px-Repeat_font_awesome.svg.png' value='Replace Meal' title='Replace Meal' />
      </form>
    );
  }
}
    
class MainIngredientStylePair extends React.Component {
  constructor(props) {
    super(props);

    this.state = {mainIngredient: '',
                  style: '',
                  mainIngredientSwitcherModalDisplay: 'hidden',
                  styleSwitcherModalDisplay: 'hidden',
                  locked: ''};
    this.handleMainIngredientSwitch = this.handleMainIngredientSwitch.bind(this);
    this.handleStyleSwitch = this.handleStyleSwitch.bind(this);
    this.manageMainIngredientModalDisplay = this.manageMainIngredientModalDisplay.bind(this);
    this.manageStyleModalDisplay = this.manageStyleModalDisplay.bind(this);
    this.handleLock = this.handleLock.bind(this);
  }

  handleMainIngredientSwitch(event) {
    this.manageMainIngredientModalDisplay(event);
    this.setState({mainIngredient: event.target.value})
    this.props.mainIngredientSwitchCallback(this.props.index, event.target.value);
    event.preventDefault();
  }
    
  handleStyleSwitch(event) {
    this.manageStyleModalDisplay(event);
    this.setState({style: event.target.value});
    this.props.styleSwitchCallback(this.props.index, event.target.value);
    event.preventDefault();
  }
    
  manageMainIngredientModalDisplay(event){
    if(this.state.locked) {
        alert('Sorry, this meal is locked.');
    } else {
      this.state.mainIngredientSwitcherModalDisplay=='hidden' ? this.setState({mainIngredientSwitcherModalDisplay:'display'}) : 
                                                                this.setState({mainIngredientSwitcherModalDisplay:'hidden'});
    }
    event.preventDefault();
  }

  manageStyleModalDisplay(event){
    if(this.state.locked) {
        alert('Sorry, this meal is locked.');
    } else {
      this.state.styleSwitcherModalDisplay=='hidden' ? this.setState({styleSwitcherModalDisplay:'display'}) : 
                                                        this.setState({styleSwitcherModalDisplay:'hidden'});
    }
    event.preventDefault();
  }
    
  handleLock(event){
      this.state.locked ? this.setState({locked:''}) : this.setState({locked:'lockedMeal'});
      this.props.lockMealCallback(this.props.index);
      event.preventDefault();
  }

  render() {
    return (
        <div>
            <span onClick={this.manageMainIngredientModalDisplay}>{this.props.mainIngredient}</span>,&nbsp;
            <span onClick={this.manageStyleModalDisplay}>{this.props.style}</span>
            <span onClick=''><input className={'lockImage ' + this.state.locked} onClick={this.handleLock} type='image' alt='Lock Meal' src='./assets/images/lock_red.png' value='Lock Meal' title='Lock Meal' /></span>
            <form>
              <div className={'mainIngredientSwitcherModal ' + this.state.mainIngredientSwitcherModalDisplay}>
                    {this.props.mainIngredients.map((mainIngredient, index) => 
                        {if (mainIngredient===this.props.mainIngredient){
                            return (<div className='selectedItem'><input type='button' value={mainIngredient} onClick={this.handleMainIngredientSwitch}/></div>)
                        } else {
                            return (<div><input type='button' value={mainIngredient} onClick={this.handleMainIngredientSwitch}/></div>)
                        }}
                    )}
              </div>
              <div className={'styleSwitcherModal ' + this.state.styleSwitcherModalDisplay}>
                    {this.props.styles.map((style, index) => 
                        {if (style===this.props.style){
                            return (<div className='selectedItem'><input type='button' value={style} onClick={this.handleStyleSwitch}/></div>)
                        } else {
                            return (<div><input type='button' value={style} onClick={this.handleStyleSwitch}/></div>)
                        }}
                    )}
              </div>
            </form>
        </div>
    );
  }
}
