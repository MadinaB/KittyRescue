import * as React from 'react';
import {
    View,
    TouchableOpacity,
    Text,
    Dimensions
} from 'react-native';

const GridSelector = ({ size = "Normal" , push, thumbnail, title, marginRight = false }) => {
    const { height } = Dimensions.get('window');
    const ratio = 2.5;

    return (
        <View style={{ 
            flex: 1,
            marginTop: 15,
            margin: 5,
            marginRight: marginRight ? 0 : 5,
        }}>
            <TouchableOpacity
                style={{
                    padding: 10,
                    borderRadius: 5,
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 3 },
                    shadowOpacity: 1.0,
                    shadowRadius: 5,
                    elevation: 2,
                    height: height/ratio
                }}
                onPress={push}
            >
                <View style={{ 
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: "#fff",
                }}>
                    <Text>{thumbnail}</Text>
                </View>
                <View style={{
                    flex: 1, 
                    justifyContent: 'center'
                }}>
                    <Text
                        style={{
                            textAlign: 'center',
                            color: '#fff',
                            fontWeight: 'bold',
                            fontSize: 20
                        }}
                    >
                        {title}
                    </Text>
                    <Text style={{textAlign: 'center'}}>{size}</Text>
                </View>
            </TouchableOpacity>
        </View>
    );
};

export default GridSelector;