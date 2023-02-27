import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import EventDetail from '../components/events/EventDetailComponent'
import PrimaryBtnComponent from '../components/PrimaryBtnComponent'
import VideoHeaderComponent from '../components/VideoHeaderComponent'
import { useAuth } from '../contexts/AuthContext'

export default function EventDetailsView({ navigation }) {
    const { auth, setIsOpen } = useAuth()

    const handlePress = () => {
        // if (!auth) {
        //     setIsOpen(true)
        // // } else {
            navigation.navigate('Interspace')
        // }
    }

    return (
        <View style={styles.container}>
            <VideoHeaderComponent uri={"https://res.cloudinary.com/ddbgaessi/video/upload/v1677366436/Screen_Recording_2023-02-25_at_17.05.18_dijtrc.mov"} />
            <View style={{
                paddingLeft: 20,
                paddingTop: 20,
            }}>
                <EventDetail icon="calendar" title="Date" data="3/6/23" />
                <EventDetail icon="time" title="Hour" data="3/6/23" />
                <EventDetail icon="cycle" title="Price" data="10 Interflows" />
                <EventDetail icon="cash" title="Minimum Holdings" data="1 Doodle NFT" />
                <EventDetail icon="location" title="Location" data="Doodles interspace" />
            </View>
            <View style={{
                position: "absolute",
                bottom: 0,
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
                bottom: 40,
            }}>
                <View style={styles.centered}>
                    <PrimaryBtnComponent label="Access Interspace" onPress={handlePress} />
                </View>
            </View>


        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    centered: {
        alignItems: 'center',
        justifyContent: 'center',
    }

})