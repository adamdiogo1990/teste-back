import validate from 'validate.js';

const { DB_HOST, DB_PORT } = process.env

export const validateURL = (value: string) => {
    return validate({ website: value }, {
        website: {
            url: {
                allowLocal: true
            }
        }
    });
}


export const getBase = () => {
    return `${DB_HOST}:${DB_PORT}`
}