import React, { useMemo } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { colors, radius, spacing, typography } from '../theme/theme';
import { mockProducts, defaultProduct } from '../data/mockProducts';
import { Offer, OfferType } from '../types/product';

type Props = NativeStackScreenProps<RootStackParamList, 'Product'>;

function formatPrice(value: number): string {
  return `${value.toLocaleString('en-US')} €`;
}

const OFFER_META: Record<
  OfferType,
  { label: string; icon: keyof typeof Ionicons.glyphMap }
> = {
  new: { label: 'New — online', icon: 'sparkles-outline' },
  refurbished: { label: 'Refurbished', icon: 'refresh-outline' },
  used: { label: 'Used', icon: 'pricetag-outline' },
};

export default function ProductScreen({ navigation, route }: Props) {
  const product =
    mockProducts.find((p) => p.id === route.params?.productId) ??
    defaultProduct;

  const offers: Offer[] = useMemo(
    () => [
      { type: 'new', label: OFFER_META.new.label, price: product.newPrice },
      {
        type: 'refurbished',
        label: OFFER_META.refurbished.label,
        price: product.refurbishedPrice,
      },
      { type: 'used', label: OFFER_META.used.label, price: product.usedPrice },
    ],
    [product]
  );

  const bestOffer = useMemo(
    () => offers.reduce((best, o) => (o.price < best.price ? o : best)),
    [offers]
  );

  const savings = Math.max(0, product.storePrice - bestOffer.price);

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <View style={styles.header}>
        <Pressable style={styles.backButton} onPress={() => navigation.popToTop()}>
          <Ionicons name="chevron-back" size={24} color={colors.textPrimary} />
        </Pressable>
        <Text style={styles.headerTitle}>Product</Text>
        <View style={styles.backButton} />
      </View>

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.productCard}>
          <Text style={styles.productEmoji}>{product.imageEmoji}</Text>
          <Text style={styles.brand}>{product.brand}</Text>
          <Text style={styles.name}>{product.name}</Text>
        </View>

        <View style={styles.storeRow}>
          <Text style={styles.storeLabel}>Store price</Text>
          <Text style={styles.storePrice}>{formatPrice(product.storePrice)}</Text>
        </View>

        <Text style={styles.sectionTitle}>Compare offers</Text>

        <View style={styles.offersList}>
          {offers.map((offer) => {
            const isBest = offer.type === bestOffer.type;
            return (
              <View
                key={offer.type}
                style={[styles.offerCard, isBest && styles.offerCardBest]}
              >
                <View style={styles.offerLeft}>
                  <View
                    style={[
                      styles.offerIconWrap,
                      isBest && styles.offerIconWrapBest,
                    ]}
                  >
                    <Ionicons
                      name={OFFER_META[offer.type].icon}
                      size={18}
                      color={isBest ? '#FFFFFF' : colors.textSecondary}
                    />
                  </View>
                  <View>
                    <Text style={styles.offerLabel}>{offer.label}</Text>
                    {isBest && (
                      <Text style={styles.bestBadge}>Best offer</Text>
                    )}
                  </View>
                </View>
                <Text
                  style={[styles.offerPrice, isBest && styles.offerPriceBest]}
                >
                  {formatPrice(offer.price)}
                </Text>
              </View>
            );
          })}
        </View>

        {savings > 0 && (
          <View style={styles.savingsBanner}>
            <Ionicons name="trending-down-outline" size={20} color={colors.save} />
            <Text style={styles.savingsText}>
              You can save up to{' '}
              <Text style={styles.savingsAmount}>€{savings}</Text> online.
            </Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.md,
    paddingTop: spacing.sm,
  },
  backButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    ...typography.bodyStrong,
    color: colors.textPrimary,
  },
  content: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xl,
  },
  productCard: {
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    paddingVertical: spacing.xl,
    marginTop: spacing.sm,
  },
  productEmoji: {
    fontSize: 56,
    marginBottom: spacing.sm,
  },
  brand: {
    ...typography.caption,
    color: colors.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  name: {
    ...typography.h1,
    color: colors.textPrimary,
    textAlign: 'center',
    marginTop: spacing.xs,
    paddingHorizontal: spacing.md,
  },
  storeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: spacing.lg,
    paddingBottom: spacing.md,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.border,
  },
  storeLabel: {
    ...typography.body,
    color: colors.textSecondary,
  },
  storePrice: {
    ...typography.bodyStrong,
    color: colors.textSecondary,
    textDecorationLine: 'line-through',
  },
  sectionTitle: {
    ...typography.h2,
    color: colors.textPrimary,
    marginTop: spacing.lg,
    marginBottom: spacing.md,
  },
  offersList: {
    gap: spacing.sm,
  },
  offerCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.md,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  offerCardBest: {
    backgroundColor: colors.saveSurface,
    borderColor: colors.save,
  },
  offerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  offerIconWrap: {
    width: 36,
    height: 36,
    borderRadius: radius.pill,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  offerIconWrapBest: {
    backgroundColor: colors.save,
  },
  offerLabel: {
    ...typography.bodyStrong,
    color: colors.textPrimary,
  },
  bestBadge: {
    ...typography.caption,
    color: colors.save,
    marginTop: 2,
  },
  offerPrice: {
    ...typography.h2,
    color: colors.textPrimary,
  },
  offerPriceBest: {
    color: colors.save,
  },
  savingsBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    backgroundColor: colors.saveSurface,
    borderRadius: radius.md,
    padding: spacing.md,
    marginTop: spacing.lg,
  },
  savingsText: {
    ...typography.body,
    color: colors.textPrimary,
    flex: 1,
  },
  savingsAmount: {
    ...typography.bodyStrong,
    color: colors.save,
  },
});
