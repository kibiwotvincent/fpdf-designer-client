<script setup>
	import { Bars3Icon, XMarkIcon, AdjustmentsHorizontalIcon, AdjustmentsVerticalIcon, PowerIcon, Cog6ToothIcon, TicketIcon, CreditCardIcon, UsersIcon, GlobeAltIcon, ViewColumnsIcon } from '@heroicons/vue/24/outline'
</script>
<template>
  <nav
    class="md:left-0 md:block md:fixed md:top-0 md:bottom-0 md:overflow-y-auto md:flex-row md:flex-nowrap md:overflow-hidden shadow-xl bg-white flex flex-wrap items-center justify-between relative md:w-64 z-10 py-4 px-6"
  >
    <div
      class="md:flex-col md:items-stretch md:min-h-full md:flex-nowrap px-0 flex flex-wrap items-center justify-between w-full mx-auto"
    >
      <!-- Toggler -->
      <button
        class="cursor-pointer text-black opacity-50 md:hidden px-3 py-1 text-xl leading-none bg-transparent rounded border border-solid border-transparent"
        type="button"
        v-on:click="toggleCollapseShow('bg-white m-2 py-3 px-6')"
      >
        <Bars3Icon class="inline-block h-6 w-6 text-red-500 font-bold" />
      </button>
      <!-- Brand -->
      <router-link
        class="md:block text-left md:pb-0 text-gray-600 mr-0 inline-block whitespace-nowrap text-sm uppercase font-bold p-0"
        to="/"
      >
        <img class="logo" src="/assets/images/logo-black.png" />
      </router-link>
      
      <!-- Collapse -->
      <div
        class="md:flex md:flex-col md:items-stretch md:opacity-100 md:relative md:mt-4 md:shadow-none shadow absolute top-0 left-0 right-0 z-40 overflow-y-auto overflow-x-hidden h-auto items-center flex-1 rounded"
        v-bind:class="collapseShow"
      >
        <!-- Collapse header -->
        <div
          class="md:min-w-full md:hidden block pb-2 mb-2"
        >
          <div class="flex flex-wrap">
            <div class="w-6/12">
              <router-link
                class="md:block text-left md:pb-2 text-gray-600 mr-0 inline-block whitespace-nowrap text-sm uppercase font-bold px-0"
                to="/"
              >
                <img class="logo" src="/assets/images/logo-black.png" />
              </router-link>
            </div>
            <div class="w-6/12 flex justify-end">
              <button
                type="button"
                class="cursor-pointer text-black opacity-50 md:hidden px-3 py-1 text-xl leading-none bg-transparent rounded border border-solid border-transparent"
                v-on:click="toggleCollapseShow('hidden')"
              >
                <XMarkIcon class="inline-block h-6 w-6 text-red-500 font-bold" />
              </button>
            </div>
          </div>
        </div>

        <!-- Divider -->
        <hr class="md:min-w-full" />
        <!-- Navigation -->

        <ul class="md:flex-col md:min-w-full flex flex-col list-none">
          <li class="items-center">
            <router-link
              to="/dashboard"
              v-slot="{ href, navigate, isActive }"
            >
              <a
                :href="href"
                @click="navigate"
                class="text-xs uppercase py-3 font-bold block"
                :class="[
                  isActive
                    ? 'text-red-400 hover:text-red-500 hover:underline'
                    : 'text-gray-700 hover:text-red-400 hover:underline',
                ]"
              >
                <i
                  class="fas fa-tv mr-2 text-sm"
                  :class="[isActive ? 'opacity-75' : 'text-gray-300']"
                ></i>
                <GlobeAltIcon class="inline-block h-4 w-4 mb-1" /> Dashboard
              </a>
            </router-link>
          </li>

          <li class="items-center">
            <router-link
              to="/admin/settings"
              v-slot="{ href, navigate, isActive }"
            >
              <a
                :href="href"
                @click="navigate"
                class="text-xs uppercase py-3 font-bold block"
                :class="[
                  isActive
                    ? 'text-red-400 hover:text-red-500 hover:underline'
                    : 'text-gray-700 hover:text-red-400 hover:underline',
                ]"
              >
                <i
                  class="fas fa-tools mr-2 text-sm"
                  :class="[isActive ? 'opacity-75' : 'text-gray-300']"
                ></i>
                <Cog6ToothIcon class="inline-block h-4 w-4 mb-1" /> Settings
              </a>
            </router-link>
          </li>

          <li class="items-center">
            <router-link
              to="/admin/tables"
              v-slot="{ href, navigate, isActive }"
            >
              <a
                :href="href"
                @click="navigate"
                class="text-xs uppercase py-3 font-bold block"
                :class="[
                  isActive
                    ? 'text-red-400 hover:text-red-500 hover:underline'
                    : 'text-gray-700 hover:text-red-400 hover:underline',
                ]"
              >
                <i
                  class="fas fa-table mr-2 text-sm"
                  :class="[isActive ? 'opacity-75' : 'text-gray-300']"
                ></i>
                <CreditCardIcon class="inline-block h-4 w-4 mb-1" /> Payments
              </a>
            </router-link>
        </li>
        <li class="items-center">
            <router-link to="/admin/maps" v-slot="{ href, navigate, isActive }">
              <a
                :href="href"
                @click="navigate"
                class="text-xs uppercase py-3 font-bold block"
                :class="[
                  isActive
                    ? 'text-red-400 hover:text-red-500 hover:underline'
                    : 'text-gray-700 hover:text-red-400 hover:underline',
                ]"
              >
                <i
                  class="fas fa-map-marked mr-2 text-sm"
                  :class="[isActive ? 'opacity-75' : 'text-gray-300']"
                ></i>
                <TicketIcon class="inline-block h-4 w-4 mb-1" /> Subscriptions
              </a>
            </router-link>
        </li>
		
		<!-- Divider -->
        <hr class="my-0 md:min-w-full" />
        <!-- Heading -->
        <h6
          class="md:min-w-full text-gray-500 text-xs uppercase font-bold block pt-2 pb-1 no-underline"
        >
          Administrator
        </h6>
        <!-- Navigation -->
		<li class="items-center">
            <router-link
              to="/admin/users"
              v-slot="{ href, navigate, isActive }"
            >
              <a
                :href="href"
                @click="navigate"
                class="text-xs uppercase py-3 font-bold block"
                :class="[
                  isActive
                    ? 'text-red-400 hover:text-red-500 hover:underline'
                    : 'text-gray-700 hover:text-red-400 hover:underline',
                ]"
              >
                <i
                  class="fas fa-table mr-2 text-sm"
                  :class="[isActive ? 'opacity-75' : 'text-gray-300']"
                ></i>
                <UsersIcon class="inline-block h-4 w-4 mb-1" /> Users
              </a>
            </router-link>
        </li>
		<li class="items-center">
            <router-link to="/admin/templates" v-slot="{ href, navigate, isActive }">
              <a
                :href="href"
                @click="navigate"
                class="text-xs uppercase py-3 font-bold block"
                :class="[
                  isActive
                    ? 'text-red-400 hover:text-red-500 hover:underline'
                    : 'text-gray-700 hover:text-red-400 hover:underline',
                ]"
              >
                <i
                  class="fas fa-map-marked mr-2 text-sm"
                  :class="[isActive ? 'opacity-75' : 'text-gray-300']"
                ></i>
                <ViewColumnsIcon class="inline-block h-4 w-4 mb-1" /> Templates
              </a>
            </router-link>
        </li>
		<li class="items-center">
            <router-link to="/admin/roles" v-slot="{ href, navigate, isActive }">
              <a
                :href="href"
                @click="navigate"
                class="text-xs uppercase py-3 font-bold block"
                :class="[
                  isActive
                    ? 'text-red-400 hover:text-red-500 hover:underline'
                    : 'text-gray-700 hover:text-red-400 hover:underline',
                ]"
              >
                <i
                  class="fas fa-map-marked mr-2 text-sm"
                  :class="[isActive ? 'opacity-75' : 'text-gray-300']"
                ></i>
                <AdjustmentsHorizontalIcon class="inline-block h-4 w-4 mb-1" /> User Roles
              </a>
            </router-link>
        </li>
		<li class="items-center">
            <router-link to="/admin/permissions" v-slot="{ href, navigate, isActive }">
              <a
                :href="href"
                @click="navigate"
                class="text-xs uppercase py-3 font-bold block"
                :class="[
                  isActive
                    ? 'text-red-400 hover:text-red-500 hover:underline'
                    : 'text-gray-700 hover:text-red-400 hover:underline',
                ]"
              >
                <i
                  class="fas fa-map-marked mr-2 text-sm"
                  :class="[isActive ? 'opacity-75' : 'text-gray-300']"
                ></i>
                <AdjustmentsVerticalIcon class="inline-block h-4 w-4 mb-1" /> User Permissions
              </a>
            </router-link>
        </li>
		
		</ul>
		
        <!-- Divider -->
        <hr class="my-4 md:min-w-full" />
		<div class="items-center">
		<button @click="logout" class="bg-red-400 text-white-800 rounded mt-4 lg:mt-0 py-1 px-8 shadow focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out">
			<PowerIcon class="inline-block h-4 w-4 mb-1" /> Logout
		</button>
        </div>
      </div>
    </div>
  </nav>
</template>
); }

<script>
import { useAuthStore } from '@/stores';
	
export default {
  name: 'SidebarComponent',
  data() {
    return {
      collapseShow: "hidden",
    };
  },
  methods: {
    toggleCollapseShow: function (classes) {
      this.collapseShow = classes;
    },
	logout() {
		const authStore = useAuthStore()
		return authStore.logout()
	}
  },
};
</script>
