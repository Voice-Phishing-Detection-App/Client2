import {StyleSheet, Text, View} from 'react-native';
import PropTypes from 'prop-types';
import {GRAY} from '../color';

const ReportList = ({list, item}) => {
  return (
    <View style={styles.container}>
      <View style={{flex: 0.4}}>
        <Text style={[styles.text, {color: GRAY}]}>{item && list}</Text>
      </View>
      <View style={{flex: 0.6}}>
        <Text style={styles.text}>{item}</Text>
      </View>
    </View>
  );
};

ReportList.propTypes = {
  list: PropTypes.string,
};

const styles = StyleSheet.create({
  container: {
    flex: 0,
    flexDirection: 'row',
    padding: 30,
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    fontWeight: '600',
  },
});

export default ReportList;
