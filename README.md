# json-to-flowtype-generator
This is a small tool to generate `flow` types from arbitrary JSON.
The tool was created especially with the following in mind:

* Generating base types for API calls
* Quickly generating types from arbitrary objects
* Generating types for arbitrary JSON

## Usage
```
npm install -g json-to-flowtype-generator
json-to-flow -h
```

## Merging of lists and objects
The tools tries to be as smart as possible with merging lists and objects. 
For example, it assumes that objects discovered in the same list are of the same type, 
merging the objects into one and sensing what properties are present on all objects,
and what are not and therefore are optional.

Example:

```
{
    friends: [
        {
            name: "Name", // This is present in all objects
            email: "email@email.com" // But this isn't
        },
        {
            name: "Name 2"
        },
        {
            name: "Name 3"
        }
        ....
    ]
}
```

Becomes:

```
{|
    +friends: $ReadOnlyArray<{|
        +name: string,
        +email: ?string
    |]>
|}
```

It also handles the same key having multiple types of values in different objects 
in the same list. Check out the tests for more info.

### TODO
[ ] Rewrite using `babel-types` instead of the string hackery
[ ] Handle top level arrays