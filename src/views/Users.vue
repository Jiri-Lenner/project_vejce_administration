<template>
	<v-container align-start justify-start>
		<v-alert
			prominent
			type="error"
			v-if="error && users.length == 0"
		>
			<v-row align="center">
				<v-col class="grow">
					Chyba při načítání dat!
				</v-col>
				<v-col
					v-if="!operationError"
					class="shrink"
				>
					<v-btn @click="loadData"
						>Zkusit znovu</v-btn
					>
				</v-col>
			</v-row> </v-alert
		><v-alert
			prominent
			type="error"
			v-if="operationError"
		>
			<v-row align="center">
				<v-col class="grow">
					Nelze provést operaci
				</v-col>
				<v-col
					v-if="!operationError"
					class="shrink"
				>
					<v-btn @click="loadData"
						>Zkusit znovu</v-btn
					>
				</v-col>
			</v-row>
		</v-alert>
		<v-alert class="grey lighten-2" v-if="loading">
			<v-row align="center">
				<v-col cols="1"
					><v-btn
						small
						:loading="true"
						:disabled="true"
						color="info"
						class="white--text"
						fab
					>
						<v-icon dark>
							mdi-cloud-upload
						</v-icon>
					</v-btn></v-col
				>
				<v-col class="ma-0 pl-0">
					<h1
						class="ma-0 text-h6 grey--text text--darken-3"
					>
						Načítání dat
					</h1>
				</v-col>
			</v-row>
		</v-alert>

		<v-row>
			<v-col
				class="col-lg-4 col-md-6 col-sm-12"
				v-for="user of this.users"
				:key="user._id"
			>
				<v-card class="pa-4">
					<v-card-title>{{
						user.userName
					}}</v-card-title>
					<v-card-subtitle>{{
						user.admin ? 'Admin' : 'Uživatel'
					}}</v-card-subtitle>
					<v-card-actions>
						<v-btn color="primary">
							<v-icon left>
								mdi-pencil
							</v-icon>
							Upravit</v-btn
						>

						<template>
							<div class="text-center">
								<v-dialog
									v-model="dialog"
									width="500"
								>
									<template
										v-slot:activator="{
											on,
											attrs,
										}"
									>
										<v-btn
											dark
											class="red accent-2 ml-4"
											v-bind="attrs"
											v-on="on"
										>
											<v-icon left
												>mdi-trash-can</v-icon
											>
											Smazat</v-btn
										>
									</template>

									<v-card>
										<v-card-title
											dark
											class="text-h5 blue darken-2 white--text"
										>
											Smazání
											uživatele:
										</v-card-title>

										<v-card-title
											class="text-h5"
										>
											{{
												user.userName
											}}
										</v-card-title>

										<v-card-text>
											{{
												user.admin
													? 'Admin'
													: 'Uživatel'
											}}
										</v-card-text>

										<v-divider></v-divider>

										<v-card-actions>
											<v-spacer></v-spacer>
											<v-btn
												color="error"
												dark
												@click="
													dialog = false
												"
											>
												Zrušit
											</v-btn>
											<v-btn
												color="success"
												dark
												@click="
													dialog = false;
													deleteUser(
														user._id
													);
												"
											>
												Smazat
											</v-btn>
										</v-card-actions>
									</v-card>
								</v-dialog>
							</div>
						</template>
					</v-card-actions>
				</v-card>
			</v-col>
		</v-row>
	</v-container>
</template>

<script>
export default {
	name: 'Users',
	data() {
		return {
			error: false,
			loading: false,
			operationError: false,
			dialog: false,
			users: [],
		};
	},

	methods: {
		async loadData() {
			if (!this.$store.state.token) {
				this.$router.push('/login');
			}
			this.loading = true;
			// requst data for the users profile!!
			let userData;
			try {
				userData = await fetch(
					`http://localhost:3000/api/v1/users/info`,
					{
						method: 'POST',
						headers: {
							'Content-Type':
								'application/json',
							Authorization: `Bearer ${this.$store.state.token}`,
						},
					}
				);
			} catch (err) {
				this.loading = false;
				this.error = true;
				// return function
				return;
			}
			this.error = false;
			const unfilteredUsers = (await userData.json())
				.data.users;
			this.users = unfilteredUsers.filter(
				user =>
					user.email !==
					this.$store.state.user.email
			);
			this.loading = false;
		},
		async deleteUser(_id) {
			if (!this.$store.state.token) {
				this.$router.push('/login');
			}

			// delete user

			try {
				await fetch(
					`http://localhost:3000/api/v1/users/${_id}`,
					{
						method: 'DELETE',
						headers: {
							'Content-Type':
								'application/json',
							Authorization: `Bearer ${this.$store.state.token}`,
						},
					}
				);
			} catch (err) {
				this.operationError = true;
				// return function
				return;
			}

			this.operationError = false;

			this.users = this.users.filter(
				user => user._id !== _id
			);
		},
	},

	mounted() {
		this.loadData();
	},
};
</script>
