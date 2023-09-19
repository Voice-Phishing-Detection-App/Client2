import React, {useState} from 'react';
import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import PropTypes from 'prop-types';
import {WHITE} from '../color';
import Sbtn from './Sbtn';
import Icon from 'react-native-vector-icons/Ionicons';

const AppModal = ({modalVisible, toggleModal}) => {
  return (
    // <View style={styles.container}>
    //   <Text style={styles.title}>My Page</Text>
    //   <Button title="Open Modal" onPress={toggleModal} /> {/* 모달 열기 버튼 */}
    <Modal
      visible={modalVisible} // 모달 가시성 상태 변수를 visible prop으로 전달
      animationType="slide" // 모달 애니메이션 유형
      onRequestClose={toggleModal} // Android에서 하드웨어 뒤로 가기 버튼을 눌렀을 때 모달 닫기
      style={styles.modal}
      transparent={true} // 모달을 투명하게 처리
    >
      <TouchableWithoutFeedback onPress={toggleModal}>
        {/* 모달 외부 터치 처리 */}
        <View style={styles.modalOverlay} />
      </TouchableWithoutFeedback>

      <View style={styles.modalContainer}>
        <View style={styles.x}>
          <Pressable onPress={toggleModal} hitSlop={10}>
            {/* <Feather name="x" size={24} color="black" /> */}
          </Pressable>
        </View>
        <Text style={styles.modalText}>This is a modal!</Text>
        <Sbtn title="변경" onPress={toggleModal} />
        {/* 모달 닫기 버튼 */}
      </View>
    </Modal>
    // </View>
  );
};
AppModal.propTypes = {
  toggleModal: PropTypes.func,
  modalVisible: PropTypes.bool,
};

const styles = StyleSheet.create({
  // container: {
  //   flex: 1,
  //   justifyContent: 'center',
  //   alignItems: 'center',
  // },
  // title: {
  //   fontSize: 24,
  //   fontWeight: 'bold',
  //   marginBottom: 16,
  // },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: WHITE,
    padding: 16,
    // flexDirection:'row'
  },
  modalText: {
    fontSize: 18,
    marginBottom: 16,
  },
  modalOverlay: {
    flex: 2,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // 모달 외부를 어둡게 처리
  },
  x: {
    // justifyContent: 'flex-end',
    position: 'absolute',
    right: 10,
    top: 10,
  },
});

export default AppModal;
