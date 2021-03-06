import React, { useState, useEffect } from 'react';
import { StatusBar, StyleSheet, Text, View, TouchableOpacity, Animated, ScrollView, Dimensions, Image, Platform } from 'react-native';
import { RFPercentage } from 'react-native-responsive-fontsize';

// components
import Login from './Login';
import SignUp from './SignUp';

// config
import Colors from "../../config/Colors"


const { width } = Dimensions.get("window");

function LoginScreen(props) {

    const [initialComponent, setinitialComponent] = useState(0);
    const [active, setActive] = useState(0);
    const [xTabOne, setXTabOne] = useState(0);
    const [xTabTwo, setXTabTwo] = useState(0);
    const [translateX, setTranslateX] = useState(new Animated.Value(0));
    const [translateXTabOne, setTranslateXTabOne] = useState(new Animated.Value(0));
    const [translateXTabTwo, setTranslateXTabTwo] = useState(new Animated.Value(width));
    const [translateY, setTranslateY] = useState(-1000);

    const handleSlide = type => {
        setinitialComponent(initialComponent + 1)
        Animated.spring(translateX, {
            toValue: type,
            duration: 100,
            useNativeDriver: true
        }).start();
        if (active === 0) {
            Animated.parallel([
                Animated.spring(translateXTabOne, {
                    toValue: 0,
                    duration: 100,
                    useNativeDriver: true
                }).start(),
                Animated.spring(translateXTabTwo, {
                    toValue: width,
                    duration: 100,
                    useNativeDriver: true
                }).start()
            ]);
        } else {
            Animated.parallel([
                Animated.spring(translateXTabOne, {
                    toValue: -width,
                    duration: 100,
                    useNativeDriver: true
                }).start(),
                Animated.spring(translateXTabTwo, {
                    toValue: 0,
                    duration: 100,
                    useNativeDriver: true
                }).start()
            ]);
        }
    };

    return (
        <View style={styles.container}>

            <StatusBar style="light" barStyle="light-content" translucent={true} backgroundColor={Colors.primary} />
            {/* Wecome Text */}
            <View style={{ backgroundColor: Colors.primary, width: "100%", flex: 0.78, flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }} >
                <Text style={{ color: Colors.white, fontSize: RFPercentage(3.6) }}>
                    Welcome To Roomy
                </Text>
            </View>

            {/* Bottom Contaienr */}
            <View style={{ marginTop: -RFPercentage(4), borderTopRightRadius: RFPercentage(4), borderTopLeftRadius: RFPercentage(4), backgroundColor: Colors.white, width: "100%", flex: 2, flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }} >
                <View style={{ width: "100%", justifyContent: 'flex-start', flex: 1, justifyContent: 'center', alignItems: "center" }}>
                    <ScrollView showsVerticalScrollIndicator={false} style={{ width: "100%" }} >
                        {/* Tabs */}
                        <View style={{ borderRadius: RFPercentage(10), padding: 3, backgroundColor: Colors.primaryLight2, marginLeft: "15%", width: "70%", flexDirection: "row", height: RFPercentage(6.8), marginTop: RFPercentage(6), justifyContent: "center", alignItems: "center" }}>
                            <Animated.View style={{ justifyContent: "center", alignItems: "center", position: "absolute", width: "50%", height: "90%", top: 5, left: active === 0 ? 5 : -5, bottom: 5, backgroundColor: Colors.primary, borderRadius: RFPercentage(10), transform: [{ translateX }] }} />
                            <TouchableOpacity style={{ flex: 1, justifyContent: "center", alignItems: "center", borderRadius: RFPercentage(10) }}
                                onLayout={event => setXTabOne(event.nativeEvent.layout.x)} onPress={() => { setActive(0); handleSlide(xTabOne) }}
                            >
                                <Text style={{ fontSize: RFPercentage(2.2), color: Colors.white }}>
                                    Login
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{ flex: 1, justifyContent: "center", alignItems: "center", borderRadius: RFPercentage(10) }}
                                onLayout={event => { setXTabTwo(event.nativeEvent.layout.x) }} onPress={() => { setActive(1); handleSlide(xTabTwo) }}
                            >
                                <Text style={{ fontSize: RFPercentage(2.2), color: Colors.white }}>
                                    Sign Up
                                </Text>
                            </TouchableOpacity>
                        </View>

                        {/* Login and Sign Up Container */}
                        <View style={{ marginTop: RFPercentage(4) }} >
                            <Animated.View style={{ justifyContent: "center", alignItems: "center", transform: [{ translateX: translateXTabOne }] }} onLayout={event => setTranslateY(event.nativeEvent.layout.height)}>
                                {initialComponent === 0 ? <Login {...props} /> : <SignUp onPressHandle={() => { setActive(0); handleSlide(xTabOne) }}  {...props} />}
                            </Animated.View>

                            <Animated.View style={{ marginTop: RFPercentage(-24), justifyContent: "center", alignItems: "center", transform: [{ translateX: translateXTabTwo }, { translateY: -translateY / 2 }] }}>
                                <Login {...props} />
                            </Animated.View>
                        </View>
                    </ScrollView>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        // marginTop: Constants.statusBarHeight,
        flex: 1,
        backgroundColor: Colors.white,
        alignItems: 'center',
        justifyContent: 'center',
        width: "100%"
    }
})

export default LoginScreen;