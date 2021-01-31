# CKEditor 5 classic editor build by DNA (DeNiApps.COM) - Now Can Add an Image from Unsplash :-)

The DNA classic editor build for CKEditor 5 was created on the top of official CKEditor 5 classic editor build v22.0.0. It's a **CKEditor 5 Custom Build for Developer's Blog**, including some features:

- Allow to upload image from local with Base64UploadAdapter as default (since v.1.0.11)
- Auto assigned id attribute to &lt;code&gt; in Code Block (since v1.0.10)
- Allow to add custom css to &lt;table&gt; and &lt;img&gt; (since V1.0.9)
- Allow to add image from unsplash (since V1.0.6)
- Allow to add &lt;code&gt; for inline Code Block (since V1.0.5)
- Allow to insert Code Block
- Allow to insert an image by url

## DEMO

[SEE DEMO & EXAMPLE REACT COMPONENT](https://deniapps.com/playground/ckeditor)

## How-Tos

- [Customize CKEditor5 Toolbar](https://deniapps.com/blog/customize-ckeditor5-toolbar)
- [Syntax Highlighting with Code Block](https://deniapps.com/blog/syntax-highlight-with-ckeditors-code-block)
- [Open External Links in New Tab](https://deniapps.com/blog/open-external-links-in-new-tab-for-ckeditor)
- [How to add Custom CSS Class Names &lt;table&gt; and &lt;img&gt;](https://deniapps.com/blog/how-to-add-custom-css-classes-to-table-or-img-in-ckeditor)

## Screenshots

![CKEditor 5 classic editor build screenshot - add an image from Unsplash 1](https://user-images.githubusercontent.com/66892370/90817177-6b1db880-e2fb-11ea-9dea-1a1eb8c375c9.png)

![CKEditor 5 classic editor build screenshot - add an image from Unsplash 2](https://user-images.githubusercontent.com/66892370/90818503-9bb22200-e2fc-11ea-94ce-4e35ff6ed657.png)

![CKEditor 5 classic editor build screenshot - add an image from Unsplash 1](https://user-images.githubusercontent.com/66892370/90818508-9d7be580-e2fc-11ea-86fc-ce58c81d36f5.png)

![CKEditor 5 classic editor build screenshot - add code block](https://user-images.githubusercontent.com/66892370/90819368-e4b6a600-e2fd-11ea-97f3-4c589e3e3ab5.png)

![CKEditor 5 classic editor build screenshot - add inline code](https://user-images.githubusercontent.com/66892370/90819648-3a8b4e00-e2fe-11ea-99a9-39b51306db73.png)

## Quick start

First, install the build from npm:

```bash
npm install --save ckeditor5-build-classic-dna
```

Use CKEditor as React component:

```js
import React, { Component } from "react";
import PropTypes from "prop-types";
import CKEditor from "@ckeditor/ckeditor5-react";
import ClassicEditor from "ckeditor5-build-classic-dna";

class CKEditor5 extends Component {
  static get propTypes() {
    return {
      value: PropTypes.string,
      onChange: PropTypes.func,
    };
  }

// NOTE: You can customize toolbar using "config", here are avaliable Toolbar Items:
// "heading",
// "bold",
// "italic",
// "link",
// "bulletedList",
// "numberedList",
// "indent",
// "outdent",
// "insertImage",
// “insertImageFromUnsplash”,
// "code",
// "codeBlock",
// "blockQuote",
// "insertTable",
// "mediaEmbed",
// "undo",
// "redo"

// See how to customize toolbar at: https://deniapps.com/blog/customize-ckeditor5-toolbar

// You can add custom css to <table> & <img> now, see the details at:
// https://deniapps.com/blog/how-to-add-custom-css-classes-to-table-or-img-in-ckeditor

  render() {
    return (
      <CKEditor
        editor={ClassicEditor}
        config={{
          table: {
            customClass: ["ui", "table", "celled"], // Important!!! need to be array
          },
          image: {
          	customClass: ["ui", "fluid", "image"], // Use whatever class names defined in your theme
          },
          toolbar: [
            "heading",
            "|",
            "bold",
            "italic",
            "link",
            "bulletedList",
            "numberedList",
            "|",
            "indent",
            "outdent",
            "|",
            "codeBlock",
            "blockQuote",
            "insertTable",
            "mediaEmbed",
            "undo",
            "redo",
          ],
        data={this.props.value}
        onInit={(editor) => {
          // You can store the "editor" and use when it is needed.
          console.log("Editor is ready to use!", editor);
        }}
        onChange={(event, editor) => {
          const data = editor.getData();
          this.props.onChange(data);
        }}
      />
    );
  }
}
export default CKEditor5;
```

Or use it in your website:

```html
<div id="editor">
  <p>This is the editor content.</p>
</div>
<script src="./node_modules/ckeditor5-build-classic-dna/build/ckeditor.js"></script>
<script>
  ClassicEditor.create(document.querySelector("#editor"))
    .then((editor) => {
      window.editor = editor;
    })
    .catch((error) => {
      console.error("There was a problem initializing the editor.", error);
    });
</script>
```

Or in your JavaScript application:

```js
import ClassicEditor from "ckeditor5-build-classic-dna";

// Or using the CommonJS version:
// const ClassicEditor = require( 'ckeditor5-build-classic-dna' );

ClassicEditor.create(document.querySelector("#editor"))
  .then((editor) => {
    window.editor = editor;
  })
  .catch((error) => {
    console.error("There was a problem initializing the editor.", error);
  });
```

Or in React With SSR (for example: NextJS)

```js
import { useState } from "react";
// For SSR, you cannot import CKEditor directly since it needs client functions to run.
// import CKEditor from "components/Common/CKEditor";
import dynamic from "next/dynamic";
const CKEditor = dynamic(() => import("components/Common/CKEditor"), {
  ssr: false,
});

const CKEditorDemo = () => {
  const [content, setContent] = useState("");
  return <CKEditor value={content} onChange={setContent} />;
};

export default CKEditorDemo;
```

## License

Licensed under the terms of [GNU General Public License Version 2 or later](http://www.gnu.org/licenses/gpl.html). For full details about the license, please check the `LICENSE.md` file or [https://ckeditor.com/legal/ckeditor-oss-license](https://ckeditor.com/legal/ckeditor-oss-license).
