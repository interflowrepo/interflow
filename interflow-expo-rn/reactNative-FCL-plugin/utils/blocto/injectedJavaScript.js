export const injectedJavaScript= `

let origin = window.location.origin
localStorage.clear();

let x = 0
window.addEventListener('message', (event) => {
    window.ReactNativeWebView.postMessage(JSON.stringify(event));
    let local = localStorage.getItem('ajs_user_traits');
    window.ReactNativeWebView.postMessage(local);
});

window.addEventListener('storage', () => {
    window.ReactNativeWebView.postMessage('WAS HEREEEE!! LETS GOOOOO');
});

window.onstorage = () => {
    window.ReactNativeWebView.postMessage('WAS HEREEEE!! LETS GOOOOO 12333333');
};
`