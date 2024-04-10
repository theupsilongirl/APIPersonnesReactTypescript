import * as React from 'react';
import { IPersonne } from '../models/Personne';

import './ComposantListePersonnes.css';

interface ComposantListePersonnesProps {
    personnes: IPersonne[];
    setCurrentPersonne(personne: IPersonne): void;
};

export const ComposantListePersonnes = ({ personnes, setCurrentPersonne }: ComposantListePersonnesProps) => {
    return (
        <table className="tableau">
            <thead>
                <tr>
                    <td>Id</td>
                    <td>Nom</td>
                    <td>Prénom</td>
                    <td>Age</td>
                    <td>Sélectionner cette personne ?</td>
                </tr>
            </thead>
            <tbody>
                {personnes.map((personne) => {
                    return (
                        <tr key={personne.id}>
                            <td>{personne.id || ''}</td>
                            <td>{personne.nom}</td>
                            <td>{personne.prenom}</td>
                            <td>{personne.age} ans</td>
                            <td><button onClick={() => setCurrentPersonne(personne)}>Sélection</button></td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
    )

}

