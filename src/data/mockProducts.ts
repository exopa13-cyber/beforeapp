import { Product } from '../types/product';

export const mockProducts: Product[] = [
  {
    id: 'iphone-15-pro',
    barcode: '0194253404322',
    name: 'iPhone 15 Pro 128GB',
    brand: 'Apple',
    imageEmoji: '📱',
    storePrice: 849,
    newPrice: 799,
    refurbishedPrice: 649,
    usedPrice: 579,
  },
  {
    id: 'macbook-air-m2',
    barcode: '0194253012429',
    name: 'MacBook Air M2 13"',
    brand: 'Apple',
    imageEmoji: '💻',
    storePrice: 1399,
    newPrice: 1299,
    refurbishedPrice: 1049,
    usedPrice: 949,
  },
  {
    id: 'airpods-pro-2',
    barcode: '0194253397832',
    name: 'AirPods Pro (2nd gen)',
    brand: 'Apple',
    imageEmoji: '🎧',
    storePrice: 279,
    newPrice: 249,
    refurbishedPrice: 199,
    usedPrice: 169,
  },
  {
    id: 'ps5-slim',
    barcode: '0711719541028',
    name: 'PlayStation 5 Slim',
    brand: 'Sony',
    imageEmoji: '🎮',
    storePrice: 549,
    newPrice: 499,
    refurbishedPrice: 419,
    usedPrice: 379,
  },
  {
    id: 'galaxy-s24',
    barcode: '8806095320978',
    name: 'Samsung Galaxy S24 256GB',
    brand: 'Samsung',
    imageEmoji: '📱',
    storePrice: 899,
    newPrice: 819,
    refurbishedPrice: 649,
    usedPrice: 559,
  },
];

export const defaultProduct = mockProducts[0];

export function getProductByBarcode(barcode: string): Product {
  return mockProducts.find((p) => p.barcode === barcode) ?? defaultProduct;
}

export function searchProducts(query: string): Product[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  return mockProducts.filter(
    (p) =>
      p.name.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q)
  );
}
