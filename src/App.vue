<template>
	<v-app>
		<v-app-bar
			app
			clipped-left
			elevation="0"
			class="gray lighten-4"
			outlined
		>
			<v-app-bar-nav-icon
				class="mr-2"
				@click="drawer = !drawer"
				v-if="this.$store.state.token"
			></v-app-bar-nav-icon>

			<h1 class="text-h6 font-weight-light" to="/">
				Kraslice
				<span class="font-weight-regular"
					>Administrace</span
				>
			</h1>
			<v-img
				max-height="25"
				max-width="25"
				src="@/assets/logo.png"
				contain
				class="ml-2"
			></v-img>
			<v-spacer></v-spacer>

			<v-btn
				fab
				small
				depressed
				v-if="this.$store.state.token"
				@click="signOut"
			>
				<v-icon>mdi-logout</v-icon>
			</v-btn>
		</v-app-bar>
		<v-navigation-drawer
			app
			clipped
			v-model="drawer"
			class="grey lighten-5"
			v-if="this.$store.state.token"
		>
			<v-list-item two-line>
				<v-list-item-content>
					<v-list-item-title>{{
						this.$store.state.user.userName
					}}</v-list-item-title>
					<v-list-item-subtitle>{{
						this.$store.state.user.admin
							? 'Admin'
							: 'Uživatel'
					}}</v-list-item-subtitle>
				</v-list-item-content>
			</v-list-item>

			<v-divider></v-divider>

			<v-list dense nav>
				<v-list-item-group
					link
					v-model="selectedItem"
					color="primary"
				>
					<v-list-item
						v-for="item of filteredItems"
						:key="items.indexOf(item)"
						:to="item.path"
					>
						<v-list-item-icon>
							<v-icon>{{ item.icon }}</v-icon>
						</v-list-item-icon>

						<v-list-item-content>
							<v-list-item-title>
								{{ item.title }}
							</v-list-item-title>
						</v-list-item-content>
					</v-list-item>
				</v-list-item-group>
			</v-list>
		</v-navigation-drawer>
		<v-main class="pb-sm-10 pb-xs-100">
			<v-container fill-height align-start>
				<router-view />
			</v-container>
		</v-main>
		<v-footer app inset absolute padless>
			<v-container class="px-6">
				<v-row justify="center">
					<v-col
						cols="12"
						class="col-md-6 col-sm-6 col-xs-12 pa-0"
						><p
							class="ma-0 pa-2 px-3 grey--text text--darken-1 text-center text-md-left text-sm-left"
						>
							Jiří Lenner Junior ⏤ v1.0
						</p></v-col
					>

					<v-col
						cols="12"
						class="col-md-6 col-sm-6 col-xs-12 pa-0"
					>
						<p
							class="ma-0 pa-2 px-3 grey--text text--darken-1 text-center text-md-right text-sm-right"
						>
							© Vlastimila Lennerová 2022
						</p></v-col
					>
				</v-row>
			</v-container>
		</v-footer>
	</v-app>
</template>

<script>
export default {
	name: 'App',
	components: {},
	onIdle() {
		console.log('Idle');
		this.signOut();
	},
	computed: {
		filteredItems() {
			if (!this.$store.state.user.admin) {
				const items = [...this.items];
				items.splice(2, 1);
				return items;
			} else {
				return this.items;
			}
		},
		windowWidth() {
			return window.innerWidth;
		},
	},

	data() {
		return {
			drawer: false,
			selectedItem: 0,

			items: [
				{
					title: 'Tabule',
					icon: 'mdi-view-dashboard',
					path: '/',
				},
				{
					title: 'Produkty',
					icon: 'mdi-archive',
					path: '/produkty',
				},
				{
					title: 'Uživatelé',
					icon: 'mdi-account',
					path: '/uzivatele',
				},
				{
					title: 'Nastavení',
					icon: 'mdi-cog',
					path: 'nastaveni',
				},
			],
		};
	},
	methods: {
		signOut() {
			this.$store.commit('resetUser');
			this.$store.commit('resetToken');
			this.$router.push('/login');
		},
	},
	async created() {
		if (this.$store.state.token) {
			let userData;
			try {
				userData = await fetch(
					`http://localhost:3000/api/v1/users/info/${this.$store.state.userId}`,
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
				this.$store.commit('resetUser');
				this.$store.commit('resetToken');
				if (this.$route.path !== '/login') {
					this.$router.push('/login');
				}
				return;
			}

			const formatedUserData = (await userData.json())
				.data.user;

			// store the user data to store
			this.$store.commit('setUser', formatedUserData);
		}
	},
};
</script>
