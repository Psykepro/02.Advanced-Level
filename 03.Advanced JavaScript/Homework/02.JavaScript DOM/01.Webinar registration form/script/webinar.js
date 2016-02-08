function showInvoiceInformation(){
    var invoiceCheckBox = document.getElementById('invoice');
    var isChecked = invoiceCheckBox.checked;

    if(isChecked){
        createInvoiceForm();
    }else{
        removeInvoiceForm();
    }

    function createInvoiceForm() {
        var parentOfInvoice = invoiceCheckBox.parentElement;
        var docFragment = document.createDocumentFragment();
        var div = document.createElement('div');
        div.id = 'show-hide-block';
        var input = document.createElement('input');
        var label = document.createElement('label');

        input.id = 'firm-organization';
        input.type = 'text';
        label.htmlFor = 'firm-organization';
        label.innerHTML = 'Фирма/Организация:<span class=\"red\">*</span>';
        div.appendChild(label);
        div.appendChild(input);

        input = document.createElement('input');
        label = document.createElement('label');
        input.id = 'mol';
        input.type = 'text';
        label.htmlFor = 'mol';
        label.innerHTML = 'МОЛ:<span class=\"red\">*</span>';
        div.appendChild(label);
        div.appendChild(input);

        input = document.createElement('input');
        label = document.createElement('label');
        input.id = 'eik';
        input.type = 'text';
        label.htmlFor = 'eik';
        label.innerHTML = 'ЕИК:<span class=\"red\">*</span>';
        div.appendChild(label);
        div.appendChild(input);

        input = document.createElement('input');
        label = document.createElement('label');
        input.id = 'in-dds';
        input.type = 'text';
        label.htmlFor = 'in-dds';
        label.innerHTML = 'ИН по ДДС:<span class=\"red\">*</span>';
        div.appendChild(label);
        div.appendChild(input);

        input = document.createElement('input');
        label = document.createElement('label');
        input.id = 'invoice-address';
        input.type = 'text';
        label.htmlFor = 'invoice-address';
        label.innerHTML = 'Адрес:<span class=\"red\">*</span>';
        div.appendChild(label);
        div.appendChild(input);

        docFragment.appendChild(div);
        parentOfInvoice.appendChild(docFragment);
    }

    function removeInvoiceForm() {
        var parentOfInvoice = invoiceCheckBox.parentElement;
        var remove = document.getElementById('show-hide-block');
        console.log(remove);
        parentOfInvoice.removeChild(remove);
    };
}
