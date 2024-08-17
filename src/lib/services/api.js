const BASE_URL = 'http://localhost:5000';  // Replace with your FastAPI server address

export async function fetchProcesses() {
    console.log("getting processes");
    
    const response = await fetch(`${BASE_URL}/processes/`);
    if (!response.ok) {
        throw new Error('Failed to fetch processes');
    }
    
    
    return response.json();
}
export async function fetchProcessById(id) {
    const response = await fetch(`http://localhost:5000/processes/${id}`);
    if (!response.ok) {
        throw new Error('Failed to fetch process');
    }
    return await response.json();
}

export async function fetchMachines() {
    const response = await fetch(`${BASE_URL}/machines/`);
    if (!response.ok) {
        throw new Error('Failed to fetch machines');
    }
    
    
    return response.json();
}

export async function fetchMachineById(id) {
    const response = await fetch(`http://localhost:5000/machines/${id}`);
    if (!response.ok) {
        throw new Error('Failed to fetch process');
    }
    return await response.json();
}
export async function fetchTriggers() {
    const response = await fetch(`${BASE_URL}/triggers/`);
    if (!response.ok) {
        throw new Error('Failed to fetch machines');
    }
    
    
    return response.json();
}

export async function createProcess(processData) {
    try {
        const response = await fetch('http://localhost:5000/processes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(processData),
        });

        if (!response.ok) {
            throw new Error(`Failed to create process: ${response.statusText}`);
        }

        const data = await response.json();
        console.log('Process created successfully:', data);
        return data; // You can return the data if needed
    } catch (error) {
        console.error('Error creating process:', error);
    }
}
// Add more functions for other API endpoints as needed
