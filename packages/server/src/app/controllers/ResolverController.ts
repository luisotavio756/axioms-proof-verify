import DeleteFormulaService from '@app/services/DeleteFormulaService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CheckerService from '../services/CheckerService';

class ResolverController {
  async store(request: Request, response: Response): Promise<Response> {
    const { formula, type, axiomType, atoms, formulasToMP } = request.body;

    const checkerService = container.resolve(CheckerService);

    const axiom = checkerService.execute({
      formula,
      type,
      axiomType,
      atoms,
      formulasToMP,
    });

    return response.json(axiom);
  }

  async destroy(request: Request, response: Response): Promise<Response> {
    const { index } = request.params;
    const parsedIndex = Number(index);

    const checkerService = container.resolve(DeleteFormulaService);

    checkerService.execute({ index: parsedIndex });

    return response.send();
  }
}

export default ResolverController;
