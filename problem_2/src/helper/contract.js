// Including crypto module
import {nanoid} from "nanoid";

export function randomHashGenerator() {
    return '0x' + [...Array(32)].map(() => Math.floor(Math.random() * 16).toString(16)).join('')
}

