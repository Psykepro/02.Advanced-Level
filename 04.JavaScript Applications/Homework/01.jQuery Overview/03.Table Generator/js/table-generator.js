var jsonObjects = [{"manufacturer":"BMW","model":"E92 320i","year":2011,"price":50000,"class":"Family"},
{"manufacturer":"Porsche","model":"Panamera","year":2012,"price":100000,"class":"Sport"},
{"manufacturer":"Peugeot","model":"305","year":1978,"price":1000,"class":"Family"}];

$('#generate-button').on('click',function(){
    var tableContainer = $('#table-container'),
        fragment = $(document.createDocumentFragment()),
        table = $('<table>').css('border-spacing', '1px'),
        headingRow = $('<tr>').css('background', '#76923C'),
        td = $('<td>');

    headingRow.append($('<th>').text('Manufacturer'));
    headingRow.append($('<th>').text('Model'));
    headingRow.append($('<th>').text('Year'));
    headingRow.append($('<th>').text('Price'));
    headingRow.append($('<th>').text('Class'));
    table.append(headingRow);

    jsonObjects.forEach(function(obj){
        var tr =  $('<tr>');
        tr.append($('<td>').text(obj.manufacturer))
            .append($('<td>').text(obj.model))
            .append($('<td>').text(obj.year))
            .append($('<td>').text(obj.price))
            .append($('<td>').text(obj.class));
        table.append(tr);
    });

    fragment.append(table);
    tableContainer.append(fragment);
});
