import React from "react";
import { Card as PaperCard } from "react-native-paper";
import { View, Text, StyleSheet } from "react-native";
import CardObj from "./CardObj";

interface CardComponentProps {
  cardData: CardObj;
  styles?: any;
  children?: React.ReactNode;
}

const CardComponent: React.FC<CardComponentProps> = ({
  cardData,
  styles: customStyles,
  children,
}) => {
  return (
    <PaperCard key={cardData.id} style={customStyles?.card ?? styles.card}>
      <PaperCard.Content>
        <View style={customStyles?.cardHeader ?? styles.cardHeader}>
          <Text style={customStyles?.cardDate ?? styles.cardDate}>
            {cardData.cardHeaderValue}
          </Text>
        </View>
        {cardData.row.map((rowData, index) => (
          <View key={index} style={customStyles?.cardRow ?? styles.cardRow}>
            <Text style={rowData?.cardLabelStyle ?? styles.cardLabel}>
              {rowData.label}
            </Text>
            <Text style={rowData?.cardValueStyle ?? styles.cardValue}>
              {rowData.value}
            </Text>
          </View>
        ))}
        {/* children içeriklerini ekliyoruz */}
        {children && <View>{children}</View>}
      </PaperCard.Content>
    </PaperCard>
  );
};

const styles = StyleSheet.create({
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
  cardValue: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#FF6347",
  },
});

export default CardComponent;
