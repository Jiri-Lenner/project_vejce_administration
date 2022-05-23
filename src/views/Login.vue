<template>
	<v-container
		fill-height
		d-flex
		align-center
		justify-center
	>
		<v-card>
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
							required
						></v-text-field>
					</v-col>
				</v-row>
				<v-row>
					<v-col>
						<v-text-field
							v-model="password"
							:append-icon="
								show
									? 'mdi-eye'
									: 'mdi-eye-off'
							"
							:rules="[
								rules.required,
								rules.min,
							]"
							:type="
								show ? 'text' : 'password'
							"
							name="heslo"
							label="Heslo"
							hint="Alespoň 8 znaků"
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
							@click="validate"
						>
							Přihlásit
						</v-btn>
					</v-col>
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
			rules: {
				required: value =>
					!!value || 'Zadejte jméno',
				min: v =>
					v.length >= 8 || 'Minimalně 8 znaků',
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
		async validate() {
			const validation = this.$refs.form.validate();

			if (validation) {
				this.loading = true;
				const response = await fetch(
					'http://localhost:3000/api/v1/users/login',
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
				const formatedResponse =
					await response.json();

				if (formatedResponse.status == 'success') {
					// store the token to the local storage
					this.$store.commit(
						'setToken',
						formatedResponse.token
					);

					// requst data for the users profile!!
					const userData = await fetch(
						`http://localhost:3000/api/v1/users/info/${formatedResponse.sub}`,
						{
							method: 'POST',
							headers: {
								'Content-Type':
									'application/json',
								Authorization: `Bearer ${this.$store.state.token}`,
							},
						}
					);
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
					// show error alert and clear the form
				}
				this.loading = false;
				// TODO => mounted => check token by requesting users data => if expired => login
				// TODO => role => admin => can see the users panel
			}
		},
	},
};
</script>
