import React from "react";
import ImageEditor from "wdpcCommon/image-editor";
export default class App extends React.Component {
   constructor(props) {
       super(props);
   }

   render(){
       return(
           <ImageEditor></ImageEditor>
       )
   }
}