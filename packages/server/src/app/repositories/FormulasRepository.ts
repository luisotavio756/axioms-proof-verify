import IFormulaRepository from '@app/implementations/repositories/IFormulasRepository';

class FormulasRepository implements IFormulaRepository {
  private formulas: Array<string> = [];

  public create(formula: string): string {
    this.formulas.push(formula);

    return formula;
  }

  public findAll(): Array<string> {
    return this.formulas;
  }

  public findByIndex(index: number): string | undefined {
    const findFormula = this.formulas[index];

    return findFormula;
  }

  public update(index: number, formula: string): string {
    this.formulas[index] = formula;

    return this.formulas[index];
  }

  public clearRepository(): void {
    this.formulas = [];
  }

  public destroy(index: number): void {
    this.formulas.splice(index, 1);
  }
}

export default FormulasRepository;
