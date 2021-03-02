import IFormulaRepository from '@app/implementations/repositories/IFormulasRepository';
import { injectable, inject } from 'tsyringe';

interface IRequest {
  index: number;
}

@injectable()
class DeleteFormulaService {
  constructor(
    @inject('FormulasRepository')
    private formulasRepository: IFormulaRepository,
  ) {}

  public execute({ index }: IRequest): void {
    this.formulasRepository.destroy(index);
  }
}

export default DeleteFormulaService;
