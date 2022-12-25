function lexer(input) {
    let current = 0;
    let tokens = [];

    // const ARITHMETIC_OPERATORS = /[\+\-\*\/]/;
    const DATA_TYPES = /int|float|double/;
    const COMPARISON_OPERATORS = /[\=\!\<\>]/;
    const LOGICAL_OPERATORS = /[\&\|]/;
    const ASSIGNMENT_OPERATOR = /\=/;
    const BRACES = /[\{\}]/;
    const BRACKETS = /[\[\]]/;
    const SEMICOLON = /;/;
    // const INTEGER = /-?\d+/;
    // const FLOAT = /-?\d*\.\d+/;
    // const CHARACTER = /'.'/;
    // const STRING = /"(?:[^"\\]|\\.)*"/;
    const WHITESPACE = /\s/;
    const PARENTHESES = /[()]/;
    const OPERATORS = /[+\-*\/]/;
    const NUMBERS = /\d/;
    const IDENTIFIERS = /[a-z]/i;
    const IDENTIFIERS_AND_NUMBERS = /[a-z0-9]/i;



    while (current < input.length) {
        // const words = input.split(" ")
        let char = input[current];

        console.log(input[current])


        if (BRACES.test(char)) {
            tokens.push({ type: 'BRACES', value: char });
            current++;
            continue;
        }

        if (/\;/.test(char)) {
            tokens.push({ type: 'SEMI_COLON', value: char });
            current++;
            continue;
        }

        // Skip whitespace
        if (WHITESPACE.test(char)) {
            current++;
            continue;
        }

        if (COMPARISON_OPERATORS.test(char)) {
            tokens.push({ type: 'OPERATOR', value: char });
            current++;
            continue;
        }

        // Parse parentheses
        if (DATA_TYPES.test(char)) {
            tokens.push({ type: 'DATA_TYPE', value: char });
            current++;
            continue;
        }

        // Parse parentheses
        if (PARENTHESES.test(char)) {
            tokens.push({ type: 'paren', value: char });
            current++;
            continue;
        }

        // Parse comma
        if (char === ',') {
            tokens.push({ type: 'comma', value: char });
            current++;
            continue;
        }

        // Parse operators
        if (OPERATORS.test(char)) {
            tokens.push({ type: 'operator', value: char });
            current++;
            continue;
        }

        // Parse numbers
        if (NUMBERS.test(char)) {
            let value = '';

            while (NUMBERS.test(char)) {
                value += char;
                char = input[++current];
            }

            tokens.push({ type: 'number', value });
            continue;
        }

        // Parse strings
        if (char === '"') {
            let value = '';
            char = input[++current];

            while (char !== '"') {
                value += char;
                char = input[++current];
            }

            char = input[++current];
            tokens.push({ type: 'string', value });
            continue;
        }

        // Parse identifiers (e.g. variable names)
        if (IDENTIFIERS.test(char)) {
            let value = '';

            while (IDENTIFIERS_AND_NUMBERS.test(char)) {
                value += char;
                char = input[++current];
            }

            tokens.push({ type: 'identifier', value });
            continue;
        }

        throw new TypeError(`I don't know what this character is: ${char}`);
    }

    return tokens;
}


console.log(lexer(`int a = 3, if(a == b){
    printf("Hello, World! \n"); else if(b!=c){
        printf("Hello, World! \n Hello, World!");
    }else{
        printf("Hello\n");
    }
`))