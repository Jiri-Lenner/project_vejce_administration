<template>
	<div>Tabule</div>
</template>

<script>
export default {
	name: 'Dashboard',
	mounted() {
		if (!this.$store.state.token) {
			this.$router.push('/login');
		}
	},
};
</script>
