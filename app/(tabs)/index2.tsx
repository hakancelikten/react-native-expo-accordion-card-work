import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { Card } from "react-native-paper"; // Paper Card bileşenini import ediyoruz.

// Mock Data
const mockData = [
  {
    id: 1,
    date: "12 Jan 2025",
    spendings: 100,
    income: 10,
    categoryName: "Commute",
    categoryIcon: "commute",
    transactions: [
      { id: 1, name: "Uber", price: 80 },
      { id: 2, name: "Metro", price: 10 },
    ],
  },
  {
    id: 2,
    date: "15 Jan 2025",
    spendings: 20,
    income: 0,
    categoryName: "Food And Drinks",
    categoryIcon: "restaurant",
    transactions: [
      { id: 1, name: "Hamburger", price: 6 },
      { id: 2, name: "Coffee", price: 4 },
      { id: 3, name: "Beer", price: 10 },
    ],
  },
];

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
        <View
          style={[
            styles.transactionContent,
            { backgroundColor: "#f8f8f8", borderRadius: 12 },
          ]}
        >
          {mockData.map((cardData, cardIndex) => (
            <Card key={cardData.id} style={styles.card}>
              {/* Paper Card bileşeni kullanılıyor */}
              <Card.Content>
                <View style={styles.cardHeader}>
                  <Text style={styles.cardDate}>{cardData.date}</Text>
                </View>
                <View style={styles.cardRow}>
                  <Text style={styles.cardLabel}>Spendings</Text>
                  <Text style={styles.cardValueSpending}>
                    -${cardData.spendings}
                  </Text>
                </View>
                <View style={styles.cardRow}>
                  <Text style={styles.cardLabel}>Income</Text>
                  <Text style={styles.cardValueIncome}>
                    +${cardData.income}
                  </Text>
                </View>
                <View style={styles.divider} />

                {/* Nested Accordion for Food and Drinks */}
                <TouchableOpacity
                  style={styles.innerAccordionHeader}
                  onPress={() => toggleCardAccordion(cardData.id)}
                >
                  <View style={styles.innerAccordionLeft}>
                    <MaterialIcons
                      name={cardData.categoryIcon}
                      size={20}
                      color="#000000"
                      style={styles.innerAccordionIcon}
                    />
                    <View>
                      <Text style={styles.innerAccordionTitle}>
                        {cardData.categoryName}
                      </Text>
                      <View style={styles.totalRow}>
                        <Text style={styles.totalAmount}>
                          $
                          {cardData.transactions.reduce(
                            (acc, item) => acc + item.price,
                            0
                          )}
                        </Text>
                      </View>
                    </View>
                  </View>
                  <View style={styles.innerAccordionRight}>
                    <View style={styles.itemCountBox}>
                      <Text style={styles.itemCountText}>
                        {cardData.transactions.length}
                      </Text>
                    </View>
                    <MaterialIcons
                      name={
                        openCards.includes(cardData.id)
                          ? "keyboard-arrow-up"
                          : "keyboard-arrow-down"
                      }
                      size={24}
                      color="#666"
                    />
                  </View>
                </TouchableOpacity>

                {openCards.includes(cardData.id) && (
                  <View style={styles.innerAccordionContent}>
                    {/* Nested Card under Food and Drinks */}
                    <Card style={styles.subCard}>
                      <Card.Content>
                        {cardData.transactions.map((item) => (
                          <View key={item.id} style={styles.cardItemContainer}>
                            <Text style={styles.innerAccordionItem}>
                              {item.name}: ${item.price}
                            </Text>
                          </View>
                        ))}

                        <Text style={styles.subCardTitle}>More Details</Text>
                        <Text style={styles.subCardText}>
                          This is a detailed description of the food items, such
                          as ingredients, pricing, and other information.
                        </Text>
                      </Card.Content>
                    </Card>
                  </View>
                )}
              </Card.Content>
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
    marginLeft: 8,
    marginRight: 8,
    marginBottom: 12,
    borderRadius: 8,
    elevation: 4,
    backgroundColor: "#f0f0f0",
    padding: 16,
  },
  cardHeader: {
    marginBottom: 8,
  },
  cardDate: {
    fontSize: 14,
    color: "#666",
    fontWeight: "bold",
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
    backgroundColor: "#4A90E2",
    textAlign: "center",
    borderRadius: 8,
    paddingHorizontal: 6,
    paddingVertical: 2,
    marginRight: 8,
  },
  itemCountText: {
    textAlign: "center",
    padding: 3,
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
  cardItemContainer: {
    marginBottom: 8,
  },
  subCard: {
    marginTop: 12,
    backgroundColor: "#f7f7f7",
    borderRadius: 8,
    elevation: 3,
    padding: 12,
  },
  subCardTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 8,
  },
  subCardText: {
    fontSize: 14,
    color: "#555",
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
    color: "#333",
    fontWeight: "bold",
  },
});

export default TransactionAccordion;
