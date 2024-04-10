import * as yup from 'yup';
import { string } from 'yup/lib/locale';

export interface IAddPersonneRequest {
    nom: string;
    prenom: string;
    age: number;
}

export interface IUpdatePersonneRequest {
    id: string;
    nom: string;
    prenom: string;
    age: number;
}

export interface IDeletePersonneRequest {
    id: string;
}

export interface IGetPersonneRequest {
    id: string;
}

export const addPersonneValidator: yup.SchemaOf<IAddPersonneRequest> = yup.object().shape({
    nom: yup.string().trim().required("Un nom est requis..."),
    prenom: yup.string().trim().required("Un prénom est requis..."),
    age: yup.number()
        .min(18, "Veuillez saisir au moins un age à 18ans")
        .max(100, "Saisissez un age qui ne dépasse pas 100 ans !").required(),
});

export const updatePersonneValidator: yup.SchemaOf<IUpdatePersonneRequest> = yup.object().shape({
    id: yup.string().required("Veuillez saisir un ID valide."),
    nom: yup.string().trim().required("Un nom est requis..."),
    prenom: yup.string().trim().required("Un prénom est requis..."),
    age: yup.number()
        .min(18, "Veuillez saisir au moins un age à 18ans")
        .max(100, "Saisissez un age qui ne dépasse pas 100 ans !")
        .required(),
});

export const deletePersonneValidator: yup.SchemaOf<IDeletePersonneRequest> = yup.object().shape({
    id: yup.string().required("Veuillez saisir un ID valide."),
});

export const getPersonneValidator: yup.SchemaOf<IGetPersonneRequest> = yup.object().shape({
    id: yup.string().required("Veuillez saisir un ID valide."),
});