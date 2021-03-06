import React, {Component} from 'react'
import GoogleMapReact from 'google-map-react'
import {
  COUNTRY_ZOOM,
  SLOVAKIA_COORDS,
  createMapOptions,
  GOOGLE_MAP_CONFIG,
} from '../../../constants'
import './MapContainer.css'

const Marker = ({title}) => <div className="marker">{title}</div>

class MapContainer extends Component {
  render() {
    return (
      <div className="map">
        <GoogleMapReact
          bootstrapURLKeys={GOOGLE_MAP_CONFIG}
          defaultCenter={SLOVAKIA_COORDS}
          options={createMapOptions}
          center={this.props.center}
          defaultZoom={COUNTRY_ZOOM}
          zoom={this.props.zoom}
        >
          {this.props.assets.map((asset, key) => {
            return <Marker key={key} title={key + 1} lat={asset.lat} lng={asset.lon} />
          })}
        </GoogleMapReact>
      </div>
    )
  }
}

export default MapContainer
