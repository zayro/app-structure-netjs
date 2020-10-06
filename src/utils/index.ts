import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';



/**
 * encrypt data of type string
 * @param {string} data to encrypt
 * @param {number} saltRounds
 * @returns {string} returns data encrypted
 */
export function encrypt(data: string) {
    return bcrypt.hashSync(data, 10);
}


export function compareEncryptedData(password: string, hash: string) {

    return bcrypt.compareSync(password, hash);
}


interface DataResponse {
    status?: boolean;
    data?: object;
    message?: string;
}

export function message(status: boolean, mensaje: string, response?: object,) {

    const data: DataResponse = {};
    data.status = status;
    data.data = response;
    data.message = mensaje;

    return data;
}


/**
 * Returns a JWT token
 * @param {object} data with credentials
 * @param {string} expiresIn optional parameter to add expiration time in token, ej: '1h'
 * @returns {string}  The result of operation: string
 */

export function token(data: object, expiresIn?: string) {

    const secret = 'process.env.JWT_KEY';

    try {

        if (expiresIn) {

            return jwt.sign({ data }, secret, { expiresIn });

        }

        return jwt.sign({ data }, secret);


    } catch (err) {

        throw err;

    }

}


/**
 * Returns if a JWT token is valid
 * @param {string} tokens
 * @returns {boolean} returns according to the validation true or false
 */
export async function checkToken(tokens: string) {

    const secret = process.env.JWT_KEY;

    try {

        return await jwt.verify(tokens, secret) !== 'undefined';

    } catch (err) {

        return err;

    }

}

export function ObjectArray(obj: any) {
    return Object.keys(obj).map((k) => obj[k]);
}
