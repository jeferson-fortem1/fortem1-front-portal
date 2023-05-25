import * as React from 'react';

interface LogoIconProps {
    className?: string;
}

export const LogoIcon: React.FC<LogoIconProps> = (props: LogoIconProps) => (
    <svg width="120" height="20" viewBox="0, 0, 400,69.37869822485207" fill="none" xmlns="http://www.w3.org/2000/svg" className={props.className}>
        <g id="svgg">
            <path id="path0" d="M29.250 0.269 C 24.122 1.030,17.102 3.862,14.625 6.170 C 14.430 6.351,14.215 6.500,14.147 6.500 C 14.079 6.500,13.925 6.594,13.803 6.708 C 13.682 6.823,13.208 7.214,12.750 7.577 C 11.680 8.426,8.935 11.172,8.078 12.250 C 7.714 12.708,7.315 13.190,7.191 13.320 C 6.791 13.742,4.860 16.756,4.233 17.936 C 1.611 22.876,0.026 28.821,0.006 33.796 L 0.000 35.176 2.375 35.130 L 4.750 35.083 4.853 33.083 C 4.910 31.983,5.087 30.408,5.246 29.583 C 5.406 28.758,5.570 27.896,5.611 27.667 C 5.728 27.017,6.918 23.510,7.336 22.583 C 8.421 20.178,8.705 19.677,10.399 17.167 C 11.271 15.875,11.362 15.756,12.448 14.500 C 13.342 13.466,15.627 11.307,16.333 10.828 C 16.654 10.611,16.954 10.386,17.000 10.328 C 17.545 9.643,21.889 7.299,24.101 6.497 C 30.482 4.183,38.123 4.220,43.750 6.592 C 46.143 7.601,48.981 9.137,50.187 10.076 C 50.428 10.263,50.840 10.567,51.102 10.750 C 53.907 12.708,57.953 17.719,59.581 21.250 C 60.545 23.341,61.022 24.417,60.984 24.417 C 60.963 24.417,61.107 24.904,61.304 25.500 C 62.011 27.629,62.796 32.462,62.829 34.880 C 62.833 35.152,63.027 35.172,65.208 35.130 L 67.583 35.083 67.575 34.500 C 67.559 33.436,67.324 29.953,67.261 29.850 C 67.227 29.795,67.154 29.450,67.097 29.083 C 66.852 27.486,65.624 22.828,65.339 22.417 C 65.276 22.325,65.087 21.875,64.921 21.417 C 64.231 19.525,61.588 14.712,61.136 14.528 C 61.061 14.497,61.000 14.398,61.000 14.308 C 61.000 14.217,60.906 14.038,60.792 13.911 C 60.677 13.783,60.508 13.582,60.417 13.464 C 58.889 11.503,56.169 8.641,54.833 7.589 C 47.124 1.520,38.142 -1.050,29.250 0.269 M82.333 34.750 L 82.333 58.833 100.417 58.833 L 118.500 58.833 118.500 49.833 L 118.500 40.833 113.500 40.833 L 108.500 40.833 108.500 44.250 L 108.500 47.667 101.500 47.667 L 94.500 47.667 94.500 34.750 L 94.500 21.833 101.500 21.833 L 108.500 21.833 108.500 26.833 L 108.500 31.833 113.833 31.833 L 119.167 31.833 119.167 21.250 L 119.167 10.667 100.750 10.667 L 82.333 10.667 82.333 34.750 M146.060 27.792 C 146.120 37.210,146.174 47.860,146.179 51.458 L 146.190 58.000 152.178 58.000 L 158.167 58.000 158.167 49.250 L 158.167 40.500 164.268 40.500 C 169.799 40.500,170.359 40.525,170.266 40.767 C 170.123 41.140,169.961 57.498,170.096 57.958 L 170.206 58.333 175.936 58.333 L 181.667 58.333 181.667 48.250 L 181.667 38.167 179.833 38.167 L 178.000 38.167 178.000 36.583 L 178.000 35.000 179.833 35.000 L 181.667 35.000 181.667 22.833 L 181.667 10.667 163.809 10.667 L 145.951 10.667 146.060 27.792 M188.667 34.750 L 188.667 58.833 206.750 58.833 L 224.833 58.833 224.833 49.833 L 224.833 40.833 219.833 40.833 L 214.833 40.833 214.833 44.250 L 214.833 47.667 207.833 47.667 L 200.833 47.667 200.833 34.750 L 200.833 21.833 207.833 21.833 L 214.833 21.833 214.833 26.833 L 214.833 31.833 220.165 31.833 L 225.497 31.833 225.497 21.250 L 225.498 10.667 207.082 10.667 L 188.667 10.667 188.667 34.750 M231.667 35.000 L 231.667 59.000 249.667 59.000 L 267.667 59.000 267.667 52.917 L 267.667 46.833 255.500 46.833 L 243.333 46.833 243.333 28.917 L 243.333 11.000 237.500 11.000 L 231.667 11.000 231.667 35.000 M274.667 35.000 L 274.667 59.000 292.000 59.000 L 309.333 59.000 309.333 53.000 L 309.333 47.000 297.750 47.000 L 286.167 47.000 286.167 43.833 L 286.167 40.667 293.667 40.667 L 301.167 40.667 301.167 41.750 L 301.167 42.833 302.333 42.833 L 303.500 42.833 303.500 35.000 L 303.500 27.167 302.333 27.167 L 301.167 27.167 301.167 28.250 L 301.167 29.333 293.417 29.333 L 285.667 29.333 285.667 26.667 L 285.667 24.000 297.500 24.000 L 309.333 24.000 309.333 17.500 L 309.333 11.000 292.000 11.000 L 274.667 11.000 274.667 35.000 M126.391 21.792 C 126.603 41.901,126.707 50.936,126.744 52.417 C 126.764 53.242,126.793 54.835,126.807 55.958 L 126.833 58.000 132.583 58.000 L 138.333 58.000 138.333 34.750 L 138.333 11.500 132.308 11.500 L 126.283 11.500 126.391 21.792 M171.000 22.917 L 171.000 27.167 164.333 27.167 L 157.667 27.167 157.667 22.917 L 157.667 18.667 164.333 18.667 L 171.000 18.667 171.000 22.917 M2.500 42.911 C 2.500 43.106,2.841 43.164,4.208 43.203 L 5.917 43.250 5.964 45.042 C 6.008 46.696,6.036 46.833,6.339 46.833 C 6.647 46.833,6.667 46.710,6.667 44.750 L 6.667 42.667 4.583 42.667 C 2.865 42.667,2.500 42.709,2.500 42.911 M10.500 56.833 L 10.500 60.000 13.667 60.000 L 16.833 60.000 16.833 56.833 L 16.833 53.667 13.667 53.667 L 10.500 53.667 10.500 56.833 M50.167 57.583 L 50.167 61.500 54.083 61.500 L 58.000 61.500 58.000 57.583 L 58.000 53.667 54.083 53.667 L 50.167 53.667 50.167 57.583 M37.167 65.583 L 37.167 69.333 40.917 69.333 L 44.667 69.333 44.667 65.583 L 44.667 61.833 40.917 61.833 L 37.167 61.833 37.167 65.583 M23.500 65.583 L 23.500 69.167 27.083 69.167 L 30.667 69.167 30.667 65.583 L 30.667 62.000 27.083 62.000 L 23.500 62.000 23.500 65.583 " stroke="none" fill="#ccd3d3" fill-rule="evenodd"></path><path id="path1" d="M316.833 35.000 L 316.833 59.000 334.167 59.000 L 351.500 59.000 351.500 53.000 L 351.500 47.000 339.917 47.000 L 328.333 47.000 328.333 43.833 L 328.333 40.667 335.750 40.667 L 343.167 40.667 343.167 41.750 L 343.167 42.833 344.333 42.833 L 345.500 42.833 345.500 35.000 L 345.500 27.167 344.333 27.167 L 343.167 27.167 343.167 28.250 L 343.167 29.333 335.417 29.333 L 327.667 29.333 327.667 26.667 L 327.667 24.000 339.583 24.000 L 351.500 24.000 351.500 17.500 L 351.500 11.000 334.167 11.000 L 316.833 11.000 316.833 35.000 M364.838 19.708 L 364.844 28.417 365.637 30.248 L 366.431 32.079 368.208 33.331 C 369.185 34.020,369.988 34.632,369.992 34.691 C 369.997 34.750,369.179 35.387,368.176 36.107 L 366.352 37.415 365.592 38.999 L 364.833 40.583 364.833 49.542 L 364.833 58.500 370.583 58.500 L 376.333 58.500 376.333 49.583 L 376.333 40.667 382.417 40.667 L 388.500 40.667 388.500 49.583 L 388.500 58.500 394.250 58.500 L 400.000 58.500 400.000 49.769 L 400.000 41.038 399.242 39.219 L 398.484 37.400 396.662 36.095 C 395.660 35.378,394.871 34.741,394.908 34.681 C 394.945 34.621,395.760 34.014,396.719 33.332 C 398.455 32.097,398.465 32.086,399.231 30.544 L 400.000 28.996 400.000 19.998 L 400.000 11.000 394.250 11.000 L 388.500 11.000 388.500 19.833 L 388.500 28.667 382.417 28.667 L 376.333 28.667 376.333 19.833 L 376.333 11.000 370.583 11.000 L 364.833 11.000 364.838 19.708 M56.000 44.250 L 56.000 50.000 61.833 50.000 L 67.667 50.000 67.667 44.250 L 67.667 38.500 61.833 38.500 L 56.000 38.500 56.000 44.250 M1.333 45.167 L 1.333 47.167 3.684 47.167 C 5.760 47.167,6.024 47.136,5.934 46.903 C 5.879 46.758,5.833 45.858,5.833 44.903 L 5.833 43.167 3.583 43.167 L 1.333 43.167 1.333 45.167 " stroke="none" fill="#6454a4" fill-rule="evenodd"></path><path id="path2" d="M158.244 49.167 C 158.244 53.979,158.266 55.948,158.292 53.542 C 158.318 51.135,158.318 47.198,158.292 44.792 C 158.266 42.385,158.244 44.354,158.244 49.167 M170.039 46.667 C 170.039 46.987,170.073 47.119,170.115 46.958 C 170.157 46.798,170.157 46.535,170.115 46.375 C 170.073 46.215,170.039 46.346,170.039 46.667 M16.833 56.830 L 16.833 59.993 13.625 60.042 L 10.417 60.091 13.708 60.129 L 17.000 60.167 17.000 56.917 C 17.000 55.129,16.962 53.667,16.917 53.667 C 16.871 53.667,16.833 55.090,16.833 56.830 " stroke="none" fill="#d4d4d4" fill-rule="evenodd"></path><path id="path3" d="M5.896 45.083 C 5.896 46.092,5.924 46.483,5.957 45.952 C 5.990 45.422,5.990 44.597,5.956 44.119 C 5.922 43.641,5.895 44.075,5.896 45.083 " stroke="none" fill="#d0b4bc" fill-rule="evenodd"></path><path id="path4" d="M5.896 45.083 C 5.896 46.092,5.924 46.483,5.957 45.952 C 5.990 45.422,5.990 44.597,5.956 44.119 C 5.922 43.641,5.895 44.075,5.896 45.083 " stroke="none" fill="#d0b4bc" fill-rule="evenodd">
            </path>
        </g>
    </svg>
);