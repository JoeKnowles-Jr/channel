import React from 'react'
import { connect } from 'react-redux'
import * as actions from '../../actions'
import styled from 'styled-components'
import LinkList from '../../components/links/link.list'
import LinkInput from '../../components/links/link.input'

class LinksAdmin extends React.PureComponent {
    
    state = {
        display: 'links',
        editLink: null
    }

    componentDidMount() {
        this.props.fetchLinks()
    }

    editMe = (lid) => {
        const link = JSON.parse(lid)
        this.setState({editLink: link, display: 'input'})
    }

    deleteMe = () => {
        if (this.state.editLink) {
            this.props.deleteLink(this.state.editLink._id)
            this.setState({ editLink: null, display: 'links' })
            window.location.reload()
        }
    }

    getCategories = () => {
        return this.props.links.map(l => {
            return l._id
        })
    }

    handleCancel = () => {
        this.setState({ editLink: null, display: 'links' })
    }

    render() {
        return (
            <div>
                <Title>
                    LinksAdmin
                </Title>
                {this.state.display === 'links' && <AddButton><button onClick={() => this.setState({display: 'input'})}>Add Link</button></AddButton>}
                {this.state.editLink && this.state.display === 'input' && <AddButton><button onClick={this.deleteMe}>Delete Link</button></AddButton>}
                {this.state.display === 'links' && <LinkList edit={this.editMe} links={this.props.links} admin={true} />}
                {this.state.display === 'input' && <LinkInput categories={this.getCategories()} link={this.state.editLink} cancel={this.handleCancel} />}
            </div>
        )
    }
}

const AddButton = styled.div`
    text-align: end
`

const Title = styled.div`
    margin-top: 2rem;
    font-size: 3rem;
    font-weight: bold;
    font-family: 'Cookies';
    text-align: center;
`
const mapStateToProps = (state) => {
    return {
        links: state.links.links,
        user: state.auth.user
    }
}

export default connect(mapStateToProps, actions)(LinksAdmin)
