import React, { Component } from 'react'
import {graphql} from 'react-apollo'
import gql from 'graphql-tag'

class CreateCategory extends Component {

  state = {
    name:''
  }

  render() {
    return (
      <div>
        <div className='flex flex-column mt3'>
          <input
            className='mb2'
            value={this.state.name}
            onChange={(e) => this.setState({ name: e.target.value })}
            type='text'
            placeholder='Name for the category'
          />

        </div>
        <button
          onClick={() => this._createCategory()}
        >
          Submit
        </button>
      </div>
    )
  }

  _createCategory = async () => {
  const { name } = this.state
  await this.props.createCategoryMutation({
    variables: {
      name
    }
  })
  this.props.history.push('/')
}

}
const CREATE_CATEGORY_MUTATION = gql`
mutation CreateCategoryMutation($name:String!){
  createCategory(
    name:$name
  ){
    id
    name
  }
}
`

export default graphql(CREATE_CATEGORY_MUTATION,{name:'createCategoryMutation'}) (CreateCategory)
