If you're looking to create/edit/delete metafields for products or variants,
please use the Shopify Admin panel as with Online Store 2.0 that's now supported natively.
If you're looking to manage metafields for collections, customers or orders,
you're only option is to either use an external app or the GraphQL API and
the below queries.

### Create Metafield Mutation
Note, the below mutation only creates the metafield, if you want to make the metafield visible to the Storefront API and our templates, please run the ```metafieldStorefrontVisibilityCreate``` mutation below as well.

```
mutation metafieldDefinitionCreate($input: MetafieldDefinitionInput!) {
  metafieldDefinitionCreate(definition: $input) {
    createdDefinition {
      description,
      key,
      name,
      namespace,
      ownerType,
      type {
        name
      }
    }
    userErrors {
      field
      message
    }
  }
}
```

### Create Metafield Variable
This is just an example of the collection you can create, please refer to the
[metafieldDefinitionCreate](https://shopify.dev/api/admin-graphql/2022-01/mutations/metafieldDefinitionCreate) and [metafieldStorefrontVisibilityCreate](https://shopify.dev/api/admin-graphql/2022-01/mutations/metafieldStorefrontVisibilityCreate) sections in the GraphQL Admin API reference
```
{
  "input": {
    "description": "Category Collection",
    "key": "category",
    "name": "category",
    "namespace": "taxonomy",
    "ownerType": "COLLECTION",
    "type": "boolean"
  }
}
```

### Create Metafield Storefront Visibility Mutation
This mutation makes the passed metafield visible to the Storefront API and
let's us use the metafield in our templates/sites.
```
mutation metafieldStorefrontVisibilityCreate($input: MetafieldStorefrontVisibilityInput!) {
  metafieldStorefrontVisibilityCreate(input: $input) {
    metafieldStorefrontVisibility  {
      id
    }
    userErrors {
      field
      message
    }
  }
}
```

### Create Metafield Storefront Visibility Variable
The key/namespace/ownerType need to match exactly with what's defined for the metafield,
if you're running this mutation the same time as the ```metafieldDefinitionCreate```
mutation, you can use the same object and just remove the description, type and name fields.
```
{
  "input": {
    "key": "color",
    "namespace": "style",
    "ownerType": "COLLECTION"
  }
}
```
