import React, { Component } from 'react'
import { GC_USER_ID } from '../constants'
import { timeDifferenceForDate } from '../utils'
import { graphql,compose } from 'react-apollo'
import gql from 'graphql-tag'
import { Switch, Route, Redirect } from 'react-router-dom'
import { withRouter } from 'react-router'
import { Link } from 'react-router-dom'


import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';

class Profile extends Component {
  render() {
    const userId = localStorage.getItem(GC_USER_ID)
    console.log('userId')
    console.log(userId)
    if (this.props.allUsersQuery && this.props.allUsersQuery.loading) {
      return <div>Loading</div>
    }

    if (this.props.allUsersQuery && this.props.allUsersQuery.error) {
      console.log(this.props.allUsersQuery.error)
      return <div>Error</div>
    }
    //const user ={}
    //all users then traverse till you find specific user
    const result = this.props.allUsersQuery.allUsers
    console.log(result)
    const len = result.length
    console.log("len")
    console.log(len)
    for (var i = 0; i < len; i++) {
     if(result[i].id===userId)
    {
      console.log("hey")
      console.log(result[i])
      var user = result[i]
     }
    }
    console.log("found")
    console.log(user)
    console.log("links")
    //console.log(user.links)

    return (
      <div>
      <div >
        ID:{user.id}
        Name:{user.name}
        Email:{user.email}
        No.Of Products Submitted:
        No. Of Offers Created:
        <Card>
          <CardHeader
            title="URL Avatar"
            subtitle="Subtitle"
            avatar="images/jsa-128.jpg"
          />
          <CardMedia
            overlay={<CardTitle title="Overlay title" subtitle="Overlay subtitle" />}
          >
            <img src="images/nature-600-337.jpg" alt="" />
          </CardMedia>
          <CardTitle title="Card title" subtitle="Card subtitle" />
          <CardText>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
            Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
            Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.
          </CardText>
          <CardActions>
            <FlatButton label="Action1" />
            <FlatButton label="Action2" />
          </CardActions>
        </Card>

      </div>
      <div>
        Products:
        <Table>
          <TableHeader>
            <TableRow>
              <TableHeaderColumn>ID</TableHeaderColumn>
              <TableHeaderColumn>Name</TableHeaderColumn>
              <TableHeaderColumn>Category</TableHeaderColumn>

              <TableHeaderColumn>Date Created</TableHeaderColumn>
              <TableHeaderColumn>Last Updated</TableHeaderColumn>

              
            </TableRow>
          </TableHeader>
          <TableBody>
            {user.links.map((link)=>
              (
                <TableRow>
                  <TableRowColumn> {link.id}</TableRowColumn>
                  <TableRowColumn> {link.title}</TableRowColumn>
                  <TableRowColumn> {link.category}</TableRowColumn>
                  <TableRowColumn> {link.createdAt}</TableRowColumn>
                  <TableRowColumn> {link.updatedAt}</TableRowColumn>

                </TableRow>
              )
            )
            }
          </TableBody>
        </Table>

      </div>
      </div>
    )
}
    _getUserToRender = (userId) => {
      const userToRender = this.props.findUserQuery.findUser({
        variables: {
        userId,
      }
    })
    return userToRender

    }

  }


// why wont findUseQuery(ID) wont work
const FIND_USER_QUERY = gql`
  query FindUserQuery($userId: ID) {
    User(id: $userId) {
      id
      name
      email
      createdAt
      links{
        id
        title
        offers{
          id
          amount
          comments{
            id
            content
          }
        }
        votes{
          id
        }
      }

    }
  }
`


const ALL_USERS_QUERY = gql`
  query AllUsersQuery{
    allUsers {
      id
      name
      email
      createdAt
      links{
        id
        title
        url
        description
        createdAt
        offers{
          id
          amount
          comments{
            id
            content
          }
        }

      }
    }
  }
`
//how to make single queries work
//export default graphql(USER_QUERY,{name:'findUserQuery'}) (Profile)
export default compose(
  graphql(ALL_USERS_QUERY, {name:'allUsersQuery'}),
  graphql(FIND_USER_QUERY, { name: 'findUserQuery' })
)(Profile)
