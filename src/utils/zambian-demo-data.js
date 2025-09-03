// Zambian-specific demo data generator for the Ulimi Smart Farming System
// This module generates realistic agricultural data for Zambia including:
// - Local crops (maize, cassava, sweet potatoes, etc.)
// - Zambian regions and provinces
// - Local currency (ZMW)
// - Seasonal patterns relevant to Zambia

class ZambianDemoDataGenerator {
  constructor() {
    this.zambianCrops = [
      'Maize', 'Cassava', 'Sweet Potatoes', 'Rice', 'Sorghum', 
      'Pearl Millet', 'Groundnuts', 'Sunflower', 'Soybeans', 
      'Cotton', 'Tobacco', 'Sugar Cane', 'Tomatoes', 'Onions'
    ];
    
    this.zambianProvinces = [
      'Central', 'Copperbelt', 'Eastern', 'Luapula', 'Lusaka',
      'Muchinga', 'Northern', 'North-Western', 'Southern', 'Western'
    ];
    
    this.zambianCities = [
      'Lusaka', 'Ndola', 'Kitwe', 'Kabwe', 'Chingola', 'Mufulira',
      'Livingstone', 'Chipata', 'Solwezi', 'Mansa', 'Kasama', 'Mongu'
    ];
    
    this.zambianSeasons = [
      'Hot Dry Season (August - October)',
      'Cool Dry Season (May - July)',
      'Rainy Season (November - April)'
    ];
    
    // Zambian currency information
    this.currency = {
      code: 'ZMW',
      name: 'Zambian Kwacha',
      symbol: 'K'
    };
  }
  
  // Generate demo users with Zambian context
  generateUsers(count = 20) {
    const roles = ['farmer', 'buyer', 'vendor', 'admin'];
    const users = [];
    
    for (let i = 0; i < count; i++) {
      const role = roles[Math.floor(Math.random() * roles.length)];
      const province = this.zambianProvinces[Math.floor(Math.random() * this.zambianProvinces.length)];
      const city = this.zambianCities[Math.floor(Math.random() * this.zambianCities.length)];
      
      users.push({
        id: `user-${i + 1}`,
        email: `user${i + 1}@example.com`,
        name: this.generateZambianName(),
        role: role,
        phone: `09${Math.floor(Math.random() * 100000000)}`,
        address: `${Math.floor(Math.random() * 100) + 1} ${this.generateStreetName()}, ${city}, ${province}`,
        province: province,
        city: city,
        createdAt: this.generateRandomDate(new Date(2023, 0, 1), new Date()),
        updatedAt: new Date()
      });
    }
    
    return users;
  }
  
  // Generate demo farms with Zambian crops and locations
  generateFarms(users, count = 15) {
    const farms = [];
    const farmers = users.filter(user => user.role === 'farmer');
    
    for (let i = 0; i < count; i++) {
      const farmer = farmers[Math.floor(Math.random() * farmers.length)];
      const province = farmer.province;
      const city = farmer.city;
      const crop = this.zambianCrops[Math.floor(Math.random() * this.zambianCrops.length)];
      
      farms.push({
        id: `farm-${i + 1}`,
        name: `${farmer.name}'s ${crop} Farm`,
        location: `${city}, ${province}`,
        size: (Math.random() * 50 + 1).toFixed(2), // 1-50 hectares
        cropType: crop,
        ownerId: farmer.id,
        province: province,
        createdAt: this.generateRandomDate(new Date(2023, 0, 1), new Date()),
        updatedAt: new Date()
      });
    }
    
    return farms;
  }
  
  // Generate realistic sensor data for Zambian conditions
  generateSensorData(farms, days = 30) {
    const sensorData = [];
    const now = new Date();
    
    farms.forEach(farm => {
      // Generate data for each day
      for (let i = days; i >= 0; i--) {
        const date = new Date(now);
        date.setDate(date.getDate() - i);
        
        // Adjust values based on crop type and season
        const cropType = farm.cropType;
        const isRainySeason = date.getMonth() >= 10 || date.getMonth() <= 3; // Nov-Apr
        const isHotSeason = date.getMonth() >= 7 && date.getMonth() <= 9; // Aug-Oct
        
        // Base values with seasonal adjustments
        let soilMoisture = this.getSoilMoistureForCrop(cropType, isRainySeason);
        let temperature = this.getTemperatureForRegion(farm.province, date.getMonth(), isHotSeason);
        let humidity = this.getHumidityForRegion(farm.province, isRainySeason);
        let phLevel = this.getPHLevelForCrop(cropType);
        let nitrogen = this.getNitrogenLevelForCrop(cropType);
        let phosphorus = this.getPhosphorusLevelForCrop(cropType);
        let potassium = this.getPotassiumLevelForCrop(cropType);
        
        // Add some random variation
        soilMoisture += (Math.random() - 0.5) * 10;
        temperature += (Math.random() - 0.5) * 4;
        humidity += (Math.random() - 0.5) * 10;
        phLevel += (Math.random() - 0.5) * 0.5;
        nitrogen += (Math.random() - 0.5) * 10;
        phosphorus += (Math.random() - 0.5) * 5;
        potassium += (Math.random() - 0.5) * 8;
        
        sensorData.push({
          id: `sensor-${farm.id}-${i}`,
          farmId: farm.id,
          soilMoisture: parseFloat(soilMoisture.toFixed(2)),
          temperature: parseFloat(temperature.toFixed(2)),
          humidity: parseFloat(humidity.toFixed(2)),
          phLevel: parseFloat(phLevel.toFixed(2)),
          nitrogen: parseFloat(nitrogen.toFixed(2)),
          phosphorus: parseFloat(phosphorus.toFixed(2)),
          potassium: parseFloat(potassium.toFixed(2)),
          timestamp: date.toISOString()
        });
      }
    });
    
    return sensorData;
  }
  
  // Generate pest detection data
  generatePestDetections(farms, count = 10) {
    const pestDetections = [];
    const pests = [
      'Fall Armyworm', 'Maize Stalk Borer', 'Cassava Mosaic Disease', 
      'Cassava Brown Streak Disease', 'Tomato Leaf Miner', 'Bean Fly'
    ];
    
    for (let i = 0; i < count; i++) {
      const farm = farms[Math.floor(Math.random() * farms.length)];
      const pest = pests[Math.floor(Math.random() * pests.length)];
      const confidence = (Math.random() * 40 + 60).toFixed(2); // 60-100%
      
      pestDetections.push({
        id: `pest-${i + 1}`,
        farmId: farm.id,
        imageUrl: `https://example.com/pest-images/pest-${i + 1}.jpg`,
        detectedPest: pest,
        confidence: parseFloat(confidence),
        recommendation: this.getPestRecommendation(pest),
        timestamp: this.generateRandomDate(new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), new Date())
      });
    }
    
    return pestDetections;
  }
  
  // Generate livestock data
  generateLivestock(farms, count = 20) {
    const livestock = [];
    const animalTypes = ['cattle', 'sheep', 'goat', 'pig', 'chicken'];
    const breeds = {
      cattle: ['Angoni', 'Barotse', 'Tuli', 'Afrikaner'],
      sheep: ['Southdown', 'Dorper', 'Suffolk', 'Merino'],
      goat: ['Boer', 'Kalahari Red', 'Anglo-Nubian', 'Saanen'],
      pig: ['Large White', 'Landrace', 'Duroc', 'Hampshire'],
      chicken: ['Rhode Island Red', 'Leghorn', 'Sussex', 'Plymouth Rock']
    };
    
    for (let i = 0; i < count; i++) {
      const farm = farms[Math.floor(Math.random() * farms.length)];
      const type = animalTypes[Math.floor(Math.random() * animalTypes.length)];
      const breed = breeds[type][Math.floor(Math.random() * breeds[type].length)];
      
      livestock.push({
        id: `livestock-${i + 1}`,
        farmId: farm.id,
        name: `${type.charAt(0).toUpperCase() + type.slice(1)} ${i + 1}`,
        type: type,
        breed: breed,
        age: Math.floor(Math.random() * 10) + 1, // 1-10 years
        weight: this.getAnimalWeight(type),
        healthStatus: this.getHealthStatus(),
        lastHealthCheck: this.generateRandomDate(new Date(Date.now() - 365 * 24 * 60 * 60 * 1000), new Date()),
        nextVaccination: this.generateFutureDate(30, 180), // 1-6 months from now
        createdAt: this.generateRandomDate(new Date(2023, 0, 1), new Date()),
        updatedAt: new Date()
      });
    }
    
    return livestock;
  }
  
  // Generate livestock health data
  generateLivestockHealth(livestock, days = 30) {
    const healthData = [];
    const now = new Date();
    
    livestock.forEach(animal => {
      for (let i = days; i >= 0; i--) {
        const date = new Date(now);
        date.setDate(date.getDate() - i);
        
        // Generate realistic health metrics based on animal type
        const temperature = this.getAnimalTemperature(animal.type);
        const activityLevel = (Math.random() * 40 + 60).toFixed(2); // 60-100%
        const foodIntake = this.getFoodIntake(animal.type);
        const waterIntake = this.getWaterIntake(animal.type);
        
        healthData.push({
          id: `health-${animal.id}-${i}`,
          animalId: animal.id,
          temperature: parseFloat((temperature + (Math.random() - 0.5) * 2).toFixed(2)),
          activityLevel: parseFloat(activityLevel),
          foodIntake: parseFloat((foodIntake + (Math.random() - 0.5) * 5).toFixed(2)),
          waterIntake: parseFloat((waterIntake + (Math.random() - 0.5) * 3).toFixed(2)),
          notes: this.getHealthNotes(),
          timestamp: date.toISOString()
        });
      }
    });
    
    return healthData;
  }
  
  // Generate marketplace products with Zambian context
  generateProducts(users, count = 30) {
    const products = [];
    const vendors = users.filter(user => user.role === 'vendor');
    const categories = ['vegetables', 'fruits', 'dairy', 'meat', 'grains', 'processed'];
    
    for (let i = 0; i < count; i++) {
      const vendor = vendors[Math.floor(Math.random() * vendors.length)];
      const category = categories[Math.floor(Math.random() * categories.length)];
      const productNames = this.getProductNamesByCategory(category);
      const name = productNames[Math.floor(Math.random() * productNames.length)];
      const price = this.getProductPrice(category);
      const quantity = Math.floor(Math.random() * 100) + 10;
      
      products.push({
        id: `product-${i + 1}`,
        name: name,
        description: `Fresh ${name} from ${vendor.city}, ${vendor.province}`,
        price: parseFloat(price.toFixed(2)),
        quantity: quantity,
        vendorId: vendor.id,
        category: category,
        imageUrl: `https://example.com/product-images/product-${i + 1}.jpg`,
        currency: this.currency.code,
        createdAt: this.generateRandomDate(new Date(2023, 0, 1), new Date()),
        updatedAt: new Date()
      });
    }
    
    return products;
  }
  
  // Generate orders
  generateOrders(users, products, count = 25) {
    const orders = [];
    const buyers = users.filter(user => user.role === 'buyer');
    const statuses = ['pending', 'confirmed', 'shipped', 'delivered'];
    
    for (let i = 0; i < count; i++) {
      const buyer = buyers[Math.floor(Math.random() * buyers.length)];
      const product = products[Math.floor(Math.random() * products.length)];
      const quantity = Math.floor(Math.random() * 10) + 1;
      const totalPrice = parseFloat((product.price * quantity).toFixed(2));
      const status = statuses[Math.floor(Math.random() * statuses.length)];
      
      orders.push({
        id: `order-${i + 1}`,
        buyerId: buyer.id,
        productId: product.id,
        quantity: quantity,
        totalPrice: totalPrice,
        status: status,
        currency: this.currency.code,
        createdAt: this.generateRandomDate(new Date(2023, 0, 1), new Date()),
        updatedAt: new Date()
      });
    }
    
    return orders;
  }
  
  // Helper methods for generating realistic Zambian agricultural data
  
  generateZambianName() {
    const firstNames = [
      'Mwansa', 'Nchimunya', 'Mukanjila', 'Mwewa', 'Nalubwama', 
      'Chilufya', 'Mukupa', 'Chanda', 'Sikazwe', 'Mwila',
      'Kabwe', 'Mulongoti', 'Phiri', 'Banda', 'Mwanza'
    ];
    const lastNames = [
      'Mwale', 'Chiluba', 'Banda', 'Kaunda', 'Sampa', 
      'Phiri', 'Mukwena', 'Mbewe', 'Chisanga', 'Mwansa'
    ];
    
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    
    return `${firstName} ${lastName}`;
  }
  
  generateStreetName() {
    const streetNames = [
      'Church Road', 'Main Street', 'Market Road', 'Station Road', 
      'Victoria Avenue', 'Cairo Road', 'Julius Nyerere Way', 'Freedom Way',
      'Independence Avenue', 'Great North Road', 'Kingsway', 'Queensway'
    ];
    
    return streetNames[Math.floor(Math.random() * streetNames.length)];
  }
  
  generateRandomDate(start, end) {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  }
  
  generateFutureDate(minDays, maxDays) {
    const days = Math.floor(Math.random() * (maxDays - minDays)) + minDays;
    const date = new Date();
    date.setDate(date.getDate() + days);
    return date;
  }
  
  getSoilMoistureForCrop(crop, isRainySeason) {
    // Different crops have different optimal moisture levels
    const baseMoisture = {
      'Maize': 45,
      'Cassava': 40,
      'Sweet Potatoes': 50,
      'Rice': 60,
      'Sorghum': 35,
      'Pearl Millet': 30,
      'Groundnuts': 40,
      'Sunflower': 35,
      'Soybeans': 45,
      'Cotton': 40,
      'Tobacco': 50,
      'Sugar Cane': 65,
      'Tomatoes': 55,
      'Onions': 35
    };
    
    let moisture = baseMoisture[crop] || 45;
    if (isRainySeason) {
      moisture += 10; // Add 10% during rainy season
    }
    
    return moisture;
  }
  
  getTemperatureForRegion(province, month, isHotSeason) {
    // Different regions have different temperature patterns
    // Southern provinces are generally warmer
    const baseTemp = {
      'Southern': 28,
      'Western': 27,
      'Central': 25,
      'Lusaka': 24,
      'Copperbelt': 23,
      'Northern': 26,
      'Eastern': 24,
      'Luapula': 25,
      'Muchinga': 22,
      'North-Western': 26
    };
    
    let temp = baseTemp[province] || 25;
    
    // Seasonal adjustments
    if (isHotSeason) {
      temp += 5; // Hotter during hot season
    } else if (month >= 5 && month <= 7) {
      temp -= 3; // Cooler during cool dry season
    }
    
    return temp;
  }
  
  getHumidityForRegion(province, isRainySeason) {
    const baseHumidity = {
      'Southern': 55,
      'Western': 50,
      'Central': 60,
      'Lusaka': 58,
      'Copperbelt': 62,
      'Northern': 65,
      'Eastern': 63,
      'Luapula': 70,
      'Muchinga': 60,
      'North-Western': 55
    };
    
    let humidity = baseHumidity[province] || 60;
    if (isRainySeason) {
      humidity += 15; // Higher humidity during rainy season
    }
    
    return humidity;
  }
  
  getPHLevelForCrop(crop) {
    // Different crops prefer different soil pH levels
    const pHLevels = {
      'Maize': 6.0,
      'Cassava': 5.5,
      'Sweet Potatoes': 5.8,
      'Rice': 6.2,
      'Sorghum': 6.5,
      'Pearl Millet': 6.8,
      'Groundnuts': 6.0,
      'Sunflower': 6.5,
      'Soybeans': 6.2,
      'Cotton': 6.8,
      'Tobacco': 6.0,
      'Sugar Cane': 6.5,
      'Tomatoes': 6.2,
      'Onions': 6.8
    };
    
    return pHLevels[crop] || 6.5;
  }
  
  getNitrogenLevelForCrop(crop) {
    // Different crops have different nitrogen requirements
    const nitrogenLevels = {
      'Maize': 120,
      'Cassava': 80,
      'Sweet Potatoes': 100,
      'Rice': 110,
      'Sorghum': 90,
      'Pearl Millet': 85,
      'Groundnuts': 20, // Legumes fix nitrogen
      'Sunflower': 95,
      'Soybeans': 25, // Legumes fix nitrogen
      'Cotton': 130,
      'Tobacco': 100,
      'Sugar Cane': 140,
      'Tomatoes': 115,
      'Onions': 80
    };
    
    return nitrogenLevels[crop] || 100;
  }
  
  getPhosphorusLevelForCrop(crop) {
    const phosphorusLevels = {
      'Maize': 40,
      'Cassava': 30,
      'Sweet Potatoes': 35,
      'Rice': 45,
      'Sorghum': 35,
      'Pearl Millet': 30,
      'Groundnuts': 40,
      'Sunflower': 50,
      'Soybeans': 45,
      'Cotton': 45,
      'Tobacco': 50,
      'Sugar Cane': 60,
      'Tomatoes': 55,
      'Onions': 35
    };
    
    return phosphorusLevels[crop] || 40;
  }
  
  getPotassiumLevelForCrop(crop) {
    const potassiumLevels = {
      'Maize': 80,
      'Cassava': 70,
      'Sweet Potatoes': 90,
      'Rice': 85,
      'Sorghum': 75,
      'Pearl Millet': 70,
      'Groundnuts': 60,
      'Sunflower': 100,
      'Soybeans': 80,
      'Cotton': 95,
      'Tobacco': 110,
      'Sugar Cane': 120,
      'Tomatoes': 95,
      'Onions': 75
    };
    
    return potassiumLevels[crop] || 80;
  }
  
  getPestRecommendation(pest) {
    const recommendations = {
      'Fall Armyworm': 'Apply biological control agents like Bacillus thuringiensis or use appropriate insecticides. Practice crop rotation.',
      'Maize Stalk Borer': 'Destroy crop residues after harvest. Use resistant varieties. Apply appropriate insecticides during early infestation.',
      'Cassava Mosaic Disease': 'Use virus-free planting material. Control whiteflies with appropriate insecticides. Remove and destroy infected plants.',
      'Cassava Brown Streak Disease': 'Plant resistant varieties. Use certified planting material. Remove and destroy infected plants.',
      'Tomato Leaf Miner': 'Use pheromone traps. Apply appropriate insecticides. Practice good sanitation.',
      'Bean Fly': 'Use resistant varieties. Practice intercropping. Apply appropriate insecticides during early infestation.'
    };
    
    return recommendations[pest] || 'Monitor the situation closely and consult with agricultural extension officers for appropriate treatment.';
  }
  
  getAnimalWeight(type) {
    const weights = {
      'cattle': Math.random() * 400 + 200, // 200-600 kg
      'sheep': Math.random() * 40 + 20,    // 20-60 kg
      'goat': Math.random() * 30 + 15,     // 15-45 kg
      'pig': Math.random() * 80 + 40,      // 40-120 kg
      'chicken': Math.random() * 2 + 1     // 1-3 kg
    };
    
    return parseFloat(weights[type].toFixed(2));
  }
  
  getHealthStatus() {
    const statuses = ['healthy', 'healthy', 'healthy', 'sick', 'recovering']; // Weighted toward healthy
    return statuses[Math.floor(Math.random() * statuses.length)];
  }
  
  getAnimalTemperature(type) {
    const temperatures = {
      'cattle': 38.5, // °C
      'sheep': 39.0,  // °C
      'goat': 39.0,   // °C
      'pig': 39.0,    // °C
      'chicken': 41.5 // °C
    };
    
    return temperatures[type] || 39.0;
  }
  
  getFoodIntake(type) {
    const intake = {
      'cattle': Math.random() * 15 + 10,   // 10-25 kg/day
      'sheep': Math.random() * 3 + 2,      // 2-5 kg/day
      'goat': Math.random() * 4 + 2,       // 2-6 kg/day
      'pig': Math.random() * 8 + 4,        // 4-12 kg/day
      'chicken': Math.random() * 0.2 + 0.1 // 0.1-0.3 kg/day
    };
    
    return parseFloat(intake[type].toFixed(2));
  }
  
  getWaterIntake(type) {
    const intake = {
      'cattle': Math.random() * 40 + 30,   // 30-70 liters/day
      'sheep': Math.random() * 8 + 4,      // 4-12 liters/day
      'goat': Math.random() * 6 + 3,       // 3-9 liters/day
      'pig': Math.random() * 15 + 10,      // 10-25 liters/day
      'chicken': Math.random() * 1 + 0.5   // 0.5-1.5 liters/day
    };
    
    return parseFloat(intake[type].toFixed(2));
  }
  
  getHealthNotes() {
    const notes = [
      'Animal appears healthy and active',
      'Normal feeding and drinking behavior',
      'Good body condition score',
      'Regular vaccination schedule maintained',
      'Minor injury treated with antiseptic',
      'Slight decrease in appetite, monitoring',
      'Recovered from recent illness',
      'Scheduled for routine health check'
    ];
    
    return notes[Math.floor(Math.random() * notes.length)];
  }
  
  getProductNamesByCategory(category) {
    const products = {
      'vegetables': ['Tomatoes', 'Onions', 'Cabbages', 'Carrots', 'Green Beans', 'Peppers', 'Eggplants'],
      'fruits': ['Mangoes', 'Bananas', 'Oranges', 'Pineapples', 'Watermelons', 'Pawpaws', 'Guavas'],
      'dairy': ['Fresh Milk', 'Yogurt', 'Cheese', 'Butter', 'Cream'],
      'meat': ['Beef', 'Chicken', 'Goat Meat', 'Pork', 'Lamb'],
      'grains': ['Maize Meal', 'Rice', 'Sorghum', 'Millet', 'Wheat Flour'],
      'processed': ['Cooking Oil', 'Sugar', 'Salt', 'Soap', 'Detergent']
    };
    
    return products[category] || ['General Product'];
  }
  
  getProductPrice(category) {
    const basePrices = {
      'vegetables': Math.random() * 20 + 10, // K10-30 per unit
      'fruits': Math.random() * 30 + 15,     // K15-45 per unit
      'dairy': Math.random() * 50 + 20,      // K20-70 per unit
      'meat': Math.random() * 100 + 50,      // K50-150 per unit
      'grains': Math.random() * 40 + 20,     // K20-60 per unit
      'processed': Math.random() * 30 + 10   // K10-40 per unit
    };
    
    return basePrices[category] || Math.random() * 25 + 10;
  }
}

// Export a singleton instance
const zambianDemoDataGenerator = new ZambianDemoDataGenerator();
export default zambianDemoDataGenerator;