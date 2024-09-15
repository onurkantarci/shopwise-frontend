<template>
  <div>
    <nav>
      <router-link to="/">Home</router-link>
    </nav>
    <router-view />
  </div>
</template>

<script lang="ts" setup></script>

<style>
body {
  background-color: #1a1a1a;
  font-family: "Roboto", sans-serif;
  margin: 0;
}

nav {
  background-color: #333;
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  position: fixed;
  width: 100%;
  top: 0;
  z-index: 1000;
}

nav a {
  color: #fff;
  text-decoration: none;
  font-size: 1.2rem;
  letter-spacing: 0.05rem;
  transition: color 0.3s ease;
  position: relative;
}

nav a::before {
  content: "";
  position: absolute;
  width: 100%;
  height: 2px;
  bottom: -4px;
  left: 0;
  background-color: #ff4500;
  visibility: hidden;
  transform: scaleX(0);
}

nav a:hover::before {
  visibility: visible;
  transform: scaleX(1);
}

nav a:hover {
  color: #ff4500;
}
</style>
