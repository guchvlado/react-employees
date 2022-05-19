import { Component } from 'react';

import './search-panel.css'

class SearchPanel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            term: ""
        };
    }
    
    updateSearch = (e) => {
        const term = e.target.value;
        this.setState({term});
        this.props.onSearch(term);
    }

    render() {
        return (
            <input 
                onChange={this.updateSearch}
                value={this.state.term}
                type="text"
                className="form-control search-input"
                placeholder="Найти сотрудника" />
        );
    }
}

export default SearchPanel;