<template>
  <article-detail :is-edit="false"/>
</template>

<script>
  import ArticleDetail from '../../../components/project/createEdit.vue'
  export default {
    name: 'createForm',
    components: { ArticleDetail }
  }
</script>
