import PartnerHero from '../../components/PartnerHero/PartnerHero';
import PartnerBenefits from '../../components/PartnerBenefits/PartnerBenefits';
import './component.styles.scss';

const PartnerLandingPage = () => (
  <section className="partner-landing-page">
    <PartnerHero />
    <PartnerBenefits />
  </section>
);

export default PartnerLandingPage;
