import QRCodeStyling from "qr-code-styling";

export default ({ app }, inject) => {
  inject("QRCodeStyling", QRCodeStyling);
};
