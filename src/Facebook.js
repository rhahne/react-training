import React from 'react';
import './App.css';

const Component = React.Component;


class Facebook extends Component {
  constructor(props) {
    super(props);
    // Define your state object here
    this.state = {
      allProfiles: this.props.profiles,
      filteredStudents: []
    }
    this.search = this.search.bind(this);
  }
  filterStudents(country) {
    const filteredStudents = this.state.allProfiles.filter(profile => profile.country === country)
    this.setState(() => ({
      filteredStudents: filteredStudents
    }));
  }
  changeColor(profile) {
    if (this.state.filteredStudents.includes(profile)) {
      return 'highlighted'
    }else{
      return '';
    }
  }
  createButtons() {
    var countryNames = [];
    this.props.profiles.forEach((profile) => {
      countryNames.push(profile.country)
    })
    let uniqCountryNames = [...new Set(countryNames)];
    return uniqCountryNames
  }
  search(event) {
    let searchVal = event.target.value;
    let searchedStudents = this.props.profiles.filter((profile) => {
      return profile.firstName.indexOf(searchVal) !== -1;
    })
    this.setState({
      allProfiles: searchedStudents
    });
  }
  render() {
    return (
      <div>
        {this.createButtons().map((country)=>{
          return <button onClick={() => {this.filterStudents(country)}}>{country}</button>
        })}
        <br />
        <label>Search by first name</label>
        <input onChange={this.search} type="search"/>
        {this.state.allProfiles.map((profile) => {
        return <div className={"IdCard box " + this.changeColor(profile)}>
                  <div className="left">
                    <img width="100" src={profile.img} alt="randomImage"/>
                  </div>
                  <div className="right">
                    <ul>
                      <li><strong>First name: </strong>{profile.firstName}</li>
                      <li><strong>Last name: </strong>{profile.lastName}</li>
                      <li><strong>Country: </strong>{profile.country}</li>
                      <li><strong>Type: </strong>{profile.isStudent? 'Student' : 'Teacher'}</li>
                    </ul>
                  </div>
                </div>
        })
      }
      </div>
        );
      }
    }
    
export default Facebook;