import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import PropTypes from 'prop-types';
// import { Feather } from '@expo/vector-icons';/
import {BLACK} from '../color';

const IconText = ({text, name, onPress}) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      {/* <Feather
        style={{marginLeft: 30}}
        name={name ? 'check-circle' : 'circle'}
        size={20}
      /> */}
      <Text style={styles.bottomText}>{text}</Text>
    </TouchableOpacity>
  );
};

IconText.propTypes = {
  text: PropTypes.string,
  name: PropTypes.bool,
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  bottomText: {
    color: BLACK,
    fontSize: 20,
    fontWeight: '500',
    marginLeft: 10,
  },
});

export default IconText;
