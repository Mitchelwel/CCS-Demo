const PRODUCT_RECIPES = {
  apple: [
    { title: "Apple Pie", url: "https://www.allrecipes.com/recipe/12682/apple-pie-by-grandma-ople/" },
    { title: "Apple Crumble", url: "https://www.bbcgoodfood.com/recipes/classic-apple-crumble" },
    { title: "Apple Waldorf Salad", url: "https://www.simplyrecipes.com/recipes/waldorf_salad/" }
  ],
  banana: [
    { title: "Banana Bread", url: "https://www.simplyrecipes.com/recipes/banana_bread/" },
    { title: "Banana Smoothie", url: "https://www.bbcgoodfood.com/recipes/banana-smoothie" },
    { title: "Banana Pancakes", url: "https://www.allrecipes.com/recipe/20334/banana-pancakes-i/" }
  ],
  lemon: [
    { title: "Lemon Tart", url: "https://www.bbcgoodfood.com/recipes/ultimate-lemon-meringue-pie" },
    { title: "Lemonade", url: "https://www.simplyrecipes.com/recipes/perfect_lemonade/" },
    { title: "Lemon Chicken", url: "https://www.allrecipes.com/recipe/30522/lemon-chicken-piccata/" }
  ]
};

function createRecipesSection(productId) {
  const recipes = PRODUCT_RECIPES[productId] || [];
  if (recipes.length === 0) return "";
  const items = recipes
    .map((r) => `<li><a href="${r.url}" target="_blank" rel="noopener noreferrer">${r.title}</a></li>`) 
    .join("");
  return `
    <section class="recipes-section" aria-label="Recipe suggestions">
      <h2 style="margin-top: 1.5rem">🍽️ Recipe ideas</h2>
      <ul class="recipes-list">${items}</ul>
    </section>
  `;
}

function renderRecipes(productId, containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;
  container.innerHTML = createRecipesSection(productId);
}


