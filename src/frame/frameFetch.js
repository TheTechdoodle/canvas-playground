import {framePromise} from './framePromise';

export function frameFetch(...args)
{
    return framePromise('fetch', ...args);
}
