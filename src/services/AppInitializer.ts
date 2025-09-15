import { StorageService } from './StorageService';

export class AppInitializer {
  static async initializeApp(): Promise<void> {
    try {
      // Initialize default data if not exists
      await StorageService.initializeDefaultData();
      console.log('App initialized successfully');
    } catch (error) {
      console.error('Error initializing app:', error);
    }
  }
}