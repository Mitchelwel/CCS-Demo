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

function showRecipeModal(productId) {
  const recipes = PRODUCT_RECIPES[productId] || [];
  if (recipes.length === 0) return;
  const recipe = recipes[0];
  // Create overlay
  const overlay = document.createElement('div');
  overlay.className = 'modal-overlay';
  overlay.setAttribute('role', 'dialog');
  overlay.setAttribute('aria-modal', 'true');
  overlay.style.position = 'fixed';
  overlay.style.inset = '0';
  overlay.style.background = 'rgba(0,0,0,0.45)';
  overlay.style.display = 'flex';
  overlay.style.alignItems = 'center';
  overlay.style.justifyContent = 'center';
  overlay.style.zIndex = '1000';

  const modal = document.createElement('div');
  modal.className = 'modal-content';
  modal.style.background = 'white';
  modal.style.padding = '1.25rem';
  modal.style.borderRadius = '8px';
  modal.style.width = 'min(92vw, 520px)';
  modal.style.boxShadow = '0 10px 30px rgba(0,0,0,0.2)';

  const title = document.createElement('h2');
  title.textContent = '🍽️ Try this recipe';
  title.style.marginTop = '0';

  const link = document.createElement('a');
  link.href = recipe.url;
  link.target = '_blank';
  link.rel = 'noopener noreferrer';
  link.textContent = recipe.title;

  const btnRow = document.createElement('div');
  btnRow.style.display = 'flex';
  btnRow.style.gap = '0.5rem';
  btnRow.style.marginTop = '1rem';
  btnRow.style.justifyContent = 'flex-end';

  const closeBtn = document.createElement('button');
  closeBtn.textContent = 'Close';
  closeBtn.className = 'cart-action-btn';
  closeBtn.onclick = () => document.body.removeChild(overlay);

  const viewBtn = document.createElement('a');
  viewBtn.textContent = 'View Recipe';
  viewBtn.href = recipe.url;
  viewBtn.target = '_blank';
  viewBtn.rel = 'noopener noreferrer';
  viewBtn.className = 'cart-action-btn';
  viewBtn.style.textDecoration = 'none';
  viewBtn.style.display = 'inline-flex';
  viewBtn.style.alignItems = 'center';
  viewBtn.style.justifyContent = 'center';

  btnRow.appendChild(closeBtn);
  btnRow.appendChild(viewBtn);

  modal.appendChild(title);
  modal.appendChild(link);
  modal.appendChild(btnRow);
  overlay.appendChild(modal);
  document.body.appendChild(overlay);
}


