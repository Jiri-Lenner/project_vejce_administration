<template>
	<v-container align-start justify-start>
		<v-row>
			<v-col
				class="col-lg-4 col-md-6 col-sm-12"
				v-for="n of 25"
				:key="n"
			>
				<v-card class="pa-4">
					<v-card-title>Bob</v-card-title>
					<v-card-subtitle>Admin</v-card-subtitle>
					<v-card-actions>
						<v-btn color="primary">
							<v-icon left>
								mdi-pencil
							</v-icon>
							Upravit</v-btn
						>
						<v-btn
							dark
							class="red accent-2 ml-4"
						>
							<v-icon left
								>mdi-trash-can</v-icon
							>
							Odstranit</v-btn
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
