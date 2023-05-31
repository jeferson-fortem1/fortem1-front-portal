// tslint:disable-next-line
import { API, RequestOptions } from 'src/v26/src/api';
import { getCsrfToken } from 'src/v26/src/helpers';
import { call, put } from 'redux-saga/effects';
import {
	allChildCurrenciesData,
	allChildCurrenciesError,
	WalletsAddressFetch,
	walletsChildCurrenciesData,
	walletsChildCurrenciesError,
} from '../actions';

const createOptions = (csrfToken?: string): RequestOptions => {
	return { apiVersion: 'core', headers: { 'X-CSRF-Token': csrfToken } };
};

export function* childCurrenciesSaga(action: WalletsAddressFetch) {
	try {
		const list = yield call(
			API.get(createOptions(getCsrfToken())),
			`/public/wallet/child/one?currency=${action.payload.currency}`,
		);
		yield put(
			walletsChildCurrenciesData({
				payload: list,
				loading: false,
			}),
		);
	} catch (error) {
		yield put(walletsChildCurrenciesError(error));
	}
}

export function* allChildCurrenciesSaga(action: WalletsAddressFetch) {
	try {
		const list = yield call(API.get(createOptions(getCsrfToken())), `/public/wallet/child/all`);
		yield put(
			allChildCurrenciesData({
				payload: list,
				loading: false,
			}),
		);
	} catch (error) {
		yield put(allChildCurrenciesError(error));
	}
}
