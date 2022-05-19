import { Component } from 'react';

import AppInfo from '../app-info/app-info';
import SearchPanel from '../search-panel/search-panel';
import AppFilter from '../app-filter/app-filter';
import EmployeesList from '../employees-list/employees-list';
import EmployeesAddForm from '../employees-add-form/employees-add-form';

import './app.css';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [
                {name: 'Jojn S.', salary: 800, increase: true, rise: false, id: 1},
                {name: 'Vlad G.', salary: 1000, increase: false, rise: false, id: 2},
                {name: 'Yana M.', salary: 1500, increase: false, rise: false, id: 3}
            ],
            term: '',
            activeFilter: ""
        }
        this.maxId = this.state.data.length;
    }

    deleteItem = (id) => {
        this.setState(({data}) => {
            return {
                data: data.filter(item => item.id !== id)
            }
        })
    }

    addItem = (name, salary) => {
        const newDataElement = {name: name, salary: salary, increase: false, id: ++this.maxId};
        this.setState(({data}) => {
            return {
                data: [...data, newDataElement]
            }
        })
    }

    onToggleProp = (id, prop) => {
        this.setState(({data}) => ({
            data: data.map(item => {
                if (item.id === id) {
                    return {...item, [prop]: !item[prop]};
                }
                return item;
            })
        }));
    }

    onSearch = (term) => {
        this.setState({term});
    }

    onFilter = (activeFilter) => {
        this.setState({activeFilter});
    }

    searchEmp = (items, term) => {
        if (term.length === 0) {
            return items;
        }

        return items.filter(item => item.name.search("^"+term) > -1)
    }

    filterPost = (items, filter) => {
        switch(filter) {
            case 'rise':
                return items.filter(item => item.rise);
            case 'salary>1000':
                return items.filter(item => item.salary >= 1000);
            default:
                return items
        }
    }

    render() {
        const {data, term, activeFilter} = this.state;
        const employeesNumber = this.state.data.length;
        const employeesIncrease = this.state.data.filter(item => item.increase).length;
        const visibleData = this.filterPost(this.searchEmp(data, term), activeFilter);
        return (
            <div className="app">
                <AppInfo employeesNumber={employeesNumber} employeesIncrease={employeesIncrease}/>
    
                <div className="search-panel">
                    <SearchPanel onSearch={this.onSearch}/>
                    <AppFilter filter={activeFilter} onFilter={this.onFilter}/>
                </div>
                <EmployeesList 
                    onDelete={this.deleteItem} 
                    data={visibleData}
                    onToggleProp={this.onToggleProp}/>
                <EmployeesAddForm onSubmit={this.addItem}/>
            </div>
        );
    }
}

export default App;