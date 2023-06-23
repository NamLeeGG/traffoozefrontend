import {
    Box,
    Flex,
  } from '@chakra-ui/react'

import { FaCar, FaExclamationTriangle, FaCarCrash } from 'react-icons/fa';

import {
    GoogleMap,
    Marker,
    InfoWindow,
  } from '@react-google-maps/api'
import { useState } from 'react'

import { useLoadScript } from '@react-google-maps/api';

import { LoadScript } from '@react-google-maps/api';

const center = { lat: 1.3521, lng: 103.8198 }

const trafficJams = [
    {
        date: '2023/07/10',
        time: '09:15',
        message: 'Heavy traffic on ECP (towards Changi Airport) after Still Rd Sth Exit. Avoid lane 3.',
        location: '1.303560,103.834801',
    },
    {
        date: '2023/07/12',
        time: '17:30',
        message: 'Severe congestion on PIE (towards Tuas) near Jurong West. Expect delays.',
        location: '	1.339620000000025,103.70751000000007',
    },
    {
        date: '2023/07/15',
        time: '08:45',
        message: 'Slow-moving traffic on AYE (towards City) after Clementi Ave 6 Exit. Plan alternative routes.',
        location: '	1.3242500000000632,103.95297000000005',
      },
];

const roadClosures = [
    {
        date: "2023/3/29",
        time: "18:22",
        message: "Road Block on ECP (towards Changi Airport) after Still Rd Sth Exit. Avoid lane 3",
        location: "1.443990,103.724730"
    },
    {
        date: "2023/7/19",
        time: "15:10",
        message: "Road Block on PIE (towards Jurong) after Clementi Ave 6 Exit. Avoid lane 3",
        location: "1.313124,103.770965"
    },
    {
        date: "2023/9/21",
        time: "16:30",
        message: "Road Block on AYE (towards Tuas) after Clementi Ave 2 Exit. Avoid lane 3",
        location: "1.319616, 103.760896"
    },
];

const accidents = [
    {
        date: "2023/9/8",
        time: "17:30",
        message: "Accident on AYE (towards City) before Buona Vista Exit. Emergency services on the way",
        location: "1.294477,103.786594"
    },
    {
        date: "2023/11/12",
        time: "12:45",
        message: "Accident on CTE (towards City) before Braddell Rd Exit. Emergency services on the way",
        location: "1.337254, 103.847816"
    },
];

function UpdatesMap() {
    const [activeMarker, setActiveMarker] = useState(null);
    
    /*
    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: "AIzaSyAtb0wcUqR30-EBUn5WgDuUP_iZyhyLsE0",
        libraries: ['places'],
    });*/
  
    const [map, setMap] = useState(null);
    const [directionsResponse, setDirectionsResponse] = useState(null)
  
    const handleActiveMarker = (marker) => {
        if (marker === activeMarker) {
          return;
        }
        setActiveMarker(marker);
    };

    return (
        
      <Flex
        position='relative'
        flexDirection='column'
        alignItems='center'
        h='100vh'
        w='100vw'
      >

        <Box position='absolute' left={0} top={0} h='100%' w='100%'>
        <LoadScript googleMapsApiKey="AIzaSyAtb0wcUqR30-EBUn5WgDuUP_iZyhyLsE0">
          <GoogleMap
            center={center}
            zoom={12}
            mapContainerStyle={{ width: '100%', height: '100%' }}
            options={{
              zoomControl: false,
              streetViewControl: false,
              mapTypeControl: false,
              fullscreenControl: false,
              styles: [
                {
                  featureType: 'poi',
                  elementType: 'labels.icon',
                  stylers: [{ visibility: 'off' }],
                },
              ],
            }}
            onLoad={map => setMap(map)}
          >

            

            {trafficJams.map(({ date, time, message, location }, index) => {
                const [lat, lng] = location.split(','); // Splitting the location string
                const position = { lat: parseFloat(lat), lng: parseFloat(lng) }; // Creating position object
                const markerIndex = index; // Store the original index

                return (
                    <Marker
                        key={`trafficJam-${markerIndex}`}
                        icon={{
                            path: FaCar().props.children[0].props.d,
                            fillColor: "#ff9900",
                            fillOpacity: 1,
                            strokeWeight: 1,
                            strokeColor: "#ffffff",
                            scale: 0.075
                        }}
                        position={position}
                        onClick={() => handleActiveMarker(markerIndex)}
                    >
                        {activeMarker === markerIndex ? (
                            <InfoWindow onCloseClick={() => setActiveMarker(null)}>
                                <div>
                                    <div>Date: {date}</div>
                                    <div>Time: {time}</div>
                                    <div>{message}</div>
                                </div>
                            </InfoWindow>
                        ) : null}
                    </Marker>
                );
            })}

            {roadClosures.map(({ date, time, message, location }, index) => {
                const [lat, lng] = location.split(','); // Splitting the location string
                const position = { lat: parseFloat(lat), lng: parseFloat(lng) }; // Creating position object
                const markerIndex = index + trafficJams.length;

                return (
                    <Marker
                        key={`roadClosure-${markerIndex}`}
                        icon={{
                            path: FaExclamationTriangle().props.children[0].props.d,
                            fillColor: "#ffd700",
                            fillOpacity: 1,
                            strokeWeight: 1,
                            strokeColor: "#ffffff",
                            scale: 0.075
                        }}
                        position={position}
                        onClick={() => handleActiveMarker(markerIndex)}
                    >
                        {activeMarker === markerIndex ? (
                            <InfoWindow onCloseClick={() => setActiveMarker(null)}>
                                <div>
                                    <div>Date: {date}</div>
                                    <div>Time: {time}</div>
                                    <div>{message}</div>
                                </div>
                            </InfoWindow>
                        ) : null}
                    </Marker>
                );
            })}

            {accidents.map(({ date, time, message, location }, index) => {
                const [lat, lng] = location.split(','); // Splitting the location string
                const position = { lat: parseFloat(lat), lng: parseFloat(lng) }; // Creating position object
                const markerIndex = index + trafficJams.length + roadClosures.length;

                return (
                    <Marker
                        key={`roadClosure-${markerIndex}`}
                        icon={{
                            path: FaCarCrash().props.children[0].props.d,
                            fillColor: "#ff0000",
                            fillOpacity: 1,
                            strokeWeight: 1,
                            strokeColor: "#ffffff",
                            scale: 0.075
                        }}
                        position={position}
                        onClick={() => handleActiveMarker(markerIndex)}
                    >
                        {activeMarker === markerIndex ? (
                            <InfoWindow onCloseClick={() => setActiveMarker(null)}>
                                <div>
                                    <div>Date: {date}</div>
                                    <div>Time: {time}</div>
                                    <div>{message}</div>
                                </div>
                            </InfoWindow>
                        ) : null}
                    </Marker>
                );
            })}

          </GoogleMap>
          </LoadScript>
        </Box>
      </Flex>
      
    )
  }

  export default UpdatesMap