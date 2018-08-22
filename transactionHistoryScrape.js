function transactionScrape($, db) {

    console.log(`
        =================================
        The Transaction scrape is running
        =================================
    `)

    const transactionList = [];

    // Iterate through divs of interest and add transaction class
    $('div[align="center"]').each(function (i, element) {

        const target = $(this).children('div[align="center"]').children('table[width="661"]').children('tbody').children('tr').children('td').html();

        // If the elements are the ones intended (in this case just not null)
        if (target !== null) {
            $(this).addClass('transaction');
        }
    })

    // Loop through each transation
    $(".transaction").each(function (i, element) {

        // Transaction that will be push to the DB
        const transaction = {
            transID: null,
            date: null,
            customer: null,
            tenderType: null,
            transTotal: null,
            description: []
        };

        // Paths for Transaction id, date and customer 
        const targetTrans = $(this).children('div[align="center"]').children('table[width="661"]').children('tbody').children('tr');
        const transID = $(this).children('div[align="center"]').children('table[width="661"]').children('tbody').children('tr').children('td[width="95"]');
        const date = $(this).children('div[align="center"]').children('table[width="661"]').children('tbody').children('tr').children('td[width="155"]')
        const customer = $(this).children('div[align="center"]').children('table[width="661"]').children('tbody').children('tr').children('td[width="118"]')

        // Paths for item descriptions, accommodating for retail keys
        const itemName = $(this).children('div[align="center"]').children('table[width="661"]').children('tbody').children('tr[style="color: #000000"]').children('td[align="left"]');
        const itemNameOverRetail = $(this).children('div[align="center"]').children('table[width="661"]').children('tbody').children('tr[style="color: #0000FF"]').children('td[align="left"]');
        const itemNameVoid = $(this).children('div[align="center"]').children('table[width="661"]').children('tbody').children('tr[style="color: #FF0000"]').children('td[align="left"]');
        const itemNameBelowRetail = $(this).children('div[align="center"]').children('table[width="661"]').children('tbody').children('tr[style="color: #009900"]').children('td[align="left"]');

        // Paths for item quantities, accommodating for retail keys
        const itemQuatity = $(this).children('div[align="center"]').children('table[width="661"]').children('tbody').children('tr[style="color: #000000"]').children('td[align="right"]');
        const itemQuatityOverRetail = $(this).children('div[align="center"]').children('table[width="661"]').children('tbody').children('tr[style="color: #0000FF"]').children('td[align="right"]');
        const itemQuatityVoid = $(this).children('div[align="center"]').children('table[width="661"]').children('tbody').children('tr[style="color: #FF0000"]').children('td[align="right"]');
        const itemQuatityBelowRetail = $(this).children('div[align="center"]').children('table[width="661"]').children('tbody').children('tr[style="color: #009900"]').children('td[align="right"]');

        // Tender type path 
        const tenderType = $(this).children('div[align="center"]').children('table[width="630"]').children('tbody').children('tr').eq(1).children('td').first();

        // Transaction total path 
        const transTotal = $(this).children('div[align="center"]').next().next().next().children('table[width="630"]').children('tbody').children('tr').eq(1).children('td').last();;

        //Update transaction with tender type & total 
        transaction.tenderType = tenderType.html().slice(30).trim()
        transaction.transTotal = transTotal.html().slice(29).trim()

        // Capture transaction id, date, and customer 
        grabTrans(transID);
        grabTrans(date);
        grabTrans(customer);

        // Capture item description accommodating for retail keys
        grabDescription(itemName);
        grabDescription(itemNameVoid);
        grabDescription(itemNameOverRetail);
        grabDescription(itemNameBelowRetail);

        // Capture item quantity accommodating for retail keys
        grabDescription(itemQuatity);
        grabDescription(itemQuatityVoid);
        grabDescription(itemQuatityOverRetail);
        grabDescription(itemQuatityBelowRetail);


        function grabTrans(path) {
            if (path) {
                switch (path) {
                    case transID:
                        transaction.transID = path.html().slice(-5).trim();
                        break;
                    case date:
                        let isoDate = new Date(path.html().slice(-14).trim())
                        transaction.date = isoDate.toISOString();
                        break;
                    case customer:
                        transaction.customer = path.html().slice(27).trim();
                        break;
                    default:
                        console.log("The path for the transaction is not correct");
                }
            }
        }

        // Build out items and update transaction.description 
        function grabDescription(path) {
            let item = {};
            path.each(function (i, element) {
                switch (path) {
                    case itemName:
                    case itemNameVoid:
                    case itemNameOverRetail:
                    case itemNameBelowRetail:
                        item.name = $(this).html();
                        break;
                    case itemQuatity:
                    case itemQuatityVoid:
                    case itemQuatityOverRetail:
                    case itemQuatityBelowRetail:
                        transaction.description[i].quantity = $(this).html();
                        break;
                    default: console.log("The path for the transaction is not correct");
                }
                // Empty objects were being pushed into description. (I'm not sure why.) This prevents that from happening. 
                if (!(Object.keys(item).length === 0 && item.constructor === Object)) {
                    transaction.description.push(item)
                }

            })
        }

        // Add transcation to the DB if it doesn't already exist
        // db.Transaction
        //     .update(
        //         { transID: transaction.transID },
        //         transaction,
        //         { upsert: true }
        //     )
        //     .then(newTrans => {

        //     })
        //     .catch(err => console.log(err)); 

        console.log(transactionList.join());

    });

    db.Transaction
        .find({})
        .sort({ date: 'descending' })
        .then(res => {
            // console.log(JSON.stringify(res)); 
            console.log(res);
        })

}

module.exports = transactionScrape; 