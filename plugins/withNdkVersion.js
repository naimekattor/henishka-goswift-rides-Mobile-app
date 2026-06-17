const { withProjectBuildGradle } = require('@expo/config-plugins');

const withNdkVersion = (config, props = {}) => {
  const ndkVersion = props.ndkVersion || "26.1.10909125";
  return withProjectBuildGradle(config, (config) => {
    if (config.modResults.language === 'groovy') {
      const ndkBlock = `
ext {
    ndkVersion = "${ndkVersion}"
}
`;
      
      if (!config.modResults.contents.includes('ndkVersion =')) {
        config.modResults.contents = ndkBlock + config.modResults.contents;
      } else {
        config.modResults.contents = config.modResults.contents.replace(
          /ndkVersion\s*=\s*['"][^'"]+['"]/g,
          `ndkVersion = "${ndkVersion}"`
        );
      }
    }
    return config;
  });
};

module.exports = withNdkVersion;
