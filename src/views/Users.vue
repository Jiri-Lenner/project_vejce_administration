<template>
	<v-container align-start justify-start>
		<v-row>
			<v-col class="col-md-4 col-sm-6">
				<v-card class="pa-4">
					<v-card-title>Bob</v-card-title>
					<v-card-subtitle>Admin</v-card-subtitle>
					<v-card-actions>
						<v-btn color="primary"
							>Upravit</v-btn
						>
						<v-btn
							dark
							class="red accent-2 ml-4"
							>Odstranit</v-btn
						>
					</v-card-actions>
				</v-card>
			</v-col>
		</v-row>
	</v-container>
</template>

<script>
export default {
	name: 'Users',
	mounted() {
		if (!this.$store.state.token) {
			this.$router.push('/login');
		}
		// get users!
		// TODO auto odhlašování!
	},
};
</script>
