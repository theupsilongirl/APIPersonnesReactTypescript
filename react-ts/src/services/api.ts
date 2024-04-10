import axios, { AxiosError } from 'axios';
import { IPersonne, IPersonneToCreate } from '../models/Personne';
import { IError } from './error';

const HOST = '127.0.0.1';
const PORT = '8080';
const CTL_PERSONNE = 'personne'

export interface ICreatePersonneAnswer {
    id: string;
}

export async function listPersonnes(): Promise<IPersonne[]> {
    const url = `http://${HOST}:${PORT}/${CTL_PERSONNE}/`;
    try {
        const response = await axios.get<IPersonne[]>(url);
        return response.data;
    }
    catch (error: any) {
        const axiosError = error as AxiosError<IError>;
        throw axiosError.response.data;
    };

}

export async function getPersonne(id: string): Promise<IPersonne> {
    try {
        const response = await axios.get<IPersonne>(`http://${HOST}:${PORT}/${CTL_PERSONNE}/${id}`);
        return response.data;
    }
    catch (error: any) {
        const axiosError = error as AxiosError<IError>;
        throw axiosError.response.data;
    };
}

export async function createPersonne(personne: IPersonneToCreate): Promise<string> {
    try {
        const response = (await axios.post<ICreatePersonneAnswer>(`http://${HOST}:${PORT}/${CTL_PERSONNE}`, personne)).data;
        return response.id;
    }
    catch (error: any) {
        const axiosError = error as AxiosError<IError>;
        throw axiosError.response.data;
    };
}

export async function updatePersonne(personne: IPersonne): Promise<void> {
    try {
        await axios.put<IPersonne>(`http://${HOST}:${PORT}/${CTL_PERSONNE}`, personne);
    }
    catch (error: any) {
        const axiosError = error as AxiosError<IError>;
        throw axiosError.response.data;
    };
}

export async function deletePersonne(id: string): Promise<void> {
    try {
        await axios.delete(`http://${HOST}:${PORT}/${CTL_PERSONNE}/${id}`)
    }
    catch (error: any) {
        const axiosError = error as AxiosError<IError>;
        throw axiosError.response.data;
    };
}

