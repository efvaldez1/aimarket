import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import Select from 'react-select'
import gql from 'graphql-tag'

class Multiselect extends React.Component {
state = {
    selectedOption: '',
  }
  handleChange = (selectedOptions) => {

  this.setState({ selectedOptions });
  selectedOptions.forEach( selectedOption =>
    console.log( `Selected: ${selectedOption.label}` )
  );
}

render() {
	if (this.props.allTagsQuery && this.props.allTagsQuery.loading) {
		return <div>Loading</div>
	}

	if (this.props.allCTagsQuery && this.props.allTagsQuery.error) {
		return <div>Error</div>
	}

const options = []
const categoryToRender = this.props.allCategoryQuery.allCategories
console.log(categoryToRender)
return (
	<div>
	<label>Tags :</label>
  <Select
    name="form-field-name"
    value={this.state.selectedOptions}
    onChange={this.handleChange}
    multi={true}
		options={[
          { value: '0', label: 'Algorithmic Trading' },
          { value: '1', label: 'Market Analysis and Data Mining' },
					{ value: '2', label: 'Portfolio Management' },
					{ value: '3', label: 'Hospitals and medicine' },
					{ value: '4', label: 'Human Resources & Recruiting' },
					{ value: '5', label: 'Online and telephone customer service' },
					{ value: '6', label: 'Transportation' },
					{ value: '7', label: 'Natural Language Processing' },
					{ value: '8', label: 'Computer Vision' },
        ]}
  />

	</div>
);
}
}

//const ALL_TAGS_QUERY = gql `
//query AllTagsQuery{
//  #graphql pluralises automatically
//  allTags{
//    id
//    name
//		link
//  }
//}
//`

//export default graphql(ALL_TAGS_QUERY,{name:'allTagsQuery'}) (Multiselect)
const ALL_CATEGORY_QUERY = gql `
query AllCategoryQuery{
  #graphql pluralises automatically
  allCategories{
    id
    name
  }
}
`

export default graphql(ALL_CATEGORY_QUERY,{name:'allCategoryQuery'}) (Multiselect)
