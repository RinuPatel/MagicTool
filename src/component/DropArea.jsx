import { useState } from "react";

const DropArea = ({onDrop}) => {
  const [showDrop, setShowDrop] = useState(false);
  return (
    <section
      className={showDrop?"file image-pdf drop-area":"hide-drop"}
      onDragEnter={() => setShowDrop(true)}
      onDragLeave={() => setShowDrop(false)}
      onDrop={() => {
        onDrop()
        setShowDrop(false)
      }}  
      onDragOver={(e)=> e.preventDefault()}
    >
      Drop Here
    </section>
  );
};
export default DropArea;
