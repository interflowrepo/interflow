import React, { useState } from 'react';
import { View, Modal, Text, TouchableOpacity , Dimensions} from 'react-native';
import { WebView } from 'react-native-webview';

const WebViewComponent = ({ uri }) => {

  // get the dimensions of the screen
  const { height, width } = Dimensions.get('window');

  return (
    <WebView
      source={{ uri }}
      style={{ flex:1, margin:-10}}
    />
  );
};
const MyModal = () => {
  const [modalVisible, setModalVisible] = useState(true);

  return (
    <View style={{ flex: 1 }}>
      <Modal animationType="slide" transparent={false} visible={modalVisible}>
        <View style={{ marginTop: 22 }}>
          <View>

            <TouchableOpacity
              onPress={() => {
                setModalVisible(!modalVisible);
              }}>
              <Text>Hide Modal</Text>
            </TouchableOpacity>
          </View>

        </View>
        <WebViewComponent uri={"https://interflow-fcl-1.vercel.app/"} />

      </Modal>

      <TouchableOpacity
        onPress={() => {
          setModalVisible(true);
        }}>
        <Text>Show Modal</Text>
      </TouchableOpacity>
    </View>
  );
};

export default MyModal;
