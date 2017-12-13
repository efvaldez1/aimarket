import React, { Component } from 'react'
import { graphql,compose,withApollo } from 'react-apollo'
import gql from 'graphql-tag'
import Link from './Link'
import Select from 'react-select'
import Multiselect from './Multiselect'
class Search extends Component {

  state = {
    links: [],
    searchText: '',
    tag:[]
  }

  handleMultiSelect = (tag) => {

    this.setState({tag })
    console.log('multi')
    console.log(tag)

  }

  render() {
    if (this.props.allTagQuery && this.props.allTagQuery.loading) {
      return <div>Loading</div>
    }

    if (this.props.allTagQuery && this.props.allTagQuery.error) {
      console.log(this.props.allTagQuery.error)
      return <div>Error</div>
    }
    const tagToRender = this.props.allTagQuery.allTags
    const options=[]
    tagToRender.map((tag,id)=>
    {
      options.push({'value':tag.id,'label':tag.name})
    }
    )
    return (

      <div>
        <div>
          Search
          <input
            type='text'
            onChange={(e) => this.setState({ searchText: e.target.value })}
          />
          <Select
            onChange={this.handleMultiSelect}
            value={this.state.tag}
            multi={true}
        		options={options}
          />

          <button
            onClick={() => this._executeSearch()}
          >
            OK
          </button>
        </div>
        {this.state.links.map((link, index) => <Link key={link.id} link={link} index={index}/>)}
      </div>
    )
  }

  _executeSearch = async () => {
    const tagoptions =[]
    this.state.tag.map((item)=>
    {tagoptions.push({'id':item.value})}
    )

    console.log(tagoptions)
    const { searchText } = this.state
    const result = await this.props.client.query({
      query: ALL_LINKS_SEARCH_QUERY,
      variables: { searchText ,tagoptions}
    })
    const links = result.data.allLinks
    this.setState({ links })
  }
}

const ALL_LINKS_SEARCH_QUERY = gql`
  query AllLinksSearchQuery($searchText: String!,$tagoptions:[ID!]!) {
    allLinks(filter: {
              tags_contains:$tagoptions
    }) {
      id
      url
      description
      createdAt
      postedBy {
        id
        name
      }
      tags{
        id
        name
      }
      votes {
        id
        user {
          id
        }
      }
    }
  }
`
const ALL_TAG_QUERY = gql `
query AllTagQuery{
  #graphql pluralises automatically
  allTags{
    id
    name

		link{       #all relationships must have subselection
      id
    }
  }
}
`
//export default withApollo(Search)
export default compose(
  graphql(ALL_TAG_QUERY, {name:'allTagQuery'}),
  withApollo
)(Search)
// /https://stackoverflow.com/questions/41515226/graphql-filter-data-in-an-array
