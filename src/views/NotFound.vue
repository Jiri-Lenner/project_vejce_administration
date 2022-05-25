<template>
	<div>Nenalezeno</div>
</template>

<script>
export default {
	name: 'NotFound',
	mounted() {
		if (!this.$store.state.token) {
			this.$router.push('/login');
		}
	},
};
</script>
