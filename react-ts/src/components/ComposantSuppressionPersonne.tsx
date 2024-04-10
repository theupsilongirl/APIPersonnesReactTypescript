import * as React from 'react';
import { useState } from 'react';
import { Field, Form } from 'react-final-form';

// import './ComposantSuppressionPersonne.css';

interface ComposantSuppressionPersonneProps {
    onDeletePersonne(id: string): void;
};

interface IDeletePersonne {
    id: string;
}

export const ComposantSuppressionPersonne = ({ onDeletePersonne }: ComposantSuppressionPersonneProps) => {
    const [currentId, setCurrentId] = useState<IDeletePersonne>({ id: '' });

    function doDeletePersonne(values: IDeletePersonne) {
        console.log('DoDeletePersonne : currentId : ', values.id);
        if (values.id) {
            onDeletePersonne(values.id);
        }
    }


    return (
        <div style={{ borderWidth: '1px', borderColor: '#000000' }}>
            <p>Veuillez indiquer l'ID de la personne à supprimer :</p>
            <Form<IDeletePersonne>
                onSubmit={(values) => { doDeletePersonne(values) }}
                initialValues={currentId}
                validate={(values) => {
                    const errors: any = {};
                    if (!values.id) {
                        errors.id = "Veuillez renseigner l'ID...'";
                    }
                    return errors;
                }}
                render={({ handleSubmit, submitting, form, values }) => (
                    <form onSubmit={handleSubmit}>
                        <Field name="id">
                            {({ meta, input }) => {
                                return (
                                    <div>
                                        <label>Id : </label>
                                        <input {...input} type="text" placeholder="ID" />
                                        {meta.error && meta.touched && <span className='error'><br />{meta.error}</span>}
                                    </div>
                                )
                            }}
                        </Field>
                        <button type="submit" disabled={submitting}>
                            Submit
                        </button>
                    </form>
                )}
            />
        </div>
    )
}