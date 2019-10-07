import React, {Component} from 'react';
import Button from 'react-bootstrap/Button'
import Meal from './Meal'
import axios from 'axios'

export default class Meals extends Component {

  constructor(props) {
    super(props)
    this.state = {
        mealsList: [],
        days: [['Monday'],['Tuesday'],['Wednesday'],['Thursday'],['Friday'],['Saturday'],['Sunday']],
        mainIngredients: ['Poultry','Beef','Pork','Fish','Other Seafood','Carb','Vegetable'],
        styles: ['Italian','French','Asian','Latin','Mediterranean','Grilled','Crockpot','Smoked','Baked','Soup'],
        value: '',
    }
  }

  //function which is called the first time the component loads
  componentDidMount() {
    this.getMealsData();
  }

  //Function to get the Customer Data from json
  getMealsData() {
      var mealsList = [];
        this.state.days.map(day=>{
            day.push(this.pickOne(this.state.mainIngredients));
            day.push(this.pickOne(this.state.styles));
        });
      
      axios.get('./assets/samplejson/mealsList.json').then(response => {
          mealsList = response.data;

          mealsList.map((mealsdetail, index)=>{
              this.state.days.map(day => 
                {
                    if(day[1]===mealsdetail.mainIngredient && day[2]===mealsdetail.style){
                        day[3]=this.pickMeal(mealsdetail.meals);
                        day[4]=mealsdetail.meals;
                        day[5]=false; // BOOLEAN FOR WHEN IT IS LOCKED
                    }
                }
              )
            })
            this.setState({ mealsList: mealsList })
      })
      .catch(error => {
        console.log(error);
        });
      this.setState({mainIngredients: ['Poultry','Beef','Pork','Fish','Other Seafood','Carb','Vegetable']});
      this.setState({styles: ['Italian','French','Asian','Latin','Mediterranean','Grilled','Crockpot','Smoked','Baked','Soup']});
  }
    
    pickOne(arr){
        const index = Math.floor(Math.random() * arr.length);
        const item = arr[index];
        arr.splice(index,1);
        return item;
    }

    pickMeal(meals) {
        const mealIndex = Math.floor((Math.random() * meals.length));
        return meals[mealIndex];
    }
    
    mealSwitchCallback = (index) => {
        const currentMeal = this.state.days[index][3];
        const currentMeals = this.state.days[index][4];
        const newMeal = this.pickMeal(currentMeals);
        const newDays = this.state.days;
        if(currentMeals.length<=1){
            alert('There is only one meal for this ingredient and style pair.');
        } else if(currentMeal!=newMeal){
            newDays[index][3] = newMeal;
            this.setState({days: newDays});
        } else {
            this.mealSwitchCallback(index);
        }
    }
    
    mainIngredientSwitchCallback = (index,mainIngredient) => {
        var allowSwitch = true;
        var mealsList = [];
        var switchDayIndex = null;
        const newDays = this.state.days;
        newDays.map((newDay, newDayIndex) => 
        {
            if(newDay[1]===mainIngredient){
                if(newDay[5]){ 
                    alert('Sorry, another meal is set to "' + mainIngredient + '" and is locked.');
                    allowSwitch = false;
                    return; 
                }
                switchDayIndex = newDayIndex;
                newDay[1]=newDays[index][1];
                return;
            }
        });
        if(!allowSwitch){ return; }
        newDays[index][1]=mainIngredient;
        mealsList = this.state.mealsList;
        mealsList.map((mealsdetail, i)=>{
          newDays.map(newDay => 
            {
                if(newDay[1]===mealsdetail.mainIngredient && newDay[2]===mealsdetail.style &&
                    (newDay[0]===newDays[index][0] || newDay[0]===newDays[switchDayIndex][0])){
                    newDay[3]=this.pickMeal(mealsdetail.meals);
                    newDay[4]=mealsdetail.meals;
                }
            }
          )
        })
        this.setState({days: newDays});
    }
    
    styleSwitchCallback = (index,style) => {
        var allowSwitch = true;
        var mealsList = [];
        var switchDayIndex = null;
        const newDays = this.state.days;
        newDays.map((newDay, newDayIndex) => 
        {
            if(newDay[2]===style){
                if(newDay[5]){ 
                    alert('Sorry, another meal is set to "' + style + '" and is locked.');
                    allowSwitch = false;
                    return; 
                }
                switchDayIndex = newDayIndex;
                newDay[2]=newDays[index][2];
                return;
            }
        });
        if(!allowSwitch){ return; }
        newDays[index][2]=style;
        mealsList = this.state.mealsList;
        mealsList.map((mealsdetail, i)=>{
          newDays.map(newDay => 
            {
                if(newDay[2]===mealsdetail.style && newDay[1]===mealsdetail.mainIngredient &&
                    (newDay[0]===newDays[index][0] || (switchDayIndex!=null && newDay[0]===newDays[switchDayIndex][0]))){
                    newDay[3]=this.pickMeal(mealsdetail.meals);
                    newDay[4]=mealsdetail.meals;
                }
            }
          )
        })
        this.setState({days: newDays});
    }
    
    lockMealCallback = (index) => {
        const newDays = this.state.days;
        newDays[index][5] = !newDays[index][5];        
    }
    
    render() {
      return (
          <div>
          {this.state.days.map((day, index) =>
            <Meal key={index} index={index} day={day[0]} mainIngredient={day[1]} style={day[2]} meal={day[3]} mainIngredients={this.state.mainIngredients} styles={this.state.styles} mealSwitchCallback={this.mealSwitchCallback} mainIngredientSwitchCallback={this.mainIngredientSwitchCallback} styleSwitchCallback={this.styleSwitchCallback} lockMealCallback={this.lockMealCallback} />
          )}
          </div>
      )
    }

}

