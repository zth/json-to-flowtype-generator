# json-to-flowtype-generator
This is a small tool to generate `flow` types from arbitrary JSON or static JS objects/arrays.
The tool was designed with the following use cases in mind:

* Generating base types for API calls
* Quickly generating types from arbitrary JS objects, lists or JSON

It provides easy interaction by defaulting to using the current clipboard contents, effectively making the workflow:

1. Copy your data
2. Run `json-to-flow` in a terminal
3. The generated type has now been copied to the clipboard

It can also operate directly on files, as in the example below:

![Example usage](https://raw.githubusercontent.com/zth/json-to-flowtype-generator/master/example.gif "Example usage")

The tool does some semi-intelligent merging of objects etc in lists in order to identify both `maybe`-keys and keys that can have multiple types. 
Check out the GIF above and compare the objects in `friends` of the raw data to `friends` in the generated type. Notice how the tool has marked keys 
not present in all objects as `maybe` types.

## Installation
```
npm install -g json-to-flowtype-generator
json-to-flow -h
```

## Usage
```
# This will use the file apiResponse.json to generate a Flow type, and let you set options for the type interactively.
json-to-flow --file apiResponse.json --interactive
```

```
# This will use the current clipboard content to generate a Flow type, make the type read only, and name it ApiResponse.
json-to-flow --clipboard --read-only --name ApiResponse
```

All commands have shortcuts, check out `json-to-flow -h`.

## Editor integrations
I personally use IntelliJ/WebStorm, but other editor integrations are very welcome contributions.

### IntelliJ/WebStorm/JetBrains
You can configure an `External Tool` that runs `json-to-flow --clipboard` + your desired config. 
Then simply copy an object/array/some JSON and run the external tool.

## Merging of lists and objects
The tools tries to be as smart as possible with merging lists and objects. 
For example, it assumes that objects discovered in the same list are of the same type, 
merging the objects into one and sensing what properties are present on all objects,
and what are not and therefore are optional. This is desirable all cases where the objects returned
in a list is in fact of the same type. Currently there's no way to turn this off, but it might come 
in a later version.

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
type Type = {|
    +friends: $ReadOnlyArray<{|
        +name: string,
        +email: ?string
    |]>
|}
```

It also handles the same key having multiple types of values in different objects 
in the same list. Check out the tests for more info.