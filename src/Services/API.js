import { API_KEY, BASE_URL } from "../Config"

export const GET =  async (url) =>  {
    const API_URL = `${BASE_URL}${url}?api_keys=${API_KEY}`;
    let response = await fetch(API_URL, {method: 'GET'} );
    response = response.json();

    return response;
}


// export const GET = async url => {
//   const API_URL = `${BASE_URL}${url}?api_key=${API_KEY}`;

//   let response = await fetch(API_URL, {method: 'GET'});
//   response = response.json();
//   return response;
// };
