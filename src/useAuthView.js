import { useEffect, useRef } from "react";

function MyComponent(props) {
  console.log("hello");
  //   const ref = useRef(null);

  //   useEffect(() => {
  //     const myDomElement = "div";

  //     while (ref.current.firstChild) {
  //       ref.current.removeChild(ref.current.firstChild);
  //     }

  //     ref.current.appendChild(myDomElement);
  //   }, [props.data]);

  return <div>hello</div>;
}

export default MyComponent;
