import { IError } from './error';

export interface IRemoteDataIdle {
    status: 'idle';
};

export interface IRemoteDataInProgress {
    status: 'loading';
};

export interface IRemoteDataDone<T> {
    status: 'done';
    data: T;
};

export interface IRemoteDataError extends IError {
    status: 'error';
};

export type IRemoteData<T> = IRemoteDataIdle | IRemoteDataInProgress | IRemoteDataDone<T> | IRemoteDataError;