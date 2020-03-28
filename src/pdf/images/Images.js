import { CI_COLOR_IDS } from "../../utils/Constants";

// loading background images
import image_bg_black from "./bg_black.png";
import image_bg_grey from "./bg_grey.png";
import image_bg_orange from "./bg_orange.png";
import image_bg_red from "./bg_red.png";
import image_bg_white from "./bg_white.png";
import image_bg_yellow from "./bg_yellow.png";
import image_bg_blue from "./bg_blue.png";
import bunt_1 from "./bunt_1.png";
import bunt_3 from "./bunt_3.png";
import green_2 from "./green_2.png";
import green_1 from "./green_1.png";
import blue_3 from "./blue_3.png";
import purple_4 from "./purple_4.png";
import purple_2 from "./purple_2.png";
import silver_5 from "./silver_5.png";
import silver_4 from "./silver_4.png";

// loading cover images
import image_cover_lz_1 from "./cover_lz_1.png";
import image_cover_lz_2 from "./cover_lz_2.png";
import image_cover_lz_3 from "./cover_lz_3.png";
import image_cover_lz_4 from "./cover_lz_4.png";
import image_cover_lz_5 from "./cover_lz_5.png";
import image_cover_lz_6 from "./cover_lz_6.png";
import image_cover_lz_7 from "./cover_lz_7.png";
import image_cover_lz_8 from "./cover_lz_8.png";
import image_cover_lz_9 from "./cover_lz_9.png";
import image_cover_lz_11_2 from "./cover_lz_11_2.png";
import image_cover_lz_22_4 from "./cover_lz_22_4.png";
import image_cover_lz_33_6 from "./cover_lz_33_6.png";

// loading book covers
import book_cover_1 from "./Numerologie-Band-1_Cover.png";
import book_cover_2 from "./Numerologie-Band-2_Cover.png";

export const BOOK_COVER = {
  1: book_cover_1,
  2: book_cover_2
};

// mapping colors to images
export const BACKGROUND_IMAGES_STANDARD = {};
BACKGROUND_IMAGES_STANDARD[CI_COLOR_IDS.BLACK] = image_bg_black;
BACKGROUND_IMAGES_STANDARD[CI_COLOR_IDS.GREY] = image_bg_grey;
BACKGROUND_IMAGES_STANDARD[CI_COLOR_IDS.ORANGE] = image_bg_orange;
BACKGROUND_IMAGES_STANDARD[CI_COLOR_IDS.RED_ORANGE_YELLOW] = bunt_3;
BACKGROUND_IMAGES_STANDARD[CI_COLOR_IDS.RED] = image_bg_red;
BACKGROUND_IMAGES_STANDARD[CI_COLOR_IDS.WHITE] = image_bg_white;
BACKGROUND_IMAGES_STANDARD[CI_COLOR_IDS.YELLOW] = image_bg_yellow;
BACKGROUND_IMAGES_STANDARD[CI_COLOR_IDS.GREEN] = green_1;
BACKGROUND_IMAGES_STANDARD[CI_COLOR_IDS.BLUE] = image_bg_blue;
BACKGROUND_IMAGES_STANDARD[CI_COLOR_IDS.PURPLE] = purple_2;
BACKGROUND_IMAGES_STANDARD[CI_COLOR_IDS.SILVER] = silver_4;

export const BACKGROUND_IMAGES_ADVANCED = {};
BACKGROUND_IMAGES_ADVANCED[CI_COLOR_IDS.BLACK] = image_bg_black;
BACKGROUND_IMAGES_ADVANCED[CI_COLOR_IDS.GREY] = image_bg_grey;
BACKGROUND_IMAGES_ADVANCED[CI_COLOR_IDS.ORANGE] = image_bg_orange;
BACKGROUND_IMAGES_ADVANCED[CI_COLOR_IDS.RED_ORANGE_YELLOW] = bunt_1;
BACKGROUND_IMAGES_ADVANCED[CI_COLOR_IDS.RED] = image_bg_red;
BACKGROUND_IMAGES_ADVANCED[CI_COLOR_IDS.WHITE] = image_bg_white;
BACKGROUND_IMAGES_ADVANCED[CI_COLOR_IDS.YELLOW] = image_bg_yellow;
BACKGROUND_IMAGES_ADVANCED[CI_COLOR_IDS.GREEN] = green_2;
BACKGROUND_IMAGES_ADVANCED[CI_COLOR_IDS.BLUE] = blue_3;
BACKGROUND_IMAGES_ADVANCED[CI_COLOR_IDS.PURPLE] = purple_4;
BACKGROUND_IMAGES_ADVANCED[CI_COLOR_IDS.SILVER] = silver_5;

// defining base64 title images ordered by LZ
export const COVER_IMAGE_BY_LZ = {
  "1": image_cover_lz_1,
  "2": image_cover_lz_2,
  "3": image_cover_lz_3,
  "4": image_cover_lz_4,
  "5": image_cover_lz_5,
  "6": image_cover_lz_6,
  "7": image_cover_lz_7,
  "8": image_cover_lz_8,
  "9": image_cover_lz_9,
  "11 / 2": image_cover_lz_11_2,
  "22 / 4": image_cover_lz_22_4,
  "33 / 6": image_cover_lz_33_6
};
