import Plugin from "@ckeditor/ckeditor5-core/src/plugin";
import ButtonView from "@ckeditor/ckeditor5-ui/src/button/buttonview";
import imageIcon from "@ckeditor/ckeditor5-core/theme/icons/image.svg";
import Swal from "sweetalert2";

export default class InsertImage extends Plugin {
  init() {
    const editor = this.editor;

    editor.ui.componentFactory.add("insertImage", locale => {
      const view = new ButtonView(locale);

      view.set({
        label: "Insert image url",
        icon: imageIcon,
        tooltip: true
      });

      // Callback executed once the image is clicked.
      view.on("execute", () => {
        Swal.fire("Hello world!");

        // const imageUrl = prompt("Image URL");
        // if (!imageUrl) return false;

        // editor.model.change(writer => {
        //   const imageElement = writer.createElement("image", {
        //     src: imageUrl
        //   });

        //   // Insert the image in the current selection location.
        //   editor.model.insertContent(
        //     imageElement,
        //     editor.model.document.selection
        //   );
        // });
      });

      return view;
    });
  }
}
