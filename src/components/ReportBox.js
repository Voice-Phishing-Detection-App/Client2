import {StyleSheet, Text, View} from 'react-native';
import PropTypes from 'prop-types';
import {SBTN} from '../color';

const ReportBox = ({text}) => {
  return (
    <View style={styles.box}>
      <Text style={styles.text}>{text}</Text>
    </View>
  );
};

ReportBox.propTypes = {
  text: PropTypes.string,
};

const styles = StyleSheet.create({
  box: {
    justifyContent: 'center',
    width: '100%',
    height: 50,
    backgroundColor: SBTN.DEFAULT,
  },
  text: {
    fontSize: 17,
    fontWeight: '600',
    marginLeft: 30,
  },
});

export default ReportBox;
