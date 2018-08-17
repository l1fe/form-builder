## Form Builder

**Form Builder** is a web application on top of *ReactJS* for building forms from a *JSON* configuration.

## Getting Started

Before installing the app make sure that you have `node`, `npm` , `npx` and `yarn` (optionally) installed globally.

To get started just follow these steps in your terminal app.

```bash
# Get the latest snapshot
git clone https://github.com/l1fe/form-builder.git myproject

# Change directory
cd myproject

# Install NPM dependencies
yarn install

# Then simply start your app
yarn start
```

## Syntax

**Form Builder** uses the specific syntax for generating fields and evaluating  expressions.

### Configuration object

Should contain `fields` and `buttons` arrays that consists of `Field Schema`s and `Button schema`s respectively.

```js
{
  "fields": [],
  "buttons": []
}
```

### Field Schema

Used for generating fields.
Currently, types `text`, `email` , `number` and `select` (with `options`) are supported.
`showIf` is an optional field that is designed for handling show / hide field logic and has a special syntax described below.
```js
{
	"id": "email", // any 'string', is required
	"type": "email", // one of { 'text', 'email', 'number', 'select' }, is required
	"name": "email_address", // any 'string', is required
	"label": "Your Email", // any 'string', is required
	"placeholder": "Enter your email", // any 'string', is required
	"required": true, // any 'boolean'
	"options": [ // 'array' (should be used only with type === 'select')
	    { "value": "value1", "label": "Label One" },
		{ "value": "value2", "label": "Label Two" }
	],
	"showIf": "{first_name} && {last_name}" // Expression
},
```

### Button Schema

Used for generating form's buttons. One of the fields `shouldSubmit`  (*for submitting form*) , `shouldReset` (*for clearing form's values*) must be specified.
```js
{
	"id": "email", // any 'string', is required
	"primary": true, // any 'boolean'
	"title": "Submit", // any 'string', is required
	"shouldSubmit": true, // any 'boolean',
	"shouldReset": true //any 'boolean'
},
```

### Expression

If you create a field with `name` `first_name`, you can use the value of this field in the expression in the other field by using `{first_name}` single-bracket syntax.
Expression is evaluated by `javascrtipt`'s built-in `eval` function .
Here are the examples of valid Expression's :
```js
	const validExpressions = [
		'{first_name} && {last_name} && {gender} && {age}', // all values for the fields with given names are specified
		'{email}', // value of the field with name 'email' is specified
		'{gender} === \'female\'' // value of the field with name 'gender' is 'female'
	];
```

### Example of the valid JSON configuration
```js
{
  "fields": [
    {
      "id": "first_name",
      "type": "text",
      "name": "first_name",
      "label": "First Name",
      "placeholder": "Enter your first name",
      "required": true
    },
    {
      "id": "last_name",
      "type": "text",
      "name": "last_name",
      "label": "Last Name",
      "placeholder": "Enter your last name",
      "required": true,
      "showIf": "{first_name}"
    },
    {
      "id": "gender",
      "type": "select",
      "name": "gender",
      "label": "Gender",
      "required": true,
      "options": [
        { "value": "male", "label": "Male" },
        { "value": "female", "label": "Female" }
      ],
      "showIf": "{first_name} && {last_name}"
    },
    {
      "id": "fav_pub",
      "type": "text",
      "name": "fav_pub",
      "label": "Your Favourite Pub",
      "placeholder": "Enter your favourite pub's name",
      "required": true,
      "showIf": "{gender} === 'male'"
    },
    {
      "id": "fav_beauty_studio",
      "type": "text",
      "name": "fav_beauty_studio",
      "label": "Your Favourite Beauty Studio",
      "placeholder": "Enter your favourite beauty studio's name",
      "required": true,
      "showIf": "{gender} === 'female'"
    },
    {
      "id": "age",
      "type": "number",
      "name": "age",
      "label": "Your Age",
      "placeholder": "Enter your age",
      "required": true,
      "showIf": "{first_name} && {last_name} && {gender}"
    },
    {
      "id": "email",
      "type": "email",
      "name": "email",
      "label": "Email",
      "placeholder": "Enter your email",
      "required": true,
      "showIf": "{first_name} && {last_name} && {gender} && {age}"
    }
  ],
  "buttons": [
    {
      "id": "submit_btn",
      "shouldSubmit": true,
      "primary": true,
      "title": "Submit"
    },
    {
      "id": "reset_btn",
      "shouldReset": true,
      "title": "Clear values"
    }
  ]
}
```

## License
MIT
