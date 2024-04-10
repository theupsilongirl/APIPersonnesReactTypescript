import { Request, Response, NextFunction } from 'express';
import { ValidationError } from 'yup';
import { AppError, ErrorCodes, ErrorDescriptions } from '../errors/errors';

export function errorMiddleware(error: any, request: Request, response: Response, next: NextFunction) {
    console.log('errorMiddleware:', error);
    if (error instanceof AppError) {
        const appError = error as AppError;
        switch (appError.code) {
            case ErrorCodes.PERSONNE_NOT_FOUND:
                response.status(404).json({
                    errorCode: ErrorCodes.PERSONNE_NOT_FOUND,
                    description: ErrorDescriptions.PERSONNE_NOT_FOUND_DESCRIPTION,
                });
                break;
            default:
                response.status(500).json({
                    errorCode: ErrorCodes.INTERNAL_SERVER_ERROR,
                    description: ErrorDescriptions.INTERNAL_SERVER_ERROR_DESCRIPTION,
                });
                break;
        }
    }
    else if (error instanceof ValidationError) {
        //console.log("Erreur de type ValidationError? : ",error instanceof ValidationError);
        response.status(400).json({
            error: ErrorCodes.REQ_VALIDATION_ERROR,
            description: error.errors.join('.'),
        })
    }
    else {
        console.log("Le type testé n'est pas référencé dans le middleware ! Le type est :", {
            errorType: typeof error,
            content: error
        })
        response.status(500).json({
            errorCode: ErrorCodes.INTERNAL_SERVER_ERROR,
            description: ErrorDescriptions.INTERNAL_SERVER_ERROR_DESCRIPTION,
        });
    }
}
