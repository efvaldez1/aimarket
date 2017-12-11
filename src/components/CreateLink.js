import React, { Component } from 'react'
import { graphql, compose } from 'react-apollo'
import gql from 'graphql-tag'
import { GC_USER_ID, LINKS_PER_PAGE } from '../constants'
import { ALL_LINKS_QUERY } from './LinkList'
import CategoryList from './CategoryList'
//class CategoryList extends React.Component {
//  render() {
//    return (
//      <div >
//        <select name={this.props.name} >
//          {
//            this.props.combolist.map(function(category, i) {
//              return (
//                <option key={i} value={category.name}>
//                  {category.name}
//                </option>
//              )
//            })
//          }
//        </select>
//      </div>
//    );
//  }
//}


class CreateLink extends Component {
  constructor() {
    super();
    this.handleSelect = this.handleSelect.bind(this);
  }

  handleSelect(event){

    // /alert(this.refs.form.mySelect.value)
    alert(event.target.value)
    //console.log(this.refs.form.mySelect.value)
    this.setState({ category: event.target.value})
  }
  state = {
    title: '',
    description: '',
    url: '',
    category:'Publication'
  }
  //submit(event){
  //  event.preventDefault();
    //alert(this.refs.form.mySelect.value)
  //  console.log(this.refs.form.mySelect.value)
  //  this.setState({ category: this.refs.form.mySelect.value})
  //}
  render() {
    const categoryToRender = this.props.allCategoryQuery.allCategories
    //alert(categoryToRender)
    const combolist = [{id:1,name:'publication'},{id:2,name:'software'}]
    //combolist=categoryToRender
    // /const combolist= this.props.allCategoryQuery.allCategories
    //const categoryToRender=combolist
    return (
      <div >
        <div className='flex flex-column mt3'>
        <input
          className='mb2'
          value={this.state.title}
          onChange={(e) => this.setState({ title: e.target.value })}
          type='text'
          placeholder='Title of the Product'
        />
          <textarea
            className='mb2'
            value={this.state.description}
            onChange={(e) => this.setState({ description: e.target.value })}

            placeholder='A description for the product'
          />

          <input
            className='mb2'
            value={this.state.url}
            onChange={(e) => this.setState({ url: e.target.value })}
            type='text'
            placeholder='The URL for the product'
          />
        <div onChange={this.handleSelect}>
        Category (comes from API call. updates state after submit):
        <CategoryList  name='mySelect'
          //updates value after hitting submit
        />
        </div>

        <div> You selected: {this.state.category}</div>

        <div> title: {this.state.title}</div>

        <div> description:{this.state.description} </div>

        <div> url:{this.state.description} </div>
        </div>

        <button
          onClick={() => this._createLink ()}
        >
          Submit
        </button>

      </div>
    )
  }

  _createLink = async () => {
    console.log(this.state.category)
    console.log(this.state.title)
    console.log('createLink')
    const postedById = localStorage.getItem(GC_USER_ID)
    if (!postedById) {
      console.error('No user logged in')
      return
    }
    const { title,description, url,category } = this.state
      await this.props.createLinkMutation({
        variables: {
        title,
        description,
        url,
        category,
        postedById
      },
      update: (store, { data: { createLink } }) => {
        const first = LINKS_PER_PAGE
        const skip = 0
        const orderBy = 'createdAt_DESC'
        const data = store.readQuery({
          query: ALL_LINKS_QUERY,
          variables: { first, skip, orderBy }
        })
        data.allLinks.splice(0,0,createLink)
        data.allLinks.pop()
        store.writeQuery({
          query: ALL_LINKS_QUERY,
          data,
          variables: { first, skip, orderBy }
        })
      }
    })

    this.props.history.push(`/new/1`)
  }

}

const ALL_CATEGORY_QUERY = gql `
query AllCategoryQuery{
  #graphql pluralises automatically
  allCategories{
    id
    name
  }
}
`

//export default graphql(ALL_CATEGORY_QUERY,{name:'allCategoryQuery'}) (CategoryList)

const CREATE_LINK_MUTATION = gql`
    mutation CreateLinkMutation($title: String! ,$description: String!, $url: String!, $postedById: ID!, $category:String!) {
        createLink(
            title: $title,
            description: $description,
            url: $url,
            category:$category
            postedById: $postedById

        ) {
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
        }
    }
`

//export default graphql(CREATE_LINK_MUTATION, { name: 'createLinkMutation' })(CreateLink)
export default compose(
  graphql(CREATE_LINK_MUTATION, { name: 'createLinkMutation' }),
  graphql(ALL_CATEGORY_QUERY,{name:'allCategoryQuery'})
)(CreateLink)
