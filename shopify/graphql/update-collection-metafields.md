### Update Collection Metafields Mutation
```
mutation collectionUpdate($input: CollectionInput!) {
  collectionUpdate(input: $input) {
    collection {
      id
    }
    userErrors {
      field
      message
    }
  }
}
```

### Update Collection Metafields Variable
Simply replace the ID ```396736135383``` with the ID of the collection and the
namespace/key/value/type of the metafield you want to modify. You can also
supply multiple metafield objects.
```
{
  "input": {
    "id": "gid://shopify/Collection/396736135383",
    "metafields": [
      {
        "namespace": "taxonomy",
        "key": "category",
        "value": "true",
        "type": "boolean"
      }
    ]
  }
}
```