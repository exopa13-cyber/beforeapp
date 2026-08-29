import React, { useState } from 'react';
import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { colors, radius, spacing, typography } from '../theme/theme';
import { searchProducts } from '../data/mockProducts';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

export default function HomeScreen({ navigation }: Props) {
  const [query, setQuery] = useState('');
  const results = searchProducts(query);

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.logo}>
            BEFORE<Text style={styles.logoDot}>.</Text>
          </Text>
          <Text style={styles.slogan}>Check before you pay.</Text>
        </View>

        <View style={styles.searchBar}>
          <Ionicons name="search" size={18} color={colors.textTertiary} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search a product"
            placeholderTextColor={colors.textTertiary}
            value={query}
            onChangeText={setQuery}
            returnKeyType="search"
          />
        </View>

        {query.length > 0 && (
          <FlatList
            style={styles.results}
            data={results}
            keyExtractor={(item) => item.id}
            keyboardShouldPersistTaps="handled"
            ListEmptyComponent={
              <Text style={styles.noResults}>No product found.</Text>
            }
            renderItem={({ item }) => (
              <Pressable
                style={styles.resultRow}
                onPress={() =>
                  navigation.navigate('Product', { productId: item.id })
                }
              >
                <Text style={styles.resultEmoji}>{item.imageEmoji}</Text>
                <View style={{ flex: 1 }}>
                  <Text style={styles.resultName}>{item.name}</Text>
                  <Text style={styles.resultBrand}>{item.brand}</Text>
                </View>
                <Ionicons
                  name="chevron-forward"
                  size={18}
                  color={colors.textTertiary}
                />
              </Pressable>
            )}
          />
        )}

        <View style={styles.spacer} />

        <Pressable
          style={({ pressed }) => [
            styles.scanButton,
            pressed && styles.scanButtonPressed,
          ]}
          onPress={() => navigation.navigate('Scanner')}
        >
          <Ionicons name="barcode-outline" size={22} color="#FFFFFF" />
          <Text style={styles.scanButtonText}>Scan barcode</Text>
        </Pressable>

        <Text style={styles.footerHint}>
          Compare new, refurbished and used prices instantly.
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    flex: 1,
    paddingHorizontal: spacing.lg,
  },
  header: {
    marginTop: spacing.xxl,
    marginBottom: spacing.xl,
  },
  logo: {
    ...typography.logo,
    color: colors.textPrimary,
  },
  logoDot: {
    color: colors.save,
  },
  slogan: {
    ...typography.slogan,
    color: colors.textSecondary,
    marginTop: spacing.xs,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: radius.pill,
    paddingHorizontal: spacing.md,
    height: 50,
    gap: spacing.sm,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: colors.textPrimary,
  },
  results: {
    marginTop: spacing.md,
    maxHeight: 260,
  },
  noResults: {
    color: colors.textTertiary,
    paddingVertical: spacing.md,
  },
  resultRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    paddingVertical: spacing.sm,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.border,
  },
  resultEmoji: {
    fontSize: 26,
  },
  resultName: {
    ...typography.bodyStrong,
    color: colors.textPrimary,
  },
  resultBrand: {
    ...typography.caption,
    color: colors.textSecondary,
  },
  spacer: {
    flex: 1,
  },
  scanButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
    backgroundColor: colors.accent,
    borderRadius: radius.lg,
    height: 58,
  },
  scanButtonPressed: {
    opacity: 0.85,
  },
  scanButtonText: {
    ...typography.bodyStrong,
    color: '#FFFFFF',
    fontSize: 17,
  },
  footerHint: {
    ...typography.caption,
    color: colors.textTertiary,
    textAlign: 'center',
    marginTop: spacing.md,
    marginBottom: spacing.xl,
  },
});
