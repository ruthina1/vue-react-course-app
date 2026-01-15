import { seedDatabase } from '../database/seedData.js';

seedDatabase()
  .then(() => {
    console.log('✅ Seeding completed successfully');
    process.exit(0);
  })
  .catch(error => {
    console.error('❌ Seeding failed:', error);
    process.exit(1);
  });

