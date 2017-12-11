import React, { Component } from 'react'
import {graphql} from 'react-apollo'
import gql from 'graphql-tag'

class CreateTag extends Component {
  state = {
    name:'',
    description:''
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
            placeholder='Name for the Tag'
          />

          <input
            className='mb2'
            value={this.state.description}
            onChange={(e) => this.setState({ description: e.target.value })}
            type='text'
            placeholder='Description for the Tag'
          />

        </div>
        <button
          onClick={() => this._createTag()}
        >
          Submit
        </button>
      </div>
    )
  }

  _createTag = async () => {
  const { name , description } = this.state
  await this.props.createTagMutation({
    variables: {
      name,
      description
    }
  })
  this.props.history.push('/')
}

}
const CREATE_TAG_MUTATION = gql`
mutation CreateTagMutation($name:String!,$description:String!){
  createTag(
    name:$name,
    description: $description
  ){
    id,
    name,
    description
  }
}
`

export default graphql(CREATE_TAG_MUTATION,{name:'createTagMutation'}) (CreateTag)
