import React, { Component } from 'react'
import { GC_USER_ID } from '../constants'
import { timeDifferenceForDate } from '../utils'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import { Switch, Route, Redirect } from 'react-router-dom'
import { withRouter } from 'react-router'
import { Link } from 'react-router-dom'



class Profile extends Component {
  render() {
    const userId = localStorage.getItem(GC_USER_ID)
    console.log('userId')
    return (
      <div className='flex mt2 items-start'>
        ID:{userId}
        Name:
        No.Of Products Submitted:
        No. Of Offers Created:

        Products:


      </div>
    )
  }




}

export default(Profile)
