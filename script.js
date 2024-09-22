document.getElementById('submitBtn').addEventListener('click', async () => {
    const jsonInput = document.getElementById('jsonInput').value;

    try {
        const jsonData = JSON.parse(jsonInput);

        // Call backend API
        const response = await fetch('https://your-api-url/bfhl', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(jsonData)
        });

        const data = await response.json();

        // Display response
        document.getElementById('response').innerHTML = `
            <p>Status: ${data.is_success}</p>
            <p>User ID: ${data.user_id}</p>
            <p>Email: ${data.email}</p>
            <p>Roll Number: ${data.roll_number}</p>
        `;

        // Show dropdown and handle filtering of response
        const dropdownContainer = document.getElementById('dropdownContainer');
        dropdownContainer.classList.remove('hidden');

        document.getElementById('dataSelect').addEventListener('change', () => {
            const selectedOptions = Array.from(document.getElementById('dataSelect').selectedOptions).map(opt => opt.value);

            let result = '';

            if (selectedOptions.includes('numbers')) {
                result += <p>Numbers: ${data.numbers.join(', ')}</p>;
            }

            if (selectedOptions.includes('alphabets')) {
                result += <p>Alphabets: ${data.alphabets.join(', ')}</p>;
            }

            if (selectedOptions.includes('highest_lowercase_alphabet')) {
                result += <p>Highest Lowercase Alphabet: ${data.highest_lowercase_alphabet}</p>;
            }

            document.getElementById('response').innerHTML = result;
        });
    } catch (err) {
        alert('Invalid JSON format');
    }
});