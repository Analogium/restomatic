"use client";

import { addRecipe } from '@/api/api_recipes';
import { useState } from 'react';
import styles from './RecipeForm.module.scss';

interface Recipe {
  name: string;
  content: string[];
  price: number;
  restorer: string;
}

const initialRecipe: Recipe = {
  name: '',
  content: [],
  price: 0,
  restorer: '',
};

const RecipeForm = () => {
  const [recipe, setRecipe] = useState<Recipe>(initialRecipe);
  const [contentItem, setContentItem] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setRecipe((prevRecipe) => ({
      ...prevRecipe,
      [name]: value,
    }));
  };

  const handleContentItemChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setContentItem(e.target.value);
  };

  const handleAddContentItem = () => {
    setRecipe((prevRecipe) => ({
      ...prevRecipe,
      content: [...prevRecipe.content, contentItem],
    }));
    setContentItem('');
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Effectuer des actions supplémentaires, par exemple envoyer les données au serveur
    console.log('Recipe:', recipe);
    setRecipe(initialRecipe);

    
    addRecipe(recipe);
  };

  return (
    <form className={styles.recipeForm} onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={recipe.name}
          onChange={handleInputChange}
          required
        />
      </div>
      <div>
        <label htmlFor="content">Content:</label>
        <ul className={styles.contentList}>
          {recipe.content.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
        <input
          type="text"
          id="contentItem"
          name="contentItem"
          value={contentItem}
          onChange={handleContentItemChange}
        />
        <button type="button" onClick={handleAddContentItem}>
          Add Content Item
        </button>
      </div>
      <div>
        <label htmlFor="price">Price:</label>
        <input
          type="number"
          id="price"
          name="price"
          value={recipe.price}
          onChange={handleInputChange}
          required
        />
      </div>
      <div>
        <label htmlFor="restorer">Restorer:</label>
        <input
          type="text"
          id="restorer"
          name="restorer"
          value={recipe.restorer}
          onChange={handleInputChange}
          required
        />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default RecipeForm;
