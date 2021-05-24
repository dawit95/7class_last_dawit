<template>
  <card>
    <form>
      <div class="col-md-12" style="text-align:center">
        <strong> {{ notice.title }} </strong>
      </div>
      <div class="row">
        <div class="col-md-1"></div>
        <div class="col-md-7">작성자 : {{ notice.authorId }}</div>
        <div class="col-md-3">작성날짜 : {{ notice.postdate }}</div>
        <div class="col-md-1"></div>
      </div>
      <div class="row">
        <div class="col-md-12">
          <div class="form-group">
            <textarea
              rows="5"
              class="form-control border-input"
              placeholder="Here can be your description"
              v-model="notice.content"
              readonly
            >
            </textarea>
          </div>
        </div>
      </div>

      <div class="text-right" aline="right">{{ notice.postdate }}</div>
      <p class="mt-3">Store.state.notice : {{ notice }}</p>

      <!-- <div class="text-center">
        <button
          type="submit"
          class="btn btn-info btn-fill float-right"
          @click.prevent="updateProfile"
        >
          Update Profile
        </button>
      </div> -->
      <div class="clearfix"></div>
    </form>
  </card>
</template>

<script>
import Card from "src/components/Cards/Card.vue";

export default {
  name: "l-table-datil",
  components: {
    Card
  },
  data() {
    return {
      notice: {}
    };
  },
  computed: {
    getNotice() {
      return this.$store.state.boardSession.notice;
    }
  },
  watch: {
    getNotice(val) {
      this.notice = val;
    }
  }
};
</script>

<style></style>
