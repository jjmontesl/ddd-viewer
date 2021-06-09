<template v-slot:activator="{ on }">
  <div>
    <v-app-bar flat height="40">
      <span class="hidden-md-and-up">
        <v-app-bar-nav-icon @click="sidebar = !sidebar"></v-app-bar-nav-icon>
      </span>
      <div class="headline ml-0">
        <div v-resize-text>
          <router-link
            :to="{ name: 'home' }"
            tag="span"
            style="cursor: pointer;"
            >{{ appTitle }}</router-link>
        </div>
      </div>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn
          text
          v-for="(item, index) in menuItems"
          :key="index"
          :to="{ name: item.link }"
          exact
          :class="['hidden-sm-and-down', item.class]"
        >
          <v-icon>{{ item.icon }}</v-icon>
          &nbsp;{{ item.title }}
        </v-btn>

        <!--
        <v-list-item class="hidden-sm-and-down">
          <v-icon>mdi-weather-sunny</v-icon>
          <v-list-item-action>
            <v-switch v-model="isDark" inset></v-switch>
          </v-list-item-action>
          <v-icon class="pl-2">mdi-weather-night</v-icon>
        </v-list-item>
        -->

        <v-menu v-if="admin" offset-y>
          <template v-slot:activator="{ on }">
            <v-btn v-on="on" text class="btnAdmin hidden-sm-and-down">
              <v-icon>mdi-lock</v-icon>
              &nbsp;{{ $t('adminItems.ADMIN') }}
            </v-btn>
          </template>
          <v-list>
            <v-list-item
              v-for="(item, index) in adminItems"
              :key="index"
              :to="{ name: item.link }"
              exact
              :class="[item.class]"
            >
              <v-list-item-icon class="mr-2">
                <v-icon>{{ item.icon }}</v-icon>
              </v-list-item-icon>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>

        <!-- <LocaleChanger /> -->

      </v-toolbar-items>
    </v-app-bar>

    <v-navigation-drawer v-model="sidebar" absolute disable-resize-watcher>
      <v-list>
        <v-list-item>
          <v-list-item-content>{{ appTitle }}</v-list-item-content>
          <v-list-item-action>
            <v-btn icon @click.stop="sidebar = !sidebar">
              <v-icon>mdi-chevron-left</v-icon>
            </v-btn>
          </v-list-item-action>
        </v-list-item>
        <v-list-item
          v-for="(item, index) in menuItems"
          :key="index"
          :to="{ name: item.link }"
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>{{ item.title }}</v-list-item-content>
        </v-list-item>

        <v-list-group v-if="admin" prepend-icon="mdi-lock" no-action>
          <v-list-item slot="activator" class="pl-0">
            <v-list-item-content>{{
              $t('adminItems.ADMIN')
            }}</v-list-item-content>
          </v-list-item>
          <v-list-item
            v-for="(item, index) in adminItems"
            :key="index"
            :to="{ name: item.link }"
            exact
          >
            <v-list-item-icon>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item>
        </v-list-group>

        <v-list-item>
          <v-list-item-action></v-list-item-action>
          <v-icon>mdi-weather-sunny</v-icon>
          <v-list-item-action class="ml-2">
            <v-switch id="themeSwitcher" v-model="isDark" inset></v-switch>
          </v-list-item-action>
          <v-icon>mdi-weather-night</v-icon>
        </v-list-item>

      </v-list>

    </v-navigation-drawer>
  </div>
</template>

<script>
// import { mapGetters } from 'vuex';
import LocaleChanger from '@/components/core/LocaleChanger';
import ResizeText from 'vue-resize-text';

export default {
	name: 'Toolbar',
	metaInfo() {
		return {
			title: "DDD Viewer",
			htmlAttrs: {
				lang: this.$i18n.locale
			},
			meta: [
				{ name: 'msapplication-TileColor', content: '#ffc40d' },
				{ name: 'theme-color', content: '#ffffff' },
				{
					name: 'apple-mobile-web-app-title',
					content: "DDD Viewer"
				},
				{ name: 'application-name', content: "DDD Viewer" }
			],
			link: [
				{
					rel: 'apple-touch-icon',
					sizes: '180x180',
					href: '/apple-touch-icon.png'
				},
				{
					rel: 'icon',
					type: 'image/png',
					sizes: '32x32',
					href: '/favicon-32x32.png'
				},
				{
					rel: 'icon',
					type: 'image/png',
					sizes: '16x16',
					href: '/favicon-16x16.png'
				},
				{ rel: 'manifest', href: '/site.webmanifest' },
				{ rel: 'mask-icon', color: '#5bbad5', href: '/safari-pinned-tab.svg' },
				{ rel: 'favicon', href: '/favicon.ico' }
			]
		};
	},
	components: {
		LocaleChanger
	},
	directives: {
		ResizeText
	},
	data() {
		return {
			isDark: false,
			sidebar: false
		};
	},
	props: [
		'viewerState'
	],
	computed: {
		// ...mapGetters([ 'appTitle', 'isTokenSet', 'user', ]),
		admin() {
			return this.user !== null ? this.user.role === 'admin' : false;
		},
		adminItems() {
			return [
				{
					title: this.$t( 'adminItems.CITIES' ),
					link: 'admin-cities',
					icon: 'mdi-city',
					class: 'btnAdminCities'
				},
				{
					title: this.$t( 'adminItems.USERS' ),
					link: 'admin-users',
					icon: 'mdi-account-supervisor',
					class: 'btnAdminUsers'
				}
			];
		},
		menuItems() {
			// eslint-disable-next-line no-constant-condition
			if ( true ) {
				return [
					{
						title: this.$t( 'menuItems.HOME' ),
						link: 'home',
						icon: 'mdi-home',
						class: 'btnHome'
					},
					{
						title: this.$t( 'menuItems.VIEW_MAP' ),
						link: 'view-map',
						icon: 'mdi-video-map',
						class: 'btnViewMap'
					},
					{
						title: this.$t( 'menuItems.VIEW_3D' ),
						link: 'view-3d',
						icon: 'mdi-video-3d',
						class: 'btnView3D'
					},
					{
						title: this.$t( 'menuItems.ABOUT' ),
						link: 'about',
						icon: 'mdi-help-circle-outline',
						class: 'btnAbout'
					},
					{
						title: this.$t( 'menuItems.MY_PROFILE' ),
						link: 'profile',
						icon: 'mdi-face',
						class: 'btnProfile'
					}
				];
			}
			let links = [];
			links = [
				/*
        {
          title: this.$t('menuItems.HOME'),
          link: 'home',
          icon: 'mdi-home'
        },
        */
				{
					title: 'Map',
					link: 'mapMain',
					icon: 'mdi-map-outline',
					class: 'btnViewMap'
				},
				{
					title: '3D',
					link: 'sceneMain',
					icon: 'mdi-earth',
					class: 'btnView3D'
				},
			];
			if ( this.viewerState && this.viewerState.sceneVisible ) {
				/*
        links.push({
          title: 'Tools',
          link: (this.$route.name === "sceneTools" ? 'sceneMain' : 'sceneTools'),
          icon: 'mdi-wrench',
          class: 'btnTools'
        });
        */
				links.push({
					title: 'Settings',
					link: ( this.$route.name === "sceneTools" ? 'sceneMain' : 'sceneTools' ), // Rename to Settings
					icon: 'mdi-cog',
					class: 'btnSettings'
				});

			}
			links.push({
				title: this.$t( 'menuItems.ABOUT' ),
				link: 'about',
				icon: 'mdi-help-circle-outline',
				class: 'btnAbout'
			});
			/*
        {
          title: this.$t('menuItems.LOGIN'),
          link: 'login',
          icon: 'mdi-lock',
          class: 'btnLogin'
        },
        {
          title: this.$t('menuItems.SIGNUP'),
          link: 'signup',
          icon: 'mdi-plus-circle-outline',
          class: 'btnLogin'
        }
        */
			return links;
		}
	},
	methods: {
		userLogout() {
			this.$store.dispatch( 'userLogout' );
		}
	},
	watch: {
		isDark() {
			this.$vuetify.theme.dark = this.isDark;
			localStorage.setItem( 'dark', this.isDark );
		},
		'viewerState.sceneVisible'() {
			this.$forceUpdate();
		}
	},
	created() {
		const dark = localStorage.getItem( 'dark' );
		this.isDark = dark ? JSON.parse( dark ) : false;
	}
};
</script>
