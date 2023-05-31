import { FetchIEODetail, fetchIEODetailData, fetchIEODetailError } from '../actions';
import { put, call } from 'redux-saga/effects';
import { API, RequestOptions } from 'src/v26/src/api';
import { getCsrfToken } from 'src/v26/src/helpers';
const createOptions = (csrfToken?: string): RequestOptions => {
	return { apiVersion: 'ieo', headers: { 'X-CSRF-Token': csrfToken } };
};

export function* fetchIEODetailSaga(action: FetchIEODetail) {
	try {
		const { ieo_id } = action.payload;
		const response = yield call(API.get(createOptions(getCsrfToken())), `/fetch/ieo_id=${ieo_id}`);
		yield put(
			fetchIEODetailData({
				payload: response,
				loading: true,
			}),
		);
	} catch (error) {
		yield put(fetchIEODetailError(JSON.stringify(error.message)));
	}
}
