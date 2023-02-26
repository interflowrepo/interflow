import React from 'react';
import { TouchableOpacity, ImageBackground, Text, Image, StyleSheet, View } from 'react-native';

const PurchaseBtnComponent = ({ quantity, price, color, width }) => {

    const styles = StyleSheet.create({
        container: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingRight: 26,
            paddingVertical: 0,
            borderRadius: 50,
            overflow: 'hidden',
            elevation: 1,
            marginVertical: 8,
            width
        },
        imageContainer: {
            borderWidth: 2,
            borderRadius: 50,
            padding: 8,
            marginRight: 8,
        },
        image: {
            width: 32,
            height: 32,
            resizeMode: 'contain',
        },
        quantity: {
            marginLeft: 4,
            fontWeight: 'bold',
            fontSize: 20,
            color: '#fff',
        },
        priceContainer: {
            flex: 1,
            alignItems: 'flex-end',
            
        },
        price: {
            fontWeight: 'light',
            fontSize: 20,
            color: '#fff',
        },
        divider: {
            height: '100%',
            width: 1,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          },
        
    });
    return (
        <TouchableOpacity activeOpacity={0.8}>
            <ImageBackground source={require("../assets/avatar/bg(1).png")}
                style={styles.container}>
                <View style={[styles.imageContainer, { borderColor: color }]}>
                    <Image source={{
                        uri: "https://res.cloudinary.com/ddbgaessi/image/upload/v1677272668/logo_kkdwhj.png"
                    }} style={styles.image} />
                </View>

                <Text style={styles.quantity}>{quantity}</Text>
                <View style={styles.priceContainer}>
                    <View style={styles.priceDivider} />
                    <Text style={styles.price}>{`$${price}`}</Text>
                </View>
            </ImageBackground>
        </TouchableOpacity>
    );
};



export default PurchaseBtnComponent;
