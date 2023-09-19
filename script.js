var i = 0;
var contents = []
function duplicateDiv() {
  var myDiv = document.getElementById("block");
  var divClone = myDiv.cloneNode(true); // deep cloning
  divClone.id = "block" + ++i; // unique id for the clone

  // Update IDs of input fields in cloned div
  var inputs = divClone.getElementsByTagName('input');
  for (var j = 0; j < inputs.length; j++) {
    inputs[j].id = inputs[j].id + i;
  }
  // Update IDs of select fields in cloned div
  var selects = divClone.getElementsByTagName('select');
  for (var j = 0; j < selects.length; j++) {
    selects[j].id = selects[j].id + i;
  }

  var p = document.getElementById('funcField');
  for (var j = 0; j < p.length; j++) {
    p[j].id = p[j].id + i;
  }
  myDiv.parentNode.appendChild(divClone); // append clone to parent of original div
}

function reload_code_preview() {
  var blocks = document.getElementsByClassName('block');
  for (var i = 0; i < blocks.length; i++) {
    var codePreview = blocks[i].querySelector('#codepreview');
    if (codePreview) {
      var opcode = document.getElementById('opcode' + (i === 0 ? '' : i));
      var blocktype = document.getElementById('blocktypes' + (i === 0 ? '' : i));
      var isterminal = document.getElementById('isTerminal' + (i === 0 ? '' : i));
      var blockallthreads = document.getElementById('blockAllThreads' + (i === 0 ? '' : i));
      var text = document.getElementById('text' + (i === 0 ? '' : i));
      var funcField = document.getElementsByClassName("funcField")[i]

      if (opcode && blocktype && isterminal && blockallthreads && text && funcField) {
        codePreview.innerHTML =
          `{
        <br>opcode:'${opcode.value}',
        <br>blockType: Scratch.BlockType.${blocktype.value},
        <br>isTerminal: ${isterminal.value},
        <br>blockAllThreads: ${blockallthreads.value},
        <br>text: '${text.value}',
        <br>func: '${getFunctionName(funcField.textContent)}',
        \n},`
        Prism.highlightElement(codePreview);
      }
      else {
        throw new Error('Haha something is Null, F you ig')
      }
    }
  }
}

function update_full_code() {
  var blocks = document.getElementsByClassName('block');
  var fullcode = document.querySelector('.fullcode');
  var blocks_info = ""
  var funcs = ""
  for (var i = 0; i < blocks.length; i++) {
    if (fullcode) {
      var opcode = document.getElementById('opcode' + (i === 0 ? '' : i));
      var blocktype = document.getElementById('blocktypes' + (i === 0 ? '' : i));
      var isterminal = document.getElementById('isTerminal' + (i === 0 ? '' : i));
      var blockallthreads = document.getElementById('blockAllThreads' + (i === 0 ? '' : i));
      var text = document.getElementById('text' + (i === 0 ? '' : i));
      var funcField = document.getElementsByClassName("funcField")[i]
      var extId = document.getElementById('extId')
      var extName = document.getElementById('extName')
      var color1 = document.getElementById('color1')

      if (opcode && blocktype && isterminal && blockallthreads && text) {
        blocks_info +=
          `
        {
          opcode:'${opcode.value}',
          blockType: Scratch.BlockType.${blocktype.value},
          isTerminal: ${isterminal.value},
          blockAllThreads: ${blockallthreads.value},
          text: '${text.value}',
          func: '${getFunctionName(funcField.textContent)}',
        },`
        funcs += `${funcField.textContent}`
        fullcode.innerHTML = `
class ${extName.value} {
  getInfo() {
    return {
      id: '${extId.value}',
      name: '${extName.value}',
      color1: '${color1.value}',
      blockIconURI: 'iconURI',
      docsURI: 'https://cocrea.world',
      blocks: [
        ${blocks_info}
      ],
    }
  }
${funcs}
}
Scratch.extensions.register(new ${extName.value}())
        `
        Prism.highlightElement(fullcode);
      }
      else {
        throw new Error('Haha something is Null, F you ig')
      }
    }
  }
}

function getFunctionName(text) {
  var end = text.indexOf('(');
  if (end !== -1) {
    return text.slice(0, end).trim();
  }
  return null;
}

function Copied() {
  let popup = document.getElementById('copied');
  popup.style.display = 'block';

  setTimeout(function() {
    popup.style.display = 'none';
  }, 2000); // Hide after 2 seconds
}

function downloadExtension() {
  // Get the element
  let element = document.querySelector('.fullcode');

  var extName = document.getElementById('extName')

  // Get the content of the element
  let content = element.textContent || element.innerText;

  // Create a Blob with the content
  let blob = new Blob([content], { type: "text/plain" });

  // Create a download link for the Blob
  let url = window.URL.createObjectURL(blob);
  let a = document.createElement("a");
  a.href = url;
  a.download = `${extName.value}.txt`;

  // Append the link to the body (needed for Firefox)
  document.body.appendChild(a);

  // Simulate a click on the link
  a.click();

  // Remove the link from the body
  document.body.removeChild(a);
}

function copyExtension() {
  var fullcode = document.querySelector('.fullcode');
  navigator.clipboard.writeText(fullcode.textContent)
    .then(() => {
      Copied();
    })
}
