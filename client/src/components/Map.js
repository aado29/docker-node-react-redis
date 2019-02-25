import  React, { Component } from 'react';
import  GoogleMapsLoader from 'google-maps';
import axios from 'axios';
import './../styles/Map.css';

const mapStyle = [
    {
        "featureType": "administrative",
        "elementType": "all",
        "stylers": [
            {
                "saturation": "-100"
            }
        ]
    },
    {
        "featureType": "administrative.province",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "landscape",
        "elementType": "all",
        "stylers": [
            {
                "saturation": -100
            },
            {
                "lightness": 65
            },
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "all",
        "stylers": [
            {
                "saturation": -100
            },
            {
                "lightness": "50"
            },
            {
                "visibility": "simplified"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "all",
        "stylers": [
            {
                "saturation": "-100"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "simplified"
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "all",
        "stylers": [
            {
                "lightness": "30"
            }
        ]
    },
    {
        "featureType": "road.local",
        "elementType": "all",
        "stylers": [
            {
                "lightness": "40"
            }
        ]
    },
    {
        "featureType": "transit",
        "elementType": "all",
        "stylers": [
            {
                "saturation": -100
            },
            {
                "visibility": "simplified"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "geometry",
        "stylers": [
            {
                "hue": "#ffff00"
            },
            {
                "lightness": -25
            },
            {
                "saturation": -97
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "labels",
        "stylers": [
            {
                "lightness": -25
            },
            {
                "saturation": -100
            }
        ]
    }
]

export default class Map extends Component {
  constructor(props) {
    super(props)
    this.state = {
      GOOGLE_API_KEY: 'AIzaSyCkUOdZ5y7hMm0yrcCQoCvLwzdM6M8s5qk',
      map: null,
      isRequesting: false,
    }
  }
  
  componentDidMount() {
    GoogleMapsLoader.KEY = this.GOOGLE_API_KEY;
    GoogleMapsLoader.load(google => {
      this.initMap(google);
    });
  }

  initMap(google) {
    this.map = new google.maps.Map(this.refs.map, {
      center: {lat: -34.397, lng: 150.644},
      zoom: 3,
      styles: mapStyle,
      scrollwheel: false,
      scaleControl: false,
      disableDoubleClickZoom: true,
      disableDefaultUI: true,
    });
    this.handleClickMap(google)
  }

  handleClickMap(google) {
    google.maps.event.addListener(this.map, "click", event => {
      const clickLat = event.latLng.lat();
      const clickLng = event.latLng.lng();
      if (!this.state.isRequesting) {
        this.getCountryData(clickLat, clickLng);
      } else {
        console.log('is requesting');
      }
    });
  }

  getCountryData(lat, lng) {
    this.setState({isRequesting: true});
    axios.get('https://nominatim.openstreetmap.org/reverse', {
      params: {
        format: 'jsonv2',
        'accept-language': 'en-US',
        lat: lat,
        lon: lng,
        zoom: 14,
        addressdetails: 1
      }
    })
      .then(res => {
        const data = res.data;
        if (data.error || !data.address.country)	 {
          throw data.error;
        }
        this.props.onGetCountry(null, data);
      })
      .catch(err => {
        this.props.onGetCountry(err);
      })
      .finally(() => {
        this.setState({isRequesting: false});
      })
  }

  render() {
    const blockClasses = (!this.props.isLoading) ? 'map' :  'map map--loading';
    return (
      <div className={blockClasses}>
        {this.props.isLoading && (
          <div className="map__loading">
            <div className="map__loading__icon">
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
          </div>
        )}
        <div ref="map" className="map__inner"></div>
      </div>
    )
  }
}
