import { RootState } from '../../../index';
import { IEOItemState } from './types';

export const selectIEOItem = (state: RootState): IEOItemState => state.IEO.IEOItem;
