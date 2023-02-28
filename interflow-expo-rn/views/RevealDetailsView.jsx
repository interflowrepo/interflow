import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import EventDetail from '../components/events/EventDetailComponent'
import PrimaryBtnComponent from '../components/PrimaryBtnComponent'
import VideoHeaderComponent from '../components/VideoHeaderComponent'
import { useAuth } from '../contexts/AuthContext'

export default function RevealDetailsView({ navigation }) {
    const { auth, setIsOpen } = useAuth()

    const handlePress = () => {
        // if (!auth) {
        //     setIsOpen(true)
        // // } else {
        navigation.navigate('Reveal')
        // }
    }

    return (
        <View style={styles.container}>
            <VideoHeaderComponent uri={"https://res.cloudinary.com/ddbgaessi/video/upload/v1677591490/reveal_h4xpmz.mov"} reveal={true} />
            <View style={{
                paddingLeft: 20,
                paddingTop: 20,
            }}>
                <EventDetail icon="gallery" title="Collection" data="Interflow" />
                <EventDetail icon="calendar" title="Date" data="3/6/23" />
                <EventDetail icon="time" title="Hour" data="10:00 TMZ" />
                <EventDetail icon="coin" title="Price" data="10 Interflows" />
                <EventDetail icon="cash" title="Minimum Holdings" data="10 Flow Tokens" />
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
                    <PrimaryBtnComponent label="START REVEAL" onPress={handlePress} />
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