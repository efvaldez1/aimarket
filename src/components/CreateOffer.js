import React, { Component } from 'react'
import {graphql,compose} from 'react-apollo'
import gql from 'graphql-tag'
import { GC_USER_ID } from '../constants'
import NumericInput from 'react-numeric-input'

class CreateOffer extends Component {
  constructor(props) {
    super(props);

  }
  state = {
    amount:'',
    offerdescription:'',
    offerBy:'',
    link:'',
    addedOn:''
  }
  handleChange(evt) {
    const amount = (evt.target.validity.valid) ? evt.target.value : amount;
    console.log(typeof(amount))
    //this.setState({ amount:amount });
  }
  render() {
    return (
      <div>
        <div className='flex flex-column mt3'>
        <input
          className='mb2'
          value={this.state.amount}
          onChange={(e) => this.setState({ amount: e.target.value })}
          type='text'
          placeholder='offer'
        />

          <input
            className='mb2'
            value={this.state.offerdescription}
            onChange={(e) => this.setState({ offerdescription: e.target.value })}
            type='text'
            placeholder='offer'
          />

          <input
            className='mb2'
            value={this.state.link}
            onChange={(e) => this.setState({ link: e.target.value })}
            type='text'
            placeholder='link'
          />



        </div>
        <button
          onClick={() => this._createOffer()}
        >
          Submit
        </button>
      </div>
    )
  }

  _createOffer = async () => {
  const userId = localStorage.getItem(GC_USER_ID)
  console.log(userId)
  const {amount,offerdescription,link } = this.state
  await this.props.createOfferMutation({
    variables: {
      amount,
      offerdescription,
      link,
      userId
    }
  })

  }

}

export const ALL_LINKS_QUERY = gql`
  query AllLinksQuery($first: Int, $skip: Int, $orderBy: LinkOrderBy) {
    allLinks(first: $first, skip: $skip, orderBy: $orderBy) {
      id
      title
      createdAt
      url
      description
      category
      postedBy {
        id
        name
      }
      votes {
        id
        user {
          id
        }
      }
      tags {
        id
        name
        link
        {
          id
        }
      }
    }
    _allLinksMeta {
      count
    }
  }
`

const CREATE_OFFER_MUTATION = gql`
mutation CreateOfferMutation($amount:String!,$offerdescription:String!,$link:ID!,$userId:ID!){
  createOffer(
    amount:$amount
    offerdescription:$offerdescription
    linkId:$link
    offerById:$userId
    addedOn:"2015-11-22T13:57:31.123Z"
  ){
    id
    amount
    offerdescription
    link{
      id
      title
    }
    offerBy
    {
      id
    }
    addedOn
  }
}
`
export default compose(
  graphql(ALL_LINKS_QUERY, {name:'allLinksQuery'}),
  graphql(CREATE_OFFER_MUTATION, { name: 'createOfferMutation' })
)(CreateOffer)
//export default graphql(CREATE_OFFER_MUTATION,{name:'createOfferMutation'}) (CreateOffer)
