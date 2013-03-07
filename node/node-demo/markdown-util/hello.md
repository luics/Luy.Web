# Markdown Cheat Sheet <a name="top"></a>

## Contents
* [Header](#header)
* [Link](#link)
* [List](#list)
* [Font](#font)
* [Blockquote](#blockquote)
* [Code](#header)
* [Horizontal Rule](#horizontal)
* [Escape](#escape)

## Header <a name="header"></a>

# Header1
    # Header1

### Header3
    ### Header3

###### Header6
    ###### Header6

## Link <a name="header"></a>

### Normal Link
[text link](http://example.com "Optional Tilte")

    [text link](http://example.com "Optional  Tilte")

![image](http://daringfireball.net/favicon.ico "Optional Title")

    ![image](http://daringfireball.net/favicon.ico "Optional Title")

### Automatic Link
<http://example.com>

user.name@example.com

    <http://example.com>
    user.name@example.com

> Valid URL can also be automatic link in [github-flavored-markdown][gfm]

### Reference-style Link
I get 10 times more traffic from [Google] [1] than from [Yahoo] [2] or [MSN] [3].

[1]: http://google.com/        "Google"
[2]: http://search.yahoo.com/  "Yahoo Search"
[3]: http://search.msn.com/    "MSN Search"

    I get 10 times more traffic from [Google] [1] than from [Yahoo] [2] or [MSN] [3].
    [1]: http://google.com/        "Google"
    [2]: http://search.yahoo.com/  "Yahoo Search"
    [3]: http://search.msn.com/    "MSN Search"

## List <a name="list"></a>
* item0
* item1
* item2

        * item0
        * item1
        * item2

> `*` or `-` or `+` are valid leading char.
> 8 spaces or two tabs needed when code after list

1. item0
2. item1
3. item2

        1. item0
        2. item1
        3. item2


## Font <a name="font"></a>

*Emphasis/Italic*

    *Emphasis/Italic*

**Strong/Bold**

    **Strong/Bold**

> `*` or `_` is ok.

## Blockquote <a name="blockquote"></a>

> This is a blockquote with two paragraphs. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aliquam hendrerit mi posuere lectus.
> > This is nested blockquote.

Single line or multi lines.

    > This is a blockquote with two paragraphs. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aliquam hendrerit mi posuere lectus.
    > > This is nested blockquote.

## Code <a name="code"></a>

### Basic Code

    js code

> 4 leading whitespace.

        js code

### Code highlight

```javascript
var hi = 'hi';  
console.log(hi);
```

Supported in [github-flavored-markdown][gfm]

    ```javascript
    var hi = 'hi';
    console.log(hi);
    ```

## Horizontal Rule <a name="horizontal"></a>

* * *

    * * *

***

    ***

*****

    *****

> `*` or `-` is ok.


## Escape <a name="escape"></a>

* \`   backtick
* \*   asterisk
* \#   hash mark
* [More..](http://daringfireball.net/projects/markdown/syntax#backslash)

[gfm]: https://github.com/mojombo/github-flavored-markdown "github-flavored-markdown"