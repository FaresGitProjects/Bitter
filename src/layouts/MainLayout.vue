<template>
  <q-layout view="lHr lpR fFf">
    <q-header bordered class="bg-white text-black">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />

        <q-toolbar-title class="text-weight-bold">
          <span class="gt-sm"> {{ $route.name }} </span>
          <q-icon
            class="header-icon q-ma-sm lt-md"
            name="fa-solid fa-crow"
            size="lg"
            color="primary"
          />
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer
      :width="283"
      show-if-above
      v-model="leftDrawerOpen"
      side="left"
      bordered
    >
      <!-- drawer content -->
      <q-icon
        class="q-ma-md"
        name="fa-solid fa-crow"
        size="lg"
        color="primary"
      />

      <q-list>
        <q-item 
          to="/" 
          clickable 
          v-ripple
          exact>

          <q-item-section class="text-h6"> Home </q-item-section>
          <q-item-section avatar>
            <q-icon name="home" size="md" />
          </q-item-section>
        </q-item>

        <q-item 
          to="/about"
          clickable
          v-ripple
          exact>

          <q-item-section class="text-h6"> About </q-item-section>
          <q-item-section avatar>
            <q-icon name="help" size="md" />
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>
    <q-drawer show-if-above v-model="rightDrawerOpen" side="right" bordered>
      <q-input
        class="q-ma-md"
        placeholder="Search Bitter"
        outlined
        rounded
        dense
        v-model="text"
      >
        <template v-slot:prepend>
          <q-icon name="search" />
        </template> </q-input
      ><!-- drawer content -->

      <q-list separator padding>
        <q-item class="q-pa-md">
          <q-item-section>
            <q-item-label overline>I'm Angry</q-item-label>
            <q-item-label>Wife broke up with my car</q-item-label>
            <q-item-label caption
              >John didn't think he could do it. But after hard work, he new he
              couldn't</q-item-label
            >
          </q-item-section>

          <q-item-section side top>
            <q-item-label caption>5 min ago</q-item-label>
          </q-item-section>
        </q-item>

        <q-item class="q-pa-md">
          <q-item-section>
            <q-item-label overline>I'm Angry</q-item-label>
            <q-item-label>Wife broke up with my car</q-item-label>
            <q-item-label caption
              >John didn't think he could do it. But after hard work, he new he
              couldn't</q-item-label
            >
          </q-item-section>
          <q-item-section side top>
            <q-item-label caption>5 min ago</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <keep-alive>
        <router-view />
      </keep-alive>
    </q-page-container>
  </q-layout>
</template>

<script>
import { ref } from "vue";

export default {
  setup() {
    const leftDrawerOpen = ref(false);
    const rightDrawerOpen = ref(false);

    return {
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },

      rightDrawerOpen,
      toggleRightDrawer() {
        rightDrawerOpen.value = !rightDrawerOpen.value;
      },
    };
  },
};
</script>

<style lang="sass">
.header-icon
  position: absolute
  bottom: 0
  left: 50%
  transform: translate(-50%)
</style>
