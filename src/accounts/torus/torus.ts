import Torus from "@toruslabs/torus-embed";

const torus = new Torus({});

torus.init({
      enableLogging: true,
      network: { host: 'localhost' },
      showTorusButton: false
});

export { torus };