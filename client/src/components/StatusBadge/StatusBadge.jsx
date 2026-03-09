import './status-badge.styles.scss';
const StatusBadge = ({ status }) => <span className={`status-badge status-${status.toLowerCase()}`}>{status}</span>;
export default StatusBadge;
