import { CI_COLOR_IDS } from '../../utils/Constants';

// loading background images
import image_bg_black from './bg_black.png';
import image_bg_blue from './bg_blue.png';
import image_bg_green from './bg_green.png';
import image_bg_grey from './bg_grey.png';
import image_bg_orange from './bg_orange.png';
import image_bg_purple from './bg_purple.png';
import image_bg_red_orange_yellow from './bg_red_orange_yellow.png';
import image_bg_red from './bg_red.png';
import image_bg_silver from './bg_silver.png';
import image_bg_white from './bg_white.png';
import image_bg_yellow from './bg_yellow.png';

// loading cover images
import image_cover_lz_1 from './cover_lz_1.png';
import image_cover_lz_2 from './cover_lz_2.png';
import image_cover_lz_3 from './cover_lz_3.png';
import image_cover_lz_4 from './cover_lz_4.png';
import image_cover_lz_5 from './cover_lz_5.png';
import image_cover_lz_6 from './cover_lz_6.png';
import image_cover_lz_7 from './cover_lz_7.png';
import image_cover_lz_8 from './cover_lz_8.png';
import image_cover_lz_9 from './cover_lz_9.png';
import image_cover_lz_11_2 from './cover_lz_11_2.png';
import image_cover_lz_22_4 from './cover_lz_22_4.png';
import image_cover_lz_33_6 from './cover_lz_33_6.png';

// mapping colors to images
export const BACKGROUND_IMAGES = {};
BACKGROUND_IMAGES[CI_COLOR_IDS.BLACK] = image_bg_black;
BACKGROUND_IMAGES[CI_COLOR_IDS.BLUE] = image_bg_blue;
BACKGROUND_IMAGES[CI_COLOR_IDS.GREEN] = image_bg_green;
BACKGROUND_IMAGES[CI_COLOR_IDS.GREY] = image_bg_grey;
BACKGROUND_IMAGES[CI_COLOR_IDS.ORANGE] = image_bg_orange;
BACKGROUND_IMAGES[CI_COLOR_IDS.PURPLE] = image_bg_purple;
BACKGROUND_IMAGES[CI_COLOR_IDS.RED_ORANGE_YELLOW] = image_bg_red_orange_yellow;
BACKGROUND_IMAGES[CI_COLOR_IDS.RED] = image_bg_red;
BACKGROUND_IMAGES[CI_COLOR_IDS.SILVER] = image_bg_silver;
BACKGROUND_IMAGES[CI_COLOR_IDS.WHITE] = image_bg_white;
BACKGROUND_IMAGES[CI_COLOR_IDS.YELLOW] = image_bg_yellow;

console.log('IMAGE!!!!!!!!!!!');
console.log(image_cover_lz_1);
console.log(image_bg_red);

// defining base64 title images ordered by LZ
export const COVER_IMAGE_BY_LZ = {
  '1': image_cover_lz_1,
  '2': image_cover_lz_2,
  '3': image_cover_lz_3,
  '4': image_cover_lz_4,
  '5': image_cover_lz_5,
  '6': image_cover_lz_6,
  '7': image_cover_lz_7,
  '8': image_cover_lz_8,
  '9': image_cover_lz_9,
  '11 / 2': image_cover_lz_11_2,
  '22 / 4': image_cover_lz_22_4,
  '33 / 6': image_cover_lz_33_6,
};