import { redirect } from "@sveltejs/kit"
import type { PageServerLoad } from "./$types"

export const load: PageServerLoad = async ({locals}) => {
    if (!locals.user){
        console.log("access denied");
        
        throw redirect(303, '/')
    }
}
