import React, { PureComponent } from 'react'
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import * as actions from '../../actions'
import { connect } from 'react-redux'
import styled from 'styled-components'

class LinkInput extends PureComponent {

    state = {
        newcat: '',
        categories: [],
        link: {
            display: '',
            description: '',
            category: '',
            url: '',
            tags: []
        }
    }

    componentDidMount() {
        this.setState({categories: this.props.categories})
        this.props.link && this.setState({link: this.props.link})
    }

    handleChange(e) {
        const { name, value } = e.target
        if (name === 'category' && value === 'add') {
            this.addCategory()
            return
        }
        this.setState({ link: { ...this.state.link, [name]: value } })
    }

    handleCategoryChange = (e) => {
        const { value } = e.target
        this.setState({ newcat: value})
    }

    addCategory = () => {
        confirmAlert({
            title: `New Category`,
            childrenElement: () => <div>
                <input type='text' onChange={this.handleCategoryChange.bind(this)} placeholder='Add category...'></input>
            </div>,
            buttons: [
                {
                    label: 'Continue',
                    onClick: () => {
                        const cats = [...this.state.categories, this.state.newcat]
                        this.setState({ categories: cats, link: { ...this.state.link, category: this.state.newcat}})
                    }
                },
                {
                    label: 'Cancel',
                    onClick: () => {
                        this.setState({ newcat: '' })
                    }
                }
            ]
        });
    };

    addTag(tag) {

    }

    resetState() {
        this.setState({
            display: '',
            description: '',
            category: '',
            url: '',
            tags: [],
            _id: '',
            createdAt: '',
            updatedAt: ''
        })
    }

    handleFormSubmit() {
        this.props.link && this.props.editLink(this.props.link._id, this.state)
        !this.props.link && this.props.insertLink(this.state.link)
        this.resetState()
        window.location.reload()
    }

    renderError() {
        if (this.props.errorMessage) {
            return (
                <div className='alert alert-danger'>
                    <em>Oops! {this.props.errorMessage}</em>
                </div>
            )
        }
    }

    render() {

        const handleClose = () => {
            console.log('close')
            this.resetState()
            this.props.cancel()
        }

        return (
            <LinkForm>
                <fieldset>
                    <input
                        onChange={this.handleChange.bind(this)}
                        defaultValue={this.props.link ? this.props.link.display : ''}
                        name='display'
                        placeholder='Display Text'
                        type='text' />
                </fieldset>
                <fieldset>
                    <input
                        onChange={this.handleChange.bind(this)}
                        defaultValue={this.props.link ? this.props.link.description : ''}
                        name='description'
                        placeholder='Description'
                        type='text' />
                </fieldset>
                <fieldset>
                    <label htmlFor='category'>
                        Category
                    </label>
                    <select
                        onChange={this.handleChange.bind(this)}
                        value={this.state.link.category}
                        id='category'
                        name='category'
                    >
                        {this.props.categories && this.state.categories.map((c, idx) => {
                            return <option key={idx} value={c}>{c}</option>
                        })}
                        <option value='add'>Add new category</option>
                    </select>
                    <input
                        onChange={this.handleChange.bind(this)}
                        value={this.state.link.category}
                        name='category'
                        placeholder='Category'
                        type='text' />
                </fieldset>
                <fieldset>
                    <input
                        onChange={this.handleChange.bind(this)}
                        defaultValue={this.props.link ? this.props.link.url : ''}
                        name='url'
                        placeholder='URL'
                        type='text' />
                </fieldset>
                <fieldset>
                    <input
                        onChange={this.handleChange.bind(this)}
                        defaultValue={this.props.link ? this.props.link.tags : ''}
                        name='tags'
                        placeholder='Tags'
                        type='text' />
                </fieldset>
                {this.renderError()}
                <div>
                    <button className='btn btn-primary' onClick={() => this.handleFormSubmit()}>Submit</button>
                    <button className='close' onClick={() => handleClose()}>Cancel</button>
                </div>
            </LinkForm>
        )
    }
}

const LinkForm = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    fieldset {
        margin: 0.5rem auto;
        width: 75%;
        text-align: center;
        input {
            width: 100%;
        }
    }
`;

const mapStateToProps = (state) => {
    return {
        uid: state.auth.user._id
    }
}

export default connect(mapStateToProps, actions)(LinkInput)

