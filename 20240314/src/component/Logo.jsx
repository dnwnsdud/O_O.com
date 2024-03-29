import React from "react";
import { Box } from "@chakra-ui/react";

export default ({ width, height, fill, cl }) => {
        let color = cl ? "white" : "#0B0B0D";
        return <Box pos={"relative"} zIndex={1}
                _before={
                        {
                                content: '""',
                                position: 'absolute',
                                width: "97%", height: "98%",
                                borderRadius: "50%",
                                bg: `${color}`,
                                top: "50%",
                                left: "49%",
                                transform: "translate(-50%, -50%)",
                                zIndex: -1
                        }
                }
        >
                <svg version="1.0" xmlns="http://www.w3.org/2000/svg" width={width ? width : "100%"} height={height ? height : "100%"} viewBox="0 0 720.000000 720.000000" preserveAspectRatio="xMidYMid meet">
                        <g transform="translate(0.000000,720.000000) scale(0.100000,-0.100000)" fill={fill ? fill : "#eaeaea"} stroke="none">
                                <path d="M3380 7164 c-649 -38 -1245 -234 -1769 -581 -376 -249 -721 -587
        -973 -953 -676 -981 -822 -2249 -386 -3360 174 -442 448 -864 784 -1205 386
        -393 868 -696 1374 -865 361 -121 759 -188 1125 -190 344 -1 772 67 1099 175
        771 256 1413 751 1874 1447 434 655 643 1507 563 2297 -32 305 -81 542 -166
        796 -39 117 -61 175 -113 300 -139 330 -391 716 -654 1002 -300 324 -695 617
        -1063 787 -55 26 -107 51 -115 55 -37 20 -224 92 -326 125 -328 105 -661 161
        -1019 169 -93 3 -199 3 -235 1z m400 -109 c207 -17 231 -20 375 -47 250 -45
        564 -140 740 -223 17 -8 75 -35 130 -60 366 -169 780 -479 1062 -796 272 -305
        442 -571 623 -974 24 -53 95 -250 128 -355 45 -143 98 -395 124 -590 17 -130
        17 -691 0 -830 -65 -523 -244 -1028 -516 -1455 -345 -542 -841 -986 -1411
        -1264 -279 -136 -584 -238 -860 -287 -253 -44 -296 -48 -625 -48 -373 -1 -463
        8 -765 75 -640 142 -1254 491 -1709 971 -463 490 -767 1066 -896 1698 -12 57
        -23 107 -25 110 -2 4 -14 94 -26 201 -76 663 32 1320 312 1909 181 379 386
        668 684 965 310 310 624 531 990 697 411 186 735 266 1270 311 97 9 233 6 395
        -8z" />
                                <path d="M2840 6727 c-156 -35 -255 -157 -267 -330 -9 -133 28 -245 106 -324
        63 -63 120 -86 226 -91 123 -5 188 18 266 97 141 144 145 399 8 555 -76 87
        -208 123 -339 93z m163 -131 c42 -17 93 -76 107 -123 62 -217 -34 -390 -208
        -370 -106 12 -182 123 -182 266 0 109 37 182 110 219 51 25 124 29 173 8z" />
                                <path d="M4027 6716 c-78 -28 -147 -95 -190 -186 -30 -62 -32 -71 -32 -185 0
        -112 2 -124 28 -173 40 -75 90 -127 155 -159 52 -25 67 -28 167 -28 124 0 153
        10 236 83 86 76 135 241 112 377 -21 121 -77 202 -177 254 -54 29 -65 31 -160
        31 -58 -1 -117 -7 -139 -14z m210 -117 c15 -5 43 -25 61 -42 98 -95 74 -349
        -41 -425 -34 -23 -52 -27 -107 -27 -55 0 -73 4 -107 27 -107 70 -126 288 -36
        407 46 60 154 89 230 60z" />
                                <path d="M3404 6336 c-3 -7 -4 -31 -2 -52 l3 -39 135 0 135 0 0 50 0 50 -133
        3 c-107 2 -133 0 -138 -12z" />
                                <path d="M3360 5643 c-395 -38 -748 -177 -1065 -417 -103 -78 -294 -268 -373
        -373 -388 -512 -519 -1153 -363 -1770 93 -363 276 -686 539 -949 332 -332 753
        -535 1222 -589 168 -19 241 -19 420 0 648 68 1205 425 1550 994 126 207 223
        479 266 746 25 155 25 460 0 610 -60 363 -189 668 -400 950 -79 105 -290 316
        -391 391 -371 275 -805 418 -1249 412 -66 0 -137 -3 -156 -5z m385 -108 c446
        -52 834 -238 1152 -553 300 -297 493 -680 559 -1111 19 -128 22 -398 5 -526
        -34 -255 -136 -550 -262 -758 -161 -265 -399 -505 -658 -666 -214 -133 -503
        -235 -764 -270 -101 -14 -383 -14 -484 0 -114 15 -304 62 -413 102 -535 194
        -971 630 -1161 1161 -93 259 -125 463 -116 749 6 189 12 235 52 402 189 781
        855 1372 1655 1469 155 19 280 19 435 1z" />
                                <path d="M3375 4811 c-212 -35 -408 -138 -543 -286 -162 -177 -250 -393 -272
        -663 -30 -374 73 -679 302 -898 117 -112 227 -173 397 -221 88 -25 110 -27
        271 -27 156 1 185 4 272 27 171 47 285 111 406 229 199 194 296 435 309 773
        13 334 -95 626 -305 827 -122 116 -230 177 -388 219 -88 23 -357 35 -449 20z
        m275 -341 c72 -12 185 -63 242 -109 48 -41 122 -154 152 -235 61 -161 76 -414
        36 -596 -40 -187 -149 -349 -278 -414 -150 -76 -373 -77 -520 -2 -138 71 -248
        236 -294 440 -27 125 -21 363 12 476 97 327 337 489 650 440z" />
                                <path d="M1663 1359 c-111 -55 -171 -193 -128 -296 33 -79 111 -133 192 -133
        68 0 110 18 157 66 56 58 80 109 80 174 0 153 -165 256 -301 189z m157 -74
        c68 -35 80 -110 30 -188 -57 -90 -140 -113 -204 -57 -54 48 -54 125 1 191 55
        65 115 84 173 54z" />
                                <path d="M5362 1303 c-35 -17 -62 -58 -62 -93 0 -22 -10 -26 -27 -9 -8 8 -17
        8 -30 0 -48 -25 -46 -32 48 -150 50 -62 97 -115 106 -118 8 -3 25 4 39 18 l24
        24 -56 70 c-31 39 -61 80 -66 92 -22 47 17 102 63 88 11 -4 49 -42 85 -86 36
        -43 71 -79 78 -79 7 0 23 11 35 24 l23 24 -69 85 c-60 74 -122 127 -149 127
        -5 0 -24 -8 -42 -17z" />
                                <path d="M5020 1222 c-18 -15 -22 -25 -16 -46 6 -24 11 -27 44 -24 32 3 37 7
        40 31 4 30 -12 57 -33 57 -7 0 -23 -8 -35 -18z" />
                                <path d="M5103 1103 c-13 -8 -23 -21 -23 -27 0 -6 31 -56 69 -111 112 -162 96
        -147 131 -127 16 9 30 22 30 28 0 18 -159 249 -173 251 -6 1 -22 -5 -34 -14z" />
                                <path d="M1993 1058 c-4 -7 -56 -94 -115 -193 l-106 -180 26 -22 c15 -13 32
        -23 38 -23 5 0 28 31 50 70 21 38 42 70 45 70 3 0 11 -11 17 -25 14 -31 68
        -65 104 -65 36 0 78 17 107 43 30 28 71 114 71 151 0 67 -78 131 -144 119 -25
        -5 -27 -3 -22 14 5 15 0 25 -18 37 -30 19 -42 20 -53 4z m129 -125 c25 -23 23
        -72 -7 -116 -59 -85 -174 -41 -136 52 31 74 99 104 143 64z" />
                                <path d="M2370 1006 c-15 -19 -9 -56 11 -69 26 -17 69 0 69 27 0 44 -54 72
        -80 42z" />
                                <path d="M4930 997 c-38 -17 -110 -77 -110 -92 0 -7 8 -23 18 -35 l18 -22 12
        24 c7 13 28 34 48 47 29 20 38 22 59 13 14 -7 25 -15 25 -20 0 -4 -25 -29 -55
        -55 -63 -55 -77 -95 -51 -145 39 -75 135 -69 174 9 16 32 22 37 31 25 10 -12
        16 -12 42 2 16 9 29 21 29 25 0 5 -25 51 -55 102 -74 126 -116 154 -185 122z
        m116 -172 c9 -38 -4 -74 -31 -87 -21 -9 -28 -8 -45 7 -29 26 -25 50 13 79 40
        32 55 33 63 1z" />
                                <path d="M4627 927 c-26 -20 -27 -24 -16 -55 10 -30 9 -35 -9 -48 -18 -13 -20
        -18 -10 -40 9 -20 17 -24 37 -19 24 5 29 0 66 -77 47 -96 78 -124 127 -114 18
        4 44 15 57 25 21 16 22 21 11 42 -7 13 -14 25 -15 27 -2 2 -13 -3 -24 -10 -31
        -19 -51 -2 -88 80 l-32 72 29 15 c33 17 37 32 17 59 -11 15 -17 16 -35 7 -32
        -17 -41 -14 -59 24 -9 19 -19 35 -22 35 -3 0 -19 -10 -34 -23z" />
                                <path d="M2254 753 l-65 -138 21 -17 c42 -34 52 -24 119 119 l64 136 -23 19
        c-12 10 -29 18 -37 18 -8 0 -40 -54 -79 -137z" />
                                <path d="M4247 858 c-15 -5 -27 -15 -25 -22 2 -6 34 -105 73 -219 57 -170 73
        -207 88 -207 27 0 57 18 57 35 0 10 7 12 30 5 37 -11 67 -3 107 27 42 31 59
        90 45 154 -33 142 -145 192 -230 102 -18 -19 -34 -34 -36 -32 -2 2 -16 41 -30
        87 -15 45 -33 82 -39 81 -7 0 -25 -5 -40 -11z m262 -184 c44 -55 38 -136 -11
        -163 -23 -13 -30 -13 -54 -1 -52 28 -73 131 -34 170 29 29 74 26 99 -6z" />
                                <path d="M2828 839 c-21 -12 -24 -49 -6 -67 7 -7 25 -12 40 -12 39 0 51 45 18
        72 -25 21 -29 21 -52 7z" />
                                <path d="M2445 797 c-18 -41 -95 -248 -95 -257 0 -8 46 -30 64 -30 8 0 27 38
        45 89 36 99 53 121 100 121 24 0 34 -6 43 -26 11 -23 8 -41 -24 -131 l-37
        -104 26 -10 c46 -17 56 -8 89 81 44 116 51 163 29 196 -30 46 -89 61 -149 38
        -12 -5 -16 -1 -14 15 2 17 -5 26 -30 36 -32 14 -33 14 -47 -18z" />
                                <path d="M3968 772 c-46 -17 -100 -60 -119 -94 -37 -69 -25 -208 25 -272 84
        -111 263 -104 341 14 52 79 45 204 -18 294 -24 33 -109 76 -152 75 -16 0 -51
        -8 -77 -17z m122 -79 c41 -24 70 -89 70 -157 0 -50 -4 -60 -33 -92 -23 -26
        -43 -37 -73 -41 -36 -5 -45 -1 -77 26 -40 36 -57 76 -59 142 -1 59 15 95 54
        119 40 24 81 25 118 3z" />
                                <path d="M2781 688 c-15 -41 -74 -278 -70 -282 2 -2 20 -7 39 -11 l35 -6 19
        68 c10 37 27 98 37 134 25 86 24 98 -7 109 -37 14 -43 13 -53 -12z" />
                                <path d="M2971 637 c-61 -31 -94 -94 -88 -165 5 -65 28 -99 88 -130 78 -40
        160 -20 213 52 17 22 21 42 21 103 0 73 -1 75 -37 108 -35 32 -90 55 -134 55
        -11 0 -40 -10 -63 -23z m135 -68 c36 -29 22 -137 -21 -165 -31 -20 -90 -11
        -105 16 -5 10 -10 40 -10 65 0 38 5 52 30 77 26 25 36 29 62 24 17 -3 37 -11
        44 -17z" />
                                <path d="M3277 458 c-4 -112 -3 -155 6 -160 16 -10 67 -10 68 0 0 4 4 53 8
        110 5 74 12 107 24 119 20 20 76 21 88 2 5 -8 9 -64 9 -126 l0 -112 35 -7 c20
        -3 38 -4 41 -2 8 9 17 225 10 252 -17 69 -112 101 -169 56 -25 -20 -25 -20
        -30 0 -4 16 -14 20 -45 20 l-39 0 -6 -152z" />
                        </g>
                </svg>
        </Box >
}