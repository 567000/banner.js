/*
 * banner.js
 */
const DOT = '@';
const WIDTH = 10;

const char_data =
{
    // 0: 00011000 - 0x18
    // 1: 00100100 - 0x24
    // 2: 00100100 - 0x24
    // 3: 00100100 - 0x24
    // 4: 01111110 - 0x7E
    // 5: 01000010 - 0x42
    // 6: 01000010 - 0x42
    // 7: 01000010 - 0x42
    "A": [0x18,0x24,0x24,0x24,0x7E,0x42,0x42,0x42],
    "B": [0x78,0x44,0x44,0x78,0x46,0x42,0x42,0x7C],
    "C": [0x3C,0x42,0x42,0x40,0x40,0x42,0x42,0x3C],
    "D": [0x78,0x44,0x42,0x42,0x42,0x42,0x44,0x78],
    "E": [0x7E,0x40,0x40,0x7C,0x40,0x40,0x40,0x7E],
    "F": [0x7E,0x40,0x40,0x7C,0x40,0x40,0x40,0x40],
    "G": [0x3C,0x42,0x42,0x40,0x47,0x42,0x42,0x3E],
    "H": [0x42,0x42,0x42,0x7E,0x42,0x42,0x42,0x42],
    "I": [0x3E,0x08,0x08,0x08,0x08,0x08,0x08,0x3E],
    "J": [0x3E,0x08,0x08,0x08,0x48,0x48,0x48,0x30],
    "K": [0x42,0x44,0x48,0x50,0x68,0x44,0x42,0x41],
    "L": [0x40,0x40,0x40,0x40,0x40,0x40,0x40,0x7E],
    "M": [0x41,0x63,0x55,0x49,0x41,0x41,0x41,0x41],
    "N": [0x41,0x61,0x51,0x49,0x49,0x45,0x43,0x41],
    "O": [0x3C,0x42,0x42,0x42,0x42,0x42,0x42,0x3C],
    "P": [0x3C,0x22,0x22,0x22,0x3C,0x20,0x20,0x20],
    "Q": [0x3C,0x42,0x42,0x42,0x42,0x4A,0x44,0x3A],
    "R": [0x3C,0x22,0x22,0x22,0x3C,0x24,0x22,0x22],
    "S": [0x1C,0x22,0x20,0x1C,0x02,0x22,0x22,0x1C],
    "T": [0x3E,0x08,0x08,0x08,0x08,0x08,0x08,0x08],
    "U": [0x77,0x22,0x22,0x22,0x22,0x22,0x22,0x1C],
    "V": [0x42,0x42,0x42,0x42,0x24,0x24,0x24,0x18],
    "W": [0x41,0x41,0x49,0x49,0x2A,0x2A,0x2A,0x14],
    "X": [0xE7,0x42,0x24,0x18,0x18,0x24,0x42,0xE7],
    "Y": [0x77,0x22,0x22,0x14,0x08,0x08,0x08,0x1C],
    "Z": [0x7F,0x01,0x02,0x04,0x08,0x10,0x20,0x7F],
    "-": [0x00,0x00,0x00,0x00,0x7E,0x00,0x00,0x00],
    "=": [0x00,0x00,0x00,0x7E,0x00,0x7E,0x00,0x00],
    " ": [0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00],
    "0": [0x38,0x44,0x64,0x54,0x54,0x4C,0x44,0x38],
    "1": [0x18,0x08,0x08,0x08,0x08,0x08,0x08,0x1C],
    "2": [0x1C,0x22,0x22,0x02,0x04,0x08,0x10,0x3E],
    "3": [0x1C,0x22,0x02,0x0C,0x02,0x22,0x22,0x1C],
    "4": [0x08,0x18,0x28,0x48,0x7E,0x08,0x08,0x08],
    "5": [0x3E,0x20,0x20,0x3C,0x02,0x02,0x02,0x3C],
    "6": [0x1C,0x22,0x20,0x3C,0x22,0x22,0x22,0x1C],
    "7": [0x3E,0x22,0x22,0x02,0x02,0x02,0x02,0x02],
    "8": [0x1C,0x22,0x22,0x1C,0x22,0x22,0x22,0x1C],
    "9": [0x1C,0x22,0x22,0x22,0x1E,0x02,0x22,0x1C],
    "/": [0x04,0x04,0x08,0x08,0x10,0x10,0x20,0x20],
    ".": [0x00,0x00,0x00,0x00,0x00,0x00,0x18,0x18],
};

function putc(c)
{
    var out = [];
    if(!char_data[c]){
        return null;
    }
    for(let i=0; i<8; i++){
        let bin = ('00000000' + char_data[c][i].toString(2)).slice(-8);
        bin = bin.replace(/0/g,' ');
        bin = bin.replace(/1/g,DOT);
        out.push(bin);
    }
    return out;
}

function main()
{
    let input = '' + new Date().getFullYear() + '.' + (new Date().getUTCMonth() + 1) + '.' + (new Date().getDate());
    input = process.argv.length>2?process.argv[2]:input;

    let chars = input.toUpperCase().split('');

    for(let i=0; i<Math.ceil(chars.length/WIDTH); i++){
        console.log();

        let line = chars.slice(i*WIDTH,(i+1)*WIDTH);

        let s = [];
        for(let i=0; i<line.length; i++){
            let c = putc(line[i]);
            c==null||s.push(c);
        }
    
        for(let j=0; j<8; j++){
            let line_str = '';
            for(let i=0; i<s.length; i++){
                line_str += s[i][j];
            }
            console.log(line_str);
        }
    }
}

main();
