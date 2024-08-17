// src/routes/protected/orchestrator/processes/[id]/+page.server.js

import { error } from "@sveltejs/kit";

export async function load({ params, fetch }) {
    try {
        console.log("fetching process:" , params.id);
        
        // Fetch the process data based on the ID
        const response = await fetch(`http://localhost:5000/machines/${params.id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });

        // Check if the response is successful
        if (!response.ok) {
            throw new Error(`Failed to fetch machine: ${response.statusText}`);
        }

        // Parse and return the process data
        

        const machine = await response.json();
        console.log("process fetched:", machine);
        
        return {
            props: {machine: machine, error: false}
            

        };
    } catch (err) {
        // Return a serializable error object
        console.log("error while fetching", err);
        
        return {
            props: {
                error: "Error",
                machine: false
                }
            
        };
    }
}
