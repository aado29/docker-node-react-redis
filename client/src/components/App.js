import React, { Component } from 'react';
import Map from './Map';
import Modal from './Modal';
import './../styles/App.css';
import axios from 'axios';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      countryData: null,
      isLoading: false
    }
  }

  handleOpenModal = () => {
    this.setState({showModal: true});
  }

  handleCloseModal = () => {
    this.setState({
      showModal: false,
      countryData: null
    });
  }

  handleGetCountry = (err, data) => {
    this.setState({isLoading: true});
    if (err) {
      this.setState({isLoading: false});
    } else {
      axios.get(`${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/api/weather`, {
        params: {
          countryCode: data.address.country_code
        }
      })
      .then(data => {
        this.setState({
          countryData: data.data,
          isLoading: false
        });
        this.handleOpenModal();
      })
      .catch(err => {
        this.setState({isLoading: false});
        console.log(err);
      })
    }
  }

  render() {
    return (
      <div className="App">
        <Map onGetCountry={this.handleGetCountry} isLoading={this.state.isLoading} />
        <Modal show={this.state.showModal} onClose={this.handleCloseModal}>
          <h1>País: {this.state.countryData && this.state.countryData.countryData.CountryName}</h1>
          <h2>Capital: {this.state.countryData && this.state.countryData.countryData.CapitalName}</h2>
          <h2>Continente: {this.state.countryData && this.state.countryData.countryData.ContinentName}</h2>
          <h3>Clima: {this.state.countryData && this.state.countryData.weather.currently.summary}</h3>
        </Modal>
      </div>
    );
  }
}

export default App;
