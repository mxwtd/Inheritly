import { useState } from 'react'
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup
} from 'react-simple-maps'

const geoUrl =
  'https://raw.githubusercontent.com/deldersveld/topojson/master/world-countries.json'

const mapStyles = {
  width: '100%',
  height: 'auto'
}

const geographyStyle = {
  default: {
    fill: '#D6D6DA',
    outline: 'none'
  },
  hover: {
    fill: '#3B82F6',
    outline: 'none'
  },
  pressed: {
    fill: '#2563EB',
    outline: 'none'
  }
}

export default function MapChart () {
  const [hoveredCountry, setHoveredCountry] = useState(null)

  const handleMouseEnter = (geo) => {
    setHoveredCountry(geo.properties.name)
  }

  const handleMouseLeave = () => {
    setHoveredCountry(null)
  }

  return (
    <div>
      <ComposableMap
        style={mapStyles}
        projectionConfig={{ scale: 500, center: [10, 40] }} // Adjusts the map default zoom and center
      >
        <ZoomableGroup maxZoom={8}>
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map((geo) => (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  style={geographyStyle}
                  onMouseEnter={() => handleMouseEnter(geo)}
                  onMouseLeave={handleMouseLeave}
                />
              ))}
          </Geographies>
        </ZoomableGroup>
      </ComposableMap>
      {hoveredCountry && (
        <div className='tooltip bg-white text-black p-2 rounded absolute top-0 left-0 mt-2 ml-2'>
          {hoveredCountry}
        </div>
      )}
    </div>
  )
}
