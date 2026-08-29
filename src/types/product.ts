export type OfferType = 'new' | 'refurbished' | 'used';

export interface Product {
  id: string;
  barcode: string;
  name: string;
  brand: string;
  imageEmoji: string;
  storePrice: number;
  newPrice: number;
  refurbishedPrice: number;
  usedPrice: number;
}

export interface Offer {
  type: OfferType;
  label: string;
  price: number;
}
