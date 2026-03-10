import './component.styles.scss';

const StatusBadge = ({ status }) => <span className={`status-badge status-${String(status).toLowerCase()}`}>{status}</span>;

export default StatusBadge;
