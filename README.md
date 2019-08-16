# @skypilot/sugarbowl
A collection of typed convenience functions for JavaScript & TypeScript.

All functions are typed, and it is expected that they will be used only in
type-checked code. This keeps the functions lightweight: they do not
carry the overhead of checking argument types or handling type coercion.

__Array functions__

- `flatten`
- `pickRandomItems`
- `shuffle`
- `toUniqueArray`

__Date functions__

- `isValidDate`

__String functions__
<pre>
<code>capitalizeAllWords(<em>stringToCapitalize: string</em>): <em>string</em></code>

<code>capitalizeFirstWord(<em>stringToCapitalize: string</em>): <em>string</em></code>

<code>computeHash(<em>stringToHash: string, length: Integer = 32</em>): <em>string</em></code>

<code>digitsOnly(<em>stringToParse: string</em>): <em>string</em></code>

<code>inflectByNumber(<em>howMany: number, singular: string, plural?: string</em>): <em>string</em></code>

<code>inflectQuantity(<em>howMany: number, singular: string, plural?: string</em>): <em>string</em></code>

<code>isEnclosed(<em>stringToCheck: string, startDelimiter: string, endDelimiter?: string = startDelimiter</em>): <em>boolean</em></code>

<code>nondigitsOnly(<em>stringToParse: string</em>): <em>string</em></code>

<code>function parseEnclosed(<em>stringToParse: string, startDelimiter: string, endDelimiter: string = startDelimiter</em>): <em>string</em></code>

<code>removeExtraWhitespace(<em>str: string</em>): <em>string</em></code>

<code>removeWhitespace(<em>str: string</em>): <em>string</em></code>

<code>splitOnce(<em>stringToSplit: string, splitter: string</em>>): <em>string[]</em></code>

<code>startsWith(<em>string: string, substring: string, startFromPosition: Integer = 0</em>): <em>boolean</em></code>
</pre>

__`String.prototype` wrappers__
- `padEnd`
- `padStart`
- `toLowerCase`
- `toUpperCase`
- `trim`
- `trimLeft`
- `trimRight`
