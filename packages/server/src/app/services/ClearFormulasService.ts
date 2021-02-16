import IFormulaRepository from '@app/implementations/repositories/IFormulasRepository';
import { injectable, inject } from 'tsyringe';

@injectable()
class ClearFormulasService {
    constructor(
        @inject('FormulasRepository')
        private formulasRepository: IFormulaRepository,
    ) {}

    public execute(): void {
        this.formulasRepository.clearRepository();
    }
}

export default ClearFormulasService;
