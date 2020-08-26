import Plugin from "@ckeditor/ckeditor5-core/src/plugin";
import ButtonView from "@ckeditor/ckeditor5-ui/src/button/buttonview";
import imageIcon from "./unsplash.svg";
import React from "react";
import ReactDOM from "react-dom";
import superagent from "superagent";
import "./modal.css";

// const clientID =
//   "8e31e45f4a0e8959d456ba2914723451b8262337f75bcea2e04ae535491df16d";

let clientID = "TN-IIz68YhmPLsEAbVD4WA3RucFcJNZBy-G0UlhaqSM";

const { useState, useEffect, useRef } = React;

const simpleGet = (options) => {
  superagent
    .get(options.url)
    .then(function (res) {
      if (options.onSuccess) options.onSuccess(res);
    })
    .catch((err) => {
      if (options.onFailure) options.onFailure();
    });
};

const App = (props) => {
  let [photos, setPhotos] = useState(null);
  let [query, setQuery] = useState("");
  const queryInput = useRef(null);

  const numberOfPhotos = 30;
  const randomUrl =
    "https://api.unsplash.com/photos/random/?count=" +
    numberOfPhotos +
    "&client_id=" +
    clientID;

  // TO-DO: use search instead?
  // const url =
  //   "https://api.unsplash.com/search/photos/?count=" +
  //   numberOfPhotos +
  //   "&client_id=" +
  //   clientID;

  useEffect(() => {
    queryInput.current.focus();
    const photosUrl = query ? `${randomUrl}&query=${query}` : randomUrl;

    simpleGet({
      url: photosUrl,
      onSuccess: (res) => {
        setPhotos(res.body);
      },
      onFailure: () => {
        setPhotos([]);
      },
    });
  }, [query, randomUrl]);

  const searchPhotos = (e) => {
    e.preventDefault();
    setQuery(queryInput.current.value);
  };

  return (
    <div className="dnx-box">
      <form
        id="unsplash-search"
        className="unsplash-search form"
        onSubmit={searchPhotos}
      >
        <input
          id="dnx-unsplash-search-input"
          ref={queryInput}
          placeholder="Search Photos on Unsplash"
          type="search"
          className="input"
          defaultValue=""
          style={{ marginBottom: 20 }}
        />
      </form>

      <ul className="dnx-photo-grid">
        {photos === null && <p>Loading...</p>}
        {photos !== null && photos.length === 0 && <p>No results</p>}
        {photos !== null &&
          photos.length > 0 &&
          photos.map((photo) => {
            return (
              <li key={photo.id}>
                <img
                  src={photo.urls.regular}
                  onClick={() => props.handleSelect(photo)}
                />
              </li>
            );
          })}
      </ul>
    </div>
  );
};

export default class InsertImageFromUnsplash extends Plugin {
  init() {
    const editor = this.editor;
    if (editor.clientID) {
      clientID = editor.clientID;
    }

    editor.ui.componentFactory.add("insertImageFromUnsplash", (locale) => {
      const view = new ButtonView(locale);

      view.set({
        label: "Add an image from Unsplash",
        icon: imageIcon,
        tooltip: true,
      });

      // Callback executed once the image is clicked.
      view.on("execute", () => {
        let modal = document.querySelector("#dnx-modal");
        let modalOverlay = document.querySelector("#dnx-modal-overlay");
        if (modal) {
          modal.classList.toggle("closed");
          modalOverlay.classList.toggle("closed");
          document.querySelector(
            "body"
          ).style.overflow = modal.classList.contains("closed")
            ? "visible"
            : "hidden";
          document.getElementById("dnx-unsplash-search-input").focus();
        } else {
          const dnxModal = document.createElement("div");
          dnxModal.id = "dnx-modal-wrapper";
          dnxModal.innerHTML = `<div class="dnx-modal-overlay" id="dnx-modal-overlay"></div>
          <div class="dnx-modal" id="dnx-modal">
            <a href="#" class="dnx-close-button" id="dnx-close-button"></a>
            <div class="modal-guts">
              <div id="unsplash-dna"></div>
            </div>
          </div>`;

          document.body.appendChild(dnxModal);

          document.querySelector("body").style.overflow = "hidden";
          const closeButton = document.querySelector("#dnx-close-button");
          modal = document.querySelector("#dnx-modal");
          modalOverlay = document.querySelector("#dnx-modal-overlay");

          closeButton.addEventListener("click", function (e) {
            e.preventDefault();
            modal.classList.toggle("closed");
            modalOverlay.classList.toggle("closed");
            document.querySelector("body").style.overflow = "visible";
          });
        }

        // Swal.fire("Hello world!");

        const handleSelect = async (photo) => {
          // const imageUrl = prompt("Image URL");
          // if (!imageUrl) return false;
          if (!photo.urls && !photo.urls.regular) {
            return false;
          }

          let downloadLink = "";
          if (photo.links) {
            downloadLink =
              photo.links.download_location + "?client_id=" + clientID;

            await superagent.get(downloadLink);
          }

          editor.model.change((writer) => {
            const imageElement = writer.createElement("image", {
              src: photo.urls.regular,
            });

            // const link = writer.createText(photo.user.name);
            // writer.setAttribute("linkHref", photo.user.links.html, link);

            if (photo.user) {
              const { name, links } = photo.user;
              let link = links ? links.html : "https://unsplash.com";
              link += "?utm_source=DNX&utm_medium=referral";

              const captionElment = writer.createElement("caption");

              writer.appendText("Photo by ", captionElment);
              writer.appendText(name, { linkHref: link }, captionElment);

              writer.appendText(" on ", captionElment);
              writer.appendText(
                "Unsplash",
                {
                  linkHref:
                    "https://unsplash.com/?utm_source=DNX&utm_medium=referral",
                },
                captionElment
              );
              // writer.appendElement(link, captionElment);

              writer.append(captionElment, imageElement);
            }

            // Insert the image in the current selection location.
            editor.model.insertContent(
              imageElement,
              editor.model.document.selection
            );
          });
          modal.classList.toggle("closed");
          modalOverlay.classList.toggle("closed");
          document.querySelector("body").style.overflow = "visible";
          return view;
        };

        ReactDOM.render(
          <App handleSelect={handleSelect} />,
          document.getElementById("unsplash-dna")
        );
      });

      return view;
    });
  }
}
