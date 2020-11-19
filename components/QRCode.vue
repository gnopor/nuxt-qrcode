<template>
  <div class="qr-code-generator">
    <div ref="canvas" class="canvas"></div>
  </div>
</template>

<script>
export default {
  name: "QRCodeGenerator",
  props: {
    value: {
      type: String,
      required: true,
    },
  },
  methods: {
    getQRCode() {
      const canvas = this.$refs.canvas;

      // custom plugin created to avoid window object not found problem
      const qrCode = new this.$QRCodeStyling({
        width: 300,
        height: 300,
        data: this.value,
        image:
          "https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg",
        dotsOptions: {
          color: "#4267b2",
          type: "rounded",
        },
        backgroundOptions: {
          color: "#e9ebee",
        },
        imageOptions: {
          crossOrigin: "anonymous",
        },
      });

      // clear canvas
      let child = canvas.lastElementChild;
      while (child) {
        canvas.removeChild(child);
        child = canvas.lastElementChild;
      }
      // draw qrcode
      qrCode.append(canvas);
    },
  },

  mounted() {
    this.getQRCode();
  },
  watch: {
    value() {
      this.getQRCode();
    },
  },
};
</script>