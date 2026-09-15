export interface Product {
  id: string;
  slug?: string;
  backendVariantId?: string;
  backendVariantIds?: string[];
  name: string;
  subtitle: string;
  category: string;
  highlights?: string[];
  price: number; // in Canadian dollars (CAD)
  priceFormatted: string;
  badge?: string;
  tagline?: string;
  origin: string;
  estate: string;
  aging?: string;
  moistureContent?: string;
  image: string;
  galleryImages: string[];
  description: string;
  provenanceStory: string;
  tastingNotes: string[];
  culinaryUses: string[];
  specifications: {
    label: string;
    value: string;
  }[];
  availableSizes: {
    weight: string;
    priceMultiplier: number;
    inStock: boolean;
    stockQuantity?: number;
  }[];
  featured?: boolean;
}

export interface JournalArticle {
  id: string;
  volume: string;
  issue: string;
  title: string;
  subtitle: string;
  category: 'Technique' | 'Fermentation' | 'Grains' | 'Tubers' | 'Oils' | 'Spices' | 'Legumes';
  author: string;
  readTime: string;
  date: string;
  image: string;
  abstract: string;
  featured?: boolean;
  fullTechnique?: {
    scientificBasis: string;
    temperature: string;
    hydrationRatio: string;
    restingTime: string;
    steps: {
      stepNumber: number;
      title: string;
      description: string;
      tip?: string;
    }[];
    equipmentNeeded: string[];
    pairings: string[];
  };
}

export interface CartItem {
  product: Product;
  selectedWeight: string;
  quantity: number;
  unitPrice: number;
  variantId?: string;
  subscriptionPlan?: 'once' | 'monthly_10_off';
}

export interface ShippingDetails {
  email: string;
  phone: string;
  firstName: string;
  lastName: string;
  address: string;
  apartment?: string;
  country?: 'NG' | 'CA';
  city: string;
  state: string;
  postalCode: string;
  shippingMethod: 'standard' | 'express';
}
