<template>
	<v-container><div>Uzivatele</div></v-container>
</template>

<script>
export default {
	name: 'Users',
	mounted() {
		if (!this.$store.state.token) {
			this.$router.push('/login');
		}
	},
};
</script>
