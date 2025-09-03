// This is a placeholder for IoT sensor data simulation
// In a real implementation, this would run on a server and generate mock sensor data

class IoTDataSimulator {
  constructor() {
    this.sensors = [
      { id: 'sensor-001', location: 'Field A', type: 'soil-moisture' },
      { id: 'sensor-002', location: 'Field A', type: 'temperature' },
      { id: 'sensor-003', location: 'Field B', type: 'soil-moisture' },
      { id: 'sensor-004', location: 'Greenhouse', type: 'humidity' },
      { id: 'sensor-005', location: 'Field C', type: 'ph-level' },
      { id: 'sensor-006', location: 'Field A', type: 'nitrogen' },
      { id: 'sensor-007', location: 'Field B', type: 'phosphorus' },
      { id: 'sensor-008', location: 'Field C', type: 'potassium' },
    ];
  }

  // Generate mock sensor data
  generateSensorData() {
    return this.sensors.map(sensor => ({
      id: sensor.id,
      location: sensor.location,
      type: sensor.type,
      value: this.getRandomValue(sensor.type),
      timestamp: new Date().toISOString()
    }));
  }

  // Generate random values based on sensor type with Zambian agricultural context
  getRandomValue(type) {
    switch(type) {
      case 'soil-moisture':
        // Zambian soil moisture levels for different crops (20-60%)
        return Math.floor(Math.random() * 40) + 20;
      case 'temperature':
        // Zambian temperature range in Celsius (15-35°C)
        return Math.floor(Math.random() * 20) + 15;
      case 'humidity':
        // Humidity levels in Zambian agricultural areas (40-90%)
        return Math.floor(Math.random() * 50) + 40;
      case 'ph-level':
        // Soil pH levels suitable for Zambian crops (4.5-8.0)
        return (Math.random() * 3.5 + 4.5).toFixed(2);
      case 'nitrogen':
        // Nitrogen levels in soil (ppm) for Zambian agriculture (10-150 ppm)
        return Math.floor(Math.random() * 140) + 10;
      case 'phosphorus':
        // Phosphorus levels in soil (ppm) for Zambian agriculture (5-80 ppm)
        return Math.floor(Math.random() * 75) + 5;
      case 'potassium':
        // Potassium levels in soil (ppm) for Zambian agriculture (50-200 ppm)
        return Math.floor(Math.random() * 150) + 50;
      default:
        return Math.floor(Math.random() * 100);
    }
  }

  // Simulate data generation at intervals
  startSimulation(callback) {
    setInterval(() => {
      const data = this.generateSensorData();
      callback(data);
    }, 30000); // Generate data every 30 seconds
  }
}

// Export a singleton instance
const iotSimulator = new IoTDataSimulator();
export default iotSimulator;