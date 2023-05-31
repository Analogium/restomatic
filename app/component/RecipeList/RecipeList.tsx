"use client";

import { useState, useEffect } from 'react';
import { supabase } from '@/api/db_connect';
import styles from './RecipeList.module.scss';
import { getRecipes } from '@/api/api_recipes';

const RecipeList = () => {
  const [list, setList] = useState([]);

  useEffect(() => {
    getList();

    // Ajouter un écouteur d'événement pour la déconnexion de session
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_OUT') {
        setList([]); // Réinitialiser la liste lorsque vous vous déconnectez
      }
    });

    return () => {
      // Retirer l'écouteur d'événement lors du démontage du composant
      authListener.subscription.unsubscribe();
    };
  }, []);

  const getList = async () => {
    try {
      const session = (await supabase.auth.getSession()).data.session;

      if (session) {
        const recipes = await getRecipes();
        if (recipes !== null) {
          setList(recipes);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1>Test</h1>
      <ul className={styles.recipeList}>
        {list.map((recipe) => (
          <li key={recipe.id}>{recipe.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default RecipeList;
