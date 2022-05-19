import { Component } from 'react';

import './app-filter.css';

class AppFilter extends Component {

    render() {
        const buttonsData = [
            {name: "", text: "Все сотрдники"},
            {name: "rise", text: "На повышение"},
            {name: "salary>1000", text: "З/П больше 1000$"}
        ];


        const buttons = buttonsData.map(({name, text}) => {
            const activeClass = this.props.filter === name ? "btn btn-light" : "btn btn-outline-light";
            return (
                <button 
                    className={activeClass}
                    key={name}
                    onClick={() => this.props.onFilter(name)}
                    type="button">
                    {text}
                </button>
            );
        });
        return (
            <div className="btn-group">
                {buttons}
            </div>
        );
    }
}

export default AppFilter;