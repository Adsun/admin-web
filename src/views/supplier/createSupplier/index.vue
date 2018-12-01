<template>
  <article-detail :is-edit="false"/>
</template>

<script>
import ArticleDetail from '../../../components/supplier/createEdit.vue'
export default {
  name: 'createForm',
  components: { ArticleDetail }
}
</script>
