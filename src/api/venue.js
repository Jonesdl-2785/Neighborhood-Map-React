// Venue Details - Foursquare
class Helper {
  static baseURL() {
    return 'https://api.foursquare.com/v2'
  }

  static auth() {
    const apiKeys = {
      ClientID_FS: "AZ30DSQHOMZTZLHWUD55U54GUUDWZRAQW0D2DLFWAEPPW51H",
      ClientSecret_FS: "3H0LURYGH1EB1WTIO3WSN4M5YF35ZCGEKSEEQ2KTU5FV1RYS",
      Version: "20181101"
    };

    return Object.keys(apiKeys).map(key => `${key}=${apiKeys[key]}`).join('&');
  }

  static headers() {
    return {
      Accept: 'application/json'
    }
}
  static urlManager(urlParams) {
    if(!urlParams) {
      return ''
    }
    return Object.keys(urlParams).map(key => `${key}=${urlParams[key]}`).join('&')
  }

  static simpleFetch(endPoint, method, urlParams) {
      let fetchData = {
        method,
        headers: Helper.headers()
      };

      return fetch(`${Helper.baseURL()
        }${endPoint}?${Helper.auth()}&${Helper.urlManager(
        urlParams
      )}`,

      fetchData
      ).then(res => res.json());
    };
}
  export default class FourSquareAPI {
    static search(urlParams) {
      return Helper.simpleFetch('/venues/search', 'GET', urlParams);
    }

    static getVenueDetails(VENUE_ID) {
      return Helper.simpleFetch(`/venues/${VENUE_ID}`, 'GET');
   }

   static getVenuePhotos(VENUE_ID) {
     return Helper.simpleFetch(`/venues/${VENUE_ID}/photos`, 'GET');
   }
  }
