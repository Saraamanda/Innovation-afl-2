import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Modal } from 'react-native'
import { RFPercentage } from 'react-native-responsive-fontsize';
import * as ImagePicker from 'expo-image-picker';
import { Video, AVPlaybackStatus } from 'expo-av';
import { Entypo } from "@expo/vector-icons";

//components
import Screen from './../components/Screen';
import AppTextInput from './../components/common/AppTextInput';
import BottomTab from '../components/common/BottomTab';

//config
import Colors from './../config/Colors';


function MyPageScreen(props) {
    const [pickedVideo, setVideo] = useState(null);
    const [modelVisible, setmodelVisible] = useState(false)
    const video = useRef(null);
    const [status, setStatus] = useState({});

    const pickVideo = async (pickerType) => {
        await ImagePicker.requestMediaLibraryPermissionsAsync();
        await ImagePicker.requestCameraPermissionsAsync()
        await ImagePicker.getCameraPermissionsAsync()
        let permissionResult = await ImagePicker.getMediaLibraryPermissionsAsync();

        if (permissionResult.granted === false) {
            alert("Permission to access camera roll is required!");
            return;
        }

        let result;

        if (pickerType === "gallery") {
            result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Videos,
                allowsEditing: true,
                aspect: [4, 3],
                quality: 1,
            });
            setmodelVisible(false)
        } else if (pickerType === "camera") {
            result = await ImagePicker.launchCameraAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Videos,
                allowsEditing: true,
                aspect: [4, 3],
                quality: 1,
            });
            setmodelVisible(false)
        }

        console.log(result);

        if (!result.cancelled) {
            setVideo(result);
        }
    };

    const [inputField, setInputFeild] = useState([
        {
            id: 0,
            placeHolder: "Name",
            value: '',
            secure: false,
            icon: "account"
        },
        {
            id: 1,
            placeHolder: "Age",
            value: '',
            secure: false,
            icon: "account-clock"
        },
        {
            id: 2,
            placeHolder: "Status",
            value: '',
            secure: false,
            icon: "ring"
        },
        {
            id: 3,
            placeHolder: "Sex",
            value: '',
            secure: false,
            icon: "gender-male-female"
        },
        {
            id: 4,
            placeHolder: "Prefrences (Place,Sex)",
            value: '',
            secure: false,
            icon: false
        },
    ]);

    const handleChange = (text, id) => {
        const tempFeilds = [...inputField];
        tempFeilds[id].value = text;
        setInputFeild(tempFeilds);
    }

    return (
        <Screen statusBarColor={Colors.white} style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'center', backgroundColor: Colors.white }}>
            <ScrollView showsVerticalScrollIndicator={false} style={{ backgroundColor: Colors.white, flex: 1, width: '100%', marginTop: RFPercentage(1) }} >
                <View style={{ justifyContent: 'center', alignItems: 'center', width: "100%" }}>

                    {/* Top Heading */}
                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ color: Colors.primary, fontSize: RFPercentage(4.2), marginTop: RFPercentage(5) }}>
                            My Page
                        </Text>
                    </View>

                    {/* Adding Video */}
                    {!pickedVideo ?
                        <TouchableOpacity onPress={() => setmodelVisible(true)} style={{ marginTop: RFPercentage(5), width: '70%', backgroundColor: Colors.lightGrey, height: RFPercentage(25), alignItems: 'center', justifyContent: 'center' }}>
                            <Text style={{ color: Colors.grey, fontSize: RFPercentage(2.5) }}>
                                Add Video
                            </Text>
                        </TouchableOpacity>
                        : <View style={{ marginTop: RFPercentage(5), width: '70%', alignItems: 'center', justifyContent: 'center' }}>
                            <View style={{ backgroundColor: Colors.lightGrey, width: "100%", justifyContent: "center", alignItems: "center", height: RFPercentage(25), }} >
                                <Video
                                    ref={video}
                                    style={{ width: '100%', height: '100%' }}
                                    source={pickedVideo}
                                    useNativeControls
                                    resizeMode="contain"
                                    isLooping
                                    onPlaybackStatusUpdate={status => setStatus(() => status)}
                                />
                            </View>
                            <TouchableOpacity onPress={() => setmodelVisible(true)} style={{ borderRadius: RFPercentage(3), padding: RFPercentage(1), marginTop: RFPercentage(2), borderWidth: 1, borderColor: Colors.grey }} ><Text style={{ fontSize: RFPercentage(2.1), color: Colors.grey }} >Uplload again</Text></TouchableOpacity>
                        </View>
                    }



                    {/* input Fields */}
                    <View style={{ justifyContent: 'center', alignItems: 'center', width: '100%' }}>
                        <View style={{ marginBottom: RFPercentage(15), marginTop: RFPercentage(3), width: '90%', justifyContent: 'center', alignItems: 'center' }}>
                            {inputField.map((item, i) =>
                                <View key={i} style={{ marginTop: i == 0 ? RFPercentage(1) : RFPercentage(3), width: "100%" }} >
                                    <Text style={{ marginBottom: RFPercentage(2), color: Colors.black }} >{item.placeHolder}</Text>
                                    <AppTextInput
                                        placeHolder={item.placeHolder}
                                        width="100%"
                                        value={item.value}
                                        onChange={(text) => handleChange(text, item.id)}
                                        secure={item.secure}
                                        icon={item.icon}
                                    />
                                </View>
                            )}
                        </View>
                    </View>
                </View>
            </ScrollView>

            {/* Bottom Tab */}
            <BottomTab props={props} />

            <Modal visible={modelVisible} transparent={true}  >
                <View style={{ width: '100%', justifyContent: "center", alignItems: "center", flex: 1 }}>
                    <View style={{
                        shadowColor: "#000",
                        shadowOffset: {
                            width: 0,
                            height: 2,
                        },
                        shadowOpacity: 0.23,
                        shadowRadius: 2.62,

                        elevation: 4, justifyContent: "space-evenly", alignItems: 'center', width: RFPercentage(40), height: RFPercentage(18), backgroundColor: Colors.white, borderRadius: 15
                    }} >
                        <TouchableOpacity onPress={() => setmodelVisible(false)} >
                            <Entypo size={RFPercentage(3)} name="cross" color={Colors.grey} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => {
                            pickVideo("camera")
                        }} style={{ width: "70%", borderWidth: 1, borderRadius: 10, borderColor: Colors.mediumGrey, height: RFPercentage(5), justifyContent: "center", alignItems: "center" }} >
                            <Text style={{ fontSize: RFPercentage(2.2) }} >Select Camera</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => {
                            pickVideo("gallery")
                        }} style={{ width: "70%", borderWidth: 1, borderRadius: 10, borderColor: Colors.mediumGrey, height: RFPercentage(5), justifyContent: "center", alignItems: "center" }} >
                            <Text style={{ fontSize: RFPercentage(2.2) }} >Select Gallery</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

        </Screen >
    );
}



export default MyPageScreen;