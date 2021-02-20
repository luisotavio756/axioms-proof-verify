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
}

export default ResolverController;
