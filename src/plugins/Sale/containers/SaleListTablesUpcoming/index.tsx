
import * as React from 'react';

import { Col, Empty, Menu, message, Row } from 'antd';
import { useDispatch, useSelector } from 'react-redux';

import { activeSaleListFetch } from 'src/modules/sale/sale-list';
import { endedSaleListFetch } from 'src/modules/sale/sale-list';
import { upComingSaleListFetch } from 'src/modules/sale/sale-list';
import { onGoingSaleListFetch } from 'src/modules/sale/sale-list';
import { selectSaleList } from 'src/modules/sale/sale-list';


import { IEOItem } from '../../components';
import './SaleListTables.css';

export const SaleListTablesUpcoming: React.FC = () => {
	// dispatch Fetch Wallets Of User Action
	const dispatch = useDispatch();
	const dispatchActiveSaleListFetch = React.useCallback(() => dispatch(activeSaleListFetch()), [dispatch]);
	const dispatchUpcomingSaleListFetch = React.useCallback(() => dispatch(upComingSaleListFetch()), [dispatch]);
	const dispatchOnGoingSaleListFetch = React.useCallback(() => dispatch(onGoingSaleListFetch()), [dispatch]);
	const dispatchEndedSaleListFetch = React.useCallback(() => dispatch(endedSaleListFetch()), [dispatch]);

	const saleList = useSelector(selectSaleList);

	React.useEffect(() => {
		// dispatch Active Sale List Fetch in one time
		dispatchActiveSaleListFetch();
	
	}, [dispatchActiveSaleListFetch]);

	const handleSelectMenuItem = ({ key, domEvent }) => {
		switch (key) {
			case 'active':
				dispatchActiveSaleListFetch();
				break;
			case 'upcoming':
				dispatchUpcomingSaleListFetch();
				break;
			case 'ongoing':
				dispatchOnGoingSaleListFetch();
				break;
			case 'ended':
				dispatchEndedSaleListFetch();
				break;
			default:
				dispatchActiveSaleListFetch();
				break;
		}
	};

	let saleItems;
	if (saleList.payload.length === 0) {
		saleItems = (
			<div className="col-12 d-flex justify-content-center">
				<Empty
					image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
					imageStyle={{ marginTop: '3rem' }}
					description={<span>Nenhuma captação encontrada no momento</span>}
				/>
			</div>
		);
	} else {
		saleItems = [...saleList.payload].map(sale => {
			return (
				<Col key={sale.id}>
					<IEOItem key={sale.id} sale={sale} type={sale.type} />
				</Col>
			);
		});
	}

	React.useEffect(() => {
		if (saleList.loading) {
			message.loading('', 0);
		} else {
			message.destroy();
		}

		return () => {
			message.destroy();
		};
	}, [saleList.loading]);

	return (
		
		<div style={{gap: '20px', marginTop: '35px',  display: 'flex', justifyContent: 'space-evenly', position: 'relative'}}>{saleItems}</div>

		
	);
};
