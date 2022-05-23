<template>
	<div>Produkty</div>
</template>

<script>
export default {
	name: 'Products',
	mounted() {
		if (!this.$store.state.token) {
			this.$router.push('/login');
		}
	},
};
</script>
