import { IPersonne } from '../models/Personne';
import * as React from 'react';
import { Field, Form } from 'react-final-form';

import './ComposantSaisiePersonne.css';

interface ComposantSaisiePersonneProps {
    personne?: IPersonne;
    savePersonne(newPersonne : IPersonne): void;
};

export const ComposantSaisiePersonne = ({personne, savePersonne}: ComposantSaisiePersonneProps) => {

    return (
        <>
            <Form<IPersonne> onSubmit={(values) => { savePersonne(values) } }
                initialValues={personne}
                validate={(values) => {
                    const errors: any = {};
                    if (!values.nom) {
                        errors.nom = "Veuillez renseigner le nom";
                    }
                    if (!values.prenom) {
                        errors.prenom = "Veuillez renseigner le prénom";
                    }
                    if (values.age < 0 || values.age > 100) {
                        errors.age = "Veuillez renseigner un âge positif et inférieur à 100";
                    }
                    return errors;
                }}
                render={({ handleSubmit, submitting,  form, values }) => (
                    <form onSubmit={handleSubmit}>
                        <Field name="nom">
                            {({ meta, input }) => {
                                return (
                                    <div>
                                        <label>Nom : </label>
                                        <input {...input} type="text" placeholder="Nom" />

                                        {meta.error && meta.touched && <span className='error'><br />{meta.error}</span>}
                                    </div>
                                )
                            }}
                        </Field>
                        <Field name="prenom">
                            {({ meta, input }) => {
                                return (
                                    <div>
                                        <label>Prénom : </label>
                                        <input {...input} type="text" placeholder="Prénom" />
                                        {meta.error && meta.touched && <span className='error'><br />{meta.error}</span>}
                                    </div>
                                );
                            }}

                        </Field>
                        <Field name="age">
                            {({ meta, input }) => {
                                return (
                                    <div>
                                        <label>Age : </label>
                                        <input {...input} type="number" min={18} max={100} placeholder="Age" />
                                        {meta.error && meta.touched && <span className='error'><br />{meta.error}</span>}
                                    </div>
                                );
                            }}


                        </Field>
                        <button type="submit" disabled={submitting}>
                            Submit
                        </button>
                    </form>
                )

                }
            />
        </>

    );
};