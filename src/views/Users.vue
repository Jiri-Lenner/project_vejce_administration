TODO -> přepsat err alerts TODO -> user already exists err
TODO -> setup adding users

<template>
	<v-container align-start justify-start>
		<!-- Toolbars -->
		<v-toolbar
			elevation="2"
			class="mb-5 grey lighten-4"
		>
			<v-spacer></v-spacer>

			<template>
				<v-form v-model="valid">
					<v-row style="flex-grow: 0">
						<v-dialog
							v-model="addDialog"
							max-width="600px"
						>
							<template
								v-slot:activator="{
									on,
									attrs,
								}"
							>
								<v-btn
									v-bind="attrs"
									v-on="on"
									text
								>
									<v-icon left
										>mdi-plus</v-icon
									>Přidat uživatele</v-btn
								>
							</template>
							<v-card>
								<v-card-title
									class="blue darken-2"
								>
									<span
										class="text-h5 white--text"
										>Přidat
										uživatele</span
									>
								</v-card-title>
								<v-card-text>
									<v-container>
										<v-row>
											<v-col
												cols="12"
											>
												<v-text-field
													label="Jméno"
													v-model="
														userName
													"
													required
													:rules="
														nameRules
													"
												></v-text-field>
											</v-col>

											<v-col
												cols="12"
											>
												<v-text-field
													v-model="
														email
													"
													:rules="
														emailRules
													"
													label="E-mail"
													hint="Zadejte email"
													required
												></v-text-field>
											</v-col>
											<v-col
												cols="12"
											>
												<v-text-field
													@keyup.enter="
														signIn
													"
													v-model="
														password
													"
													:append-icon="
														show
															? 'mdi-eye'
															: 'mdi-eye-off'
													"
													:rules="
														passwordRules
													"
													:type="
														show
															? 'text'
															: 'password'
													"
													name="heslo"
													label="Heslo"
													hint="Zadejte heslo"
													class="input-group--focused"
													@click:append="
														show =
															!show
													"
													required
												></v-text-field>
											</v-col>
											<v-col
												cols="12"
												sm="6"
											>
												<v-select
													:items="[
														'Uživatel',
														'Admin',
													]"
													label="Role"
													required
													v-model="
														role
													"
													:rules="
														roleRules
													"
												></v-select>
											</v-col>
										</v-row>
									</v-container>
									<small
										>*pozor! admin má
										plnou pravomoc nad
										všemi uživateli i
										vaším
										profilem!</small
									>
								</v-card-text>
								<v-card-actions>
									<v-spacer></v-spacer>
									<v-btn
										color="error"
										@click="
											addDialog = false
										"
									>
										Zrušit
									</v-btn>
									<v-btn
										color="success"
										:disabled="!valid"
										@click="
											addDialog = false;
											addUser();
										"
									>
										Přidat
									</v-btn>
								</v-card-actions>
							</v-card>
						</v-dialog>
					</v-row>
				</v-form>
			</template>
		</v-toolbar>

		<!-- Alerts -->
		<v-alert type="success" v-if="success" text>
			Operace úspěšně provedena
		</v-alert>
		<v-alert
			prominent
			type="error"
			v-if="error && users.length == 0"
		>
			<v-row align="center">
				<v-col class="grow">
					Chyba při načítání dat!
				</v-col>
				<v-col class="shrink">
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
					Operaci nelze provést
					{{ extraErrMessage }}
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
				<v-col class="col-md-1 col-sm-2"
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
			extraErrMessage: '',
			loading: false,
			operationError: false,
			dialog: false,
			success: false,
			users: [],
			addDialog: false,
			show: false,

			nameRules: [
				value => !!value || 'Zadejte jméno',
			],
			roleRules: [value => !!value || 'Vyberte roli'],
			valid: true,
			passwordRules: [
				v => !!v || 'Zadejte heslo',
				v =>
					/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?_-])[A-Za-z\d#$@!%&*?_-]{6,30}$/.test(
						v
					) ||
					'Heslo musí obsahovat alespoň 6 znaků, jedno velké písmeno, jedno malé písmeno, jedno číslo a jeden speciální znak',
			],
			emailRules: [
				v => !!v || 'Zadejte E-mail',
				v =>
					/.+@.+\..+/.test(v) ||
					'E-mail mustí být platný',
			],
			// updating and editing
			userName: '',
			email: '',
			password: '',
			role: '',
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
			const token = this.$store.state.token;
			if (!token) {
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
							Authorization: `Bearer ${token}`,
						},
					}
				);
			} catch (err) {
				this.setOperationFailed();
				return;
			}

			this.users = this.users.filter(
				user => user._id !== _id
			);
			this.setSuccess();
		},

		async addUser() {
			if (!this.$store.state.token) {
				this.$router.push('/login');
			}

			// check for duplicates
			for (const user of this.users) {
				if (user.email == this.email) {
					this.setDuplicateError();
					return;
				}
			}

			if (
				this.email == this.$store.state.user.email
			) {
				this.setDuplicateError();
				return;
			}

			// add user
			let userData;
			try {
				userData = await fetch(
					`http://localhost:3000/api/v1/users/`,
					{
						method: 'POST',
						headers: {
							'Content-Type':
								'application/json',
							Authorization: `Bearer ${this.$store.state.token}`,
						},
						body: JSON.stringify({
							userName: this.userName,
							email: this.email,
							password: this.password,
							admin: this.role === 'Admin',
						}),
					}
				);
			} catch (err) {
				// check for error
				this.setOperationFailed();
				return;
			}

			const formatedResponse = (await userData.json())
				.data;

			// add users locally
			this.users.push({
				userName: this.userName,
				email: this.email,
				password: this.password,
				admin: this.role === 'Admin',
				_id: formatedResponse.user._id,
			});

			this.setSuccess();
		},

		setSuccess() {
			this.success = true;
			setTimeout(() => {
				this.success = false;
			}, 3000);
		},
		setOperationFailed() {
			this.operationError = true;
			this.extraErrMessage =
				'- chyba připojení k internetu';
			setTimeout(() => {
				this.extraErrMessage = '';
				this.operationError = false;
			}, 3000);
		},
		setDuplicateError() {
			this.operationError = true;
			this.extraErrMessage =
				'- uživatel s tímto e-mailem již existuje';
			setTimeout(() => {
				this.operationError = false;
				this.extraErrMessage = '';
			}, 3000);
		},
	},

	mounted() {
		this.loadData();
	},
};
</script>
