let framePromiseWaiting = {};
let framePromiseOrigin = null;

window.addEventListener('message', (event) =>
{
    if(event.data.hasOwnProperty('framePromiseID'))
    {
        if(event.data.hasOwnProperty('resolve'))
        {
            framePromiseWaiting[event.data.framePromiseID].resolve(event.data.resolve);
        }
        else if(event.data.hasOwnProperty('reject'))
        {
            framePromiseWaiting[event.data.framePromiseID].reject(event.data.reject);
        }
    }
    else if(event.data.framePromiseReady)
    {
        framePromiseOrigin = event.origin;
    }
}, false);

export function framePromise(name, ...args)
{
    let unique = Math.random().toString(36).substr(2, 9);
    parent.window.postMessage({framePromiseID: unique, name, args}, framePromiseOrigin);
    return new Promise((resolve, reject) =>
    {
        framePromiseWaiting[unique] = {resolve, reject};
    });
}
