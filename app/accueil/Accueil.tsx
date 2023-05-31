"useClient";

import Image from 'next/image'
import styles from './Accueil.module.scss'
import NavBar from '../component/NavBar/NavBar'
import LoginForm from '../component/LoginForm/LoginForm'
import { supabase } from '@/api/db_connect'
import { getRecipes, getRecipeBy, addRecipe } from '@/api/api_recipes'
import RecipeForm from '../component/RecipeForm/RecipeForm';
import RecipeList from '../component/RecipeList/RecipeList';

export default function Accueil() {


    return (
        <div >
            <NavBar />
            
            <RecipeForm />
            <RecipeList />

        </div>
    )
}