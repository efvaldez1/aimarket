import React, { Component } from 'react'
import { GC_USER_ID } from '../constants'
import { timeDifferenceForDate } from '../utils'
import { graphql,compose } from 'react-apollo'
import gql from 'graphql-tag'
import CreateComment from './CreateComment'
import CreateOffer from './CreateOffer'

class ProductPage extends Component {
  componentDidMount() {
    this._subscribeToNewOffers()
    this._subscribeToNewComments()
  }
  render() {
    if (this.props.allLinksQuery && this.props.allLinksQuery.loading) {
      return <div>Loading</div>
    }

    if (this.props.allLinksQuery && this.props.allLinksQuery.error) {
      console.log(this.props.allLinksQuery.error)
      return <div>Error</div>
    }
    const id = this.props.match.params.id
    console.log(id)
    const result = this.props.allLinksQuery.allLinks
    console.log(result)
    var link ={}
    const len = result.length;
    for (var i = 0; i < len; i++) {
      if(result[i].id===id)
      {
        link=result[i]
      }
    }
    console.log("found")
    console.log(link)
  //  const product = this.props.findLinkQuery.findLink({
  //    variables: {
  //    Id
  //  }
  //})
    //console.log(product)
    return (
      <div className='flex mt2 items-start'>
      <div className='ml1'>
        <div> <strong>ID:</strong> {link.id} </div>
        <div> <strong>Title:</strong> {link.title} </div>
        <div><strong> Description:</strong> {link.description} </div>
        <div> <strong> URL: </strong> <a href={link.url}>{link.url}</a></div>
        <div> <strong> Category: </strong> {link.category}  </div>
        <div> <strong> Tags: </strong>
            {link.tags.map((tagItem)=>
            (<a>{tagItem.name} </a>)
            )
            }
        </div>

        <CreateOffer linkId={link.id}/>
        <div> <strong> Offers: </strong>
            {link.offers.map((offerItem)=>
            (
              <div>
              <a>Offer By: {offerItem.offerBy.name}</a><br/>
              <a>Amount: {offerItem.amount}</a><br/>
              <a>Description: {offerItem.offerdescription}</a><br/>
              <a>Created At: {timeDifferenceForDate(offerItem.createdAt)}</a><br/>
              <br/>

              {offerItem.comments.map((commentItem)=>
                (
                  <div className='indent'>
                  <br/>
                  <a> {commentItem.content}</a>
                  <a> By:{commentItem.author.name} {timeDifferenceForDate(commentItem.createdAt)}</a>
                  <br/>
                  </div>

                )
              )
              }
              <CreateComment offerId={offerItem.id} productId={link.id}/>
              <br/>
              <br/>

              </div>
            )
            )
            //comment form

            }
        </div>
        <div className='f6 lh-copy gray'>{link.votes.length} votes | by {link.postedBy ?link.postedBy.name : 'Unknown'} {timeDifferenceForDate(link.createdAt)}</div>
      </div>
      </div>
    )
  }

  _subscribeToNewOffers= () => {
      //implement this
  }

  _subscribeToNewComments = () => {
    // implement this

  }

}
console.log(this.props)
//const Id = this.props.match.params.id
//const FIND_LINK_QUERY = gql`
//query findLink($id: ID!){
//  Link(id: $id){
//    title
//    category
//    description
//  }
//}
//`
const ALL_LINKS_QUERY = gql`
  query AllLinksQuery{
    allLinks {
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
      offers{
        id
        amount
        offerdescription
        offerBy{
          id
          name
        }
        comments{
          id
          content
          author{
            id
            name
          }
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


const CREATE_VOTE_MUTATION = gql`
  mutation CreateVoteMutation($userId: ID!, $linkId: ID!) {
    createVote(userId: $userId, linkId: $linkId) {
      id
      link {
        votes {
          id
          user {
            id
          }
        }
      }
      user {
        id
      }
    }
  }
`


export default compose(
  graphql(ALL_LINKS_QUERY, {name: 'allLinksQuery'}),
  graphql(CREATE_VOTE_MUTATION, {name: 'createVoteMutation'}),
  //graphql(FIND_LINK_QUERY, {name: 'findLinkQuery'})
) (ProductPage)
