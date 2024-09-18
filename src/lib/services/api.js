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
export async function createMachine(processData) {
    try {
        console.log("machine_data:",JSON.stringify(processData));
        
        const response = await fetch('http://localhost:5000/machines', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(processData),
        });

        if (!response.ok) {
            throw new Error(`Failed to add machine: ${response.statusText}`);
        }

        const data = await response.json();
        console.log('machine added successfully:', data);
        return data; // You can return the data if needed
    } catch (error) {
        console.error('Error adding machine:', error);
    }
}
export async function fetchJobs() {
    const response = await fetch(`${BASE_URL}/jobs/`);
    if (!response.ok) {
        throw new Error('Failed to fetch machines');
    }
    
    
    return response.json();
}
export async function createJob(Data) {
    try {
        console.log("machine_data:",JSON.stringify(Data));
        
        const response = await fetch('http://localhost:5000/jobs', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(Data),
        });

        if (!response.ok) {
            const errorData = await response.json();  // Get the detailed error response
            console.log('Error:', errorData);
            // Optionally display the error to the user
            alert(`Error: ${JSON.stringify(errorData.detail)}`);
            return;
            
        }

        const data = await response.json();
        console.log('Job added successfully:', data);
        return data; // You can return the data if needed
    } catch (error) {
        console.error('Error adding Job:', error);
    }
}

export async function createTrigger(Data) {
    try {
        console.log("machine_data:",JSON.stringify(Data));
        
        const response = await fetch('http://localhost:5000/triggers', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(Data),
        });

        if (!response.ok) {
            const errorData = await response.json();  // Get the detailed error response
            console.log('Error:', errorData);
            // Optionally display the error to the user
            alert(`Error: ${JSON.stringify(errorData.detail)}`);
            return;
        }

        const data = await response.json();
        console.log('Trigger added successfully:', data);
        return data; // You can return the data if needed
    } catch (error) {
        console.error('Error adding Job:', error);
    }
}


export async function retryJob(job_id) {
    try {
        const Data = {
            "job_id" : job_id,
            "status" : "pending"
        }
        console.log("machine_data:",JSON.stringify(Data));
        
        const response = await fetch('http://localhost:5000/jobs/update_job', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(Data),
        });

        if (!response.ok) {
            const errorData = await response.json();  // Get the detailed error response
            console.log('Error:', errorData);
            // Optionally display the error to the user
            alert(`Error: ${JSON.stringify(errorData.detail)}`);
            return;
            
        }

        const data = await response.json();
        console.log('Job added successfully:', data);
        return data; // You can return the data if needed
    } catch (error) {
        console.error('Error adding Job:', error);
    }
}
export async function stopJob(job_id) {
    try {
        const Data = {
            "job_id" : job_id,
            "status" : "stopped"
        }
        console.log("machine_data:",JSON.stringify(Data));
        
        const response = await fetch('http://localhost:5000/jobs/update_job', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(Data),
        });

        if (!response.ok) {
            const errorData = await response.json();  // Get the detailed error response
            console.log('Error:', errorData);
            // Optionally display the error to the user
            alert(`Error: ${JSON.stringify(errorData.detail)}`);
            return;
            
        }

        const data = await response.json();
        console.log('Job added successfully:', data);
        return data; // You can return the data if needed
    } catch (error) {
        console.error('Error adding Job:', error);
    }
}
export async function fetchLogs(job_id) {
    try {
        const Data = {
            "job_id": job_id
        }
        
        const response = await fetch('http://localhost:5000/jobs/getLogsByJobId', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(Data),
        });

        if (!response.ok) {
            const errorData = await response.json();  // Get the detailed error response
            console.log('Error:', errorData);
            // Optionally display the error to the user
            alert(`Error: ${JSON.stringify(errorData.detail)}`);
            return;
            
        }

        const data = await response.json();
        console.log('Job added successfully:', data);
        return data; // You can return the data if needed
    } catch (error) {
        console.error('Error adding Job:', error);
    }
}