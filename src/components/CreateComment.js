import React, { Component } from 'react'
import {graphql} from 'react-apollo'
import gql from 'graphql-tag'
import { GC_USER_ID } from '../constants'
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
  const addedOn="2015-11-22T13:57:31.123Z"
  const { content } = this.state
  const offerId= this.props.offerId
  console.log('offerID')
  console.log(offerId)
  await this.props.createCommentMutation({
    variables: {
      content,
      addedOn,
      offerId,
      authorId
    }
  })
  //console.log('productId')
  //const url='/product/'+this.props.productId
  //const newurl="`"+url+"`"
  //console.log(this.props)
  //this.props.history.push(this.newurl)
}


}

const CREATE_COMMENT_MUTATION = gql`
mutation CreateCommentMutation($content:String!,$authorId:ID!,$offerId:ID!){
  createComment(
    content:$content
    authorId: $authorId
    offerId:$offerId
    addedOn:"2015-11-22T13:57:31.123Z"
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
    addedOn
  }
}
`

export default graphql(CREATE_COMMENT_MUTATION,{name:'createCommentMutation'}) (CreateComment)
