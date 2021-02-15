export default interface IFormulaRepository {
    create(formula: string): string;
    findAll(): Array<string>;
    findByIndex(index: number): string | undefined;
    clearRepository(): void;
}
