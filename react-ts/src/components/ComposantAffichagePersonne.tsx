import { IPersonne } from "../models/Personne";
import * as React from 'react';

export interface IComposantAffichagePersonneProps {
    personne: IPersonne;
}

export const ComposantAffichagePersonne = (props: IComposantAffichagePersonneProps) : JSX.Element => {

    return (
        <>
            <p>Id: {props.personne.id}</p>
            <p>Nom : {props.personne.nom}</p>
            <p>Prénom : {props.personne.prenom}</p>
            <p>Age: {props.personne.age}</p>
        </>
    );
}
