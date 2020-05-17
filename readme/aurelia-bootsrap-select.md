## Installation
You can run the examples or build your own by doing the following.

### Aurelia-CLI / Webpack
```bash
npm install --save aurelia-bootstrap-select
```

<a name="cli"></a>

#### Aurelia-CLI
For `CLI` you will need to add (`bootstrap-select` and `aurelia-bootstrap-select`) to your `aurelia.json` file. The exported class is `abp-select`.
```javascript
{
  "name": "bootstrap-select",
  "main": "dist/js/bootstrap-select.js",
  "path": "../node_modules/bootstrap-select",
  "resources": [
    "dist/css/bootstrap-select.min.css"
  ]
},
{
  "name": "aurelia-bootstrap-select",
  "main": "index",
  "path": "../node_modules/aurelia-bootstrap-select/dist/amd",
  "resources": [
    "**/*.{css,html}"
  ]
},
```

_app.html_
```html
 <require from="bootstrap-select/dist/css/bootstrap-select.min.css"></require>
```

<a name="webpack"></a>

#### Aurelia-Webpack
`Bootstrap-Select` and possibly others require to have the same `jQuery` accross the bundle. You will need to modify your `webpack.config.babel.js` for this to work correctly.


```diff
const ENV...
let config = generateConfig(
{
  entry: {
    'app': ['./src/main' /* this is filled by the aurelia-webpack-plugin */],
    'aurelia-bootstrap': coreBundles.bootstrap,
    'aurelia': coreBundles.aurelia.filter(pkg => coreBundles.bootstrap.indexOf(pkg) === -1)
  },
  output: {
    path: outDir
  },
+  plugins: [
+   new webpack.ProvidePlugin({
+     $: "jquery",
+     jQuery: "jquery",
+     'window.jQuery': 'jquery',
+     'window.Tether': 'tether',
+     Tether: 'tether'
+   })
+  ],
+  resolve: {
+     alias: {
+         // Force all modules to use the same jquery version.
+         'jquery': path.join(__dirname, 'node_modules/jquery/src/jquery')
+     }
+  }
},
```

<a name="mainjs"></a>

### Aurelia (main.js)
Make the plugin available globally in your `main.js` file. Please note the exported class is `abp-select`

#### For WebPack only (main.js)
```javascript
import 'bootstrap-select/dist/css/bootstrap-select.min.css';
```

##### Bootstrap 4 support
An extra custom CSS file was added to address the changes (until `Bootstrap-Select` comes out with version that supports it, open BS4 issue [#1135](https://github.com/silviomoreto/bootstrap-select/issues/1135)), you can import this custom CSS file via:
 ```javascript
 import 'aurelia-bootstrap-select/dist/amd/bootstrap-select-bs4.css';
 ```

#### CLI/WebPack (main.js)
```javascript
export function configure(aurelia) {
  aurelia.use
    .standardConfiguration()
    .developmentLogging()
    .plugin('aurelia-bootstrap-select');

  aurelia.start().then(() => aurelia.setRoot());
}
```

**Note on `aurelia-webpack-plugin 2.0`**

If you started using the new `aurelia-webpack-plugin` version `2.0`, which is currently in [RC Pre-Release](https://github.com/aurelia/webpack-plugin/releases) and is already packaged in some of the [Aurelia Skeletons](https://github.com/aurelia/skeleton-navigation) (not all). You will have to use the `PLATFORM.ModuleName` wrapper. The previous code becomes:

```javascript
aurelia.use.plugin(PLATFORM.moduleName('aurelia-bootstrap-select'));
```

<a name="globaloption"></a>

### Global Options
You can change any of the global options directly in the `main.js` through a `config` as shown below:

```javascript
export function configure(aurelia) {
  aurelia.use
    .standardConfiguration()
    .developmentLogging()
    .plugin('aurelia-bootstrap-select', config => {
      // extra attributes, with config.extra
      config.extra.mappingDataStructure = {
        subtext: 'company'
      };

      // or any picker options, with config.options
      config.options.width = 'fit';
    });

  aurelia.start().then(() => aurelia.setRoot());
}
```

or with `aurelia-webpack-plugin 2.0` :

```javascript
export function configure(aurelia) {
  aurelia.use.standardConfiguration().developmentLogging();
  aurelia.use.plugin(PLATFORM.moduleName('aurelia-bootstrap-select'), config => {
    // extra attributes, with config.extra
    config.extra.mappingDataStructure = {
      subtext: 'company'
    };

    // or any picker options, with config.options
    config.options.width = 'fit';
  });
  aurelia.start().then(() => aurelia.setRoot(PLATFORM.moduleName('app')));
}
```
To know which Global Options are available take a look at the [Global Options file](https://github.com/ghiscoding/Aurelia-Bootstrap-Plugins/blob/master/aurelia-bootstrap-select/src/picker-global-options.js)

Now you can use it as:  
```html
<abp-select picker-options.bind="pickerOptions"
                              data-mapping-structure.bind="categoryMappings"
                              selected-item.bind="selectedSubCategories"
                              collection.bind="categories"
                              multiple="true"
                              object-key="productCategoryId">
                  </abp-select>
```
```ts
  selectedSubCategories: any[] = [];
  categoryMappings = {
    option: 'categoryName',
    id: 'productCategoryId'
  };
  pickerOptions = {
    actionsBox: true,
    dropupAuto: true,
    liveSearch: true
  };
```
