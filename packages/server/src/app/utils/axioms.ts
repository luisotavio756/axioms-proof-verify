export default {
  firstOfImplication(p: string, q: string): string {
    return `${p} -> (${q} -> ${p})`;
  },

  secondOfImplication(p: string, q: string, r: string): string {
    return `(${p} -> (${q} -> ${r})) -> ((${p} -> ${q}) -> (${p} -> ${r}))`;
  },

  firstOfConjuction(p: string, q: string): string {
    return `${p} -> (${q} -> (${p} ^ ${q}))`;
  },

  secondOfConjuction(p: string, q: string): string {
    return `(${p} ^ ${q}) -> ${p}`;
  },

  thirdOfConjuction(p: string, q: string): string {
    return `(${p} ^ ${q}) -> ${q}`;
  },

  firstOfDisjunction(p: string, q: string): string {
    return `${p} -> (${p} v ${q})`;
  },

  secondOfDisjunction(p: string, q: string): string {
    return `${q} -> (${p} v ${q})`;
  },

  thirdOfDisjunction(p: string, q: string, r: string): string {
    return `(${p} -> ${r}) -> ((${q} -> ${r}) -> ((${p} ∨ ${q}) -> ${r}))`;
  },

  firstOfNegation(p: string, q: string): string {
    return `(${p} -> ${q}) -> ((${p} -> ¬${q}) -> ¬${p})`;
  },

  secondOfNegation(p: string): string {
    return `¬¬${p} -> ${p}`;
  },
};
