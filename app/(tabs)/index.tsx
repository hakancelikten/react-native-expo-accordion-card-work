import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
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
          color="#666"
        />
      </TouchableOpacity>

      {/* Cards inside Transaction Accordion */}
      {isTransactionOpen && (
        <View style={[styles.transactionContent, { backgroundColor: "#f8f8f8", borderRadius: 12 }]}>
          {[1, 2, 3, 4, 5].map((cardIndex) => (
            <View key={cardIndex} style={styles.card}>
              <View style={styles.cardHeader}>
                <Text style={styles.cardDate}>12 Jan 2025</Text>
              </View>
              <View style={styles.cardRow}>
                <Text style={styles.cardLabel}>Spendings</Text>
                <Text style={styles.cardValueSpending}>-${120 * cardIndex}</Text>
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
                    <Text style={styles.innerAccordionTitle}>Food and Drinks</Text>
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
                    name={openCards.includes(cardIndex) ? "keyboard-arrow-up" : "keyboard-arrow-down"}
                    size={24}
                    color="#666"
                  />
                </View>
              </TouchableOpacity>
              {openCards.includes(cardIndex) && (
                <View style={styles.innerAccordionContent}>
                  <Text style={styles.innerAccordionItem}>🍔 Item {cardIndex}A: ${20 * cardIndex}</Text>
                  <Text style={styles.innerAccordionItem}>☕ Item {cardIndex}B: ${30 * cardIndex}</Text>
                </View>
              )}
            </View>
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
    backgroundColor: "#f9f9f9",
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  accordionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 12,
    borderRadius: 12,
    backgroundColor: "#ffffff",
    marginTop: 20,
    marginBottom: 20,
  },
  accordionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  transactionContent: {
    padding: 8,
    marginBottom: 12,
  },
  card: {
    backgroundColor: "#f0f0f0", 
    borderRadius: 8,
    padding: 16,
    marginLeft: 8,
    marginRight: 8,
    marginBottom: 12,
    shadowColor: "#ddd", 
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  cardHeader: {
    marginBottom: 8,
    borderColor: "#ddd",
    paddingBottom: 8,
  },
  cardDate: {
    fontSize: 14,
    color: "#666",
  },
  cardRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 4,
  },
  cardLabel: {
    fontSize: 14,
    color: "#333",
  },
  cardValueSpending: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#FF6347",
  },
  cardValueIncome: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#32CD32",
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
    paddingVertical: 10,
    borderBottomWidth: 2,
    borderColor: "#f0f0f0", 
    backgroundColor: "#f7f7f7", 
    borderRadius: 8,
    paddingHorizontal: 12,
  },
  innerAccordionLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  innerAccordionIcon: {
    marginRight: 8,
  },
  innerAccordionTitle: {
    fontSize: 16,
    color: "#333",
    fontWeight: "bold",
  },
  totalRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  totalAmount: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
  },
  innerAccordionRight: {
    flexDirection: "row",
    alignItems: "center",
  },
  itemCountBox: {
    backgroundColor: "#6A5ACD",
    borderRadius: 8,
    paddingHorizontal: 6,
    paddingVertical: 2,
    marginRight: 8,
  },
  itemCountText: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#fff",
  },
  innerAccordionContent: {
    paddingLeft: 16,
    paddingVertical: 12,
    backgroundColor: "#ffffff", 
    borderRadius: 8,
    marginTop: 6,
    shadowColor: "#ddd", 
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  innerAccordionItem: {
    fontSize: 14,
    color: "#555",
    marginBottom: 8,
    paddingVertical: 4,
    backgroundColor: "#fff", 
    borderRadius: 6,
    paddingHorizontal: 10,
    textAlign: "left",
  },
  bottomDividerContainer: {
    marginTop: 16,
  },
  seeAllButton: {
    marginTop: 10,
    padding: 8,
    alignItems: "center",
  },
  seeAllText: {
    fontSize: 16,
    color: "#333",  // Koyu gri renk
    fontWeight: "bold",
  },
});

export default TransactionAccordion;
