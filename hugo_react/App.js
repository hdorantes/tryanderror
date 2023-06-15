import React, { component } from 'react';
import { Switch, BrowserRouter } from 'react-router-dom';

//import homeIcon from '../src/assets/images/home.png';
import carIcon from '../src/assets/images/menu-car.a836175f.svg';

const links = [
    { name: 'Chase', url: '#' },
    { name: 'Chase Auto Account Resource Center',
      url: 'https://www.chase.com/personal/auto-loans/servicing'
    }
];

const menuItems = [
    {
        menuName: 'Go to chase.com',
        route: 'https://www.chase.com/',
        iconURL: homeIcon,
        children: [

        ]
    },
    {
        menuName: 'Explore Auto',
        route: '#',
        iconURL: carIcon,
        children: [

        ]        
    }
];

class App extends Component {
    state = {
        navigationIsExpanded: false,
        dropdownIsOpen: false,
        searchText: "",
        sortbyCombo_value: "",
        searchResult: [],
        paginationActivePage: 1,
        totalPages: 0,
        pageSize: 20,
    }
}

items_objects = [{ value: '0', label: 'Best Match'}, { value: '165', label: 'Nearest'}, { value: '166', label: 'Price: low to high'}, { value: '167', label: 'Price: high to low'}, { value: '168', label: 'Mileage: low to high'}, { value: '169', label: 'Mileage: high to low'}]

handleToggleNavigation = () => {
    this.setState({ navigationIsExpanded: !this.state.navigationIsExpanded });
};

toggleDropdown = () => {
    this.setState({ dropdownIsOpen: !this.state.dropdownIsOpen });
};

handleSearchClick = (e) => {
    console.log(e);
    console.log("About to call api with search term: " + this.state.searchText);

    const apiUrl = "http://localhost:5000/api";

    fetch(apiUrl, {
        method: 'POST',
        headers: new Headers({
            'Content-Type': 'application/json'
        }),
        body: "\"prompt\": \"" + this.state.searchText + "\""
    })
    .then(res => res.json())
    .then(
        (result) => {
            console.log('result = ');
            console.log(result);
            this.setState({searchResult: result});
        }
    );
}

handleChange(changeObject) {
    this.setSate(changeObject);
}

render() {
    const { dropdownIsOpen, navigationIsExpanded } = this.state;
    const currentYear = moment().format(YYYY);
    const classes = classNames('content', {
        'navigation-expanded: navigationIsExpanded'
    });

    return (
        <BrowserRouter>
            <main className="content-body">

                <div className="cs-landing-search-bg">
                    <div className="g-container cs-landing-search-wrapper">
                        <h1 className="cs-landing-headline">Search your dream car with Chase Auto</h1>
                    </div>
                </div>

                <div className="form-group-search">
                    <table style={{width: 100 + '%'}}>
                        <tbody>
                            <tr>
                                <td width="90%">
                                    <input
                                        id="input-group-validation-text"
                                        value={this.state.searchText}
                                        onChange={(e) => this.handleChange({ searchText: e.target.value })}
                                        style={{borderRadius: 80}} 
                                        type="text" 
                                    />
                                    <p style={{marginLeft: 40, marginRight: 40}} className="text-center">
                                        <a href="https://autopreferred.chase.com/cars?location=75024&vehicle_condition=New">Click here for a classic view</a>
                                    </p>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    &nbsp;&nbsp;&nbsp;<button onClick={(e) => this.handleSearchClick(e) } className="g-button g-button-concierge apply-now-button"></button>
                                    <p>&nbsp;</p>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <hr/>

                <div className="subHeader" style={{marginLeft: 40, marginRight: 40}}>
                    <div className="subheader-left">
                        <h1 className="search-heading">
                            <span className="u-fw600">{(this.state.searchResult.length).toLocaleString('en-US')} </span> new cars <span> | <button className="location-popup-link">{(50).toLocaleString('en-US')} miles</button> from <button className="location-popup-link">75094</button></span>
                        </h1>
                        <div className="subheader-buttons">
                            <label className="label">
                                Sort by:
                            </label>
                            <div className="sort-desktop sort-0">
                                <select 
                                    id="sortbyCombo" 
                                    name="sortbyCombo" 
                                    className="select g-select--medium">
                                        <option value="0"> Best match </option>
                                        <option value="165"> Nearest </option>
                                        <option value="166"> Price: low to high </option>
                                        <option value="167"> Price: high to low </option>
                                        <option value="168"> Mileage: low to high </option>
                                        <option value="169"> Mileage: high to low </option>
                                </select>
                            </div>
                            <button type="button" className="g-button g-button--large g-button--ghost g-button--compare compare-btn">
                                <span className="icon-plus"></span>
                                Compare
                            </button>
                        </div>
                    </div>
                </div>



            </main>




        </BrowserRouter>


    );

});

export default App;