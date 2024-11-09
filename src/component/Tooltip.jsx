const Tooltip = ({ children, title }) => {
    return (
      <span className="tooltip-container">
        {children}
        <span className="tooltip-text">{title}</span>
      </span>
    );
  };
  
  export default Tooltip;