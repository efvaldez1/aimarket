import React, { Component } from 'react'
import {graphql} from 'react-apollo'
import gql from 'graphql-tag'
import { GC_USER_ID } from '../constants'
import { withRouter } from 'react-router'
import { Link } from 'react-router-dom'


class CreateComment extends Component {

  state = {
    content: ''
  }

  render() {
    console.log("comment section")
    console.log(this.props)
    return (
      <div>
        <div className='flex flex-column mt3'>
          <textarea
            className='mb2'
            value={this.state.content}
            onChange={(e) => this.setState({ content: e.target.value })}
            type='text'
            placeholder='Enter Comment'
          />

        </div>
        <button
          onClick={() => this._createComment()}
        >
          Submit
        </button>
      </div>
    )
  }

  _createComment = async () => {

  const authorId = localStorage.getItem(GC_USER_ID)
  const { content } = this.state
  const offerId= this.props.offerId
  console.log('CreateComment')
  console.log(offerId)
  console.log(content)
  console.log(authorId)
  await this.props.createCommentMutation({
    variables: {
      content,
      offerId,
      authorId
    }
  })
  //console.log('productId')
  //const url='/product/'+this.props.productId
  //const newurl="`"+url+"`"
  //console.log(this.props)
  this.props.history.push(`/top`)
}


}

const CREATE_COMMENT_MUTATION = gql`
mutation CreateCommentMutation($content:String!,$authorId:ID!,$offerId:ID!){
  createComment(
    content:$content
    authorId: $authorId
    offerId:$offerId
  ){
    id
    content
    author
    {
      id
      name
    }
    offer
    {
      id
      amount
      offerdescription
    }
    createdAt
  }
}
`

export default graphql(CREATE_COMMENT_MUTATION,{name:'createCommentMutation'}) (CreateComment)
