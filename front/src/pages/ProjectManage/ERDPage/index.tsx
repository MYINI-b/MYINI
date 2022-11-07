import './style.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave } from '@fortawesome/free-regular-svg-icons';
// import Stepper from './Stepper';
import GenerateVuerd from './GenerateVuerd';

interface Props {
  pid: string;
}
export default function ERDPage({ pid }: Props) {
  return (
    <div>
      <div className="erd-container">
        <h1 className="erd-title">ERD</h1>
        <section className="erd-info-section">
          <h3 className="erd-project-title">PROJECT NAME</h3>
          <button className="erd-save-button" type="button">
            <FontAwesomeIcon icon={faSave} />
          </button>
        </section>

        <section className="erd-tool">
          <GenerateVuerd />
        </section>
      </div>
    </div>
  );
}
