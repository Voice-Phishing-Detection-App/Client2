import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/Ionicons';
import {BLACK} from '../color';

const IconText = ({text, name, onPress}) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Icon
        style={{marginLeft: 30}}
        name={name ? 'checkmark-circle-outline' : 'ellipse-outline'}
        size={20}
      />
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
