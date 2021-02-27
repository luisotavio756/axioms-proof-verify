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

    toCompareFormula.split('').forEach((char, i) => {
      if (char !== baseFormula[i]) {
        isValid = false;
      }
    });

    if (isValid) {
      return isValid;
    }

    const regexExp = /\(*[A-Z]\)* -> [(¬A-Z]/g;

    const parsedBaseFormula = baseFormula
      .replace(`${toCompareFormula}`, '')
      .trim();

    if (!regexExp.test(parsedBaseFormula)) {
      isValid = true;
    }

    return isValid;
  },
};
