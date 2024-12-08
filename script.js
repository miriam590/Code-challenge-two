// Initialize shopping list from local storage or as an empty array
let shoppingList = JSON.parse(localStorage.getItem('shoppingList')) || [];

// Function to render the shopping list
function renderList() {
    const listContainer = document.getElementById('shopping-list');
    listContainer.innerHTML = ''; // Clear the list before rendering
    shoppingList.forEach((item) => {
        const listItem = document.createElement('li');
        listItem.className = 'item';
        listItem.textContent = `${item.text} - $${item.price.toFixed(2)}`; // Display item with price
        if (item.purchased) {
            listItem.classList.add('purchased');
        }
        
        // Create a button to mark as purchased
        const markButton = document.createElement('button');
        markButton.textContent = item.purchased ? 'Unmark' : 'Mark Purchased';
        markButton.onclick = () => {
            item.purchased = !item.purchased;
            saveList();
            renderList();
        };

        // Create a button to edit the item
        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.onclick = () => {
            const newItemText = prompt('Edit item:', item.text);
            const newItemPrice = prompt('Edit price:', item.price);
            if (newItemText && newItemPrice !== null) {
                item.text = newItemText;
                item.price = parseFloat(newItemPrice);
                saveList();
                renderList();
            }
        };

        // Append buttons to the list item
        listItem.appendChild(markButton);
        listItem.appendChild(editButton);
        listContainer.appendChild(listItem);
    });
}

// Function to save the shopping list to local storage
function saveList() {
    localStorage.setItem('shoppingList', JSON.stringify(shoppingList));
}

// Event listener for the Add button
document.getElementById('add-button').onclick = () => {
    const input = document.getElementById('Enter-input');
    const priceInput = document.getElementById('Enter-price');
    const newItemText = input.value.trim();
    const newItemPrice = parseFloat(priceInput.value);

    if (newItemText && !isNaN(newItemPrice) && newItemPrice >= 0) {
        shoppingList.push({ text: newItemText, price: newItemPrice, purchased: false });
        input.value = ''; // Clear the input field
        priceInput.value = ''; // Clear the price input field
        saveList();
        renderList();
    } else {
        alert('Please enter a valid item and price.');
    }
};

document.getElementById('toggle-theme').addEventListener('click', function() {
    document.body.classList.toggle('dark-mode');
});

// Event listener for the Clear List button
document.getElementById('clear-button').onclick = () => {
    shoppingList = [];
    saveList();
    renderList();
};

// Initial render of the shopping list
renderList();