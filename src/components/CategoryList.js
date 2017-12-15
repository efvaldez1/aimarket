import React, { Component } from 'react'
//import Link from './Link'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
//import { LINKS_PER_PAGE } from '../constants'

class CategoryList extends Component {
  render(){

    if (this.props.allCategoryQuery && this.props.allCategoryQuery.loading) {
      return <div>Loading</div>
    }

    if (this.props.allCategoryQuery && this.props.allCategoryQuery.error) {
      return <div>Error</div>
    }
    //const categoryToRender = [{name:'a'}]
    //alert(this.props.allCategoryQuery.allCategories)
    const categoryToRender = this.props.allCategoryQuery.allCategories
    console.log(categoryToRender)
    return (
      <div>
      <select name={this.props.name}>
      {categoryToRender.map((category)=>
      (<option key={category.id} value={category.name}>
      {category.name}
      </option>))
      }
      </select>
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
