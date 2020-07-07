import {Dimensions, PixelRatio} from 'react-native';

class Responsive {
  constructor() {
    this.WIDTH = 414; //iPhone 11 Pro Max.
    this.HEIGHT = 896; //iPhone 11 Pro Max.
  }

  calcHeight(size) {
    var {height} = Dimensions.get('window');
    var percentage = (size / this.HEIGHT) * 100;
    var calculations = (percentage * height) / 100;
    return PixelRatio.roundToNearestPixel(calculations);
  }

  calcWidth(size) {
    var {width} = Dimensions.get('window');
    var percentage = (size / this.WIDTH) * 100;
    var calculations = (percentage * width) / 100;
    return PixelRatio.roundToNearestPixel(calculations);
  }

  calcFont(size) {
    return this.calcWidth(size);
  }
}

export default new Responsive();
