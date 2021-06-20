export function Remote(url, args) {
	var apiUrl = process.env.API_URL;
	var apiKey = process.env.API_KEY;
	var apiLanguage = process.env.LANGUAGE;

	var queryData = { api_key : apiKey, language : apiLanguage }

	if (typeof args !== 'undefined') {
		Object.assign(queryData, args); 
	}

	var serverUrl = apiUrl + url + '?' + encodeQueryData(queryData);

	return serverUrl;
}

function encodeQueryData(data) {
   let ret = [];
   for (let d in data)
     ret.push(encodeURIComponent(d) + '=' + encodeURIComponent(data[d]));
   return ret.join('&');
}