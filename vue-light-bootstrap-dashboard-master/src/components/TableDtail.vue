<template>
  <card>
    <h4 slot="header" class="card-title">공지사항</h4>
    <form>
      <div></div>
      <div class="row">
        <div class="col-md-12">
          <div class="form-group">
            <label>내용</label>
            <textarea
              rows="5"
              class="form-control border-input"
              placeholder="Here can be your description"
              v-model="notice.content"
            >
            </textarea>
          </div>
        </div>
      </div>

      <div aline="right">{{ notice.postdate }}</div>
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
      return this.$store.state.notice;
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
