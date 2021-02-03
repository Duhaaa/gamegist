<template>
	<Navigation />
	<router-view :key="$route.fullPath"/>
	<Footer />
</template>

<script>
import Navigation from "../src/components/Navigation";
import Footer from "../src/components/Footer";
export default {
	components: {
		Navigation,
		Footer,
	},
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Roboto+Slab&display=swap");

#app {
	font-family: "Roboto Slab", serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	background-color: #16213e;
	min-height: 100vh;
}
</style>
