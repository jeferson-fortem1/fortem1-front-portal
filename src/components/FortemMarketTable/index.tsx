import * as React from 'react';
import { useIntl } from 'react-intl';
import styled from 'styled-components';
import ReactPaginate from 'react-paginate';

import { CryptoIcon } from 'src/components/CryptoIcon';


interface MarketTableProps {
	columns: any;
	data: any;
}
const TableStyles = styled.div`
	table {
		width: 100%;
		border-spacing: 0;
		th,
		td {
			margin: 0;
			cursor: pointer;
			font-size: 14px;
			color: #f5f5f5;
			text-align: justify;
			padding-top: 15px;
			padding-bottom: 15px;
			padding-right: 10px;
			padding-left: 10px;
			transition: all 0.2s;
			background-color: var(--subheader-background-color);
		}
		tr {
			border-top: 0.5px solid var(--header-background-color);

			&:hover {
				background-color: var(--sidebar-item-background-color-hover) !important;
			}
		}
		th {
			font-weight: 600;
			font-size: 14px;
			line-height: 150%;
			color: var(--primary-text-color);
			background-color: var(--header-background-color);
			letter-spacing: 0.2px;
		}
		th:not(:first-child) {
			text-align: center;
		}
		th:first-child {
			padding-left: 35px;
		}
		tr td:not(:first-child) {
			text-align: center;
		}
		tr:hover td {
			background-color: var(--body-background-color-level-5);
			color: var(--primary-text-color);
		}
	}
`;
export const FortemMarketTable: React.FC<MarketTableProps> = (props: MarketTableProps) => {
	const { data } = props;
	const intl = useIntl();

	const NUMBER_ITEM_DISPLAY = 5;
	const [paginationState, setPaginationState] = React.useState(0);

	const handlePageClick = (selectedItem: { selected: number }) => {
		setPaginationState(selectedItem.selected);
	};

	return (
		<React.Fragment>
			<TableStyles>
				<table>
					<thead>
						<tr>
							<th scope="col">{intl.formatMessage({ id: 'page.body.marketsTable.header.pair' })}</th>
							<th scope="col">{intl.formatMessage({ id: 'page.body.marketsTable.header.lastPrice' })}</th>
							<th scope="col">{intl.formatMessage({ id: 'page.body.marketsTable.header.change' })}</th>
							<th scope="col">{intl.formatMessage({ id: 'page.body.marketsTable.header.high' })}</th>
							<th scope="col">{intl.formatMessage({ id: 'page.body.marketsTable.header.low' })}</th>
							{/* <th scope="col">{intl.formatMessage({ id: 'page.body.marketsTable.header.volume' })}</th> */}
							{/* <th scope="col">{intl.formatMessage({ id: 'page.body.marketsTable.header.trade' })}</th> */}
						</tr>
					</thead>
					<tbody>
						{data
							.slice(
								paginationState * NUMBER_ITEM_DISPLAY,
								paginationState * NUMBER_ITEM_DISPLAY + NUMBER_ITEM_DISPLAY,
							)
							.map(item => {

								const code = (item.pair).toLowerCase;
								// const marketName = item.name.split('/');
								return (
									<tr>
										<td>{item.pair}</td>
										<td>{item.last}</td>
										
										<td>{item.price_change_percent}</td> {/*change here*/}
										<td>{item.high}</td>
										<td>{item.low}</td>
										{/* <td>{item.volume}</td> */}
										<td>{item.trade}</td>
									</tr>
								);
							})}
					</tbody>
				</table>
			</TableStyles>
			<div id="udon-market__pagination" className="w-100 d-flex flex-row">
				<ReactPaginate
					previousLabel={'<'}
					nextLabel={'>'}
					breakLabel={'...'}
					breakClassName={'break-me'}
					pageCount={data.length / NUMBER_ITEM_DISPLAY}
					marginPagesDisplayed={2}
					pageRangeDisplayed={5}
					onPageChange={handlePageClick}
					containerClassName={'pagination'}
					activeClassName={'active'}
					forcePage={paginationState}
				/>
			</div>
		</React.Fragment>
	);
};
