import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Card } from "react-native-paper";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

const TransactionAccordion = () => {
  const [isTransactionOpen, setTransactionOpen] = useState(false);
  const [openCards, setOpenCards] = useState<number[]>([]);

  const toggleCardAccordion = (index: number) => {
    if (openCards.includes(index)) {
      setOpenCards(openCards.filter((i) => i !== index));
    } else {
      setOpenCards([...openCards, index]);
    }
  };

  return (
    <ScrollView style={styles.container}>
      {/* Transaction Accordion */}
      <TouchableOpacity
        style={styles.accordionHeader}
        onPress={() => setTransactionOpen(!isTransactionOpen)}
      >
        <Text style={styles.accordionTitle}>Transaction</Text>
        <MaterialIcons
          name={isTransactionOpen ? "keyboard-arrow-up" : "keyboard-arrow-down"}
          size={24}
          color="#6A5ACD"
        />
      </TouchableOpacity>

      {/* Cards inside Transaction Accordion */}
      {isTransactionOpen && (
        <View
          style={[
            styles.transactionContent,
            { backgroundColor: "#f8f8f8", borderRadius: 12 },
          ]}
        >
          {[1, 2, 3, 4, 5].map((cardIndex) => (
            <Card key={cardIndex} style={styles.card}>
              <View style={styles.cardHeader}>
                <Text style={styles.cardDate}>12 Jan 2025</Text>
              </View>
              <View style={styles.cardRow}>
                <Text style={styles.cardLabel}>Spendings</Text>
                <Text style={styles.cardValueSpending}>
                  -${120 * cardIndex}
                </Text>
              </View>
              <View style={styles.cardRow}>
                <Text style={styles.cardLabel}>Income</Text>
                <Text style={styles.cardValueIncome}>+${300 * cardIndex}</Text>
              </View>
              <View style={styles.divider} />

              {/* Nested Accordion */}
              <TouchableOpacity
                style={styles.innerAccordionHeader}
                onPress={() => toggleCardAccordion(cardIndex)}
              >
                <View style={styles.innerAccordionLeft}>
                  <MaterialIcons
                    name="restaurant"
                    size={20}
                    color="#6A5ACD"
                    style={styles.innerAccordionIcon}
                  />
                  <View>
                    <Text style={styles.innerAccordionTitle}>
                      Food and Drinks
                    </Text>
                    <View style={styles.totalRow}>
                      <Text style={styles.totalAmount}>${50 * cardIndex}</Text>
                    </View>
                  </View>
                </View>
                <View style={styles.innerAccordionRight}>
                  <View style={styles.itemCountBox}>
                    <Text style={styles.itemCountText}>2</Text>
                  </View>
                  <MaterialIcons
                    name={
                      openCards.includes(cardIndex)
                        ? "keyboard-arrow-up"
                        : "keyboard-arrow-down"
                    }
                    size={24}
                    color="#666"
                  />
                </View>
              </TouchableOpacity>

              {openCards.includes(cardIndex) && (
                <View style={styles.innerAccordionContent}>
                  {/* Cards for each item */}
                  {[1, 2].map((itemIndex) => (
                    <Card key={itemIndex} style={styles.itemCard}>
                      <View style={styles.innerAccordionItemContainer}>
                        <Text style={styles.innerAccordionItem}>
                          {itemIndex === 1 ? "🍔 Item 1A" : "☕ Item 1B"}: $
                          {20 * itemIndex}
                        </Text>
                      </View>
                    </Card>
                  ))}
                </View>
              )}
            </Card>
          ))}

          {/* Divider and See All */}
          <View style={styles.bottomDividerContainer}>
            <View style={styles.divider} />
            <TouchableOpacity style={styles.seeAllButton}>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 10,
  },
  accordionHeader: {
    padding: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    elevation: 3,
  },
  accordionTitle: {
    fontSize: 22, // Daha büyük font
    fontWeight: "600",
    color: "#333", // Siyahın güzel bir tonu
  },
  transactionContent: {
    margin: 12,
    padding: 16,
    backgroundColor: "#fff",
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 6,
  },
  card: {
    marginBottom: 16,
    backgroundColor: "#ffffff",
    padding: 16,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  cardHeader: {
    marginBottom: 8,
  },
  cardDate: {
    fontSize: 16,
    color: "#888",
    fontWeight: "500",
  },
  cardRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  cardLabel: {
    fontSize: 18,
    fontWeight: "600",
    color: "#444",
  },
  cardValueSpending: {
    fontSize: 18,
    fontWeight: "600",
    color: "#FF6347", // Red for spending
  },
  cardValueIncome: {
    fontSize: 18,
    fontWeight: "600",
    color: "#32CD32", // Green for income
  },
  divider: {
    height: 1,
    backgroundColor: "#ddd",
    marginVertical: 8,
  },
  innerAccordionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  innerAccordionLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  innerAccordionIcon: {
    marginRight: 12,
  },
  innerAccordionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
  },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 6,
  },
  totalAmount: {
    fontSize: 16,
    fontWeight: "500",
    color: "#6A5ACD",
  },
  innerAccordionRight: {
    flexDirection: "row",
    alignItems: "center",
  },
  itemCountBox: {
    backgroundColor: "#0071e3",
    padding: 6,
    borderRadius: 12,
    marginRight: 10,
  },
  itemCountText: {
    width: 25,
    textAlign: "center",
    color: "#fff",
    fontWeight: "600",
  },
  innerAccordionContent: {
    paddingLeft: 16,
    marginBottom: 8,
  },
  innerAccordionItemContainer: {
    padding: 8,
  },
  innerAccordionItem: {
    fontSize: 16,
    color: "#555",
    marginVertical: 4,
  },
  bottomDividerContainer: {
    marginTop: 16,
    alignItems: "center",
  },
  seeAllButton: {
    paddingVertical: 10,
    backgroundColor: "#f4f4f4",
    borderRadius: 12,
    paddingHorizontal: 20,
  },
  seeAllText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
  itemCard: {
    backgroundColor: "#f4f4f4",
    marginVertical: 8,
    padding: 16,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  itemValue: {
    fontSize: 20, // Boyutu büyüttüm
    fontWeight: "700", // Kalınlık artırıldı
    color: "#1E90FF", // Mavi renk
  },
});

export default TransactionAccordion;
