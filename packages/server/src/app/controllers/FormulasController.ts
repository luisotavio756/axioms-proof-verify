import ClearFormulasService from '@app/services/ClearFormulasService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

class FormulasController {
    async destroy(request: Request, response: Response): Promise<Response> {
        const clearFormulasService = container.resolve(ClearFormulasService);

        clearFormulasService.execute();

        return response.send();
    }
}

export default FormulasController;
