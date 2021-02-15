import IFormulaRepository from '@app/implementations/repositories/IFormulasRepository';
import { container } from 'tsyringe';
import FormulasRepository from '../../app/repositories/FormulasRepository';

container.registerSingleton<IFormulaRepository>(
    'FormulasRepository',
    FormulasRepository,
);
