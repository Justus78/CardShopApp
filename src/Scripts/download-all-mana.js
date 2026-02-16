import fs from 'fs';
import fetch from 'node-fetch';
import path from 'path';

const symbols = [
    { symbol: 'R', url: 'https://svgs.scryfall.io/card-symbols/R.svg' },
    { symbol: 'U', url: 'https://svgs.scryfall.io/card-symbols/U.svg' },
    { symbol: 'B', url: 'https://svgs.scryfall.io/card-symbols/B.svg' },
    { symbol: 'G', url: 'https://svgs.scryfall.io/card-symbols/G.svg' },
    { symbol: 'W', url: 'https://svgs.scryfall.io/card-symbols/W.svg' },

    // { symbol: 'T', url: 'https://svgs.scryfall.io/card-symbols/T.svg' },
    // { symbol: 'Q', url: 'https://svgs.scryfall.io/card-symbols/Q.svg' },
    // { symbol: 'E', url: 'https://svgs.scryfall.io/card-symbols/E.svg' },
    // { symbol: 'P', url: 'https://svgs.scryfall.io/card-symbols/P.svg' },
    // { symbol: 'PW', url: 'https://svgs.scryfall.io/card-symbols/PW.svg' },
    // { symbol: 'CHAOS', url: 'https://svgs.scryfall.io/card-symbols/CHAOS.svg' },
    // { symbol: 'A', url: 'https://svgs.scryfall.io/card-symbols/A.svg' },
    // { symbol: 'TK', url: 'https://svgs.scryfall.io/card-symbols/TK.svg' },
    // { symbol: 'X', url: 'https://svgs.scryfall.io/card-symbols/X.svg' },
    // { symbol: 'Y', url: 'https://svgs.scryfall.io/card-symbols/Y.svg' },
    // { symbol: 'Z', url: 'https://svgs.scryfall.io/card-symbols/Z.svg' },
    // { symbol: '0', url: 'https://svgs.scryfall.io/card-symbols/0.svg' },
    // { symbol: '½', url: 'https://svgs.scryfall.io/card-symbols/HALF.svg' },
    // // Generic mana 1-20
    // ...Array.from({ length: 20 }, (_, i) => ({
    //     symbol: `${i + 1}`,
    //     url: `https://svgs.scryfall.io/card-symbols/${i + 1}.svg`
    // })),
    // { symbol: '100', url: 'https://svgs.scryfall.io/card-symbols/100.svg' },
    // { symbol: '1000000', url: 'https://svgs.scryfall.io/card-symbols/1000000.svg' },
    // { symbol: '∞', url: 'https://svgs.scryfall.io/card-symbols/INFINITY.svg' },
    // // Hybrid mana
    // { symbol: 'W/U', url: 'https://svgs.scryfall.io/card-symbols/WU.svg' },
    // { symbol: 'W/B', url: 'https://svgs.scryfall.io/card-symbols/WB.svg' },
    // { symbol: 'B/R', url: 'https://svgs.scryfall.io/card-symbols/BR.svg' },
    // { symbol: 'B/G', url: 'https://svgs.scryfall.io/card-symbols/BG.svg' },
    // { symbol: 'U/B', url: 'https://svgs.scryfall.io/card-symbols/UB.svg' },
    // { symbol: 'U/R', url: 'https://svgs.scryfall.io/card-symbols/UR.svg' },
    // { symbol: 'R/G', url: 'https://svgs.scryfall.io/card-symbols/RG.svg' },
    // { symbol: 'R/W', url: 'https://svgs.scryfall.io/card-symbols/RW.svg' },
    // { symbol: 'G/W', url: 'https://svgs.scryfall.io/card-symbols/GW.svg' },
    // { symbol: 'G/U', url: 'https://svgs.scryfall.io/card-symbols/GU.svg' },
    // // Phyrexian hybrid
    // { symbol: 'B/G/P', url: 'https://svgs.scryfall.io/card-symbols/BGP.svg' },
    // { symbol: 'B/R/P', url: 'https://svgs.scryfall.io/card-symbols/BRP.svg' },
    // { symbol: 'G/U/P', url: 'https://svgs.scryfall.io/card-symbols/GUP.svg' },
    // { symbol: 'G/W/P', url: 'https://svgs.scryfall.io/card-symbols/GWP.svg' },
    // { symbol: 'R/G/P', url: 'https://svgs.scryfall.io/card-symbols/RGP.svg' },
    // { symbol: 'R/W/P', url: 'https://svgs.scryfall.io/card-symbols/RWP.svg' },
    // { symbol: 'U/B/P', url: 'https://svgs.scryfall.io/card-symbols/UBP.svg' },
    // { symbol: 'U/R/P', url: 'https://svgs.scryfall.io/card-symbols/URP.svg' },
    // { symbol: 'W/B/P', url: 'https://svgs.scryfall.io/card-symbols/WBP.svg' },
    // { symbol: 'W/U/P', url: 'https://svgs.scryfall.io/card-symbols/WUP.svg' },
];

const downloadDir = './mana_symbols';
if (!fs.existsSync(downloadDir)) fs.mkdirSync(downloadDir);

async function downloadSymbol(symbol) {
    const res = await fetch(symbol.url);
    const svg = await res.text();
    const fileName = path.join(downloadDir, `${symbol.symbol.replace(/[^a-zA-Z0-9]/g, '_')}.svg`);
    fs.writeFileSync(fileName, svg);
    console.log(`Downloaded ${symbol.symbol}`);
}

(async () => {
    for (const s of symbols) {
        await downloadSymbol(s);
    }
})();
