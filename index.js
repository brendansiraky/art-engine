const { makeLayerConfigurations } = require("./src/generateConfig");

const basePath = process.cwd();
const { startCreating, buildSetup } = require(`${basePath}/src/main.js`);

(async () => {
  const layerConfigurations = await makeLayerConfigurations()
  const sorted = layerConfigurations.sort((a, b) => a.growEditionSizeTo - b.growEditionSizeTo)
  buildSetup();
  startCreating(sorted);
})();
