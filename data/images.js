/**
 * Images for the conflict pages (js/conflict-images.js), keyed by conflict id
 * (must match data/conflicts.js; checked by scripts/check-consistency.mjs).
 * All files are from Wikimedia Commons (public domain, CC0, CC BY or CC BY-SA).
 * author, license, licenseUrl, page and thumb come from the Commons API
 * (imageinfo + extmetadata) and must be taken from there, not from memory.
 * thumb: ~800px thumbnail on upload.wikimedia.org; page: Commons file page.
 * Captions are neutral descriptions of what is shown, not claims about the conflict.
 * A conflict with no entry simply shows no gallery.
 */
const CONFLICT_IMAGES = {
  "gaza": [
    {
      "thumb": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3b/Humanitarian_aid_provides_relief_in_Gaza_%288196886%29.jpg/960px-Humanitarian_aid_provides_relief_in_Gaza_%288196886%29.jpg",
      "page": "https://commons.wikimedia.org/wiki/File:Humanitarian_aid_provides_relief_in_Gaza_(8196886).jpg",
      "caption": "Humanitarian supplies being delivered to Gaza, 24 December 2023.",
      "author": "U.S. Army USASAC",
      "license": "Public domain"
    },
    {
      "thumb": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0a/A_girl_walks_inside_Gaza_during_the_Gaza-Israel_war_to_get_food.png/960px-A_girl_walks_inside_Gaza_during_the_Gaza-Israel_war_to_get_food.png",
      "page": "https://commons.wikimedia.org/wiki/File:A_girl_walks_inside_Gaza_during_the_Gaza-Israel_war_to_get_food.png",
      "caption": "A girl walking in Gaza to get food during the war (photo dated August 2024).",
      "author": "Jaber Jehad Badwan",
      "license": "CC BY-SA 4.0",
      "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0"
    }
  ],
  "russia-ukraine": [
    {
      "thumb": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/42/2017_-_%D0%9A%D0%B8%D1%97%D0%B2_-_%D0%A1%D0%B2%D1%96%D1%82%D0%B0%D0%BD%D0%BE%D0%BA_%D0%BD%D0%B0%D0%B4_%D0%94%D0%BD%D1%96%D0%BF%D1%80%D0%BE%D0%BC.jpg/960px-2017_-_%D0%9A%D0%B8%D1%97%D0%B2_-_%D0%A1%D0%B2%D1%96%D1%82%D0%B0%D0%BD%D0%BE%D0%BA_%D0%BD%D0%B0%D0%B4_%D0%94%D0%BD%D1%96%D0%BF%D1%80%D0%BE%D0%BC.jpg",
      "page": "https://commons.wikimedia.org/wiki/File:2017_-_%D0%9A%D0%B8%D1%97%D0%B2_-_%D0%A1%D0%B2%D1%96%D1%82%D0%B0%D0%BD%D0%BE%D0%BA_%D0%BD%D0%B0%D0%B4_%D0%94%D0%BD%D1%96%D0%BF%D1%80%D0%BE%D0%BC.jpg",
      "caption": "Dawn in Kyiv with the Parkovyi footbridge over the Dnieper, 2017.",
      "author": "Moahim",
      "license": "CC BY-SA 4.0",
      "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0"
    },
    {
      "thumb": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/80-391-9014_Kyiv_Sofia_2_RB_24.jpg/960px-80-391-9014_Kyiv_Sofia_2_RB_24.jpg",
      "page": "https://commons.wikimedia.org/wiki/File:80-391-9014_Kyiv_Sofia_2_RB_24.jpg",
      "caption": "St Sophia Cathedral complex in Kyiv, a UNESCO World Heritage Site.",
      "author": "Rbrechko",
      "license": "CC BY-SA 4.0",
      "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0"
    }
  ],
  "sudan": [
    {
      "thumb": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Sudan._Khartoum._Meeting_of_White_and_Blue_Nile_LOC_matpc.17288.jpg/960px-Sudan._Khartoum._Meeting_of_White_and_Blue_Nile_LOC_matpc.17288.jpg",
      "page": "https://commons.wikimedia.org/wiki/File:Sudan._Khartoum._Meeting_of_White_and_Blue_Nile_LOC_matpc.17288.jpg",
      "caption": "The meeting of the White and Blue Nile at Khartoum (historical photograph, Matson Collection).",
      "author": "Matson Collection",
      "license": "Public domain"
    },
    {
      "thumb": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/14/Khartoum_Market%2C_Sudan.jpg/960px-Khartoum_Market%2C_Sudan.jpg",
      "page": "https://commons.wikimedia.org/wiki/File:Khartoum_Market,_Sudan.jpg",
      "caption": "A market in Khartoum, Sudan (photo dated April 2020).",
      "author": "Dr. Ondřej Havelka (cestovatel)",
      "license": "CC BY-SA 4.0",
      "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0"
    }
  ],
  "xinjiang": [
    {
      "thumb": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1d/Xinjiang_landscape_near_Urumqi_%281%29.jpg/960px-Xinjiang_landscape_near_Urumqi_%281%29.jpg",
      "page": "https://commons.wikimedia.org/wiki/File:Xinjiang_landscape_near_Urumqi_(1).jpg",
      "caption": "Landscape near Urumqi, Xinjiang.",
      "author": "Radosław Botev",
      "license": "CC BY 3.0 pl",
      "licenseUrl": "https://creativecommons.org/licenses/by/3.0/pl/deed.en"
    },
    {
      "thumb": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Kashgar_Old_City_%28crop%29.jpg/960px-Kashgar_Old_City_%28crop%29.jpg",
      "page": "https://commons.wikimedia.org/wiki/File:Kashgar_Old_City_(crop).jpg",
      "caption": "The old city of Kashgar, Xinjiang.",
      "author": "Radosław Botev",
      "license": "CC BY 3.0 pl",
      "licenseUrl": "https://creativecommons.org/licenses/by/3.0/pl/deed.en"
    }
  ],
  "myanmar": [
    {
      "thumb": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bd/20160813_-_Shwedagon_Pagoda_in_Yangon%2C_Myanmar_-_9998.jpg/960px-20160813_-_Shwedagon_Pagoda_in_Yangon%2C_Myanmar_-_9998.jpg",
      "page": "https://commons.wikimedia.org/wiki/File:20160813_-_Shwedagon_Pagoda_in_Yangon,_Myanmar_-_9998.jpg",
      "caption": "A guardian figure at Shwedagon Pagoda, Yangon, 2016.",
      "author": "Jakub Hałun",
      "license": "CC BY-SA 4.0",
      "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0"
    },
    {
      "thumb": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/Yangon%2C_Downtown_city%2C_Myanmar.jpg/960px-Yangon%2C_Downtown_city%2C_Myanmar.jpg",
      "page": "https://commons.wikimedia.org/wiki/File:Yangon,_Downtown_city,_Myanmar.jpg",
      "caption": "Downtown Yangon, Myanmar.",
      "author": "Vyacheslav Argenberg",
      "license": "CC BY 4.0",
      "licenseUrl": "https://creativecommons.org/licenses/by/4.0"
    }
  ],
  "drc": [
    {
      "thumb": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/2015_Goma_%26_volcano_Nyiragongo_in_background_-_North_Kivu_%2820875766889%29.jpg/960px-2015_Goma_%26_volcano_Nyiragongo_in_background_-_North_Kivu_%2820875766889%29.jpg",
      "page": "https://commons.wikimedia.org/wiki/File:2015_Goma_%26_volcano_Nyiragongo_in_background_-_North_Kivu_(20875766889).jpg",
      "caption": "Goma, North Kivu, with the Nyiragongo volcano in the background (2015).",
      "author": "MONUSCO Photos",
      "license": "CC BY-SA 2.0",
      "licenseUrl": "https://creativecommons.org/licenses/by-sa/2.0"
    },
    {
      "thumb": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a1/Sunset_on_Lake_Kivu%2C_Goma%2C_DRC_-_panoramio.jpg/960px-Sunset_on_Lake_Kivu%2C_Goma%2C_DRC_-_panoramio.jpg",
      "page": "https://commons.wikimedia.org/wiki/File:Sunset_on_Lake_Kivu,_Goma,_DRC_-_panoramio.jpg",
      "caption": "Sunset on Lake Kivu at Goma.",
      "author": "Michael Walsh",
      "license": "CC BY 3.0",
      "licenseUrl": "https://creativecommons.org/licenses/by/3.0"
    }
  ],
  "yemen": [
    {
      "thumb": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/Old_Sanaa%2C_Yemen_%289815013485%29.jpg/960px-Old_Sanaa%2C_Yemen_%289815013485%29.jpg",
      "page": "https://commons.wikimedia.org/wiki/File:Old_Sanaa,_Yemen_(9815013485).jpg",
      "caption": "The old city of Sana'a, Yemen.",
      "author": "Rod Waddington from Kergunyah, Australia",
      "license": "CC BY-SA 2.0",
      "licenseUrl": "https://creativecommons.org/licenses/by-sa/2.0"
    },
    {
      "thumb": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b4/Sanaa_Yemen_2013_old_city_001.jpg/960px-Sanaa_Yemen_2013_old_city_001.jpg",
      "page": "https://commons.wikimedia.org/wiki/File:Sanaa_Yemen_2013_old_city_001.jpg",
      "caption": "Sana'a old city, 2013.",
      "author": "Rod Waddington",
      "license": "CC BY-SA 2.0",
      "licenseUrl": "https://creativecommons.org/licenses/by-sa/2.0"
    }
  ],
  "sahel": [
    {
      "thumb": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Djinguereber_Mosque.jpg/960px-Djinguereber_Mosque.jpg",
      "page": "https://commons.wikimedia.org/wiki/File:Djinguereber_Mosque.jpg",
      "caption": "Djinguereber Mosque, Timbuktu, Mali.",
      "author": "Dr. Ondřej Havelka (cestovatel)",
      "license": "CC BY-SA 4.0",
      "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0"
    },
    {
      "thumb": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3d/Timbuktu%2C_Mali_%28ASTER%29.jpg/960px-Timbuktu%2C_Mali_%28ASTER%29.jpg",
      "page": "https://commons.wikimedia.org/wiki/File:Timbuktu,_Mali_(ASTER).jpg",
      "caption": "Satellite image of Timbuktu, Mali (ASTER).",
      "author": "NASA/METI/AIST/Japan Space Systems, and U.S./Japan ASTER Science Team",
      "license": "Public domain"
    }
  ],
  "somalia": [
    {
      "thumb": "https://upload.wikimedia.org/wikipedia/commons/5/5a/Mogadishu%2C_Somalia.JPG",
      "page": "https://commons.wikimedia.org/wiki/File:Mogadishu,_Somalia.JPG",
      "caption": "Mogadishu seen from the International Space Station.",
      "author": "NASA Astronauts",
      "license": "Public domain"
    },
    {
      "thumb": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/62/Mogadishu%2C_Somalia_water.jpg/960px-Mogadishu%2C_Somalia_water.jpg",
      "page": "https://commons.wikimedia.org/wiki/File:Mogadishu,_Somalia_water.jpg",
      "caption": "Mogadishu in a Sentinel-2 satellite image (2020).",
      "author": "SentinelHub",
      "license": "CC BY 2.0",
      "licenseUrl": "https://creativecommons.org/licenses/by/2.0"
    }
  ],
  "ethiopia": [
    {
      "thumb": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/62/Tigray_Village%2C_Ethiopia.jpg/960px-Tigray_Village%2C_Ethiopia.jpg",
      "page": "https://commons.wikimedia.org/wiki/File:Tigray_Village,_Ethiopia.jpg",
      "caption": "A village in Tigray, Ethiopia.",
      "author": "Rod Waddington",
      "license": "CC BY-SA 2.0",
      "licenseUrl": "https://creativecommons.org/licenses/by-sa/2.0"
    },
    {
      "thumb": "https://upload.wikimedia.org/wikipedia/commons/3/30/Abuna_Yemata_Guh%2C_Tigray_Region%2C_Ethiopia.jpg",
      "page": "https://commons.wikimedia.org/wiki/File:Abuna_Yemata_Guh,_Tigray_Region,_Ethiopia.jpg",
      "caption": "Abuna Yemata Guh rock-hewn church, Tigray.",
      "author": "Barrowbob",
      "license": "CC BY-SA 4.0",
      "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0"
    }
  ],
  "syria": [
    {
      "thumb": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Damascus%2C_Syria%2C_Panoramic_view_of_Damascus.jpg/960px-Damascus%2C_Syria%2C_Panoramic_view_of_Damascus.jpg",
      "page": "https://commons.wikimedia.org/wiki/File:Damascus,_Syria,_Panoramic_view_of_Damascus.jpg",
      "caption": "Panoramic view of Damascus.",
      "author": "Vyacheslav Argenberg",
      "license": "CC BY 4.0",
      "licenseUrl": "https://creativecommons.org/licenses/by/4.0"
    },
    {
      "thumb": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/Umayyad_Mosque%2C_Damascus.jpg/960px-Umayyad_Mosque%2C_Damascus.jpg",
      "page": "https://commons.wikimedia.org/wiki/File:Umayyad_Mosque,_Damascus.jpg",
      "caption": "The Umayyad Mosque, Damascus.",
      "author": "Bernard Gagnon",
      "license": "CC BY-SA 3.0",
      "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0"
    }
  ],
  "lebanon-israel": [
    {
      "thumb": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Pigeon_Rocks_of_Beirut%2C_Rock_of_Raouche%2C_Beirut%2C_Lebanon.jpg/960px-Pigeon_Rocks_of_Beirut%2C_Rock_of_Raouche%2C_Beirut%2C_Lebanon.jpg",
      "page": "https://commons.wikimedia.org/wiki/File:Pigeon_Rocks_of_Beirut,_Rock_of_Raouche,_Beirut,_Lebanon.jpg",
      "caption": "The Pigeon Rocks at Raouche, Beirut.",
      "author": "Vyacheslav Argenberg",
      "license": "CC BY 4.0",
      "licenseUrl": "https://creativecommons.org/licenses/by/4.0"
    },
    {
      "thumb": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/Beirut_skyline%2C_Beirut%2C_Lebanon.jpg/960px-Beirut_skyline%2C_Beirut%2C_Lebanon.jpg",
      "page": "https://commons.wikimedia.org/wiki/File:Beirut_skyline,_Beirut,_Lebanon.jpg",
      "caption": "View west from the port area, Beirut, 2008.",
      "author": "Vyacheslav Argenberg",
      "license": "CC BY 4.0",
      "licenseUrl": "https://creativecommons.org/licenses/by/4.0"
    }
  ],
  "haiti": [
    {
      "thumb": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/Commune_of_Port-au-Prince%2C_Haiti.jpg/960px-Commune_of_Port-au-Prince%2C_Haiti.jpg",
      "page": "https://commons.wikimedia.org/wiki/File:Commune_of_Port-au-Prince,_Haiti.jpg",
      "caption": "Port-au-Prince, the capital of Haiti, in a NASA photograph.",
      "author": "NASA",
      "license": "Public domain"
    },
    {
      "thumb": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/Port-au-Prince_Haiti_2008.JPG/960px-Port-au-Prince_Haiti_2008.JPG",
      "page": "https://commons.wikimedia.org/wiki/File:Port-au-Prince_Haiti_2008.JPG",
      "caption": "Aerial view of Port-au-Prince from the MINUSTAH headquarters, 2008.",
      "author": "U.S. Navy photo by Chief Mass Communication Specialist James G. Pinsky",
      "license": "Public domain"
    }
  ],
  "taiwan-strait": [
    {
      "thumb": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/The_Taiwan_Strait_separates_China%27s_southeast_coast_from_Taiwan_%28iss072e435710%29.jpg/960px-The_Taiwan_Strait_separates_China%27s_southeast_coast_from_Taiwan_%28iss072e435710%29.jpg",
      "page": "https://commons.wikimedia.org/wiki/File:The_Taiwan_Strait_separates_China%27s_southeast_coast_from_Taiwan_(iss072e435710).jpg",
      "caption": "The Taiwan Strait, between China's south-east coast and Taiwan, seen from the International Space Station.",
      "author": "NASA Johnson Space Center",
      "license": "Public domain"
    },
    {
      "thumb": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b0/Xiamen_Island%2C_Lieyu_Island_and_Kinmen_Island.jpg/960px-Xiamen_Island%2C_Lieyu_Island_and_Kinmen_Island.jpg",
      "page": "https://commons.wikimedia.org/wiki/File:Xiamen_Island,_Lieyu_Island_and_Kinmen_Island.jpg",
      "caption": "Aerial view of Xiamen Island, Lieyu Island and Kinmen Island.",
      "author": "BreakdownDiode",
      "license": "CC BY-SA 3.0",
      "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0"
    }
  ],
  "korea": [
    {
      "thumb": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/Flag_of_the_DPRK_at_Panmunjom_Joint_Security_Area_%2813952141430%29.jpg/960px-Flag_of_the_DPRK_at_Panmunjom_Joint_Security_Area_%2813952141430%29.jpg",
      "page": "https://commons.wikimedia.org/wiki/File:Flag_of_the_DPRK_at_Panmunjom_Joint_Security_Area_(13952141430).jpg",
      "caption": "The North Korean flag at the Joint Security Area, Panmunjom.",
      "author": "Clay Gilliland",
      "license": "CC BY-SA 2.0",
      "licenseUrl": "https://creativecommons.org/licenses/by-sa/2.0"
    },
    {
      "thumb": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Swedish_Delegation_Visits_the_Joint_Security_Area_at_Panmunjom_%289365289%29.jpg/960px-Swedish_Delegation_Visits_the_Joint_Security_Area_at_Panmunjom_%289365289%29.jpg",
      "page": "https://commons.wikimedia.org/wiki/File:Swedish_Delegation_Visits_the_Joint_Security_Area_at_Panmunjom_(9365289).jpg",
      "caption": "The Joint Security Area in the Korean Demilitarized Zone during a visit by a Swedish delegation, 2025.",
      "author": "U.S. Army photo by Cpl. Joseph Liggio",
      "license": "Public domain"
    }
  ],
  "kashmir": [
    {
      "thumb": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/17/Dal_Lake%2C_Srinagar%2C_Jammu_and_Kashmir.jpg/960px-Dal_Lake%2C_Srinagar%2C_Jammu_and_Kashmir.jpg",
      "page": "https://commons.wikimedia.org/wiki/File:Dal_Lake,_Srinagar,_Jammu_and_Kashmir.jpg",
      "caption": "Houseboats on Dal Lake, Srinagar.",
      "author": "Dashrathgoyal85",
      "license": "CC BY-SA 4.0",
      "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0"
    }
  ],
  "armenia-azerbaijan": [
    {
      "thumb": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/2014_Stepanakert%2C_Widok_na_g%C3%B3ry_i_drog%C4%99_do_miasta.jpg/960px-2014_Stepanakert%2C_Widok_na_g%C3%B3ry_i_drog%C4%99_do_miasta.jpg",
      "page": "https://commons.wikimedia.org/wiki/File:2014_Stepanakert,_Widok_na_g%C3%B3ry_i_drog%C4%99_do_miasta.jpg",
      "caption": "Mountains and the road to Stepanakert (Khankendi), 2014.",
      "author": "Marcin Konsek",
      "license": "CC BY-SA 4.0",
      "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0"
    },
    {
      "thumb": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/02/Stepanakert%2C_Nagorno_Karabakh_%2826814296341%29.jpg/960px-Stepanakert%2C_Nagorno_Karabakh_%2826814296341%29.jpg",
      "page": "https://commons.wikimedia.org/wiki/File:Stepanakert,_Nagorno_Karabakh_(26814296341).jpg",
      "caption": "Stepanakert (Khankendi), Nagorno-Karabakh.",
      "author": "Clay Gilliland from Chandler, U.S.A.",
      "license": "CC BY-SA 2.0",
      "licenseUrl": "https://creativecommons.org/licenses/by-sa/2.0"
    }
  ],
  "iran-israel": [
    {
      "thumb": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/2018-09-26_Iran%2C_Tehran%2C_Azadi_Tower_%281%29.jpg/960px-2018-09-26_Iran%2C_Tehran%2C_Azadi_Tower_%281%29.jpg",
      "page": "https://commons.wikimedia.org/wiki/File:2018-09-26_Iran,_Tehran,_Azadi_Tower_(1).jpg",
      "caption": "The Azadi Tower, Tehran (2018).",
      "author": "Laurens R. Krol",
      "license": "CC BY 4.0",
      "licenseUrl": "https://creativecommons.org/licenses/by/4.0"
    },
    {
      "thumb": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Tehran_in_a_clean_day.jpg/960px-Tehran_in_a_clean_day.jpg",
      "page": "https://commons.wikimedia.org/wiki/File:Tehran_in_a_clean_day.jpg",
      "caption": "A panorama of northern Tehran after rain, 2019.",
      "author": "Amir Pashaei",
      "license": "CC BY-SA 4.0",
      "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0"
    }
  ],
  "south-china-sea": [
    {
      "thumb": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/ISS047-E-2338_-_View_of_South_China_Sea.jpg/960px-ISS047-E-2338_-_View_of_South_China_Sea.jpg",
      "page": "https://commons.wikimedia.org/wiki/File:ISS047-E-2338_-_View_of_South_China_Sea.jpg",
      "caption": "The South China Sea seen from the International Space Station.",
      "author": "Earth Science and Remote Sensing Unit , Lyndon B. Johnson Space Center",
      "license": "Public domain"
    },
    {
      "thumb": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/25/Ladd_Reef%2C_Spratly_Islands.jpg/960px-Ladd_Reef%2C_Spratly_Islands.jpg",
      "page": "https://commons.wikimedia.org/wiki/File:Ladd_Reef,_Spratly_Islands.jpg",
      "caption": "Ladd Reef, Spratly Islands (NASA and USGS).",
      "author": "NASA and USGS",
      "license": "Public domain"
    }
  ],
  "venezuela": [
    {
      "thumb": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Vista_Panor%C3%A1mica_de_La_Ciudad_de_Caracas_desde_El_Paseo_el_Avila.jpg/960px-Vista_Panor%C3%A1mica_de_La_Ciudad_de_Caracas_desde_El_Paseo_el_Avila.jpg",
      "page": "https://commons.wikimedia.org/wiki/File:Vista_Panor%C3%A1mica_de_La_Ciudad_de_Caracas_desde_El_Paseo_el_Avila.jpg",
      "caption": "View of Caracas from the Ávila mountain.",
      "author": "Wilfredor",
      "license": "CC BY-SA 3.0",
      "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0"
    },
    {
      "thumb": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Panoramic_view_of_Caracas_night.jpg/960px-Panoramic_view_of_Caracas_night.jpg",
      "page": "https://commons.wikimedia.org/wiki/File:Panoramic_view_of_Caracas_night.jpg",
      "caption": "Panoramic view of Caracas at night.",
      "author": "Wilfredor",
      "license": "CC0",
      "licenseUrl": "http://creativecommons.org/publicdomain/zero/1.0/deed.en"
    }
  ],
  "western-sahara": [
    {
      "thumb": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1d/Atlantic_Ocean_in_Western_Sahara.jpg/960px-Atlantic_Ocean_in_Western_Sahara.jpg",
      "page": "https://commons.wikimedia.org/wiki/File:Atlantic_Ocean_in_Western_Sahara.jpg",
      "caption": "Rocks near Boujdour on the Atlantic coast of Western Sahara, 2017.",
      "author": "Darymaister",
      "license": "CC BY-SA 4.0",
      "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0"
    },
    {
      "thumb": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Western_Sahara_-_West-Sahara_-_2.jpg/960px-Western_Sahara_-_West-Sahara_-_2.jpg",
      "page": "https://commons.wikimedia.org/wiki/File:Western_Sahara_-_West-Sahara_-_2.jpg",
      "caption": "A road leading inland in Western Sahara, 2018.",
      "author": "Alexander Gerst",
      "license": "CC BY-SA 2.0",
      "licenseUrl": "https://creativecommons.org/licenses/by-sa/2.0"
    }
  ],
  "cyprus": [
    {
      "thumb": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/Green_line_buffer_zone_Nicosia_%2843006734644%29.jpg/960px-Green_line_buffer_zone_Nicosia_%2843006734644%29.jpg",
      "page": "https://commons.wikimedia.org/wiki/File:Green_line_buffer_zone_Nicosia_(43006734644).jpg",
      "caption": "The UN buffer zone (Green Line) in Nicosia, 2018.",
      "author": "dronepicr",
      "license": "CC BY 2.0",
      "licenseUrl": "https://creativecommons.org/licenses/by/2.0"
    },
    {
      "thumb": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bf/United_Nations_Buffer_Zone_in_Nicosia_%288132781183%29.jpg/960px-United_Nations_Buffer_Zone_in_Nicosia_%288132781183%29.jpg",
      "page": "https://commons.wikimedia.org/wiki/File:United_Nations_Buffer_Zone_in_Nicosia_(8132781183).jpg",
      "caption": "The United Nations buffer zone in Nicosia.",
      "author": "Michal Osmenda from Brussels, Belgium",
      "license": "CC BY 2.0",
      "licenseUrl": "https://creativecommons.org/licenses/by/2.0"
    }
  ]
};
