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
        <i class="fas fa-bars"></i>
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
                <i class="fas fa-times"></i>
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
                Dashboard
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
                Settings
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
                Payments
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
                Users
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
                Subscriptions
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
                Templates
              </a>
            </router-link>
        </li>
        </ul>

        <!-- Divider -->
        <hr class="my-4 md:min-w-full" />
      </div>
    </div>
  </nav>
</template>
); }

<script>
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
  },
};
</script>
