import IAtoms from '../dtos/IAtomsDTO';
import axioms from './axioms';

interface IAxiomVerifyData {
  formula: string;
  atoms: IAtoms;
  axiomType: number;
}

export default {
  separateProposition(formule: string): Array<string> {
    const formules: Array<string> = [];

    const subFormules = (proposal: string) => {
      if (proposal.match(/\^/)) {
        proposal.split('^').forEach(partial => {
          subFormules(partial);
        });
      } else if (proposal.match(/v/)) {
        proposal.split('v').forEach(partial => {
          subFormules(partial);
        });
      } else if (proposal.match(/->/)) {
        proposal.split('->').forEach(partial => {
          subFormules(partial);
        });
      }

      formules.push(proposal);

      return proposal;
    };

    const parsedFormula = formule;

    subFormules(parsedFormula);

    return formules;
  },

  getParsedFormula(formula: string): string {
    const parsedFormula = formula.replace(/[{()}]/g, '');

    return parsedFormula;
  },

  verifyFormulaWithAxiom({
    formula,
    atoms,
    axiomType,
  }: IAxiomVerifyData): boolean | undefined {
    if (axiomType === 1) {
      const mountedAxiom = axioms.firstOfImplication(atoms.p, atoms.q);

      return mountedAxiom === formula || `(${mountedAxiom})` === formula;
    }

    if (axiomType === 2) {
      const mountedAxiom = axioms.secondOfImplication(
        atoms.p,
        atoms.q,
        atoms.r || '',
      );

      return mountedAxiom === formula || `(${mountedAxiom})` === formula;
    }

    if (axiomType === 3) {
      const mountedAxiom = axioms.firstOfConjuction(atoms.p, atoms.q);

      return mountedAxiom === formula || `(${mountedAxiom})` === formula;
    }

    if (axiomType === 4) {
      const mountedAxiom = axioms.secondOfConjuction(atoms.p, atoms.q);

      return mountedAxiom === formula || `(${mountedAxiom})` === formula;
    }

    if (axiomType === 5) {
      const mountedAxiom = axioms.thirdOfConjuction(atoms.p, atoms.q);

      return mountedAxiom === formula || `(${mountedAxiom})` === formula;
    }

    if (axiomType === 6) {
      const mountedAxiom = axioms.firstOfDisjunction(atoms.p, atoms.q);

      return mountedAxiom === formula || `(${mountedAxiom})` === formula;
    }

    if (axiomType === 7) {
      const mountedAxiom = axioms.secondOfDisjunction(atoms.p, atoms.q);

      return mountedAxiom === formula || `(${mountedAxiom})` === formula;
    }

    if (axiomType === 8) {
      const mountedAxiom = axioms.thirdOfDisjunction(
        atoms.p,
        atoms.q,
        atoms.r || '',
      );

      return mountedAxiom === formula || `(${mountedAxiom})` === formula;
    }

    if (axiomType === 9) {
      const mountedAxiom = axioms.firstOfNegation(atoms.p, atoms.q);

      return mountedAxiom === formula || `(${mountedAxiom})` === formula;
    }

    if (axiomType === 10) {
      const mountedAxiom = axioms.secondOfNegation(atoms.p);

      return mountedAxiom === formula || `(${mountedAxiom})` === formula;
    }

    return undefined;
  },

  verifyModusPonens(baseFormula: string, toCompareFormula: string): boolean {
    let isValid = true;

    if (
      !baseFormula.includes(toCompareFormula) ||
      !baseFormula.includes('->')
    ) {
      return false;
    }

    toCompareFormula.split('').forEach((char, i) => {
      if (char !== baseFormula[i]) {
        isValid = false;
      }
    });

    if (isValid) {
      return isValid;
    }

    const regexExp = /\(*[A-Z]\)*/g;

    const parsedBaseFormula = baseFormula
      .replace(`${toCompareFormula}`, '')
      .trim()
      .split('->');

    if (!regexExp.test(parsedBaseFormula[0])) {
      isValid = true;
    }

    return isValid;
  },

  isValidFormula(formula: string): boolean {
    const regex = /\W/g;
    const parsedFormula = formula.replace(/[\s^v()>¬-]/g, '');

    if (regex.test(parsedFormula)) {
      return false;
    }

    const afterSplittedFormula = formula.split('');

    try {
      afterSplittedFormula.forEach((char, i) => {
        if (
          char === '(' &&
          !(
            afterSplittedFormula[i + 1] === ' ' ||
            afterSplittedFormula[i + 1] === '(' ||
            afterSplittedFormula[i + 1] === '¬' ||
            afterSplittedFormula[i + 1] === ' ' ||
            /[A-Za-z]/g.test(afterSplittedFormula[i + 1])
          )
        ) {
          throw Error('');
        } else if (
          /[A-Za-z]/g.test(char) &&
          afterSplittedFormula[i + 1] &&
          !(
            afterSplittedFormula[i + 1] === ' ' ||
            afterSplittedFormula[i + 1] === ')' ||
            afterSplittedFormula[i + 1] === 'v' ||
            afterSplittedFormula[i + 1] === '^' ||
            (afterSplittedFormula[i + 1] === '-' &&
              afterSplittedFormula[i + 2] === '>')
          )
        ) {
          throw Error('');
        } else if (
          (/[\^v¬]/g.test(char) ||
            (char === '>' && afterSplittedFormula[i - 1] === '-')) &&
          !(
            afterSplittedFormula[i + 1] === ' ' ||
            /[A-Za-z]/g.test(afterSplittedFormula[i + 1])
          )
        ) {
          throw Error('');
        } else if (
          char === ' ' &&
          !(
            /[A-Za-z]/g.test(afterSplittedFormula[i + 1]) ||
            /[\^v¬()]/g.test(afterSplittedFormula[i + 1]) ||
            (afterSplittedFormula[i + 1] === '-' &&
              afterSplittedFormula[i + 2] === '>')
          )
        ) {
          throw Error('');
        } else if (
          (char === '-' && afterSplittedFormula[i + 1] !== '>') ||
          (char === '>' && afterSplittedFormula[i - 1] !== '-')
        ) {
          throw Error('');
        }
      });

      return true;
    } catch (e) {
      return false;
    }
  },

  parseFormula(formula: string): string {
    let parsedFormula = '';

    const beforeSplitedFormula = formula.replace(/[\s]*/g, '').split('');

    beforeSplitedFormula.forEach((char, i) => {
      parsedFormula += char;

      if (
        /[A-Za-z]/g.test(char) &&
        ((beforeSplitedFormula[i + 1] === '-' &&
          beforeSplitedFormula[i + 2] === '>') ||
          /[\^v¬]/g.test(beforeSplitedFormula[i + 1]))
      ) {
        parsedFormula += ' ';
      } else if (
        ((char === '>' && beforeSplitedFormula[i - 1] === '-') ||
          char === '^' ||
          char === 'v') &&
        (/[A-Za-z¬]/g.test(beforeSplitedFormula[i + 1]) ||
          beforeSplitedFormula[i + 1] === '(')
      ) {
        parsedFormula += ' ';
      } else if (
        char === ')' &&
        ((beforeSplitedFormula[i + 1] === '-' &&
          beforeSplitedFormula[i + 2] === '>') ||
          /[\^v]/g.test(beforeSplitedFormula[i + 1]))
      ) {
        parsedFormula += ' ';
      }
    });

    return parsedFormula;
  },
};
