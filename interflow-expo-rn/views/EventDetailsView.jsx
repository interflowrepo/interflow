import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import EventDetail from '../components/events/EventDetailComponent'
import PrimaryBtnComponent from '../components/PrimaryBtnComponent'
import VideoHeaderComponent from '../components/VideoHeaderComponent'

export default function EventDetailsView({navigation}) {
    return (
        <View style={styles.container}>
                  <VideoHeaderComponent uri={"https://res.cloudinary.com/ddbgaessi/video/upload/v1677366436/Screen_Recording_2023-02-25_at_17.05.18_dijtrc.mov"} />

            <EventDetail icon="calendar" title="Date" data="3/6/23" />
            <EventDetail icon="time" title="Hour" data="3/6/23" />
            <EventDetail icon="cash" title="Minimum Holding" data="3/6/23" />
            <EventDetail icon="location" title="Location" data="3/6/23" />
            <PrimaryBtnComponent label="Access Interspace" onPress={
                () => navigation.navigate('Interspace')
            } />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
})