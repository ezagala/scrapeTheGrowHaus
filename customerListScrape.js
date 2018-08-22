/* 
==========
Psuedocode
==========

- ID the first horizontal rule <tr> 
    - Iterate through the following <tr>s that only contain <hr>s and append a class 

- Iterate through hr class 
    - ID the <tr> element that directly follows the current <hr>

- Iterate through this tailing <tr>, capturing the contents of each respective <td> (whether there is a nested <div> or not)
    - Define and build corresponding customer object for each 
        - Standardize phone number, if one exists, and define it on the current object 
        - Define standardized contact value, full address, and value under the credit limit 
            - Insert null if no value is listed in <td> 

- Push customer object to the DB if it doesn't exit, update the record if it does exist  

==========
Psuedocode
==========
*/

function customerScrape($, db) {
    console.log(`
      ==============================
      The Customer Scrape is running
      ==============================
    `)

    const firstHr = $('html').children('body').children('div').eq(2).children('table').children('tbody').children('tr').eq(2).children('td'); 

    firstHr.attr('id', 'first'); 

    console.log("The attribute is this: ", $("#first").attr()); 

}

module.exports = customerScrape; 