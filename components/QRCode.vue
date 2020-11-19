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
    image: {
      type: String,
      required: true,
    },
    dotsColor: {
      type: String,
      required: true,
    },
    backgroundColor: {
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
        image: this.image,
        dotsOptions: {
          color: this.dotsColor,
          type: "rounded",
        },
        backgroundOptions: {
          color: this.backgroundColor,
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