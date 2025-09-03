// This is a placeholder for the price prediction model
// In a real implementation, this would use time series forecasting algorithms

class PricePredictionModel {
  constructor() {
    // Zambian-specific crop categories with local market context
    this.categories = [
      'maize', 'cassava', 'sweet-potatoes', 'rice', 'sorghum', 
      'groundnuts', 'sunflower', 'soybeans', 'cotton', 'tobacco',
      'vegetables', 'fruits', 'dairy', 'poultry', 'eggs'
    ];
    
    // Zambian market prices (ZMW per unit) - approximate as of 2025
    this.basePrices = {
      'maize': 15.50,        // ZMW per kg
      'cassava': 8.00,       // ZMW per kg
      'sweet-potatoes': 12.00, // ZMW per kg
      'rice': 25.00,         // ZMW per kg
      'sorghum': 14.00,      // ZMW per kg
      'groundnuts': 35.00,   // ZMW per kg
      'sunflower': 40.00,    // ZMW per kg
      'soybeans': 38.00,     // ZMW per kg
      'cotton': 28.00,       // ZMW per kg of seed cotton
      'tobacco': 120.00,     // ZMW per kg
      'vegetables': 20.00,   // ZMW per kg (mixed)
      'fruits': 25.00,       // ZMW per kg (mixed)
      'dairy': 45.00,        // ZMW per liter of milk
      'poultry': 65.00,      // ZMW per kg of chicken
      'eggs': 5.00           // ZMW per egg
    };
    
    // Zambian seasonal patterns
    this.seasonalFactors = {
      'maize': { 
        'hot-dry': 1.2,      // Prices increase during hot dry season (supply decreases)
        'cool-dry': 0.9,     // Prices decrease during cool dry season (harvest)
        'rainy': 0.8         // Prices lowest during rainy season (harvest)
      },
      'cassava': {
        'hot-dry': 1.1,
        'cool-dry': 1.0,
        'rainy': 0.9
      },
      'vegetables': {
        'hot-dry': 1.3,
        'cool-dry': 1.0,
        'rainy': 0.8
      }
    };
  }

  // Predict future prices for a product category with Zambian context
  predictPrices(category, currentDate = new Date()) {
    // In a real implementation, this would use historical data and ML models
    // For now, we'll generate mock predictions based on Zambian market patterns
    
    const basePrice = this.basePrices[category] || Math.random() * 30 + 10; // Default ZMW 10-40
    const predictions = [];
    
    // Determine current season
    const month = currentDate.getMonth(); // 0-11
    let currentSeason;
    
    // Zambia has three seasons:
    // Hot Dry: September - November (8-10)
    // Rainy: December - April (11-3)
    // Cool Dry: May - August (4-7)
    if (month >= 8 && month <= 10) {
      currentSeason = 'hot-dry';
    } else if (month >= 4 && month <= 7) {
      currentSeason = 'cool-dry';
    } else {
      currentSeason = 'rainy';
    }
    
    // Apply seasonal factor to current price
    const seasonalFactor = this.seasonalFactors[category]?.[currentSeason] || 1.0;
    const currentPrice = basePrice * seasonalFactor;
    
    // Generate predictions for the next 7 days
    for (let i = 0; i < 7; i++) {
      const date = new Date(currentDate);
      date.setDate(date.getDate() + i);
      
      // Add some randomness to the price (±15% variation)
      const variation = 1 + (Math.random() - 0.5) * 0.3;
      const price = currentPrice * variation;
      
      predictions.push({
        date: date.toISOString().split('T')[0],
        price: parseFloat(price.toFixed(2)),
        trend: price > currentPrice ? 'up' : price < currentPrice ? 'down' : 'stable'
      });
    }
    
    return {
      category,
      categoryName: this.getCategoryName(category),
      currentPrice: parseFloat(currentPrice.toFixed(2)),
      currency: 'ZMW',
      unit: this.getUnitForCategory(category),
      predictions,
      season: this.getSeasonName(currentSeason)
    };
  }
  
  // Get market insights for a category with Zambian context
  getMarketInsights(category) {
    const insights = {
      'maize': {
        demand: 'high',
        supply: 'adequate',
        seasonal: 'Harvest season ending in some regions',
        recommendation: 'Good time to sell in urban markets. Watch for government intervention.',
        zambianContext: 'Maize is Zambia\'s staple crop. Prices often regulated by government.'
      },
      'cassava': {
        demand: 'medium',
        supply: 'high',
        seasonal: 'Year-round production in tropical areas',
        recommendation: 'Consider value-added products like cassava flour.',
        zambianContext: 'Important food security crop in Northern and Eastern provinces.'
      },
      'sweet-potatoes': {
        demand: 'medium',
        supply: 'adequate',
        seasonal: 'Peak season in cooler months',
        recommendation: 'Target health-conscious urban consumers.',
        zambianContext: 'Popular in urban areas as a healthy alternative to maize.'
      },
      'rice': {
        demand: 'high',
        supply: 'low',
        seasonal: 'Stable year-round',
        recommendation: 'Import prices affect local market. Monitor exchange rates.',
        zambianContext: 'Mostly imported. Local production in limited areas.'
      },
      'vegetables': {
        demand: 'high',
        supply: 'variable',
        seasonal: 'Weather dependent',
        recommendation: 'Diversify vegetable types. Focus on off-season production.',
        zambianContext: 'High demand in urban centers. Price volatility common.'
      },
      'dairy': {
        demand: 'high',
        supply: 'adequate',
        seasonal: 'Stable with slight seasonal variations',
        recommendation: 'Maintain quality standards for premium pricing.',
        zambianContext: 'Growing market. Urban demand exceeds rural production.'
      }
    };
    
    return insights[category] || {
      demand: 'unknown',
      supply: 'unknown',
      seasonal: 'unknown',
      recommendation: 'Monitor market trends and consult with agricultural extension officers.',
      zambianContext: 'Check with local markets for specific pricing information.'
    };
  }
  
  // Helper methods for Zambian context
  getCategoryName(category) {
    const names = {
      'maize': 'Maize (Corn)',
      'cassava': 'Cassava',
      'sweet-potatoes': 'Sweet Potatoes',
      'rice': 'Rice',
      'sorghum': 'Sorghum',
      'groundnuts': 'Groundnuts (Peanuts)',
      'sunflower': 'Sunflower Seeds',
      'soybeans': 'Soybeans',
      'cotton': 'Cotton',
      'tobacco': 'Tobacco',
      'vegetables': 'Fresh Vegetables',
      'fruits': 'Fresh Fruits',
      'dairy': 'Fresh Milk',
      'poultry': 'Chicken Meat',
      'eggs': 'Chicken Eggs'
    };
    
    return names[category] || category;
  }
  
  getUnitForCategory(category) {
    const units = {
      'maize': 'kg',
      'cassava': 'kg',
      'sweet-potatoes': 'kg',
      'rice': 'kg',
      'sorghum': 'kg',
      'groundnuts': 'kg',
      'sunflower': 'kg',
      'soybeans': 'kg',
      'cotton': 'kg',
      'tobacco': 'kg',
      'vegetables': 'kg',
      'fruits': 'kg',
      'dairy': 'liter',
      'poultry': 'kg',
      'eggs': 'piece'
    };
    
    return units[category] || 'kg';
  }
  
  getSeasonName(season) {
    const names = {
      'hot-dry': 'Hot Dry Season (September - November)',
      'cool-dry': 'Cool Dry Season (May - August)',
      'rainy': 'Rainy Season (December - April)'
    };
    
    return names[season] || season;
  }
}

// Export a singleton instance
const pricePredictionModel = new PricePredictionModel();
export default pricePredictionModel;