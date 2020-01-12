import { createIconSet } from 'react-native-vector-icons';

const iconMap = require('./iconfont.json');

const IconFont = createIconSet(iconMap, 'iconfont', 'iconfont.ttf');

export default IconFont;
