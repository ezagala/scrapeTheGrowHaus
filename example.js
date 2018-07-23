var serverResponse = [
    { "Id": "aaa", "OrderItems": 
        [{ "Id": 1, "Description": "Salad" }, { "Id": 2, "Description": "Pizza" }] 
    }, 
    { "Id": "bbb", "OrderItems": 
        [{ "Id": 3, "Description": "Salad" }, { "Id": 4, "Description": "Pizza" }] 
    }
];

$.each(serverResponse, function (index) {
    var pos = serverResponse[index];

    $('#placeholder').append('<p>' + pos.Id + '</p>')

    $.each(pos.OrderItems, function (index) {
        $('.orderitem').append('<p>' + this.Id +
            ' ' + this.Description + '</p>')
    });

});

var $order_item = $('<p class="orderitem">' + pos.Id + '</p>');
$('#placeholder').append($order_item);

$.each(pos.OrderItems, function (index) {
    $order_item.append('<p>' + this.Id +
        ' ' + this.Description + '</p>');
});