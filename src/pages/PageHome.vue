<template>
  <q-page class="relative-position">
    <q-scroll-area class="absolute full-width full-height">
      <div class="q-py-lg q-px-md row">
        <div class="col">
          <q-input
            class="new-bit"
            bottom-slots
            v-model="newBitterContent"
            placeholder="What's Horrible"
            counter
            maxlength="280"
            :dense="dense"
            autogrow
          >
            <template v-slot:before>
              <q-avatar size="xl">
                <img src="src\assets\Profile-Pic-Filtered.jpg" />
              </q-avatar>
            </template>
          </q-input>
        </div>
        <div class="col col-shrink">
          <q-btn
            @click="addNewBeet()"
            :disabled="!newBitterContent"
            color="primary"
            label="Spew"
            rounded
            dense
            flat
            icon="send"
            no-caps
          />
        </div>
      </div>

      <q-separator size="10px" />
      <q-list separator>
        <transition-group
          tag="q-item"
          appear
          enter-active-class="animated fadeIn slow"
          leave-active-class="animated fadeOut slow"
        >
          <q-item class="q-py-md beet" v-for="beet in beets" :key="beet.id">
            <q-item-section avatar top>
              <q-avatar>
                <img src="src\assets\Profile-Pic-Filtered.jpg" />
              </q-avatar>
            </q-item-section>

            <q-item-section>
              <q-item-label lines="1">
                <strong>Fares Mohamed </strong>
                <span class="text-grey-7"
                  >@moustaff
                  <br class="lt-md" />
                  &bull;
                  {{ relativeDate(beet.date) }}
                </span>
              </q-item-label>

              <q-item-label class="bitter-content">
                {{ beet.content }}
              </q-item-label>
              <div class="row justify-evenly">
                <q-btn color="grey" size="sm" flat round icon="chat" />
                <q-btn color="grey" size="sm" flat round icon="reply" />
                <q-btn
                  @click="likeBeet(beet)"
                  color="grey"
                  size="sm"
                  flat
                  round
                  :icon="beet.liked ? 'favorite' : 'favorite_border'"
                />
                <q-btn
                  @click="deleteBeet(beet)"
                  color="grey"
                  size="sm"
                  flat
                  round
                  icon="delete"
                />
              </div>
            </q-item-section>
          </q-item>
        </transition-group>
      </q-list>
    </q-scroll-area>
  </q-page>
</template>

<script>
import { formatDistance } from "date-fns";
import { defineComponent } from "vue";
import db from "src/boot/firebase";

export default defineComponent({
  name: "PageHome",
  data() {
    return {
      newBitterContent: "",
      beets: [
        // {
        //   content: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Repudiandae cum eum autem fuga esse numquam veniam iste, consequatur ipsa dicta fugit vitae exercitationem aliquid, dolorum porro ad quis repellat dolorem.",
        //   date: 1673210027619,
        //   liked: true,
        //   id: "ID1"
        // },
        // {
        //   content: "Novus ordo seclorum. Sic semper tyrannis.",
        //   date: 1673210118191,
        //   liked: false,
        //   id: "ID2"
        // },
      ],
    };
  },
  computed: {
    relativeDate() {
      return (value) =>
        formatDistance(new Date(value), new Date(), { addSuffix: true });
    },
  },
  methods: {
    likeBeet(beet) {

      db.collection("beets").doc(beet.id).update({
        liked: !beet.liked
      })
      .then(function() {
        console.log("Nice")
      })
      .catch(function(error) {
        console.log("Damn", error)
      })
    },
    deleteBeet(beet) {
      db.collection("beets")
          .doc(beet.id)
          .delete()
          .then(() => {
            console.log("Document successfully deleted!");
          })
          .catch((error) => {
            console.error("Error removing document: ", error);
          });
    },
    addNewBeet() {
      let newBeet = {
        content: this.newBitterContent,
        date: Date.now(),
        liked: false,
      };
      // this.beets.unshift(newBeet);

      db.collection("beets")
        .add(newBeet)
        .then(function (docRef) {
          console.log("Document stored");
        })
        .catch(function (error) {
          console.error("Damn", error);
        });

      this.newBitterContent = "";
    },
  },
  mounted() {
    db.collection("beets").onSnapshot((querySnapshot) => {
      querySnapshot.docChanges().forEach((change) => {
        let beetChange = change.doc.data();
        beetChange.id = change.doc.id
        if (change.type === "added") {
          console.log("New qweet:", beetChange);
          this.beets.unshift(beetChange);
        }
        if (change.type === "modified") {
          console.log("Modified qweet: ", beetChange);
          let index = this.beets.findIndex(beet => beet.id === beetChange.id)
          Object.assign(this.beets[index], beetChange)
        }
        if (change.type === "removed") {
          console.log("Removed qweet: ", beetChange);
          let index = this.beets.findIndex(beet => beet.id === beetChange.id)
          this.beets.splice(index, 1)

        }
      });
    });
  },
});
</script>

<style lang="sass">
.new-bit
 textarea
  font-size: 19px
  line-height: 1.5 !important

.beet
  border-top: 1px solid rgba(0,0,0, .12)

.bitter-content
  white-space: pre-line
</style>
