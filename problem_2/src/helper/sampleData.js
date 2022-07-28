import {timeDifference, unixToDateTime} from "./datetime";

export const sampleColumns = [
    {field: 'txnHash', headerName: 'Txn Hash', width: 210},
    {
        field: 'date',
        headerName: 'date',
        type: 'date',
        width: 210,
        valueFormatter: (params) => {
            // first converts to JS Date, then to locale option through date-fns
            return params.value;
        },
        valueGetter: (params) => {
            // new Date(params.value).toLocaleDateString('en-US');

            return unixToDateTime(params.value)[1]
        }
    },
    {
        field: 'age',
        headerName: 'age',
        description: 'This column has a value getter and is not sortable.',
        sortable: false,
        width: 110,
        valueGetter: (params) => {
            return timeDifference(Date.now(), params.value)
        }
    },
    {field: 'to', headerName: 'To', width: 210},
    {field: 'amount', type: 'number', headerName: 'amount', width: 70},
    {field: 'link', headerName: 'Link', width: 160,
        renderCell: (params)=>(<a href="https://etherscan.io/tx/0x03060d63ae0ee2cd103bd950edce986eae08f8ca70bdb284d07ee7226cad2030">View Txn</a>)},
];

export const sampleRows = [
    {
        id: 1,
        txnHash: '0x68399d6351fdb33f77bfcd0d27e3264d74500d22',
        date: 1652002362222,
        age: 1652002362222,
        to: '0xdb33f77bfc68399d6351fd0d27e3264d74500d22',
        amount: 345,
    },
    {
        id: 2,
        txnHash: '0xf77bf8399d6351ddb33fd0c627e3264d74500d22',
        date: 1651002362333,
        age: 1651002362333,
        to: '0xddb33f77bf8399d6351fd0c627e3264d74500d22',
        amount: 765756,
    },
    {
        id: 3,
        txnHash: '0x4d74500d77bfc6278399d6351fd0ddb33fe32622',
        date: 1658002362234,
        age: 1658002362234,
        to: '0x77bfc6278399d6351fd0ddb33fe3264d74500d22',
        amount: 6756,
    },
    {
        id: 4,
        txnHash: '0x33f7839db7bfc629d6351fd0d7e3264d74500d22',
        date: 1655002334554,
        age: 1655002334554,
        to: '0x839db33f77bfc629d6351fd0d7e3264d74500d22',
        amount: 785,
    },
    {
        id: 5,
        txnHash: '0xbfc629d63839db33f7751fd0d7e3264d74500d22',
        date: 1656002398735,
        age: 1656002398735,
        to: '0x839db33f77bfc629d6351fd0d7e3264d74500d22',
        amount: 55546,
    },
    {
        id: 6,
        txnHash: '0xbfc629d6351f839db33f77d0d7e3264d74500d22',
        date: 165700234342,
        age: 165700234342,
        to: '0xb33f77b8399d6351fd0ddfc627e3264d74500d22',
        amount: 75675,
    },
    {
        id: 7,
        txnHash: '0x9d6351fd0d7839db33f77bfc62e3264d74500d22',
        date: 165700234342,
        age: 165700234342,
        to: '0x8399d6351fd0ddb33f77bfc627e3264d74500d22',
        amount: 789,
    },
    {
        id: 8,
        txnHash: '0x629d6351f839db33f77bfcd0d7e3264d74500d22',
        date: 1649002362850,
        age: 1649002362850,
        to: '0x8399d6351fd0ddb33f77bfc627e3264d74500d22',
        amount: 567,
    },
    {
        id: 9,
        txnHash: '0x51fd0d7e839db33f77bfc629d633264d74500d22',
        date: 1658002362850,
        age: 1658002362850,
        to: '0x8399d6351fd0ddb33f77bfc627e3264d74500d22',
        amount: 56756,
    },
]