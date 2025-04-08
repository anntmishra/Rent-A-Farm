import { db } from '../config/firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { Listing } from '../types/listing';

export const getFavorites = async (userId: string): Promise<Listing[]> => {
  try {
    const favoritesRef = collection(db, 'favorites');
    const q = query(favoritesRef, where('userId', '==', userId));
    const querySnapshot = await getDocs(q);
    
    const favoriteIds = querySnapshot.docs.map(doc => doc.data().listingId);
    
    // Fetch the actual listings
    const listingsRef = collection(db, 'listings');
    const listingsQuery = query(listingsRef, where('_id', 'in', favoriteIds));
    const listingsSnapshot = await getDocs(listingsQuery);
    
    return listingsSnapshot.docs.map(doc => ({
      _id: doc.id,
      ...doc.data()
    })) as Listing[];
  } catch (error) {
    console.error('Error fetching favorites:', error);
    return [];
  }
}; 