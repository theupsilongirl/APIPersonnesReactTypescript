import * as api from './api';

import { useState, useEffect } from 'react';
import { IRemoteData } from './remote-data';
import { IPersonne, IPersonneToCreate } from '../models/Personne';

export const useListPersonnes = () => {
    const [personnes, setPersonnes] = useState<IRemoteData<IPersonne[]>>({ status: 'idle' });

    async function listPersonnes() {
        setPersonnes({ status: 'loading' });
        try {
            const personnes = await api.listPersonnes();
            setPersonnes({
                status: 'done',
                data: personnes,
            })
        }
        catch (err: any) {
            console.log(err);
            setPersonnes({
                status: 'error',
                errorCode: err.errorCode,
                description: err.description,
            })
        }
    };

    useEffect(() => {
        listPersonnes();
    }, []);
    return { personnes, listPersonnes };
}

export const useGetPersonne = () => {
    const [personne, setPersonne] = useState<IRemoteData<IPersonne>>({ status: 'idle' });

    async function getPersonne(id: string) {
        setPersonne({ status: 'loading' });
        try {
            const personne = await api.getPersonne(id);
            setPersonne({
                status: 'done',
                data: personne,
            })
        }
        catch (err: any) {
            setPersonne({
                status: 'error',
                errorCode: err.errorCode,
                description: err.description,
            })
        }
    };
    return { personne, getPersonne };
}

export const useCreatePersonne = () => {
    const [createdPersonne, setCreatedPersonne] = useState<IRemoteData<string>>({ status: 'idle' });

    async function doCreatePersonne(newPers: IPersonneToCreate) {
        setCreatedPersonne({ status: 'loading' });
        try {
            const personneId = await api.createPersonne(newPers);
            setCreatedPersonne({
                status: 'done',
                data: personneId,
            })
        }
        catch (err: any) {
            setCreatedPersonne({
                status: 'error',
                errorCode: err.errorCode,
                description: err.description,
            })
        }
    };
    return { createdPersonne, doCreatePersonne };
}


export const useUpdatePersonne = () => {
    const [updatedPersonne, setUpdatedPersonne] = useState<IRemoteData<void>>({ status: 'idle' });

    async function doUpdatePersonne(personne: IPersonne) {
        setUpdatedPersonne({ status: 'loading' });
        try {
            await api.updatePersonne(personne);
            setUpdatedPersonne({
                status: 'done',
                data: undefined,
            })
        }
        catch (err: any) {
            setUpdatedPersonne({
                status: 'error',
                errorCode: err.errorCode,
                description: err.description,
            })
        }
    };
    return { updatedPersonne, doUpdatePersonne };
}

export const useDeletePersonne = () => {
    const [deletedPersonne, setDeletedPersonne] = useState<IRemoteData<void>>({ status: 'idle' });

    async function doDeletePersonne(id: string) {
        setDeletedPersonne({ status: 'loading' });
        try {
            await api.deletePersonne(id);
            setDeletedPersonne({
                status: 'done',
                data: undefined,
            })
        }
        catch (err: any) {
            console.log('useDeletePersonne : erreur reçue : ', err);
            setDeletedPersonne({
                status: 'error',
                errorCode: err.errorCode,
                description: err.description,
            })
        }
    };
    return { deletedPersonne, doDeletePersonne };
}
