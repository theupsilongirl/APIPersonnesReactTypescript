
import './App.css';
import * as React from 'react';
import { ComposantSaisiePersonne } from './components/ComposantSaisiePersonne';
import { IPersonne, IPersonneToCreate } from './models/Personne';
import { ComposantAffichagePersonne } from './components/ComposantAffichagePersonne';
import { useEffect, useState } from 'react';
import { ComposantListePersonnes } from './components/ComposantListePersonnes';
import { useCreatePersonne, useDeletePersonne, useListPersonnes, useUpdatePersonne } from './services/use-personne-service';
import { ComposantSuppressionPersonne } from './components/ComposantSuppressionPersonne';

const defaultPersonne: IPersonne = {
  id: '',
  nom: 'NOM',
  prenom: 'PRENOM',
  age: 18,
};

function App() {
  const { personnes, listPersonnes } = useListPersonnes();

  const [currentPersonne, setCurrentPersonne] = useState<IPersonne>(defaultPersonne);

  const { createdPersonne, doCreatePersonne } = useCreatePersonne();
  const { updatedPersonne, doUpdatePersonne } = useUpdatePersonne();
  const { deletedPersonne, doDeletePersonne } = useDeletePersonne();

  function createPersonne(newPersonne: IPersonneToCreate) {
    doCreatePersonne(newPersonne);
    //    setEntier(entier + 1);
    listPersonnes();
  }

  function updatePersonne(newPersonne: IPersonne) {
    doUpdatePersonne(newPersonne);
    //  setEntier(entier + 1);
    listPersonnes();
  }

  function deletePersonne(id: string) {
    doDeletePersonne(id);
    // setEntier(entier + 1);
    listPersonnes();
  }

  return (
    <div className="App">
      <p> Saisie d'une nouvelle personne</p>
      <hr />
      <ComposantSaisiePersonne savePersonne={createPersonne} />
      {createdPersonne.status === 'idle' &&
        <p>createdPersonne : idle</p>
      }
      {createdPersonne.status === 'loading' &&
        <p>createdPersonne: loading</p>
      }
      {createdPersonne.status === 'done' &&
        <p>createdPersonne: done. Id = {createdPersonne.data}</p>
      }
      {createdPersonne.status === 'error' &&
        <div>
          <p>createdPersonne: error...</p>
          <p>ErrorCode : {createdPersonne.errorCode}</p>
          <p>ErrorDescrtiption: {createdPersonne.description}</p>
        </div>
      }

      {/* Partie liée à la Liste des personnes */}
      <p> Liste des personnes</p>
      <hr />
      {personnes.status === 'idle' &&
        <div>Chargement des personnes : inactif...</div>
      }

      {personnes.status === 'loading' &&
        <div>Chargement de la liste des personnes...</div>
      }
      {personnes.status === 'done' &&
        <ComposantListePersonnes personnes={personnes.data} setCurrentPersonne={setCurrentPersonne} />
      }
      {personnes.status === 'error' &&
        <div>
          <p>Problème à l'obtention de la liste des personnes !</p>
          <p>{personnes.errorCode}</p>
          <p>{personnes.description}</p>
        </div>
      }

      <p> Modification d'une personne</p>
      <hr />
      <ComposantSaisiePersonne personne={currentPersonne} savePersonne={updatePersonne} />
      {updatedPersonne.status === 'idle' &&
        <p>PersonneToUpdate : idle</p>
      }
      {updatedPersonne.status === 'loading' &&
        <p>PersonneToUpdate: loading...</p>
      }
      {updatedPersonne.status === 'done' &&
        <p>PersonneToUpdate: done</p>
      }
      {updatedPersonne.status === 'error' &&
        <>
          <p>PersonneToUpdate: status : error...</p>
          <p>  ErrorCode : {updatedPersonne.errorCode}</p>
          <p>  ErrorDescription: {updatedPersonne.description}</p>
        </>
      }

      <p> Affichage d'une personne</p>
      <hr />
      <ComposantAffichagePersonne personne={currentPersonne} />

      <p> Suppression d'une personne :</p>
      <hr />
      <ComposantSuppressionPersonne onDeletePersonne={deletePersonne} />
      {deletedPersonne.status === 'idle' &&
        <p>deletedPersonne : idle</p>
      }
      {deletedPersonne.status === 'loading' &&
        <p>deletedPersonne: loading...</p>
      }
      {deletedPersonne.status === 'done' &&
        <p>deletedPersonne: done</p>
      }
      {
        deletedPersonne.status === 'error' &&
        <>
          <p>deletedPersonne: status : error...</p>
          <p>  ErrorCode : {deletedPersonne.errorCode}</p>
          <p>  Description: {deletedPersonne.description}</p>
        </>
      }
    </div>
  );
}

export default App;
