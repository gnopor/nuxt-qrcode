import QRCodeStyling from "qr-code-styling";

export default ({ app }, inject) => {
  // Inject $hello(msg) in Vue, context and store.
  inject("QRCodeStyling", QRCodeStyling);
};
