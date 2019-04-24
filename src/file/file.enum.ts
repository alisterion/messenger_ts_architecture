export enum FILE_STATUS {
    COMPLETED = 'COMPLETED',
    CANCELED = 'CANCELED',
    ABORTED = 'ABORTED',
    FAILED = 'FAILED',
    CREATED = 'CREATED',
    IN_PROGRESS = 'IN_PROGRESS',
}

export enum FILE_EVENTS {
    UPLOAD_PROGRESS = 'upload_progress',
    FILE_UPLOADED = 'file_uploaded',
    ERROR = 'error',
    ABORTED = 'aborted',
}
