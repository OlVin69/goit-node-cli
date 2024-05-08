const cont = [
    {a:1, b:2,c:3},
    {a:11, b:22,c:33},
    {a:111, b:222,c:333},
];

cont[2] = {...cont[2], ...{a:4, c:6}};
console.log(cont[2]);