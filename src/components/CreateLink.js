import React, { Component } from 'react'
import { graphql, compose } from 'react-apollo'
import gql from 'graphql-tag'
import { GC_USER_ID, LINKS_PER_PAGE } from '../constants'
import { ALL_LINKS_QUERY } from './LinkList'
import CategoryList from './CategoryList'
class CreateLink extends Component {

  state = {
    title: '',
    description: '',
    url: ''
  }

  render() {
    //const categoryToRender = this.props.allCategoryQuery.allCategories
    return (
      <div>
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
        Category:
        <CategoryList name="mySelect"

        />


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
    const postedById = localStorage.getItem(GC_USER_ID)
    if (!postedById) {
      console.error('No user logged in')
      return
    }
    const { title,description, url } = this.state
    await this.props.createLinkMutation({
      variables: {
        title,
        description,
        url,
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

/*const ALL_CATEGORY_QUERY = gql `
query AllCategoryQuery{
  #graphql pluralises automatically
  allCategories{
    id
    name
  }
}
`
*/

//export default graphql(ALL_CATEGORY_QUERY,{name:'allCategoryQuery'}) (CategoryList)
const CREATE_LINK_MUTATION = gql`
    mutation CreateLinkMutation($title: String! ,$description: String!, $url: String!, $postedById: ID!,$categoryId : ID!) {
        createLink(
            title: $title,
            description: $description,
            url: $url,
            postedById: $postedById
            category: $categoryId
        ) {
            id
            title
            createdAt
            url
            description
            category{
              id
              name
            }
            postedBy {
                id
                name
            }
        }
    }
`

export default graphql(CREATE_LINK_MUTATION, { name: 'createLinkMutation' })(CreateLink)
/*export default compose(
  graphql(ALL_CATEGORY_QUERY,{name:'allCategoryQuery'}) (CategoryList),
  graphql(CREATE_LINK_MUTATION, { name: 'createLinkMutation' })(CreateLink)
)
*/
