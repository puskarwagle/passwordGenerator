function generateRandomPasswordBtn() {
    const passwordField = document.getElementById('password');
    passwordField.value = generateRandomPassword(18); // Change 12 to your desired password length
}

function generateRandomPassword(length) {
    if (length < 18) {
        throw new Error("Password length must be at least 18 characters.");
    }

    const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_-+=<>?";
    const passwordArray = new Uint8Array(length);

    for (let i = 0; i < length; i++) {
        passwordArray[i] = charset.charCodeAt(crypto.getRandomValues(new Uint32Array(1))[0] % charset.length);
    }

    const password = String.fromCharCode.apply(null, passwordArray);

    return password;
}

function togglePasswordVisibility() {
    const passwordField = document.getElementById('password');
    if (passwordField.type === 'password') {
        passwordField.type = 'text'; // Show the password characters
    } else {
        passwordField.type = 'password'; // Hide the password characters
    }
}


// Define an array to store saved data
const savedData = [];
function saveData() {
    // e.preventDefault();

    const formData = new FormData(document.getElementById('passwordForm'));

    // Convert the FormData object to a plain object
    const data = {};
    formData.forEach((value, key) => {
        data[key] = value;
    });

    // Add the data to the savedData array
    savedData.push(data);

    // Update the table with the new data
    updateTable();
    sendToServer(data);

    // Optionally, you can reset the form here
    document.getElementById('passwordForm').reset();
}


function updateTable() {
    const dataTable = document.getElementById('dataBody');
    dataTable.innerHTML = ''; // Clear the table body

    savedData.forEach((data, index) => {
        const row = dataTable.insertRow();
        const cell1 = row.insertCell(0);
        const cell2 = row.insertCell(1);
        const cell3 = row.insertCell(2);

        cell1.innerHTML = data.email;
        cell2.innerHTML = data.password;
        cell3.innerHTML = data.site;
    });
}


function sendToServer(data) {
    // Define the URL of your server
    const serverURL = 'api/save-my-shit';

    // Make a POST request to the server
    fetch(serverURL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(result => {
        // Handle the server's response here
        console.log('Data sent to the server:', result);

        // You can update the UI or perform additional actions based on the response
    })
    .catch(error => {
        // Handle any errors that occur during the request
        console.error('Error sending data to the server:', error);
    });

    // Optionally, you can reset the form here
    document.getElementById('passwordForm').reset();
};
