import React, { useState } from 'react'
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
    stroke: '#94a3b8', // Color of the outline
    strokeWidth: 0.25 // Width of the outline
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
  const [zoom, setZoom] = useState(5) // Adjusts Default zoom level
  const [tooltipContent, setTooltipContent] = useState('')
  const [position, setPosition] = useState({ x: 0, y: 0 })

  const handleZoomIn = () => {
    setZoom(zoom => Math.min(zoom * 2, 10))
  }

  const handleZoomOut = () => {
    setZoom(zoom => Math.max(zoom / 2, 1))
  }

  const onMouseMove = (geo, evt) => {
    const x = evt.clientX
    const y = evt.clientY
    setTooltipContent(geo.properties.name)
    setPosition({ x, y })
  }

  const onMouseLeave = () => {
    setTooltipContent('')
  }

  return (
    <div className='relative'>
      <ComposableMap style={mapStyles}>
        <ZoomableGroup zoom={zoom} center={[10, 40]} maxZoom={10} >
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map((geo) => (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  style={geographyStyle}
                  onMouseMove={evt => onMouseMove(geo, evt)}
                  onMouseLeave={onMouseLeave}
                />
              ))}
          </Geographies>
        </ZoomableGroup>
      </ComposableMap>
      {tooltipContent && (
        <div
          className='tooltip bg-slate-100 text-slate-800 dark:bg-slate-700 dark:text-white p-2 rounded absolute'
          style={{ left: `${position.x}px`, top: `${position.y}px`, position: 'fixed'}}
        >
          {tooltipContent}
        </div>
      )}
      <button onClick={handleZoomIn} className='absolute top-2 right-11 w-8 h-8 bg-blue-500 text-xl font-semibold text-white rounded-full focus:outline-none'>
        <div className='flex justify-center items-center'>+</div>
      </button>
      <button onClick={handleZoomOut} className='absolute top-2 right-2 w-8 h-8 bg-blue-500 text-xl font-semibold text-white rounded-full focus:outline-none'>
        <div className='flex justify-center items-center'>-</div>
      </button>
    </div>
  )
}
