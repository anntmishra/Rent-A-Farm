export interface Listing {
  _id: string;
  title: string;
  description: string;
  price: number;
  location: string;
  type: 'farm' | 'equipment';
  features: string[];
  availability: {
    startDate: string;
    endDate: string;
  };
  images: string[];
  owner: {
    _id: string;
    name: string;
    email: string;
  };
  createdAt: string;
  updatedAt: string;
} 