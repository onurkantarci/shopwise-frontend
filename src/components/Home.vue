<template>
  <div class="store-list">
    <div
      v-for="store in stores"
      :key="store.id"
      class="store-item"
      @click="goToDeals(store.id, store.store_name)"
    >
      <div class="store-logo">
        <img :src="store.logo_image" alt="Logo Image" />
      </div>
      <h1 class="store-name">{{ store.store_name }}</h1>
      <p
        :class="{
          'store-status': true,
          online: store.is_active,
          offline: !store.is_active,
        }"
      >
        Status: {{ store.is_active ? "Online" : "Offline" }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import axios from "axios";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";

interface Store {
  id: number;
  store_name: string;
  is_active: boolean;
  banner_image: string;
  logo_image: string;
  icon_image: string;
}

const stores = ref<Store[]>([]);
const router = useRouter();

const fetchStores = async () => {
  try {
    const response = await axios.get("http://localhost:4545/api/v1/stores");
    stores.value = response.data;
  } catch (error) {
    console.error("Error fetching stores:", error);
  }
};

const goToDeals = (storeId: number, storeName: string) => {
  router.push({
    path: "/deals",
    query: {
      storeID: storeId.toString(),
      storeName: storeName,
    },
  });
};

onMounted(() => {
  fetchStores();
});
</script>

<style scoped>
.store-list {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 50px;
  margin: 250px auto;
  padding: 0 20px;
}

.store-item {
  background-color: #ffffff;
  padding: 50px;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(255, 255, 255, 0.598);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  width: 250px;
  text-align: center;
  cursor: pointer;
}

.store-item:hover {
  transform: translateY(-10px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
}

.store-logo img {
  width: 100px;
  height: 100px;
  object-fit: contain;
  margin-bottom: 15px;
}

.store-name {
  font-size: 1.5rem;
  margin-bottom: 10px;
  color: #4b5563;
}

.store-status {
  font-size: 1rem;
}

.store-status.online {
  color: green;
}

.store-status.offline {
  color: red;
}

@media (max-width: 768px) {
  .store-item {
    width: 100%;
  }
}
</style>
