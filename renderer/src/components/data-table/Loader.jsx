import "./loaderStyles.css";

export default function Loader() {
  return (
    <div className="loader dark:dark-loader">
      <div className="react-star">
        <div className="nucleus"></div>
        <div className="electron electron1"></div>
        <div className="electron electron2"></div>
        <div className="electron electron3"></div>
      </div>
    </div>
  );
}