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
    return (
      <div>
      <select>
      {categoryToRender.map((category)=>
      (<option value={category.name}>
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
