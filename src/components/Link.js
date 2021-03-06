import React, { Component } from 'react'
import { GC_USER_ID } from '../constants'
import { timeDifferenceForDate } from '../utils'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import { Switch, Route, Redirect } from 'react-router-dom'
import { withRouter } from 'react-router'
import { Link } from 'react-router-dom'


// Material UI
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';

class Product extends Component {
  render() {
    const userId = localStorage.getItem(GC_USER_ID)
    console.log('key')
    console.log(this.props.key)
    return (
      <div>


      <Card>
        <CardHeader
          title={this.props.link.title}
          subtitle={this.props.link.description}
          avatar="images/jsa-128.jpg"
        />
        <CardMedia
          overlay={<CardTitle title={this.props.link.title} subtitle={this.props.link.url} />}
        >
          <img src="images/nature-600-337.jpg" alt="" />
        </CardMedia>
        <CardTitle title={this.props.link.title} subtitle={this.props.link.url} />
        <CardText>
        <div><Link to={'/product/'+this.props.link.id} >Title: {this.props.link.title}</Link></div>
        <div><strong> Description:</strong> {this.props.link.description} </div>
        <div> <strong> URL: </strong> <a href={this.props.link.url}>{this.props.link.url}</a></div>
        <div> <strong> Category: </strong> {this.props.link.category}  </div>
        <div> <strong> Tags: </strong>
            {this.props.link.tags.map((tagItem)=>
            (<li>{tagItem.name}</li>)
            )
            }
        </div>
        <div> <strong> No. Of Offers: </strong> {this.props.link.offers.length}  </div>
        <div> <strong> Offers: </strong>
            {this.props.link.offers.map((offerItem)=>
            ( <div>
              <li>Offer By: {offerItem.offerBy.name}</li>
              <li> amount: {offerItem.amount}</li>
              <li> description: {offerItem.offerdescription}</li>
              <br/>
              </div>
            )
            )
            }
        </div>
        <div className='flex items-center'>
             {userId && <div className='ml1 gray f11' onClick={() => this._voteForLink()}>Vote ▲ </div>}
        </div>
        <div className='f6 lh-copy gray'>  {this.props.link.votes.length} votes | by {this.props.link.postedBy ? this.props.link.postedBy.name : 'Unknown'} {timeDifferenceForDate(this.props.link.createdAt)}</div>
        </CardText>
        <CardActions>
          <FlatButton label={<Link to={'/product/'+this.props.link.id} > View More</Link>} />
          
        </CardActions>
      </Card>


      </div>


    )
  }
  //_goToProductPage = async() =>{
  //  console.log("id")
  //  console.log(this.props.link.id)
  //  https://stackoverflow.com/questions/41341486/avoid-concat-url-in-react-redux-router
  //  this.props.history.push(`/product/`+this.props.link.id)
  //}

  _voteForLink = async () => {
    const userId = localStorage.getItem(GC_USER_ID)
    const voterIds = this.props.link.votes.map(vote => vote.user.id)
    if (voterIds.includes(userId)) {
      console.log(`User (${userId}) already voted for this link.`)
      return
    }

    const linkId = this.props.link.id
    await this.props.createVoteMutation({
      variables: {
        userId,
        linkId
      },
      update: (store, { data: { createVote } }) => {
        this.props.updateStoreAfterVote(store, createVote, linkId)
      }
    })
  }

}

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

export default graphql(CREATE_VOTE_MUTATION, {name: 'createVoteMutation'})(Product)
//export default withRouter(Link)

//
// <div className='flex mt2 items-start'>
//   <div className='flex items-center'>
//     <span className='gray'>{this.props.index + 1}.</span>
//     {userId && <div className='ml1 gray f11' onClick={() => this._voteForLink()}>Vote ▲ </div>}
//   </div>
//   <div className='ml1'>
//     <Link to={'/product/'+this.props.link.id} >Title: {this.props.link.title}</Link>
//     <div><strong> Description:</strong> {this.props.link.description} </div>
//     <div> <strong> URL: </strong> <a href={this.props.link.url}>{this.props.link.url}</a></div>
//     <div> <strong> Category: </strong> {this.props.link.category}  </div>
//     <div> <strong> Tags: </strong>
//         {this.props.link.tags.map((tagItem)=>
//         (<li>{tagItem.name}</li>)
//         )
//         }
//     </div>
//     <div> <strong> No. Of Offers: </strong> {this.props.link.offers.length}  </div>
//     <div> <strong> Offers: </strong>
//         {this.props.link.offers.map((offerItem)=>
//         ( <div>
//           <li>Offer By: {offerItem.offerBy.name}</li>
//           <li> amount: {offerItem.amount}</li>
//           <li> description: {offerItem.offerdescription}</li>
//           <br/>
//           </div>
//         )
//         )
//         }
//     </div>
//     <div className='f6 lh-copy gray'>{this.props.link.votes.length} votes | by {this.props.link.postedBy ? this.props.link.postedBy.name : 'Unknown'} {timeDifferenceForDate(this.props.link.createdAt)}</div>
//   </div>
// </div>
