<template>
  <div class="home">
    <v-container class="my-5">
      <!-- qr-code generator -->
      <v-row>
        <v-col cols="12">
          <span class="red white--text pa-5 mb-15">QR-CODE Generator </span>
        </v-col>
        <v-col cols="12" class="d.flex" md="5">
          <div class="input">
            <v-text-field
              class="ma-8"
              label="insert text here"
              v-model="value"
              outlined
            ></v-text-field>
          </div>
        </v-col>
        <v-col cols="12" md="7">
          <div class="drawer">
            <QrCode
              :value="value"
              image="https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg"
              dotsColor="#4267b2"
              backgroundColor="#e9ebee"
            /></div
        ></v-col>
      </v-row>
      <v-divider class="my-5"></v-divider>
      <!--  qr-code redear -->
      <v-row>
        <v-col cols="12">
          <span class="warning white--text pa-5 mb-15">QR-CODE READER</span>
        </v-col>
        <!-- result column -->
        <v-col cols="12" md="6">
          <div class="response mt-16">
            <span class="grey--text text--darken-3 my-16 font-weight-bold">
              QR-CODE READER Result: {{ result }}
            </span>

            <p v-if="error !== null" class="drop-error">
              {{ error }}
            </p>
          </div>
        </v-col>

        <!-- redear column -->
        <v-col cols="12" md="6">
          <div class="reader">
            <client-only>
              <!-- use client camera -->
              <qrcode-stream @decode="onDecode"></qrcode-stream>
              <!-- drop image -->
              <qrcode-drop-zone
                @detect="onDetect"
                @dragover="onDragOver"
                @init="logErrors"
              >
                <div class="drop-area" :class="{ dragover: dragover }">
                  DROP SOME QRCODE IMAGES HERE
                </div>
              </qrcode-drop-zone>
              <qrcode-capture @decode="onDecode"></qrcode-capture>
            </client-only>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import QRCode from "@/components/QRCode";
export default {
  components: {
    QRCode,
  },
  data() {
    return {
      value: "Gnopor",
      size: 300,
      result: null,
      error: null,
      dragover: false,
    };
  },
  methods: {
    onDecode(decodedString) {
      this.result = decodedString;
    },
    async onDetect(promise) {
      try {
        const { content } = await promise;

        this.result = content;
        this.error = null;
      } catch (error) {
        if (error.name === "DropImageFetchError") {
          this.error = "Sorry, you can't load cross-origin images :/";
        } else if (error.name === "DropImageDecodeError") {
          this.error = "Ok, that's not an image. That can't be decoded.";
        } else {
          this.error = "Ups, what kind of error is this?! " + error.message;
        }
      }
    },

    logErrors(promise) {
      promise.catch(console.error);
    },

    onDragOver(isDraggingOver) {
      this.dragover = isDraggingOver;
    },
  },
};
</script>

<style scoped>
.drop-area {
  height: 300px;
  color: #fff;
  text-align: center;
  font-weight: bold;
  padding: 10px;

  background-color: rgba(0, 0, 0, 0.5);
}

.dragover {
  background-color: rgba(0, 0, 0, 0.8);
}

.drop-error {
  color: red;
  font-weight: bold;
}
</style>