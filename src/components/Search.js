import React, { Component } from 'react'
import { graphql,compose,withApollo } from 'react-apollo'
import gql from 'graphql-tag'
import Link from './Link'
import Select from 'react-select'
import Multiselect from './Multiselect'
import CategoryList from './CategoryList'
class Search extends Component {
  constructor() {
    super();
    this.handleSelect = this.handleSelect.bind(this);
    this.handleMultiSelect = this.handleMultiSelect.bind(this);
  }

  state = {
    links: [],
    searchText: '',
    categoryText:'',
    tag:[]
  }

  handleSelect(event){
    this.setState({ categoryText: event.target.value})
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
          <label><strong>Search</strong></label>

          <input
            type='text'
            placeholder="Title Or Description "

            onChange={(e) => this.setState({ searchText: e.target.value })}
          />
          <div onChange={this.handleSelect}>
            <div> <label>Category :</label></div><CategoryList  name='mySelect' />
          </div>
          //tags not functional since it can only search using 1 tag not list of tags
          <Select
            placeholder="Tags"
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
    {tagoptions.push({'id':item.name})}
    )

    console.log(tagoptions)

    const { searchText, categoryText } = this.state
    const result = await this.props.client.query({
      query: ALL_LINKS_SEARCH_QUERY,
      variables: { searchText ,categoryText}
    })
    const links = result.data.allLinks
    this.setState({ links })
  }
}

const ALL_LINKS_SEARCH_QUERY = gql`
  query AllLinksSearchQuery($searchText:String!, $categoryText:String!) {
    allLinks(filter: {
      AND:
      [
            {category:$categoryText},
            {
              OR: [{
                  url_contains: $searchText
                }, {
                  description_contains: $searchText
                }]
              }
      ]

    }) {
      id
      title
      url
      description
      category
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
