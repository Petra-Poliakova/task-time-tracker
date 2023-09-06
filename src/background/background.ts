// let user_signed_in = false;
// const CLIENT_ID = encodeURIComponent('');
// const RESPONSE_TYPE = encodeURIComponent('id_token');
// const REDIRECT_URI = encodeURIComponent('');
// const STATE = encodeURIComponent('jsdfgsz');
// const SCOPE = encodeURIComponent('openid');
// const PROMPT = encodeURIComponent('consent');


// function create_oauth2_url() {
//     let nonce = encodeURIComponent(Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15));

//     let url = 
//     `https://accounts.google.com/o/oauth2/v2/auth
//     ?client_id=${CLIENT_ID}
//     &response_type=${RESPONSE_TYPE}
//     &redirect_uri=${REDIRECT_URI}
//     &state=${STATE}
//     &scope=${SCOPE}
//     &prompt=${PROMPT}
//     &nonce=${nonce}
//     `;
//     console.log('url', url);

//     return url
// }

// function is_user_signed_in() {
//     return user_signed_in;
// }

// chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
//     if (request.message === 'login') {
//         //sendResponse({ success: true });
//         if(is_user_signed_in()) {
//             console.log('User is already singed in');
//             sendResponse({ success: true });
//         } else {
//             //create_oauth2_url();
//             chrome.identity.launchWebAuthFlow({
//                 url: create_oauth2_url(),
//                 interactive: true,    
//             }, (redirect_url) => {
//                 console.log(redirect_url);
//                 sendResponse({ success: true });
//             });
//             return true;
//         }

//     } else if (request.message === 'logout') {
//         sendResponse({ success: true });
//     } 

// })

//https://www.youtube.com/watch?v=H-anyDrYHyg&list=PLIckDtOkqwLv56F0c8zbHDivaUQgJr9xw&index=1