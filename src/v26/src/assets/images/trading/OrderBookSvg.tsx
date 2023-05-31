import * as React from 'react';

interface OrderBookSvgProps {
	active?: boolean;
}

type Props = React.SVGProps<SVGSVGElement> & OrderBookSvgProps;

export const OrderBookSvg: React.FC<Props> = ({ active, ...props }) => (
<svg width="22px" height="18px" viewBox="0 0 22 18" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
    <g id="✅全屏交易" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
        <g id="⚡️-交易-copy-13" transform="translate(-1305.000000, -77.000000)">
            <g id="Group-4">
                <g id="Order_book" transform="translate(1284.000000, 64.000000)">
                    <g id="header">
                        <g id="Group" transform="translate(16.000000, 8.000000)">
                            <g id="Icons/Order/1" transform="translate(1.000000, 0.000000)">
                                <g id="Icons/Depth" transform="translate(4.000000, 5.000000)">
                                    <path d="M1,0 L15,0 C15.5522847,-1.01453063e-16 16,0.44771525 16,1 L16,2 L0,2 L0,1 C-6.76353751e-17,0.44771525 0.44771525,1.01453063e-16 1,0 Z" id="Rectangle-16" fill="#F55656"></path>
                                    <rect id="Rectangle-16-Copy" fill="#F55656" x="0" y="4" width="16" height="2"></rect>
                                    <rect id="Rectangle-16-Copy-2" fill="#36B37E" x="0" y="8" width="16" height="2"></rect>
                                    <path d="M0,12 L16,12 L16,13 C16,13.5522847 15.5522847,14 15,14 L1,14 C0.44771525,14 6.76353751e-17,13.5522847 0,13 L0,12 Z" id="Rectangle-16-Copy-3" fill="#36B37E"></path>
                                </g>
                            </g>
                        </g>
                    </g>
                </g>
            </g>
        </g>
    </g>
</svg>
);

export const OrderBookBuySvg: React.FC<Props> = ({ active, ...props }) => (
<svg width="22px" height="18px" viewBox="0 0 22 18" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
    <g id="Symbols" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
        <g id="Icons/Order/3" transform="translate(-4.000000, -5.000000)" fill="#36B37E">
            <g id="Icons/Depth" transform="translate(4.000000, 5.000000)">
                <path d="M1,0 L15,0 C15.5522847,-1.01453063e-16 16,0.44771525 16,1 L16,2 L0,2 L0,1 C-6.76353751e-17,0.44771525 0.44771525,1.01453063e-16 1,0 Z M0,4 L16,4 L16,6 L0,6 L0,4 Z M0,8 L16,8 L16,10 L0,10 L0,8 Z M0,12 L16,12 L16,13 C16,13.5522847 15.5522847,14 15,14 L1,14 C0.44771525,14 6.76353751e-17,13.5522847 0,13 L0,12 Z" id="Combined-Shape"></path>
            </g>
        </g>
    </g>
</svg>
);

export const OrderBookSellSvg: React.FC<Props> = ({ active, ...props }) => (
<svg width="22px" height="18px" viewBox="0 0 22 18" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
    <g id="Symbols" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
        <g id="Icons/Order/2" transform="translate(-4.000000, -5.000000)" fill="#F55656">
            <g id="Icons/Depth" transform="translate(4.000000, 5.000000)">
                <path d="M1,0 L15,0 C15.5522847,-1.01453063e-16 16,0.44771525 16,1 L16,2 L0,2 L0,1 C-6.76353751e-17,0.44771525 0.44771525,1.01453063e-16 1,0 Z M0,4 L16,4 L16,6 L0,6 L0,4 Z M0,8 L16,8 L16,10 L0,10 L0,8 Z M0,12 L16,12 L16,13 C16,13.5522847 15.5522847,14 15,14 L1,14 C0.44771525,14 6.76353751e-17,13.5522847 0,13 L0,12 Z" id="Combined-Shape"></path>
            </g>
        </g>
    </g>
</svg>
);
