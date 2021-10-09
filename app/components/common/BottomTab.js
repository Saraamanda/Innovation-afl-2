import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

//config
import Colors from '../../config/Colors';

function BottomTab({ props }) {
    return (
        <View style={{ flexDirection: 'row', alignItems: 'center', position: 'absolute', justifyContent: 'center', bottom: 0, width: "100%", height: RFPercentage(7), backgroundColor: Colors.primary }}>
            <View style={{ width: "80%", flexDirection: "row", alignItems: 'center', justifyContent: 'space-between', }} >
                <TouchableOpacity onPress={() => props.navigation.navigate("MyPageScreen")}>
                    <MaterialIcons name="home" size={RFPercentage(4)} color={Colors.white} />
                </TouchableOpacity>
                <TouchableOpacity >
                    <Ionicons name="search" size={RFPercentage(4)} color={Colors.white} />
                </TouchableOpacity>
                <TouchableOpacity  >
                    <Ionicons name="add-circle-sharp" size={RFPercentage(4)} color={Colors.white} />
                </TouchableOpacity>
                <TouchableOpacity  >
                    <MaterialIcons name="map" size={RFPercentage(4)} color={Colors.white} />
                </TouchableOpacity>
            </View>
        </View>
    );
}

export default BottomTab;