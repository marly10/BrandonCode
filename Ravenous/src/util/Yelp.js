const apiKey = "bUJ-53xJYBJizhAVCVrEpUvQoVgHfHukDUieEHq1Osk3gff9t7HWpjy5BvljGsmrkmprXuMyDLjGkgMVyeXnwf58Fe-R7zKYHrMacE7j0BhuIXRdO7ahuOESD2IFX3Yx";

const Yelp = {   //stores functionality needed to interact with the Yelp API
    search(term,location,sortBy) {   //retrieves search results from the Yelp API 
        //returns a promise that ultimately resolves to the list of businesses 
        //inorder to retrieve businesses, we'll have to hit the (/businesses) endpoint of the Yelp API
        //uses String Interpolation to pass the parameters in as variables in the path below
        //then prepends CORS Anywhere to bypass CORS restrictions 
        //CORS Anywhere takes requests sent to its API endpoint, makes them for the requesting app with the proper CORS permissions, and then returns the response back to the requesting app.
        return fetch(`https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=${term}&location=${location}&sort_by=${sortBy}`, {
            headers: {
                Authorization: `Bearer ${apiKey}` //${apiKey} present key to tell Yelp API we have authorized access
            }
        }).then( response => {
            return response.json(); //converts response to JSON so list of businesses can be utilized
        }).then( jsonResponse => {  //retrieves list of businesses from converted JSON response
            if(jsonResponse.businesses) {  //check is JSON has a business key(a valid response from the Yelp API)
                return jsonResponse.businesses.map( business => {  //returns array w/ all business properties
                    //object includes all of the attributes needed to display a business on web page
                    //access jsonResponse object returned by Yelp API and extract specific attributes needed
                    return { id: business.id,
                    imageSrc: business.image_url,
                    name: business.name,
                    address: business.location.address1,
                    city: business.location.city,
                    state: business.location.state,
                    zipCode: business.location.zip_code,
                    category: business.categories[0].title,
                    rating: business.rating,
                    reviewCount: business.review_count
                    };
                });   
            }
        });
    }
};

export default Yelp;