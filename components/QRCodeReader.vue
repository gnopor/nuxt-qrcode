<template>
  <div class="">
    <qrcode-stream @decode="onDecode"></qrcode-stream>
    <qrcode-drop-zone></qrcode-drop-zone>
    <qrcode-capture></qrcode-capture>
  </div>
</template>

<script>
export default {
  name: "QRCodeReader",

  data() {},
  methods: {
    onDecode(decodedString) {
      console.log(decodedString);
    },
  },
};
</script>