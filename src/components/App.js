import React, { Component } from 'react'
import LinkList from './LinkList'
import CreateLink from './CreateLink'
import Header from './Header'
import Login from './Login'
import Search from './Search'
import CategoryList from './CategoryList'
import CreateCategory from './CreateCategory'
import CreateTag from './CreateTag'
import CreateOffer from './CreateOffer'
import ProductPage from './ProductPage'
import { Switch, Route, Redirect } from 'react-router-dom'

class App extends Component {
  render() {
    return (
      <div className='center w85'>
        <Header />
        <div className='ph3 pv1 background-gray'>
          <Switch>
            <Route exact path='/' render={() => <Redirect to='/new/1' />} />
            <Route exact path='/create' component={CreateLink}/>
            <Route exact path='/createcategory' component={CreateCategory}/>
            <Route exact path='/login' component={Login}/>
            <Route exact path='/search' component={Search}/>
            <Route exact path='/top' component={LinkList} />
            <Route exact path = '/category' component={CategoryList} />
            <Route exact path='/createoffer' component={CreateOffer}/>
            <Route path='/product/:id' component={ProductPage}/>
            <Route exact path='/createtag' component={CreateTag}/>
            <Route exact path='/new/:page' component={LinkList} />
          </Switch>
        </div>
      </div>
    )
  }

}

export default App
