<template>
  <div class="deals-container">
    <h1>{{ storeName }} Deals</h1>
    <div v-if="deals.length" class="deals-list">
      <div v-for="deal in deals" :key="deal.id" class="deal-card">
        <img :src="deal.thumb" alt="game thumbnail" class="deal-thumb" />
        <div class="deal-info">
          <h2>{{ deal.title }}</h2>
          <p class="deal-price">
            <span class="sales-price">${{ deal.sales_price }}</span>
            <span class="normal-price">${{ deal.normal_price }}</span>
          </p>
          <p class="deal-savings">Save: {{ deal.savings }}%</p>
        </div>
      </div>
    </div>
    <p v-else>No deals available for this store.</p>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import axios from "axios";

interface Deal {
  id: number;
  store_id: number;
  game_id: number;
  steam_app_id: number;
  internal_name: string;
  title: string;
  metacritic_link: string;
  sales_price: string;
  normal_price: string;
  is_on_sale: boolean;
  savings: string;
  metacritic_score: number;
  steam_rating_text: string;
  steam_rating_percent: number;
  steam_rating_count: number;
  release_date: number;
  last_change: number;
  deal_rating: string;
  thumb: string;
}

const route = useRoute();
const storeID = ref(route.query.storeID);
const storeName = ref(route.query.storeName);
const deals = ref<Deal[]>([]);

const fetchDeals = async () => {
  try {
    const response = await axios.get(
      `http://localhost:4545/api/v1/deals?storeID=${storeID.value}`
    );
    deals.value = response.data;
  } catch (error) {
    console.error("Error fetching deals:", error);
  }
};

onMounted(() => {
  fetchDeals();
});
</script>

<style scoped>
.deals-container {
  padding: 20px;
  margin-top: 30px;
  text-align: center;
  font-family: "Arial", sans-serif;
}

h1 {
  color: #bcbcbc;
  font-size: 2.5em;
  margin-bottom: 20px;
}

.deals-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
}

.deal-card {
  background-color: #232222;
  border-radius: 10px;
  overflow: hidden;
  width: 300px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s, box-shadow 0.3s;
}

.deal-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 6px 10px rgba(0, 0, 0, 0.2);
}

.deal-thumb {
  width: 100%;
  height: 200px;
  object-fit: contain;
}

.deal-info {
  padding: 15px;
  text-align: left;
}

.deal-info h2 {
  font-size: 1.5em;
  margin: 0 0 10px;
  color: #ffffff;
}

.deal-price {
  font-size: 1.2em;
  margin-bottom: 10px;
}

.sales-price {
  color: #e74c3c;
  font-weight: bold;
}

.normal-price {
  color: #999;
  text-decoration: line-through;
  margin-left: 10px;
}

.deal-savings {
  color: #2ecc71;
  font-weight: bold;
}

p {
  font-size: 1.2em;
  color: #777;
}
</style>
