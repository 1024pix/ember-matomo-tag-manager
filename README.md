ember-cli-matomo-tag-manager
==============================================================================

This Ember addon helps you to integrate [Matomo Tag Manager](https://matomo.org/docs/tag-manager/) to your application.

> Simply said, Matomo Tag Manager is a plugin that takes Matomo Analytics to the next level. Similar to how a CMS brings you all the flexibility to publish content for your website, a Tag Management System (TMS) will allow you to easily embed 1st and 3rd party application resources into your website.

Compatibility
------------------------------------------------------------------------------

* Ember.js v3.16 or above
* Ember CLI v2.13 or above
* Node.js v10 or above


Installation
------------------------------------------------------------------------------

```
ember install ember-cli-matomo-tag-manager
```


Usage
------------------------------------------------------------------------------

First, add the ember-cli-matomo-tag-manager dependency to your project :

```
ember install ember-cli-matomo-tag-manager
```

Then, in your config file `config/environment.js`, declare your Matomo tags container URL :

```
// config/environment.js

module.exports = function(environment) {
  let ENV = {

    // ...

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    },

    matomo: {
      url: 'https://stats.pix.fr/js/container_rvRH7IMW.js'
    }

  };
  
  // ...

  return ENV;
};

```

And, _voilà_!

Configuration
------------------------------------------------------------------------------

| Param     | Type    | Required | Usage                    | Default value |
|-----------|---------|----------|--------------------------|---------------|
| url       | string  | yes      | Matomo TMS container URL | null          |
| debug     | boolean | no       | Enable Matomo debug logs | false         |

Example
------------------------------------------------------------------------------

Have a look on the dummy app (in `tests/dummy/app`) to see the addon in action.

You can see the data results on https://stats.pix.fr/index.php, for project "ember-cli-matomo-tag-manager". 

Contributing
------------------------------------------------------------------------------

See the [Contributing](CONTRIBUTING.md) guide for details.


License
------------------------------------------------------------------------------

This project is licensed under the [MIT License](LICENSE.md).
