import { supabase } from '@/api/db_connect';

export async function getRecipes() {
    try {
        const { data: plats, error } = await supabase.from('plat').select('*');
        if (error) {
            throw new Error(error.message);
        }
        console.log(plats);
        return plats;
    } catch (error) {
        console.error('Error fetching recipes:', error);
        return null;
    }
}

export async function getRecipeBy(type: string, data: string) {
    try {
        const { data: plat, error } = await supabase
            .from('plat')
            .select('*')
            .eq(type, data);
        if (error) {
            throw new Error(error.message);
        }
        console.log(plat);
        return plat;
    } catch (error) {
        console.error('Error fetching recipe:', error);
        return null;
    }
}

export async function addRecipe(recipe: any) {
    try {

        const session = (await supabase.auth.getSession()).data.session;

        if (session) {
            const { data, error } = await supabase.from('plat').insert([
                {
                    name: recipe.name,
                    content: recipe.content,
                    price: recipe.price,
                    restorer: recipe.restorer,
                    user_id: session?.user.id
                },
            ]);

            if (error) {
                throw new Error(error.message);
            }
            console.log('Recipe added successfully:', data);
            return data;
        } 
    }catch (error) {
        console.error('Error adding recipe:', error);
        return null;
    }
}
