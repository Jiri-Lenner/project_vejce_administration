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
			<v-btn fab small depressed>
				<v-icon>mdi-login</v-icon> </v-btn
			><v-btn fab small depressed v-if="false">
				<v-icon>mdi-logout</v-icon>
			</v-btn>
		</v-app-bar>
		<v-navigation-drawer
			app
			clipped
			v-model="drawer"
			class="grey lighten-5"
		>
			<v-list-item two-line>
				<v-list-item-avatar>
					<img
						src="https://randomuser.me/portraits/women/79.jpg"
					/>
				</v-list-item-avatar>

				<v-list-item-content>
					<v-list-item-title
						>Pepinda
						Marleyová</v-list-item-title
					>
					<v-list-item-subtitle
						>Admin</v-list-item-subtitle
					>
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
						v-for="item of items"
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
		<v-main>
			<v-container fill-height>
				<router-view />
			</v-container>
		</v-main>

		<v-footer app inset padless>
			<v-col class="py-0">
				<v-subheader
					>Jiří Lenner Junior ⏤ v1.0
				</v-subheader>
			</v-col>

			<v-col class="py-0">
				<v-subheader class="justify-end">
					© Pepinda Marleyová 2022
				</v-subheader>
			</v-col>

			<!-- <p><
				Designed and Produced by Jiří Lenner Junior
			</p>
			<p>© Vlastimila Lennerová 2022</p> -->
		</v-footer>
	</v-app>
</template>

<script>
export default {
	name: 'App',
	components: {},

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
};
</script>
