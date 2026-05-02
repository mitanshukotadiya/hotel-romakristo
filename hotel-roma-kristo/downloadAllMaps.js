const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');

const links = {
  hero_1: "https://www.google.com/maps/place/Hotel+roma+kristo/@22.2447581,68.9649938,3a,75y,90t/data=!3m8!1e2!3m6!1sAF1QipNFBo1dKhIwYqx7HchN7_9Rf5q8zCWfm11XvBy4!2e10!3e12!6shttps:%2F%2Flh3.googleusercontent.com%2Fp%2FAF1QipNFBo1dKhIwYqx7HchN7_9Rf5q8zCWfm11XvBy4%3Dw203-h114-k-no!7i1920!8i1080!4m12!3m11!1s0x39569d00427a65f7:0x232628ef1b23534d!5m2!4m1!1i2!8m2!3d22.2446939!4d68.9650133!10e5!14m1!1BCgIgAQ!16s%2Fg%2F11vm92xcqb?entry=ttu&g_ep=EgoyMDI2MDQyOS4wIKXMDSoASAFQAw%3D%3D#",
  hero_2: "https://www.google.com/maps/place/Hotel+roma+kristo/@22.2446939,68.9650133,3a,75y,90t/data=!3m8!1e2!3m6!1sCIABIhCoBSF5UkCD6BVXGwg41XWI!2e10!3e12!6shttps:%2F%2Flh3.googleusercontent.com%2Fgps-cs-s%2FAPNQkAH8CTmIXeqfl3M66LXpto9oyt7oaDeGwTto9BbAEk2QExOh7YTy-JiHIqNndUORDf9LP0vBzcO0IxzkcGVCIVlBR0qT1GCiMgTEkJhGtk4-KHeAu-CQ5t7oRAhH-L4MBomOW5EXKcARSg0-%3Dw203-h270-k-no!7i3060!8i4080!4m12!3m11!1s0x39569d00427a65f7:0x232628ef1b23534d!5m2!4m1!1i2!8m2!3d22.2446939!4d68.9650133!10e5!14m1!1BCgIgAQ!16s%2Fg%2F11vm92xcqb?entry=ttu&g_ep=EgoyMDI2MDQyOS4wIKXMDSoASAFQAw%3D%3D#",
  hero_3: "https://www.google.com/maps/place/Hotel+roma+kristo/@22.2447581,68.9649938,3a,77.3y,90t/data=!3m8!1e2!3m6!1shttp:%2F%2Fpix8.agoda.net%2FhotelImages%2F38099290%2F0%2F794f34b574ff0ed86b48cfda4687240e.jpg%3Fce%3D3!2e7!3e27!6shttps:%2F%2Flh3.googleusercontent.com%2Fgps-proxy%2FALd4DhFfzb07YsQA1A_DKOugz6YE5BidTZxvHFXOn7o_fJmjPXacgyCyR3RQLL0ZwxSJE0nWAqGrJO7_Svke_eXOZA8Etw5v9YLMTHnTeNCQoNFyWpAavi4q-vdcM0H02kMOpgeM87qenn6UlOMXmNt_XuAELMHi7arbVRB7zMdm83Als1gfNd1gI5rGTw%3Dw203-h113-k-no!7i1024!8i768!4m12!3m11!1s0x39569d00427a65f7:0x232628ef1b23534d!5m2!4m1!1i2!8m2!3d22.2446939!4d68.9650133!10e5!14m1!1BCgIgAQ!16s%2Fg%2F11vm92xcqb?entry=ttu&g_ep=EgoyMDI2MDQyOS4wIKXMDSoASAFQAw%3D%3D#",
  
  reception_1: "https://www.google.com/maps/place/Hotel+roma+kristo/@22.2447581,68.9649938,3a,75y,90t/data=!3m8!1e2!3m6!1sAF1QipNMmUBvIpMBBeEEElhEXP-2Itil2Coa7gA2S8oJ!2e10!3e12!6shttps:%2F%2Flh3.googleusercontent.com%2Fp%2FAF1QipNMmUBvIpMBBeEEElhEXP-2Itil2Coa7gA2S8oJ%3Dw203-h114-k-no!7i1920!8i1080!4m12!3m11!1s0x39569d00427a65f7:0x232628ef1b23534d!5m2!4m1!1i2!8m2!3d22.2446939!4d68.9650133!10e5!14m1!1BCgIgAQ!16s%2Fg%2F11vm92xcqb?entry=ttu&g_ep=EgoyMDI2MDQyOS4wIKXMDSoASAFQAw%3D%3D#",
  reception_2: "https://www.google.com/maps/place/Hotel+roma+kristo/@22.2446939,68.9650133,3a,75y,90t/data=!3m8!1e2!3m6!1sCIABIhBkvDIaeeDT3zU0wAnzoI1x!2e10!3e12!6shttps:%2F%2Flh3.googleusercontent.com%2Fgps-cs-s%2FAPNQkAGtJA8H6XCZKD64z9x1yx0hjqPk7UAp2YMZ1Bjqh9PqZoTEdBGIXh5q01V1lzmvxXRgAQkQdfOijwtgFAdjy037vOI6fH6xaAGSmRzhvJFx1VX3YBfe2wMZjC7Mkkw2XEmzD-6ILzYLAJ4w%3Dw203-h270-k-no!7i4284!8i5712!4m12!3m11!1s0x39569d00427a65f7:0x232628ef1b23534d!5m2!4m1!1i2!8m2!3d22.2446939!4d68.9650133!10e5!14m1!1BCgIgAQ!16s%2Fg%2F11vm92xcqb?entry=ttu&g_ep=EgoyMDI2MDQyOS4wIKXMDSoASAFQAw%3D%3D#",
  
  seating_1: "https://www.google.com/maps/place/Hotel+roma+kristo/@22.2446939,68.9650133,3a,75y,90t/data=!3m8!1e2!3m6!1sCIABIhBRtuqLp0xWFxVuKQCyFtW2!2e10!3e12!6shttps:%2F%2Flh3.googleusercontent.com%2Fgps-cs-s%2FAPNQkAHIHsUl28GLAnK4PnoibJOaVrdEm8pTA3-hPx-qvMLjQvJk5uz0nn6GFZgADumGiUnpnBExgl4_KaEO4HXSU-1lpBbKQqH7ewYPOdvbpalWLX_6_vBBX7uMG7au4NcAMokyc8lSFQlxgigz%3Dw203-h270-k-no!7i3000!8i4000!4m12!3m11!1s0x39569d00427a65f7:0x232628ef1b23534d!5m2!4m1!1i2!8m2!3d22.2446939!4d68.9650133!10e5!14m1!1BCgIgAQ!16s%2Fg%2F11vm92xcqb?entry=ttu&g_ep=EgoyMDI2MDQyOS4wIKXMDSoASAFQAw%3D%3D#",
  
  ground_floor: "https://www.google.com/maps/place/Hotel+roma+kristo/@22.2447581,68.9649938,3a,77.3y,90t/data=!3m8!1e2!3m6!1shttp:%2F%2Fpix8.agoda.net%2Fproperty%2F38099290%2F0%2F3d54cdbb5a416ee07c982361050abc57.jpeg%3Fce%3D3!2e7!3e27!6shttps:%2F%2Flh3.googleusercontent.com%2Fgps-proxy%2FALd4DhGMAjAKEQxIEFyLc8QApHljVyb1FiiwTZbJQH5roisoQpABxMPPeMWGLS6f7IZKK_zZNOBstw7k1KQ-VsPSgmsG183KGd2P5CgctrtVhp-dvGHlfwo6nE0ZEDD0hinkYA6jDgAYSxE3y3yeZnvrdgeVwtTcfW5-i1GV5F8YPTG7Tc55k77UpclO%3Dw203-h135-k-no!7i1024!8i768!4m12!3m11!1s0x39569d00427a65f7:0x232628ef1b23534d!5m2!4m1!1i2!8m2!3d22.2446939!4d68.9650133!10e5!14m1!1BCgIgAQ!16s%2Fg%2F11vm92xcqb?entry=ttu&g_ep=EgoyMDI2MDQyOS4wIKXMDSoASAFQAw%3D%3D#",
  
  seating_2: "https://www.google.com/maps/place/Hotel+roma+kristo/@22.2447581,68.9649938,3a,77.3y,90t/data=!3m8!1e2!3m6!1shttp:%2F%2Fpix8.agoda.net%2Fproperty%2F38099290%2F0%2Fd3d5d8e951687ecaaed0b918c13fb4b7.jpeg%3Fce%3D3!2e7!3e27!6shttps:%2F%2Flh3.googleusercontent.com%2Fgps-proxy%2FALd4DhFiKNFuXrc2tMANT7VYpU9ZKVxJTbqJ_8ggsiccZaWWVaFvppTKEQG4e83o2qtwaLROL-yaCslbFxUEY6pjLytDVUuxFbE_YYQF0CwYTw-6cw1SjU_wHR1zQbwtj8dr9lJDvU--FB8sfNB2zhl6vlnXUtQBW5vXrfjY_mEfop5h2IH-WknK0vq5%3Dw203-h135-k-no!7i1024!8i768!4m12!3m11!1s0x39569d00427a65f7:0x232628ef1b23534d!5m2!4m1!1i2!8m2!3d22.2446939!4d68.9650133!10e5!14m1!1BCgIgAQ!16s%2Fg%2F11vm92xcqb?entry=ttu&g_ep=EgoyMDI2MDQyOS4wIKXMDSoASAFQAw%3D%3D#",
  
  room_1: "https://www.google.com/maps/place/Hotel+roma+kristo/@22.2447581,68.9649938,3a,75y,90t/data=!3m8!1e2!3m6!1sAF1QipMzvqtw5IwDgzdnatQtasZoBBT342EPNT_5BThE!2e10!3e12!6shttps:%2F%2Flh3.googleusercontent.com%2Fp%2FAF1QipMzvqtw5IwDgzdnatQtasZoBBT342EPNT_5BThE%3Dw203-h114-k-no!7i1920!8i1080!4m12!3m11!1s0x39569d00427a65f7:0x232628ef1b23534d!5m2!4m1!1i2!8m2!3d22.2446939!4d68.9650133!10e5!14m1!1BCgIgAQ!16s%2Fg%2F11vm92xcqb?entry=ttu&g_ep=EgoyMDI2MDQyOS4wIKXMDSoASAFQAw%3D%3D#",
  room_2: "https://www.google.com/maps/place/Hotel+roma+kristo/@22.2447581,68.9649938,3a,75y,90t/data=!3m8!1e2!3m6!1sAF1QipNdJKcOE4WnLl0IZUF7dOQWPJvx2imP6iVOt4BV!2e10!3e12!6shttps:%2F%2Flh3.googleusercontent.com%2Fp%2FAF1QipNdJKcOE4WnLl0IZUF7dOQWPJvx2imP6iVOt4BV%3Dw203-h114-k-no!7i1920!8i1080!4m12!3m11!1s0x39569d00427a65f7:0x232628ef1b23534d!5m2!4m1!1i2!8m2!3d22.2446939!4d68.9650133!10e5!14m1!1BCgIgAQ!16s%2Fg%2F11vm92xcqb?entry=ttu&g_ep=EgoyMDI2MDQyOS4wIKXMDSoASAFQAw%3D%3D#",
  room_3: "https://www.google.com/maps/place/Hotel+roma+kristo/@22.2447581,68.9649938,3a,75y,90t/data=!3m8!1e2!3m6!1sAF1QipNLrDIZevaLTK80CGAId0iSpiEbJV6w8opzBhhM!2e10!3e12!6shttps:%2F%2Flh3.googleusercontent.com%2Fp%2FAF1QipNLrDIZevaLTK80CGAId0iSpiEbJV6w8opzBhhM%3Dw203-h114-k-no!7i1920!8i1080!4m12!3m11!1s0x39569d00427a65f7:0x232628ef1b23534d!5m2!4m1!1i2!8m2!3d22.2446939!4d68.9650133!10e5!14m1!1BCgIgAQ!16s%2Fg%2F11vm92xcqb?entry=ttu&g_ep=EgoyMDI2MDQyOS4wIKXMDSoASAFQAw%3D%3D#",
  room_4: "https://www.google.com/maps/place/Hotel+roma+kristo/@22.2447581,68.9649938,3a,75y,90t/data=!3m8!1e2!3m6!1sAF1QipN8C2jjiUjo-GB4EwjWW11p_c3aW4i9nJYUAT3g!2e10!3e12!6shttps:%2F%2Flh3.googleusercontent.com%2Fp%2FAF1QipN8C2jjiUjo-GB4EwjWW11p_c3aW4i9nJYUAT3g%3Dw203-h114-k-no!7i1920!8i1080!4m12!3m11!1s0x39569d00427a65f7:0x232628ef1b23534d!5m2!4m1!1i2!8m2!3d22.2446939!4d68.9650133!10e5!14m1!1BCgIgAQ!16s%2Fg%2F11vm92xcqb?entry=ttu&g_ep=EgoyMDI2MDQyOS4wIKXMDSoASAFQAw%3D%3D#",
  room_5: "https://www.google.com/maps/place/Hotel+roma+kristo/@22.2447581,68.9649938,3a,75y,90t/data=!3m8!1e2!3m6!1sAF1QipMUx8zaTkN2UgwpVxjSFPXvGp7bbL487uWW7BGS!2e10!3e12!6shttps:%2F%2Flh3.googleusercontent.com%2Fp%2FAF1QipMUx8zaTkN2UgwpVxjSFPXvGp7bbL487uWW7BGS%3Dw203-h114-k-no!7i1920!8i1080!4m12!3m11!1s0x39569d00427a65f7:0x232628ef1b23534d!5m2!4m1!1i2!8m2!3d22.2446939!4d68.9650133!10e5!14m1!1BCgIgAQ!16s%2Fg%2F11vm92xcqb?entry=ttu&g_ep=EgoyMDI2MDQyOS4wIKXMDSoASAFQAw%3D%3D#",
  room_6: "https://www.google.com/maps/place/Hotel+roma+kristo/@22.2446939,68.9650133,3a,75y,90t/data=!3m8!1e2!3m6!1sCIABIhCv40_tQJ4oasNLf2rxzNBU!2e10!3e12!6shttps:%2F%2Flh3.googleusercontent.com%2Fgps-cs-s%2FAPNQkAF5u2jSxyBMuKLXFd6sIz9b5JWMU-b7REO4NBXPlCVdQdWKYW1wO70GhQYxtJyJ_IVEDb-7GgP1g9vA3aR68d_Iw6pxVYnOGAwYhPntL1F05EC7wDiUmYKkZgQoSlg_v2uctGnoXg0lxh4O%3Dw203-h270-k-no!7i3024!8i4032!4m12!3m11!1s0x39569d00427a65f7:0x232628ef1b23534d!5m2!4m1!1i2!8m2!3d22.2446939!4d68.9650133!10e5!14m1!1BCgIgAQ!16s%2Fg%2F11vm92xcqb?entry=ttu&g_ep=EgoyMDI2MDQyOS4wIKXMDSoASAFQAw%3D%3D#",
  room_7: "https://www.google.com/maps/place/Hotel+roma+kristo/@22.2447581,68.9649938,3a,77.3y,90t/data=!3m8!1e2!3m6!1shttp:%2F%2Fpix8.agoda.net%2FhotelImages%2F38099290%2F628329126%2F8576a936822539d5c613cf9937fe0d83.jpg%3Fce%3D3!2e7!3e27!6shttps:%2F%2Flh3.googleusercontent.com%2Fgps-proxy%2FALd4DhEVGG9CiIVSDokjsko2l999uBZ6O4fE5a7eo5nauX8t2mI6lWVssFGIq_03a1pfvdYNdRtZpvRb1Y134L3kFcGgq3Le56sV0XdNXHeK3R3K_Deue5kRH_TTrH_NryteAYHYNyvylJvWLgd5C3pWI7XUo_9_-PXnDVzzTY_c2CEFPEnfylBoCoo3%3Dw203-h113-k-no!7i1024!8i768!4m12!3m11!1s0x39569d00427a65f7:0x232628ef1b23534d!5m2!4m1!1i2!8m2!3d22.2446939!4d68.9650133!10e5!14m1!1BCgIgAQ!16s%2Fg%2F11vm92xcqb?entry=ttu&g_ep=EgoyMDI2MDQyOS4wIKXMDSoASAFQAw%3D%3D#",
  room_8: "https://www.google.com/maps/place/Hotel+roma+kristo/@22.2447581,68.9649938,3a,77.3y,90t/data=!3m8!1e2!3m6!1shttps:%2F%2Fcdn.worldota.net%2Ft%2F1024x768%2Fcontent%2Ff1%2F9d%2Ff19dbfa72a9fffc076bb43c6bd988a226ef9cf17.jpeg!2e7!3e27!6shttps:%2F%2Flh3.googleusercontent.com%2Fgps-proxy%2FALd4DhHTbnvjrnUGi_FbJ0lZnlpYwxUlw2UM1FMx4o-Lhaik12oAYSONxZur4Ik1_9Tgz5fnqnm_P2KmUrK5Sntq0LKb90hcWw4eKcbGc6JqKt71Pt4fq7k68tmXgW4WElVUQG-1fihbcSRDzeRqgkAmEQfOuXRGq_PfqzDfczetCFkXMoBBAFfIB2-m%3Dw203-h135-k-no!7i1024!8i768!4m12!3m11!1s0x39569d00427a65f7:0x232628ef1b23534d!5m2!4m1!1i2!8m2!3d22.2446939!4d68.9650133!10e5!14m1!1BCgIgAQ!16s%2Fg%2F11vm92xcqb?entry=ttu&g_ep=EgoyMDI2MDQyOS4wIKXMDSoASAFQAw%3D%3D#",
  room_9: "https://www.google.com/maps/place/Hotel+roma+kristo/@22.2446939,68.9650133,3a,75y,90t/data=!3m8!1e2!3m6!1sCIABIhCpVByMooavIdDKQ6HMBmOC!2e10!3e12!6shttps:%2F%2Flh3.googleusercontent.com%2Fgps-cs-s%2FAPNQkAEqPyjQ-JADhbjt97PXZHy5jVNwIYCPmDBAkS7hEyA3CAhCwC5jApnFgRXwiAocwFpqOn88ptXAHnqp4S6GkRihaBzypJHkcjhz0lo3GDwQMvv5Eg_zHEosbSXAzp4JcDwnMv5fnG9a1_P1%3Dw203-h270-k-no!7i3000!8i4000!4m12!3m11!1s0x39569d00427a65f7:0x232628ef1b23534d!5m2!4m1!1i2!8m2!3d22.2446939!4d68.9650133!10e5!14m1!1BCgIgAQ!16s%2Fg%2F11vm92xcqb?entry=ttu&g_ep=EgoyMDI2MDQyOS4wIKXMDSoASAFQAw%3D%3D#",
  room_10: "https://www.google.com/maps/place/Hotel+roma+kristo/@22.2446939,68.9650133,3a,75y,90t/data=!3m8!1e2!3m6!1sCIABIhAKJ863sA5jGZlQ-DvfnzgH!2e10!3e12!6shttps:%2F%2Flh3.googleusercontent.com%2Fgps-cs-s%2FAPNQkAFvwtX3mHwAww2WR5IsRB0tEQoezA5et8E127ch7rWJrmHw990kf1J_RlFlyhWC85UsLqdFngUTsqeOUYoHclG8aKv-SaKPf0XoJYikr31x0SyAcwSiqFrHY9_Cgnjf1aC1eyX3ng0fVmTX%3Dw203-h270-k-no!7i3024!8i4032!4m12!3m11!1s0x39569d00427a65f7:0x232628ef1b23534d!5m2!4m1!1i2!8m2!3d22.2446939!4d68.9650133!10e5!14m1!1BCgIgAQ!16s%2Fg%2F11vm92xcqb?entry=ttu&g_ep=EgoyMDI2MDQyOS4wIKXMDSoASAFQAw%3D%3D#",
  room_11: "https://www.google.com/maps/place/Hotel+roma+kristo/@22.2446939,68.9650133,3a,75y,90t/data=!3m8!1e2!3m6!1sCIABIhAOe9xwGMC64Y_r_JswfGLY!2e10!3e12!6shttps:%2F%2Flh3.googleusercontent.com%2Fgps-cs-s%2FAPNQkAEkVPR46tJFXtCv6qa26OD6o6z1I_M3BPns8R_Xa_pnCQE6ksOS8b3rFpj4Y1bm07NXFWCrCf48uJvhvw7wbwGyittUZT3t9GhqeURWBW57_Song5nLA-8AoIvPfTpQq2j03YDFY4JHhKwR%3Dw203-h270-k-no!7i3060!8i4080!4m12!3m11!1s0x39569d00427a65f7:0x232628ef1b23534d!5m2!4m1!1i2!8m2!3d22.2446939!4d68.9650133!10e5!14m1!1BCgIgAQ!16s%2Fg%2F11vm92xcqb?entry=ttu&g_ep=EgoyMDI2MDQyOS4wIKXMDSoASAFQAw%3D%3D#",

  dining_1: "https://www.google.com/maps/place/Hotel+roma+kristo/@22.2447581,68.9649938,3a,75y,90t/data=!3m8!1e2!3m6!1sCIABIhCXbIJsKLp5IXpHk9ZK_XZd!2e10!3e12!6shttps:%2F%2Flh3.googleusercontent.com%2Fgps-cs-s%2FAPNQkAFezagKZyMl0bSXRF5gskMTn_J8x59kKgi41Q6hDy2ZDse_M1PoxAHoxEgQ5XOSn2xEQQvEiaztkJXGpvOlURRHfu_9iyUKLr-ZrHxK2IU9-_t8tkM5WTZ2ok_17ZUhe3RNI31BUqgFWiI%3Dw203-h270-k-no!7i3000!8i4000!4m12!3m11!1s0x39569d00427a65f7:0x232628ef1b23534d!5m2!4m1!1i2!8m2!3d22.2446939!4d68.9650133!10e5!14m1!1BCgIgAQ!16s%2Fg%2F11vm92xcqb?entry=ttu&g_ep=EgoyMDI2MDQyOS4wIKXMDSoASAFQAw%3D%3D#",
  dining_2: "https://www.google.com/maps/place/Hotel+roma+kristo/@22.2447581,68.9649938,3a,77.3y,90t/data=!3m8!1e2!3m6!1shttp:%2F%2Fpix8.agoda.net%2Fproperty%2F69597573%2F0%2F1141241162843105ebf47485a423c6a9.jpeg%3Fce%3D2!2e7!3e27!6shttps:%2F%2Flh3.googleusercontent.com%2Fgps-proxy%2FALd4DhHxDix9byVlNSZoEEiqS1wDbwIahHUBAYEHZzmySucvhqgwg4UlJUIQQ-w6uUr6nuHjRQRg1zQMzo2O_sfKEUH1mBNK22Xva3jcWKY6ECm3UOFO84AZInKESOKhbyHrL8M1ECR_on5EsFHsrdCeND1B59IIRBdF4HckDJ7iKg5XQmpLFTn-Yec%3Dw203-h168-k-no!7i1024!8i768!4m12!3m11!1s0x39569d00427a65f7:0x232628ef1b23534d!5m2!4m1!1i2!8m2!3d22.2446939!4d68.9650133!10e5!14m1!1BCgIgAQ!16s%2Fg%2F11vm92xcqb?entry=ttu&g_ep=EgoyMDI2MDQyOS4wIKXMDSoASAFQAw%3D%3D#",

  lobby_1: "https://www.google.com/maps/place/Hotel+roma+kristo/@22.2447581,68.9649938,3a,77.3y,90t/data=!3m8!1e2!3m6!1shttp:%2F%2Fpix8.agoda.net%2Fproperty%2F69597573%2F0%2F8cf7335c5a88adcf5003457626efe8b8.jpeg%3Fce%3D2!2e7!3e27!6shttps:%2F%2Flh3.googleusercontent.com%2Fgps-proxy%2FALd4DhG4yYMlArOqooqF6ODd3nmvATBKD2jexzYOCcPHdiPcx5BNY-Gwdf8Rvtk6c0dTnO45uXXIdUVyLj1oOaua9CRUDpyK4EeBO9x5W9YExcDASN5EMV9M5yI4arr_P2TYOdhHYqr9BkdxjUqrf0SYs9YAnfsY8EgA8gR-vE9c8eGKtqBIiAB4u6KF%3Dw203-h168-k-no!7i1024!8i768!4m12!3m11!1s0x39569d00427a65f7:0x232628ef1b23534d!5m2!4m1!1i2!8m2!3d22.2446939!4d68.9650133!10e5!14m1!1BCgIgAQ!16s%2Fg%2F11vm92xcqb?entry=ttu&g_ep=EgoyMDI2MDQyOS4wIKXMDSoASAFQAw%3D%3D#",
  lobby_2: "https://www.google.com/maps/place/Hotel+roma+kristo/@22.2446939,68.9650133,3a,75y,90t/data=!3m8!1e2!3m6!1sCIABIhB-q2gjDnMTFSkjZXC4GK7G!2e10!3e12!6shttps:%2F%2Flh3.googleusercontent.com%2Fgps-cs-s%2FAPNQkAFP6YwMrzCCAa1iQihHeBDm0XDUhP5htWGZgiOfPUPVzfuZsRXBRFZe0mABfj9ITuHXyLx98NiNi98QIfLbcIPoD3IhDGK3dKL2KExYEk2XCUIozUJzmgFvB4uPTS-9pLBCQ592x8JMvEM%3Dw203-h270-k-no!7i4284!8i5712!4m12!3m11!1s0x39569d00427a65f7:0x232628ef1b23534d!5m2!4m1!1i2!8m2!3d22.2446939!4d68.9650133!10e5!14m1!1BCgIgAQ!16s%2Fg%2F11vm92xcqb?entry=ttu&g_ep=EgoyMDI2MDQyOS4wIKXMDSoASAFQAw%3D%3D#",
  lobby_3: "https://www.google.com/maps/place/Hotel+roma+kristo/@22.2446939,68.9650133,3a,75y,90t/data=!3m8!1e2!3m6!1sCIABIhBWq_fhKlSQCjvQEzJFEjPW!2e10!3e12!6shttps:%2F%2Flh3.googleusercontent.com%2Fgps-cs-s%2FAPNQkAHJwl6xvayrmpRQXV0ttiXEIXlCxhMOZOOBUHp_3bJZ4ck6eS_9dABXDANBMWi7X5xhiRIIbjNuMudRWefSDZA6LokYSUqrFtYnuFJr_m-CjukHLTnID1m_wLni8MsbPq5EU0pWpsv5rvL3%3Dw203-h270-k-no!7i4284!8i5712!4m12!3m11!1s0x39569d00427a65f7:0x232628ef1b23534d!5m2!4m1!1i2!8m2!3d22.2446939!4d68.9650133!10e5!14m1!1BCgIgAQ!16s%2Fg%2F11vm92xcqb?entry=ttu&g_ep=EgoyMDI2MDQyOS4wIKXMDSoASAFQAw%3D%3D#",

  food_1: "https://www.google.com/maps/place/Hotel+roma+kristo/@22.2446939,68.9650133,3a,75y,90t/data=!3m8!1e2!3m6!1sCIHM0ogKEICAgICdtN3v4AE!2e10!3e12!6shttps:%2F%2Flh3.googleusercontent.com%2Fgps-cs-s%2FAPNQkAH7ywOdrB1Lcgk_9_lh8K0xSM0ob3tJpOzytJihM_0jsdU9a3XMEYa-bGquyhC0g88ywMWF30B0gbwHqR7aDxXFFkhbJ0ZewPB9qRlekRNKN-_wVewGt8XR-qsemMawbGuYVaBkDw%3Dw203-h173-k-no!7i1280!8i1092!4m12!3m11!1s0x39569d00427a65f7:0x232628ef1b23534d!5m2!4m1!1i2!8m2!3d22.2446939!4d68.9650133!10e5!14m1!1BCgIgAQ!16s%2Fg%2F11vm92xcqb?entry=ttu&g_ep=EgoyMDI2MDQyOS4wIKXMDSoASAFQAw%3D%3D#",
  food_2: "https://www.google.com/maps/place/Hotel+roma+kristo/@22.2446939,68.9650133,3a,75y,90t/data=!3m8!1e2!3m6!1sCIHM0ogKEICAgICdtN3vkAE!2e10!3e12!6shttps:%2F%2Flh3.googleusercontent.com%2Fgps-cs-s%2FAPNQkAGllwjaxkYfeWGIHQYofnREIF1MoybuZuKuSarqrtqOV7E5vndErNNTcFrIBoJGz_VCQDymW1Wpv3LLzRfNJCC5xpuUxarx3xP0WS2tgVScB_2NEOmcfMiwmt-g4e719SE3U4N1sQ%3Dw203-h135-k-no!7i1280!8i853!4m12!3m11!1s0x39569d00427a65f7:0x232628ef1b23534d!5m2!4m1!1i2!8m2!3d22.2446939!4d68.9650133!10e5!14m1!1BCgIgAQ!16s%2Fg%2F11vm92xcqb?entry=ttu&g_ep=EgoyMDI2MDQyOS4wIKXMDSoASAFQAw%3D%3D#",
  food_3: "https://www.google.com/maps/place/Hotel+roma+kristo/@22.2446939,68.9650133,3a,75y,90t/data=!3m8!1e2!3m6!1sCIHM0ogKEICAgICdzIrzdw!2e10!3e12!6shttps:%2F%2Flh3.googleusercontent.com%2Fgps-cs-s%2FAPNQkAFcdZgLaWBoPwSX1BRFq1VsgGzvyPt8Pn6U1Qv2pXJYvxfV_WZMmAy67q7Vqqhugzt7xARsduNvF2noucfL5qXOjjovMpY1hiV0ci3_lasyp-CavtVyfrGabQKEogsay3VnW-JF%3Dw203-h271-k-no!7i2992!8i4000!4m12!3m11!1s0x39569d00427a65f7:0x232628ef1b23534d!5m2!4m1!1i2!8m2!3d22.2446939!4d68.9650133!10e5!14m1!1BCgIgAQ!16s%2Fg%2F11vm92xcqb?entry=ttu&g_ep=EgoyMDI2MDQyOS4wIKXMDSoASAFQAw%3D%3D#"
};

async function downloadFile(url, dest) {
  return new Promise((resolve, reject) => {
    // Determine the protocol based on the URL
    const client = url.startsWith('https') ? https : http;
    const file = fs.createWriteStream(dest);
    client.get(url, (res) => {
      res.pipe(file);
      file.on('finish', () => {
        file.close();
        resolve();
      });
    }).on('error', (err) => {
      fs.unlink(dest, () => {});
      reject(err);
    });
  });
}

async function run() {
  for (const [id, url] of Object.entries(links)) {
    console.log(`Processing ${id}...`);
    
    // Extract the !6s parameter which contains the image URL
    const match = url.match(/!6s([^!]+)/);
    if (match) {
      // Decode the URL encoded string
      let imgUrl = decodeURIComponent(match[1]);
      
      // The image URL might be from lh3.googleusercontent.com or http://pix8.agoda.net
      // For googleusercontent, we can request a massive resolution by replacing the width/height params
      if (imgUrl.includes('googleusercontent.com')) {
        imgUrl = imgUrl.replace(/=w\d+-h\d+-k-no/, '=w2048-h2048-k-no');
      } else if (imgUrl.includes('agoda.net')) {
        // Agoda links might have query params like ?ce=3, we'll just download them as is
        // We can optionally replace .jpeg?ce=... with just .jpeg
      }
      
      console.log(`Downloading ${imgUrl}`);
      const dest = path.join(__dirname, 'public', 'images', `${id}.jpg`);
      await downloadFile(imgUrl, dest).catch(e => console.error(e));
    }
  }
}

run();
