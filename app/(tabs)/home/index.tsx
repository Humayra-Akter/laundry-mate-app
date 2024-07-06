import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  FlatList,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import {
  FontAwesome,
  FontAwesome6,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { onboardingSwiperData } from "@/data/onboardingSwiperData";
import { specialOffers } from "@/data/specialOffers";
import services from "@/data/services.json";
import faqs from "@/data/faqs.json";
import { generalServices } from "@/data/generalServices";
import { useRouter } from "expo-router";

export default function HomeScreen() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchSubmit = () => {
    if (searchQuery.trim() !== "") {
      router.push(
        `/home/searchResults?query=${encodeURIComponent(searchQuery)}`
      );
    }
  };

  const renderCarouselItem = ({ item }: any) => (
    <View style={styles.carouselItem}>
      <Image source={item.image} style={styles.carouselImage} />
      <Text style={styles.carouselTitle}>{item.title}</Text>
      <Text style={styles.carouselDescription}>{item.shortDescription}</Text>
    </View>
  );

  const renderServiceItem = ({ item }: any) => (
    <View style={styles.serviceItem}>
      <MaterialCommunityIcons name={item.icon} size={24} color="#FF725E" />
      <Text style={styles.serviceName}>{item.name}</Text>
    </View>
  );

  const renderGeneralServiceItem = ({ item }: any) => (
    <View style={styles.generalServiceItem}>
      <Image source={item.image} style={styles.generalServiceImage} />
      <Text style={styles.generalServiceName}>{item.name}</Text>
    </View>
  );

  const renderFAQItem = ({ item }: any) => (
    <View style={styles.faqItem}>
      <Text style={styles.faqQuestion}>{item.question}</Text>
      <Text style={styles.faqAnswer}>{item.answer}</Text>
    </View>
  );

  const renderSpecialOfferItem = ({ item }: any) => (
    <View style={styles.specialOfferItem}>
      <Text style={styles.specialOfferTitle}>{item.title}</Text>
      <Text style={styles.specialOfferDescription}>{item.description}</Text>
      <View style={styles.specialOfferDetails}>
        <Text style={styles.specialOfferDiscount}>{item.discount}% off</Text>
        <Text style={styles.specialOfferValidity}>
          Valid until {item.validity}
        </Text>
      </View>
    </View>
  );

  return (
    <LinearGradient colors={["#fff", "#fafafa"]} style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.header}>
          <Image
            source={require("@/assets/images/logo.png")}
            style={styles.logo}
          />
          <Text style={styles.title}>Laundry Mate</Text>
        </View>
        {/* search option */}
        <TouchableOpacity
          style={styles.searchContainer}
          onPress={() => router.push("/home/search")}
        >
          <Ionicons name="search" size={24} color="gray" />
          <Text style={styles.searchInput}>Search</Text>
        </TouchableOpacity>
        {/* onboardingSwiperData */}
        <FlatList
          data={onboardingSwiperData}
          renderItem={renderCarouselItem}
          keyExtractor={(item) => item.id.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.carousel}
        />
        {/* Our Services */}
        <View style={styles.servicesContainer}>
          <Text style={styles.sectionTitle}>Our Services</Text>
          <FlatList
            data={services}
            renderItem={renderServiceItem}
            keyExtractor={(item) => item.id.toString()}
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.services}
          />
        </View>
        {/* pickup */}
        <View style={styles.servicesContainer}>
          <Text style={styles.pickup}>
            Select a Pickup date and Start Your Journey with{" "}
          </Text>
          <TouchableOpacity
            style={styles.pickupContainer}
            onPress={() => router.push("/home/pickup")}
          >
            <Text style={styles.pickupLM}>LAUNDRY MATE</Text>
            <FontAwesome name="calendar" size={24} color="#752100" />
          </TouchableOpacity>
        </View>

        {/* General Services  */}
        <View style={styles.servicesContainer}>
          <Text style={styles.sectionTitle}>General Services</Text>
          <FlatList
            data={generalServices}
            renderItem={renderGeneralServiceItem}
            keyExtractor={(item) => item.id.toString()}
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.generalServices}
          />
        </View>
        {/* trackorder */}
        <View style={styles.trackOrderCard}>
          <Text
            style={styles.trackOrderText}
            onPress={() => router.push("/home/trackOrder")}
          >
            Track Your Order
          </Text>
          <FontAwesome6 name="truck-fast" size={20} color="#752100" />
        </View>
        {/* Special Offers  */}
        <View style={styles.servicesContainer}>
          <Text style={styles.sectionTitle}>Special Offers</Text>
          <FlatList
            data={specialOffers}
            renderItem={renderSpecialOfferItem}
            keyExtractor={(item) => item.id.toString()}
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.carousel}
          />
        </View>
        {/* FAQs  */}
        <Text style={styles.sectionTitle}>FAQs</Text>
        {faqs.map((item) => renderFAQItem({ item }))}
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollViewContent: {
    padding: 16,
  },
  header: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  logo: {
    width: 60,
    height: 60,
    marginBottom: 8,
    marginTop: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#752100",
  },
  carousel: {
    marginBottom: 16,
  },
  carouselItem: {
    width: 280,
    marginRight: 16,
    alignItems: "center",
    borderRadius: 10,
    padding: 12,
    backgroundColor: "#fff8e6",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
  },
  carouselImage: {
    width: 200,
    height: 150,
    borderRadius: 10,
    marginBottom: 8,
  },
  carouselTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FF725E",
  },
  pickup: {
    textAlign: "center",
    fontSize: 14,
    fontWeight: "bold",
    margin: 10,
    padding: 6,
  },
  pickupLM: {
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
    color: "#752100",
  },
  searchContainer: {
    padding: 5,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 20,
    marginTop: 18,
    borderColor: "#FF725E",
    borderWidth: 1,
    marginBottom: 10,
  },
  searchInput: {
    marginLeft: 10,
    flex: 1,
  },
  carouselDescription: {
    fontSize: 14,
    color: "#000",
    textAlign: "center",
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#FF725E",
    marginVertical: 8,
    textAlign: "center",
  },
  pickupContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    marginTop: -10,
  },
  servicesContainer: {
    padding: 10,
    backgroundColor: "#fff8e6",
    marginLeft: "auto",
    marginRight: "auto",
    borderRadius: 10,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    marginTop: 10,
    width: "100%",
  },
  services: {
    marginBottom: 16,
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: 10,
  },
  serviceItem: {
    alignItems: "center",
    marginRight: 16,
  },
  serviceName: {
    fontSize: 14,
    color: "#000",
    marginTop: 4,
    fontWeight: "bold",
  },
  specialOfferItem: {
    borderRadius: 10,
    padding: 12,
    backgroundColor: "#fff8e6",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
  },
  specialOfferTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FF725E",
    marginBottom: 8,
  },
  specialOfferDescription: {
    fontSize: 14,
    color: "#000",
    marginBottom: 8,
  },
  specialOfferDetails: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  specialOfferDiscount: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#752100",
  },
  specialOfferValidity: {
    fontSize: 12,
    color: "#752100",
  },
  generalServices: {
    marginBottom: 22,
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: 10,
  },
  generalServiceItem: {
    alignItems: "center",
    marginRight: 16,
  },
  generalServiceImage: {
    width: 60,
    height: 60,
    borderRadius: 10,
    marginBottom: 8,
  },
  generalServiceName: {
    fontSize: 14,
    color: "#000",
    marginTop: 4,
    fontWeight: "bold",
  },
  trackOrderCard: {
    backgroundColor: "#FFF8E6",
    padding: 16,
    borderRadius: 10,
    elevation: 5,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 2,
    shadowOffset: { width: 0, height: 1 },
    marginBottom: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    marginTop: 16,
  },
  trackOrderText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FF725E",
    textAlign: "center",
  },
  faqItem: {
    marginBottom: 8,
    backgroundColor: "#fff8e6",
    padding: 10,
    borderRadius: 10,
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 2,
    shadowOffset: { width: 0, height: 1 },
  },
  faqQuestion: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333333",
    marginBottom: 4,
  },
  faqAnswer: {
    fontSize: 14,
    color: "#666666",
  },
});
