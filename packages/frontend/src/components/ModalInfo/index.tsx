import { FiCheckCircle, FiMinus, FiXCircle } from 'react-icons/fi';

import { Container } from './styles';
import Modal from '../Modal';

interface IModalProps {
  isOpen: boolean;
  setIsOpen: () => void;
}

const ModalInfo: React.FC<IModalProps> = ({ isOpen, setIsOpen }) => {
  return (
    <Modal isOpen={isOpen} title="Informations" setIsOpen={setIsOpen}>
      <Container>
        <div>
          <h4>Ex of propositions: </h4>
          <p className="correct">
            <FiCheckCircle /> ((¬P ^ Q) {'->'} P) {'->'} (((¬P ^ Q) {'->'} ¬P){' '}
            {'->'} ¬(¬P ^ Q))
          </p>
          <p className="incorrect">
            <FiXCircle /> ((¬P ^ Q) {'->'}P), ((¬P ^ Q) {'->'}$)
          </p>
        </div>
        <div>
          <h4>Additional informations: </h4>
          <p>
            <FiMinus /> Every that reload page, please, click in Clear Proof to
            reset backend
          </p>
          <p>
            <FiMinus /> Special caracters not are allowed
          </p>
          <p>
            <FiMinus /> Special caracters not are allowed
          </p>
        </div>
        <div>
          <h4>Modus Ponens: </h4>
          <p>
            <FiMinus />{' '}
            <b>
              ¬P {'->'} (Q {'->'} P)
            </b>{' '}
            - that will be the BASE FORMULA
          </p>
          <p>
            <FiMinus /> <b>¬P</b> - that will be the TO COMPARE FORMULA
          </p>
        </div>
        <div>
          <h4>Axioms: </h4>
          <p>
            <FiMinus /> (FirstOfImplication):{' '}
            <span>
              p {'->'} (q {'->'} p)
            </span>
          </p>
          <p>
            <FiMinus /> (SecondOfImplication):{' '}
            <span>
              (p {'->'} (q {'->'} r)) {'->'} ((p {'->'} q) {'->'} (p {'->'} r))
            </span>
          </p>

          <p>
            <FiMinus /> (FirstOfConjuction):{' '}
            <span>
              p {'->'} (q {'->'} (p ∧ q))
            </span>
          </p>
          <p>
            <FiMinus /> (SecondOfConjunction): <span>(p ∧ q) {'->'} p</span>
          </p>
          <p>
            <FiMinus /> (ThirdOfConjunction): <span>(p ∧ q) {'->'} q</span>
          </p>
          <p>
            <FiMinus /> (FirstOfDisjunction): <span>p {'->'} (p ∨ q)</span>
          </p>
          <p>
            <FiMinus /> (SecondOfDisjunction): <span>q {'->'} (p ∨ q)</span>
          </p>
          <p>
            <FiMinus /> (ThirdOfDisjunction):{' '}
            <span>
              (p {'->'} r) {'->'} ((q {'->'} r) {'->'} ((p ∨ q) {'->'} r))
            </span>
          </p>
          <p>
            <FiMinus /> (FirsOfNegation):{' '}
            <span>
              (p {'->'} q) {'->'} ((p {'->'} ¬q) {'->'} ¬p)
            </span>
          </p>
          <p>
            <FiMinus /> (SecondOfNegation): <span>¬¬p {'->'} p</span>
          </p>
        </div>
      </Container>
    </Modal>
  );
};

export default ModalInfo;
