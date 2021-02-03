<template>
  <div class="container mx-auto mb-8">
      <h1 class="page-title">{{title}}</h1>
  </div>
</template>

<script>
  export default {
    props: {
      title: String
    }
  }
</script>

<style>

.page-title {
  color: #fcfcfc;
  font-size: 2rem;
}

</style>