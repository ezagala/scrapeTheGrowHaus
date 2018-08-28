/* 
 - Iterate through all table rows 

 - Add a class if the table row's first child element has valign=top && class=size11 attributes 
 
 - Iterate through this new class 

    - Iterate through the <td>s of each instance of the class
        - Store data of each <td> on the corresponding 
          property of a customer object 

            - Standardize data, esp. phone, address 

            - Store null if no data or data unrecognizable 

 - Push customer object to the DB if it doesn't exit, update the record if it does exist 
*/

function customerScrape($, db) {

    console.log(`
      ==============================
      The Customer Scrape is running
      ==============================
    `)

    const customerList = []; 

    $('tr').each(function(i, element){
        const tr = $(this).children().first(); 
        if(tr.attr('valign') && tr.hasClass('size11')) {
           $(this).children().each(function(j, child){
               let customer = []; 
               customer.push($(this).contents().text())
               customerList.push(customer); 
           })  
        }
    })

    console.log("Customer list: ", customerList); 



  

}

module.exports = customerScrape; 


  // const leadHR = $('html').children('body').children('div').eq(2).children('table').children('tbody').children('tr').eq(2).children('td'); 

    // leadHR.attr('id', 'leadHR'); 

    // console.log("The attribute is this: ", $("#leadHR").attr()); 