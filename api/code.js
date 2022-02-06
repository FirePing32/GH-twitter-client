import axios from 'axios';
import toDataUrl from "./base64";

const API_URL = 'https://carbonnowsh.herokuapp.com/'
const bgColor = 'rgba(171, 184, 195, 100)'
const theme = 'cobalt'
const gist = 'https://api.github.com/gists/'
var blobdata = ''

const srcCode = (gistID) => {

    axios.get(gist + gistID)
    .then((response) => {
        // handle success
        var filename = response['data']['files']
        var raw_url = response['data']['files'][Object.keys(filename)[0]]['raw_url']
        axios.get(raw_url)
        .then((response) => {
            var endpoint = API_URL + '?code=' + JSON.stringify(response.data) + '&theme=' + theme + '&backgroundColor=' + bgColor
            console.log(endpoint)
            toDataUrl(endpoint, function(myBase64) {
                console.log(myBase64); // myBase64 is the base64 string
                blobdata = myBase64
            })
        })
        .catch((err) => {
            console.log(err)
        })
        
    })
    .catch(function (error) {
        // handle error
        console.log(error);
    })

    return blobdata;

}

export default srcCode;
