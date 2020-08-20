# CKEditor 5 classic editor build by DNA (DeNiApps)

The DNA classic editor build for CKEditor 5 was created on the top of official CKEditor 5 classic editor build v21.0.0. It's a **CKEditor 5 Custom Build for Developer's Blog**, including some features:

- Allowed to add image from unsplash (since V1.0.6)
- Added &lt;code&gt; for inline Code Block (since V1.0.5)
- Integrated with Code Block
- Allowed to insert an image by url

## DEMO

[SEE DEMO](https://deniapps.com/playground/ckeditor)

## How-Tos

- [Customize CKEditor5 Toolbar](https://deniapps.com/blog/customize-ckeditor5-toolbar)
- [Syntax Highlighting with Code Block](https://deniapps.com/blog/syntax-highlight-with-ckeditors-code-block)
- [Open External Links in New Tab](https://deniapps.com/blog/open-external-links-in-new-tab-for-ckeditor)

## Screenshots

![CKEditor 5 classic editor build screenshot](https://user-images.githubusercontent.com/66892370/86845106-01ad5780-c077-11ea-8294-6fa039b30720.png)

## Quick start

First, install the build from npm:

```bash
npm install --save ckeditor5-build-classic-dna
```

And use it in your website:

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

And with the CKEDitor component like:

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

  render() {
    return (
      <CKEditor
        editor={ClassicEditor}
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

**Note:** If you are planning to integrate CKEditor 5 deep into your application, it is actually more convenient and recommended to install and import the source modules directly (like it happens in `ckeditor.js`). Read more in the [Advanced setup guide](https://ckeditor.com/docs/ckeditor5/latest/builds/guides/integration/advanced-setup.html).

## License

Licensed under the terms of [GNU General Public License Version 2 or later](http://www.gnu.org/licenses/gpl.html). For full details about the license, please check the `LICENSE.md` file or [https://ckeditor.com/legal/ckeditor-oss-license](https://ckeditor.com/legal/ckeditor-oss-license).
