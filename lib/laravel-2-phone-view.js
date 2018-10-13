'use babel';

export default class Laravel2PhoneView {

  constructor(serializedState) {
    // Create root element
    this.element = document.createElement("div");
    this.element.classList.add("laravel-2-phone");
    this.element.setAttribute("id", "qr-box");

    // Create message element
    const message = document.createElement("div");
    message.textContent = "Scan QR Code";
    message.classList.add("message");
    this.element.appendChild(message);
  }

  // Returns an object that can be retrieved when package is activated
  serialize() {}

  // Tear down any state and detach
  destroy() {
    this.element.remove();
  }

  getElement() {
    return this.element;
  }

}
