// Not transpiled with TypeScript or Babel, so use plain Es6/Node.js!
const replace = require("@rollup/plugin-replace");

module.exports = {
    // This function will run for each entry/format/env combination
    rollup(config, opts) {
        
        // TODO: See https://github.com/formium/tsdx to see if options currently package.json 

        // Added to workaround deprecation warning in @rollup/plugin-replace about 'preventAssignment' default value change        
        config.plugins = config.plugins.map(p => 
            p.name === "replace" 
                ? replace({ "process.env.NODE_ENV": JSON.stringify(opts.env), preventAssignment: true, })
                : p
        );
        
        // In order to bundle external deps in UMD format:
        // From: https://github.com/formium/tsdx/issues/179
        if (config.output.format === "umd") {
            config.external = (id) => {
                //console.log(id);
                //if (id.startsWith("@babylonjs")) return true;
                return false;
            };
        }
        
        
        // Return final customized config for the plugin
        return config; 
    },
};

