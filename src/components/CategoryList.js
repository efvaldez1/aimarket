import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'


//Material UI
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';


class CategoryList extends Component {

  state = {
    category:"Publication",
  }

  handleChange = (event, index, category) => {

  this.setState({category:event.target.innerText});
  console.log("event")
  console.log(event.target)
  console.log(this.state.category)
  }
  render(){
    if (this.props.allCategoryQuery && this.props.allCategoryQuery.loading) {
      return <div>Loading</div>
    }
    if (this.props.allCategoryQuery && this.props.allCategoryQuery.error) {
      return <div>Error</div>
      {categoryToRender.map((category)=>
      (console.log(category.id)))
      }
    }

    const categoryToRender = this.props.allCategoryQuery.allCategories
    console.log(categoryToRender)
    return (
      <div>
      <SelectField name={this.props.name}
       floatingLabelText="Choose Category"
       value={this.state.category}
       onChange={this.handleChange}
      >
      {categoryToRender.map((category)=>
      (<MenuItem value={category.name} primaryText={category.name} />))
      }
      </SelectField>

      </div>
    )
  }
}

const ALL_CATEGORY_QUERY = gql `
query AllCategoryQuery{
  #graphql pluralises automatically
  allCategories{
    id
    name
  }
}
`

export default graphql(ALL_CATEGORY_QUERY,{name:'allCategoryQuery'}) (CategoryList)
