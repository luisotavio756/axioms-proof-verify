export default interface IFormulaRepository {
  create(formula: string): string;
  update(index: number, formula: string): string;
  findAll(): Array<string>;
  findByIndex(index: number): string | undefined;
  clearRepository(): void;
  destroy(index: number): void;
}
