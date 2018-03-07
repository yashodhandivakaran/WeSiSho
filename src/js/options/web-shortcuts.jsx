import React from 'react';
import WebShortcutGroup from './web-shortcut-group.jsx';

export default class WebShortcuts extends React.Component {

  constructor() {
    super();
    this.state = {
      showLoader: true,
      shortcuts: {},
    };
  }

  componentDidMount() {
    chrome.storage.local.get('shortcuts', (result) => {
      const shortcuts = result.shortcuts;
      this.setState({ shortcuts, showLoader: false });

      /*
      let idx = 0;
      for (const key in shortcuts) {
        if ({}.hasOwnProperty.call(shortcuts, key)) {
          idx += 1;
          const titleId = `site-${idx}`;
          const contentId = `content-${idx}`;
          const tree = document.querySelector('#tree');
          tree.innerHTML += `<div id="${titleId}" class="sites" data-toggle="collapse" data-target="#${contentId}">${key}</div>`;
          tree.innerHTML += `<div id="${contentId}" class="collapse form-horizontal"></div>`;
          let idxInr = 0
          for (const s in shortcuts[key]) {
            if ({}.hasOwnProperty.call(shortcuts[key], s)) {
              const row = `${shortcuts[key][s].url}`;
              idxInr += 1;
              const removeRowId = `rem-${contentId}-${idxInr}`;
              const editRowId = `edit-${contentId}-${idxInr}`;
              const rowId = `row-${contentId}-${idxInr}`;
              const inputId = `input-${contentId}-${idxInr}`;
              const contentDiv = document.querySelector(`#${contentId}`);
              contentDiv.innerHTML += `<div id="${rowId}" class="form-group"><div for="${editRowId}" class="col-md-4 control-label">${row}</div>
                                        <div class="col-md-2"><input id="${inputId}" class="form-control" maxlength="1" placeholder="Press key for shortcut" type="text" value="${s}">
                                        </div>  <div id="${removeRowId}" class="glyphicon glyphicon-remove modifier col-md-1 cross-icon" aria-hidden="true"></div></div>`;
              document.querySelector(`#${removeRowId}`).click(() => {
                let deleteKey = false;
                if ($(`#${contentId}`).children().length === 1) {
                  $(`#${titleId}`).remove();
                  deleteKey = true;
                }
                $(`#${rowId}`).remove();
                chrome.storage.local.get('shortcuts', (result) => {
                  const shortcuts = result.shortcuts;
                  if (deleteKey) {
                    delete shortcuts[key];
                  } else {
                    delete shortcuts[key][s];
                  }
                  // update local storage
                  chrome.storage.local.set({ shortcuts }, () => {
                    // Notify that we saved.
                    window.alert('Settings saved');
                  });
                });
              });
              $(`#${inputId}`).on('input',(e) => {
                const saveId = `save-${contentId}-${idxInr}`;
                if (!$(`#${saveId}`).length) {
                  $(`#${rowId}`).append(`<span id="${saveId}" class="glyphicon glyphicon-ok modifier col-md-1" aria-hidden="true"></span>`);
                  $(`#${saveId}`).click(() =>{
                    const newShortcut = $(`#${inputId}`).val();
                    chrome.storage.local.get('shortcuts', (result) => {
                      const shortcuts = result.shortcuts;
                      shortcuts[key][newShortcut] = shortcuts[key][s];
                      delete shortcuts[key][s];
                      // update local storage
                      chrome.storage.local.set({ shortcuts }, () => {
                        // Notify that we saved.
                        window.alert('Settings saved');
                      });
                    });
                  });
                }
              });
            }
          }
        }
      }
    */
    });
  }

  render() {
    const { showLoader, shortcuts } = this.state;
    if (showLoader) {
      return (<h3>Loading...</h3>);
    }

    if (Object.keys(shortcuts).length === 0) {
      return (<h3>{'No web shortcuts set so far'}</h3>);
    }

    const rows = Object.keys(shortcuts)
    .map(shortcut =>
      <WebShortcutGroup
        key={shortcut}
        shortcuts={shortcuts[shortcut]}
        base={shortcut}
      />
    );

    return (
      <div>
        <h3>Configure Shortcuts:</h3>
        {rows}
      </div>
    );
  }

}
