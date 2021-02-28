import { inject, injectable } from 'tsyringe';
import IFormulaRepository from '@app/implementations/repositories/IFormulasRepository';
import AppError from '@shared/errors/AppError';
import utils from '../utils/formulaUtils';
import IAtoms from '../dtos/IAtomsDTO';

interface IRequest {
  formula: string;
  type: 'axiom' | 'proposition' | 'modus_ponens';
  axiomType?: number;
  atoms?: IAtoms;
  formulasToMP?: [number, number];
}

@injectable()
export default class CheckerService {
  constructor(
    @inject('FormulasRepository')
    private formulasRepository: IFormulaRepository,
  ) {}

  public execute({
    formula,
    type,
    atoms,
    axiomType,
    formulasToMP,
  }: IRequest): boolean {
    let isTruthy = false;

    const formulasList = this.formulasRepository.findAll();

    const formulaIndex = formulasList.indexOf(formula);

    if (formulaIndex > -1) {
      console.log('existe');

      this.formulasRepository.destroy(formulaIndex);
    }

    switch (type) {
      case 'axiom':
        if (atoms && axiomType) {
          isTruthy =
            utils.verifyFormulaWithAxiom({
              formula,
              axiomType,
              atoms,
            }) === true;
        }

        break;
      case 'proposition':
        isTruthy = true;

        break;
      case 'modus_ponens':
        if (!formulasToMP) {
          throw new AppError('The formulas to compare are requireds!', 400);
        } else {
          const baseFormula = this.formulasRepository.findByIndex(
            formulasToMP[0] - 1,
          );

          const toCompareFormula = this.formulasRepository.findByIndex(
            formulasToMP[1] - 1,
          );

          if (!baseFormula || !toCompareFormula) {
            throw new AppError('The indicate formulas not exists!', 404);
          }

          if (
            formulasToMP[0] > this.formulasRepository.findAll().length ||
            formulasToMP[1] > this.formulasRepository.findAll().length
          ) {
            throw new AppError('The indicate formulas are invalids!', 400);
          }

          isTruthy = utils.verifyModusPonens(baseFormula, toCompareFormula);
        }

        break;
      default:
        isTruthy = false;

        break;
    }

    if (isTruthy) {
      this.formulasRepository.create(formula);
    }

    console.log(this.formulasRepository.findAll());

    return isTruthy;
  }
}
