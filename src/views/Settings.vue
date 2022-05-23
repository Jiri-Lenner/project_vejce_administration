<template>
	<div>Nastavení</div>
</template>

<script>
export default {
	name: 'Settings',
	mounted() {
		if (!this.$store.state.token) {
			this.$router.push('/login');
		}
	},
};
</script>
