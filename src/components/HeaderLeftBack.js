import {Pressable} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/Ionicons';

const HeaderLeftBack = ({tintColor}) => {
  const navigation = useNavigation();
  return (
    <Pressable
      onPress={navigation.goBack}
      hitSlop={30}
      style={{marginRight: 20}}>
      <Icon name="chevron-back-outline" size={24} color={tintColor} />
    </Pressable>
  );
};

HeaderLeftBack.propTypes = {
  tintColor: PropTypes.string,
};

export default HeaderLeftBack;
