<template>
	<v-container
		fill-height
		fill-width
		d-flex
		align-center
		justify-center
		flex-column
	>
		<v-card width="35%" min-width="300px">
			<v-form
				class="pa-8"
				v-model="valid"
				lazy-validation
				ref="form"
			>
				<v-row>
					<v-col
						><v-text-field
							v-model="email"
							:rules="emailRules"
							label="E-mail"
							hint="Zadejte email"
							required
							@keyup.enter="signIn"
						></v-text-field>
					</v-col>
				</v-row>
				<v-row>
					<v-col>
						<v-text-field
							@keyup.enter="signIn"
							v-model="password"
							:append-icon="
								show
									? 'mdi-eye'
									: 'mdi-eye-off'
							"
							:rules="[rules.required]"
							:type="
								show ? 'text' : 'password'
							"
							name="heslo"
							label="Heslo"
							hint="Zadejte heslo"
							class="input-group--focused"
							@click:append="show = !show"
						></v-text-field>
					</v-col>
				</v-row>
				<v-row>
					<v-col class="ma-0">
						<v-btn
							block
							:disabled="!valid || loading"
							:loading="loading"
							color="primary"
							class="ma-0"
							@click="signIn"
						>
							Přihlásit
						</v-btn>
					</v-col>
				</v-row>
				<v-row>
					<v-col v-if="error"
						><v-alert type="error">
							Chyba během přihlašování!
						</v-alert></v-col
					>
				</v-row>
			</v-form>
		</v-card>
	</v-container>
</template>

<script>
export default {
	name: 'Login',
	data() {
		return {
			show: false,
			email: '',
			password: '',
			loading: false,

			error: false,

			rules: {
				required: value =>
					!!value || 'Zadejte heslo',
			},
			valid: true,
			emailRules: [
				v => !!v || 'Zadejte E-mail',
				v =>
					/.+@.+\..+/.test(v) ||
					'E-mail mustí být platný',
			],
		};
	},
	methods: {
		// TODO learn about refresh token access token (two token relation administration
		// FIX make přihlasit se on enter
		// FIX odstranit z listu
		// TODO auto odhlašování!
		// TODO přidávání userů
		// TODO mazání userů
		// TODO Editování userů
		async signIn() {
			const validation = this.$refs.form.validate();

			if (validation) {
				this.loading = true;

				let response;
				try {
					response = await fetch(
						'https://kraslicelennerova.cz/api/v1/users/login',
						{
							method: 'POST',
							headers: {
								'Content-Type':
									'application/json',
							},

							body: JSON.stringify({
								data: {
									password: this.password,
									email: this.email,
								},
							}),
						}
					);
				} catch (err) {
					this.error = true;

					// return function
					this.loading = false;
					return;
				}

				const formatedResponse =
					await response.json();

				if (formatedResponse.status == 'success') {
					// store the token to the local storage
					this.$store.commit(
						'setToken',
						formatedResponse.token
					);

					// requst data for the users profile!!
					let userData;
					try {
						userData = await fetch(
							`https://kraslicelennerova.cz/api/v1/users/info/${formatedResponse.sub}`,
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
						this.error = true;

						// return function
						this.loading = false;
						return;
					}
					const formatedUserData = (
						await userData.json()
					).data.user;

					// store the user data to store
					this.$store.commit(
						'setUser',
						formatedUserData
					);

					// redirect
					this.$router.push({name: 'Dashboard'});
				} else {
					// show error alert and clear the form => wrong password
					this.error = true;
				}

				this.loading = false;
			}
		},
	},
	mounted() {
		if (this.$store.state.token) {
			this.$router.push('/dashboard');
		}
	},
};
</script>
