document.addEventListener('DOMContentLoaded', () => {
    const productOptions = [ "Pencil", "Eraser", "Pens"];
    const quantityOptions = [0, 1, 2, 3, 4, 5];
    const maxProducts = 3;
    let currentRows = 1;

    const productTable = document.getElementById('productTable');
    const showOrderButton = document.getElementById('showOrder');
    const orderTable = document.getElementById('orderTable');
    const whatIsMyOrderButton = document.getElementById('whatIsMyOrder');

    
    function addNewRow() {
        if (currentRows < maxProducts) {
            currentRows++;
            const newRow = document.createElement('tr');
            const productCell = document.createElement('td');
            const quantityCell = document.createElement('td');
            const addCell = document.createElement('td');
            const addButton = document.createElement('button');
            productCell.className = 'productCell';
            quantityCell.className = 'quantityCell';
            productCell.innerText = 'Choose Product';
            quantityCell.innerText = 'Choose Quantity';
            addButton.className = 'addBtn';
            addButton.innerText = 'ADD';
            addButton.disabled = true;
            addCell.appendChild(addButton);
            newRow.appendChild(productCell);
            newRow.appendChild(quantityCell);
            newRow.appendChild(addCell);
            productTable.appendChild(newRow);
        }
    }

    // Event listener for product and quantity selection
    productTable.addEventListener('click', (event) => {
        if (event.target.classList.contains('productCell')) {
            const dropdown = createDropdown(productOptions, event.target);
            event.target.innerHTML = '';
            event.target.appendChild(dropdown);
        } else if (event.target.classList.contains('quantityCell')) {
            const dropdown = createDropdown(quantityOptions, event.target);
            event.target.innerHTML = '';
            event.target.appendChild(dropdown);
        }
    });

    // Function to create a dropdown list
    function createDropdown(options, targetCell) {
        const dropdown = document.createElement('select');
        options.forEach(option => {
            const optionElement = document.createElement('option');
            optionElement.value = option;
            optionElement.text = option;
            dropdown.appendChild(optionElement);
        });
        dropdown.addEventListener('change', () => {
            targetCell.innerHTML = dropdown.value;
            const row = targetCell.parentElement;
            const productCell = row.querySelector('.productCell').innerText;
            const quantityCell = row.querySelector('.quantityCell').innerText;
            const addButton = row.querySelector('.addBtn');
            if (productCell !== 'Choose Product' && quantityCell !== 'Choose Quantity') {
                addButton.disabled = false;
            }
        });
        return dropdown;
    }

    // Event listener for ADD button
    productTable.addEventListener('click', (event) => {
        if (event.target.classList.contains('addBtn') && !event.target.disabled) {
            event.target.disabled = true;
            addNewRow();
        }
    });

    // Event listener for "Show Order" button
    showOrderButton.addEventListener('click', () => {
        orderTable.innerHTML = '';
        const headerRow = document.createElement('tr');
        const productHeader = document.createElement('th');
        const quantityHeader = document.createElement('th');
        productHeader.innerText = 'Product Name';
        quantityHeader.innerText = 'Quantity';
        headerRow.appendChild(productHeader);
        headerRow.appendChild(quantityHeader);
        orderTable.appendChild(headerRow);

        const rows = productTable.getElementsByTagName('tr');
        for (let i = 1; i < rows.length; i++) {
            const productCell = rows[i].querySelector('.productCell');
            const quantityCell = rows[i].querySelector('.quantityCell');
            if (productCell && quantityCell && productCell.innerText !== 'Choose Product' && quantityCell.innerText !== 'Choose Quantity') {
                const orderRow = document.createElement('tr');
                const productOrderCell = document.createElement('td');
                const quantityOrderCell = document.createElement('td');
                productOrderCell.innerText = productCell.innerText;
                quantityOrderCell.innerText = quantityCell.innerText;
                orderRow.appendChild(productOrderCell);
                orderRow.appendChild(quantityOrderCell);
                orderTable.appendChild(orderRow);
            }
        }
    });

    // Event listener for "What is my Order?" button
    whatIsMyOrderButton.addEventListener('click', () => {
        const rows = orderTable.getElementsByTagName('tr');
        let orderText = 'Your order is: ';
        for (let i = 1; i < rows.length; i++) {
            const productCell = rows[i].getElementsByTagName('td')[0];
            const quantityCell = rows[i].getElementsByTagName('td')[1];
            orderText += `${productCell.innerText} - ${quantityCell.innerText}, `;
        }
        orderText = orderText.slice(0, -2); // Remove the trailing comma and space

        // Text-to-speech
        const utterance = new SpeechSynthesisUtterance(orderText);
        window.speechSynthesis.speak(utterance);
    });
});