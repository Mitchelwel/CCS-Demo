// Fruit Shop Game Logic
class FruitShopGame {
  constructor() {
    this.money = 100;
    this.inventory = {
      apple: 0,
      banana: 0,
      lemon: 0,
      cherry: 0,
      mango: 0
    };
    this.store = {
      apple: 0,
      banana: 0,
      lemon: 0,
      cherry: 0,
      mango: 0
    };
    this.customers = [];
    this.gameRunning = false;
    this.gameSpeed = 2000; // milliseconds
    this.customerSpawnRate = 0.3; // probability per tick
    this.customerPatience = 30; // seconds
    this.treeCooldowns = {
      apple: 0,
      banana: 0,
      lemon: 0,
      cherry: 0,
      mango: 0
    };
    this.treeCooldownTime = 5000; // 5 seconds
    
    this.fruitData = {
      apple: { emoji: '🍏', name: 'Apple', price: 5 },
      banana: { emoji: '🍌', name: 'Banana', price: 4 },
      lemon: { emoji: '🍋', name: 'Lemon', price: 3 },
      cherry: { emoji: '🍒', name: 'Cherry', price: 8 },
      mango: { emoji: '🥭', name: 'Mango', price: 6 }
    };
    
    this.init();
  }
  
  init() {
    this.renderTrees();
    this.renderInventory();
    this.renderStore();
    this.renderCustomers();
    this.updateMoney();
  }
  
  log(message, type = 'info') {
    const logElement = document.getElementById('gameLog');
    const entry = document.createElement('div');
    entry.className = `log-entry log-${type}`;
    entry.textContent = `[${new Date().toLocaleTimeString()}] ${message}`;
    logElement.appendChild(entry);
    logElement.scrollTop = logElement.scrollHeight;
  }
  
  updateMoney() {
    document.getElementById('money').textContent = this.money;
  }
  
  renderTrees() {
    const treesContainer = document.getElementById('fruitTrees');
    treesContainer.innerHTML = '';
    
    Object.keys(this.fruitData).forEach(fruitId => {
      const fruit = this.fruitData[fruitId];
      const treeDiv = document.createElement('div');
      treeDiv.className = `tree ${this.treeCooldowns[fruitId] > 0 ? 'disabled' : ''}`;
      treeDiv.onclick = () => this.pickFruit(fruitId);
      
      const cooldownText = this.treeCooldowns[fruitId] > 0 
        ? `Cooldown: ${Math.ceil(this.treeCooldowns[fruitId] / 1000)}s`
        : 'Click to pick!';
      
      treeDiv.innerHTML = `
        <div class="tree-emoji">${fruit.emoji}</div>
        <div class="tree-info">
          <div>${fruit.name}</div>
          <div style="font-size: 0.8rem;">${cooldownText}</div>
        </div>
      `;
      
      treesContainer.appendChild(treeDiv);
    });
  }
  
  pickFruit(fruitId) {
    if (this.treeCooldowns[fruitId] > 0) return;
    
    this.inventory[fruitId]++;
    this.treeCooldowns[fruitId] = this.treeCooldownTime;
    this.log(`Picked ${this.fruitData[fruitId].name}!`, 'success');
    
    this.renderInventory();
    this.renderTrees();
    
    // Start cooldown timer
    const cooldownInterval = setInterval(() => {
      this.treeCooldowns[fruitId] -= 100;
      if (this.treeCooldowns[fruitId] <= 0) {
        this.treeCooldowns[fruitId] = 0;
        clearInterval(cooldownInterval);
        this.renderTrees();
      }
    }, 100);
  }
  
  renderInventory() {
    const inventoryContainer = document.getElementById('inventory');
    inventoryContainer.innerHTML = '';
    
    Object.keys(this.inventory).forEach(fruitId => {
      if (this.inventory[fruitId] > 0) {
        const itemDiv = document.createElement('div');
        itemDiv.className = 'inventory-item';
        itemDiv.innerHTML = `
          <div class="inventory-emoji">${this.fruitData[fruitId].emoji}</div>
          <div class="inventory-count">${this.inventory[fruitId]}</div>
        `;
        inventoryContainer.appendChild(itemDiv);
      }
    });
  }
  
  stockStore() {
    let stocked = false;
    Object.keys(this.inventory).forEach(fruitId => {
      if (this.inventory[fruitId] > 0) {
        this.store[fruitId] += this.inventory[fruitId];
        this.inventory[fruitId] = 0;
        stocked = true;
      }
    });
    
    if (stocked) {
      this.log('Store stocked with fresh fruit!', 'success');
      this.renderInventory();
      this.renderStore();
    } else {
      this.log('No fruit in inventory to stock!', 'warning');
    }
  }
  
  renderStore() {
    const storeContainer = document.getElementById('storeDisplay');
    storeContainer.innerHTML = '';
    
    Object.keys(this.store).forEach(fruitId => {
      if (this.store[fruitId] > 0) {
        const itemDiv = document.createElement('div');
        itemDiv.className = 'store-item';
        itemDiv.innerHTML = `
          <div class="store-item-emoji">${this.fruitData[fruitId].emoji}</div>
          <div class="store-item-count">${this.store[fruitId]}</div>
        `;
        storeContainer.appendChild(itemDiv);
      }
    });
  }
  
  spawnCustomer() {
    if (Math.random() > this.customerSpawnRate) return;
    
    const fruits = Object.keys(this.fruitData);
    const wantedFruit = fruits[Math.floor(Math.random() * fruits.length)];
    const customer = {
      id: Date.now(),
      wantedFruit: wantedFruit,
      patience: this.customerPatience,
      maxPatience: this.customerPatience,
      served: false
    };
    
    this.customers.push(customer);
    this.log(`New customer wants ${this.fruitData[wantedFruit].name}!`, 'info');
    this.renderCustomers();
  }
  
  renderCustomers() {
    const customersContainer = document.getElementById('customers');
    customersContainer.innerHTML = '';
    
    this.customers.forEach(customer => {
      if (customer.served) return;
      
      const customerDiv = document.createElement('div');
      customerDiv.className = 'customer';
      
      const patiencePercent = (customer.patience / customer.maxPatience) * 100;
      const canServe = this.store[customer.wantedFruit] > 0;
      
      customerDiv.innerHTML = `
        <div class="customer-info">
          <div class="customer-emoji">${customer.patience > customer.maxPatience * 0.5 ? '😊' : customer.patience > customer.maxPatience * 0.2 ? '😐' : '😠'}</div>
          <div class="customer-order">Wants: ${this.fruitData[customer.wantedFruit].emoji} ${this.fruitData[customer.wantedFruit].name}</div>
          <div class="customer-patience">
            <div class="patience-bar" style="width: ${patiencePercent}%"></div>
          </div>
        </div>
        <button class="serve-btn" ${!canServe ? 'disabled' : ''} onclick="game.serveCustomer('${customer.id}')">
          ${canServe ? 'Serve' : 'Out of Stock'}
        </button>
      `;
      
      customersContainer.appendChild(customerDiv);
    });
  }
  
  serveCustomer(customerId) {
    const customer = this.customers.find(c => c.id === customerId);
    if (!customer || customer.served) return;
    
    if (this.store[customer.wantedFruit] <= 0) {
      this.log(`No ${this.fruitData[customer.wantedFruit].name} in store!`, 'warning');
      return;
    }
    
    // Serve customer
    this.store[customer.wantedFruit]--;
    const earnings = this.fruitData[customer.wantedFruit].price;
    this.money += earnings;
    customer.served = true;
    
    this.log(`Served customer ${this.fruitData[customer.wantedFruit].name} for $${earnings}!`, 'success');
    
    this.updateMoney();
    this.renderStore();
    this.renderCustomers();
  }
  
  updateCustomers() {
    this.customers.forEach(customer => {
      if (customer.served) return;
      
      customer.patience -= 1;
      
      if (customer.patience <= 0) {
        // Customer leaves angry
        const stolenFruit = Object.keys(this.store).find(fruit => this.store[fruit] > 0);
        if (stolenFruit) {
          this.store[stolenFruit]--;
          this.log(`Angry customer stole ${this.fruitData[stolenFruit].name}! 😠`, 'error');
        } else {
          this.log('Angry customer left empty-handed! 😠', 'warning');
        }
        
        customer.served = true;
        this.renderStore();
      }
    });
    
    // Remove served customers
    this.customers = this.customers.filter(c => !c.served);
    this.renderCustomers();
  }
  
  gameTick() {
    if (!this.gameRunning) return;
    
    this.updateCustomers();
    this.spawnCustomer();
  }
  
  startGame() {
    this.gameRunning = true;
    this.log('Game started! Customers will arrive soon...', 'success');
    
    this.gameInterval = setInterval(() => {
      this.gameTick();
    }, 1000);
  }
  
  pauseGame() {
    this.gameRunning = false;
    if (this.gameInterval) {
      clearInterval(this.gameInterval);
    }
    this.log('Game paused.', 'info');
  }
  
  resetGame() {
    this.pauseGame();
    this.money = 100;
    this.inventory = { apple: 0, banana: 0, lemon: 0, cherry: 0, mango: 0 };
    this.store = { apple: 0, banana: 0, lemon: 0, cherry: 0, mango: 0 };
    this.customers = [];
    this.treeCooldowns = { apple: 0, banana: 0, lemon: 0, cherry: 0, mango: 0 };
    
    this.init();
    this.log('Game reset!', 'info');
  }
}

// Global game instance
let game;

// Initialize game when page loads
document.addEventListener('DOMContentLoaded', () => {
  game = new FruitShopGame();
});

// Global functions for HTML buttons
function startGame() {
  game.startGame();
}

function pauseGame() {
  game.pauseGame();
}

function resetGame() {
  game.resetGame();
}

function stockStore() {
  game.stockStore();
}
