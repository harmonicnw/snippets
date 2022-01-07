### Query All Metafield Defintions for a Specific Type
The below query queries all collection metafield definitions, to query the metafields
for a different type, i.e product or order, please change the ```ownerType``` argument
to something other than ```COLLECTION```
```
query metafieldDefinitions {
  metafieldDefinitions(ownerType: COLLECTION, first: 100) {
    edges {
      node {
        id
        description
        key
        metafieldsCount
        name
        namespace
        ownerType
        type {
          category
          name
          valueType
          supportsDefinitionMigrations
        }
        validations {
          value
        }
      }
    }
  }
}
```

### Query All Metafield Storefront Visibilities
When creating metafield definitions, you often define whether or not the metafield
is visible to the Storefront API, but if you need to query that data, it's queried
separately.

```
query getAllMetafields {
  metafieldStorefrontVisibilities(first: 50) {
    edges {
      node {
        id,
        key,
        legacyResourceId,
        namespace,
        ownerType
      }
    }
  }
}
```