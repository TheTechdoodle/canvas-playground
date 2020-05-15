let frameFetchWaiting = {};
let frameFetchOrigin = null;

window.frameFetch = function()
{
    let unique = Math.random().toString(36).substr(2, 9);
    parent.window.postMessage({frameFetchID: unique, arguments: Array.from(arguments)}, frameFetchOrigin);
    return new Promise((resolve, reject) =>
    {
        frameFetchWaiting[unique] = {resolve, reject};
    });
};

window.addEventListener('message', (event) =>
{
    if(event.data.hasOwnProperty('frameFetchID'))
    {
        if(event.data.hasOwnProperty('resolve'))
        {
            frameFetchWaiting[event.data.frameFetchID].resolve(event.data.resolve);
        }
        else if(event.data.hasOwnProperty('reject'))
        {
            frameFetchWaiting[event.data.frameFetchID].reject(...event.data.reject);
        }
    }
    else if(event.data.frameFetchReady)
    {
        frameFetchOrigin = event.origin;
    }
}, false);
