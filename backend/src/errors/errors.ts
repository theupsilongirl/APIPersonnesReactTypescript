export enum ErrorCodes {
    PERSONNE_NOT_FOUND = 'PERSONNE_NOT_FOUND',
    INTERNAL_SERVER_ERROR = 'INTERNAL_SERVER_ERROR',
    REQ_VALIDATION_ERROR = 'REQ_VALIDATION_ERROR'
}

export enum ErrorDescriptions {
    PERSONNE_NOT_FOUND_DESCRIPTION = 'Personne not found',
    INTERNAL_SERVER_ERROR_DESCRIPTION = 'Internal Server Error',
    REQ_VALIDATION_ERROR_DESCRITPION = 'Req validation Error'
}

export class AppError extends Error {
    constructor(public code: ErrorCodes, public description: ErrorDescriptions) {
        super('Internal Server Error');
    }

    public getCode(): ErrorCodes {
        return this.code;
    }

    public getDescription(): ErrorDescriptions {
        return this.description;
    }

}

export class PersonneNotFoundError extends AppError {
    constructor() {
        super(ErrorCodes.PERSONNE_NOT_FOUND, ErrorDescriptions.PERSONNE_NOT_FOUND_DESCRIPTION);
    }
}

export class InternalServerError extends AppError {
    constructor() {
        super(ErrorCodes.INTERNAL_SERVER_ERROR, ErrorDescriptions.INTERNAL_SERVER_ERROR_DESCRIPTION);
    }
}

export class ReqValidationError extends AppError {
    constructor() {
        super(ErrorCodes.REQ_VALIDATION_ERROR, ErrorDescriptions.REQ_VALIDATION_ERROR_DESCRITPION);
    }
}