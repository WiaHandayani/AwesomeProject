import React from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'
import MapView, { PROVIDER_GOOGLE, Marker , Polyline} from 'react-native-maps';
import { colors } from '../../utils'
import { car, pin } from '../../assets';
import MapViewDirections from 'react-native-maps-directions';
import GOOGLE_API_KEY from '../maps';

const Maps_ = () => {

    const mapView = React.useRef()

    const [restaurant, setRestaurant] = React.useState(null)
    const [streetName, setStreetName] = React.useState("")
    const [fromLocation, setFromLocation] = React.useState(null)
    const [toLocation, setToLocation] = React.useState(null)
    const [region, setRegion] = React.useState(null)

    const [duration, setDuration] = React.useState(0)
    const [isReady, setIsReady] = React.useState(false)
    const [angle, setAngle] = React.useState(0)

    React.useEffect(() => {
        const currentLocation = {
            streetName: "Universitas Nasional pasim",
            gps: {
                latitude: -6.894460574958035,
                longitude: 107.5717563751118
            }
        }

        const restaurant = {
            location: {
                latitude: -6.892213154797229,
                longitude: 107.57257176665797,
            }
        }

    
        

        let fromLoc = currentLocation.gps
        let toLoc = restaurant.location
        let street = currentLocation.streetName

        let mapRegion = {
            latitude: (fromLoc.latitude + toLoc.latitude) / 2,
            longitude: (fromLoc.longitude + toLoc.longitude) / 2,
            latitudeDelta: Math.abs(fromLoc.latitude - toLoc.latitude) * 2,
            longitudeDelta: Math.abs(fromLoc.longitude - toLoc.longitude) * 2
        }

        setRestaurant(restaurant)
        setStreetName(street)
        setFromLocation(fromLoc)
        setToLocation(toLoc)
        setRegion(mapRegion)

    }, [])

    function renderMap(){
        const destinationMarker = () => (
            <Marker
                coordinate={{ latitude: -6.892213154797229,
                    longitude: 107.57257176665797, }}
            >
                <View
                    style={{
                        height: 40,
                        width: 40,
                        borderRadius: 20,
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: 'white'
                    }}
                >
                    <View
                        style={{
                            height: 30,
                            width: 30,
                            borderRadius: 15,
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: colors.default
                        }}
                    >
                        <Image
                            source={pin}
                            style={{
                                width: 25,
                                height: 25,
                                tintColor: 'white'
                            }}
                        />
                    </View>
                </View>
            </Marker>
        )

        const carIcon = () => (
            <Marker
                coordinate={fromLocation}
                anchor={{ x: 0.5, y: 0.5 }}
                flat={true}
                rotation={angle}
            >
                <Image
                    source={car}
                    style={{
                        width: 40,
                        height: 40
                    }}
                />
            </Marker>
        )

        return(
            
            <View style={{flex:1}}>
                <MapView 
                provider={PROVIDER_GOOGLE}
                initialRegion={region}
                style={{flex:1}}>
                    <Polyline coordinates={[
                        {
                            latitude: -6.894460574958035,
                            longitude: 107.5717563751118
                        },
                        {
                            latitude: -6.892213154797229,
                            longitude: 107.57257176665797,
                        }
                        ]} />
                    {destinationMarker()}
                    {carIcon()}
                </MapView>
            </View>
        )
    }

    return (
        <View style={{flex:1}}>
            {renderMap()}
        </View>
    )
}

export default Maps_
