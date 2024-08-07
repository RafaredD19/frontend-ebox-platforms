<template>
  <v-card flat>
    <v-card-text>
      <ul>
        <li v-for="(schedule, index) in schedules.slice(1)" :key="index">{{ schedule }}</li>
      </ul>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: 'RideSchedules',
  props: {
    schedules: {
      type: Array,
      required: true,
    },
  },
};
</script>
